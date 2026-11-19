import {
  Router,
  type Request,
  type Response,
  type NextFunction,
} from "express";
import rateLimit from "express-rate-limit";
import mongoose from "mongoose";
import {
  createHmac,
  randomBytes,
  randomInt,
  timingSafeEqual,
} from "node:crypto";
import { z } from "zod";
import Inquiry from "../models/Inquiry";
import AdminCredential from "../models/AdminCredential";
import AdminPasswordReset from "../models/AdminPasswordReset";
import {
  hashPassword,
  hashResetCode,
  getRecoveryDestinations,
  sendRecoveryCodes,
  verifyPassword,
} from "../services/adminRecovery";

const router = Router();
const COOKIE = "vistar_admin_session";
const SESSION_SECONDS = 8 * 60 * 60;
const loginLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  skipSuccessfulRequests: true,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: {
    ok: false,
    message: "Too many sign-in attempts. Please wait and try again.",
  },
});
const loginSchema = z.object({
  username: z.string().trim().min(1).max(80),
  password: z.string().min(1).max(256),
});
const statusSchema = z.object({
  status: z.enum(["new", "contacted", "closed"]),
});
const passwordResetSchema = z.object({
  challengeId: z.string().regex(/^[a-f0-9]{64}$/i),
  emailCode: z.string().regex(/^\d{6}$/),
  phoneCode: z.string().regex(/^\d{6}$/),
  newPassword: z.string().min(12).max(128),
});
export type AdminRole = "owner" | "seo";

function devMode() {
  return process.env.NODE_ENV !== "production";
}
function credentials() {
  return {
    username: process.env.ADMIN_USERNAME || (devMode() ? "vistar-admin" : ""),
    password:
      process.env.ADMIN_PASSWORD || (devMode() ? "VistarDemo!2026" : ""),
    seoUsername: process.env.SEO_ADMIN_USERNAME || "",
    seoPassword: process.env.SEO_ADMIN_PASSWORD || "",
    secret:
      process.env.ADMIN_SESSION_SECRET ||
      (devMode()
        ? "Vistar Cabs-local-preview-secret-change-before-launch"
        : ""),
  };
}
function same(a: string, b: string) {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}
function isLocalDevelopmentOrigin(req: Request) {
  const localHost = /^(localhost|127\.0\.0\.1)(:\d+)?$/i.test(
    req.get("host") || "",
  );
  const localOrigin = /^http:\/\/(localhost|127\.0\.0\.1):3000$/.test(
    req.get("origin") || "",
  );
  return process.env.NODE_ENV === "development" && localHost && localOrigin;
}
function isLocalDevelopmentRequest(req: Request) {
  const developmentDatabase = /(?:^|[_-])(dev|development|test|local)(?:$|[_-])/i.test(
    process.env.MONGODB_DATABASE_NAME || "",
  );
  return (
    isLocalDevelopmentOrigin(req) &&
    process.env.ADMIN_RECOVERY_LOCAL_CODES === "true" &&
    developmentDatabase
  );
}
function makeToken(role: AdminRole, exp: string, secret: string) {
  const payload = `${role}.${exp}`;
  return `${payload}.${createHmac("sha256", secret).update(payload).digest("hex")}`;
}
function cookieToken(req: Request) {
  const raw = req.headers.cookie || "";
  for (const part of raw.split(";")) {
    const [name, ...rest] = part.trim().split("=");
    if (name === COOKIE) return decodeURIComponent(rest.join("="));
  }
  return "";
}
export function authenticatedRole(req: Request): AdminRole | null {
  const { secret } = credentials();
  if (!secret) return null;
  const token = cookieToken(req);
  const [role, exp, signature] = token.split(".");
  if (
    (role !== "owner" && role !== "seo") ||
    !exp ||
    !signature ||
    !/^[0-9]+$/.test(exp) ||
    Number(exp) < Date.now()
  )
    return null;
  const expected = makeToken(role, exp, secret).split(".")[2];
  return same(signature, expected) ? role : null;
}
export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (!authenticatedRole(req)) {
    res.status(401).json({
      ok: false,
      message: "Please sign in to access the admin panel.",
    });
    return;
  }
  next();
}
export function requireOwner(req: Request, res: Response, next: NextFunction) {
  const role = authenticatedRole(req);
  if (!role) {
    res.status(401).json({
      ok: false,
      message: "Please sign in to access the admin panel.",
    });
    return;
  }
  if (role !== "owner") {
    res.status(403).json({
      ok: false,
      message: "Owner access is required for customer and operations records.",
    });
    return;
  }
  next();
}
export function requireSeoEditor(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const role = authenticatedRole(req);
  if (!role) {
    res.status(401).json({
      ok: false,
      message: "Please sign in to access the admin panel.",
    });
    return;
  }
  if (role !== "seo") {
    res.status(403).json({
      ok: false,
      message: "This workspace is available to the SEO editor.",
    });
    return;
  }
  next();
}
function publicRecord(value: any) {
  return {
    id: String(value._id || value.id || ""),
    name: value.name || "",
    phone: value.phone,
    serviceType: value.serviceType,
    journeyType: value.journeyType || "",
    from: value.from,
    to: value.to || "",
    pickupDate: value.pickupDate,
    pickupTime: value.pickupTime,
    returnDate: value.returnDate || "",
    returnTime: value.returnTime || "",
    duration: value.duration || "",
    airportDirection: value.airportDirection || "",
    flightNumber: value.flightNumber || "",
    terminal: value.terminal || "",
    passengers: value.passengers || null,
    notes: value.notes || "",
    status: value.status || "new",
    createdAt: value.createdAt || value.created_at || null,
  };
}

router.post("/login", loginLimit, async (req, res, next) => {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      res
        .status(400)
        .json({ ok: false, message: "Enter both username and password." });
      return;
    }
    const { username, password, secret, seoUsername, seoPassword } =
      credentials();
    const storedOwnerCredential = username
      ? await AdminCredential.findOne({ key: "owner" })
          .select("+passwordHash")
          .lean()
      : null;
    if (!username || !secret || (!password && !storedOwnerCredential)) {
      res.status(503).json({
        ok: false,
        message: "Admin login is not configured on this server.",
      });
      return;
    }
    let role: AdminRole | null = null;
    const ownerPasswordValid = storedOwnerCredential
      ? await verifyPassword(
          parsed.data.password,
          (storedOwnerCredential as unknown as { passwordHash: string })
            .passwordHash,
        )
      : same(parsed.data.password, password);
    if (same(parsed.data.username, username) && ownerPasswordValid)
      role = "owner";
    else if (
      seoUsername &&
      seoPassword &&
      same(parsed.data.username, seoUsername) &&
      same(parsed.data.password, seoPassword)
    )
      role = "seo";
    if (!role) {
      res
        .status(401)
        .json({ ok: false, message: "Username or password is incorrect." });
      return;
    }
    const exp = String(Date.now() + SESSION_SECONDS * 1000);
    res.cookie(COOKIE, makeToken(role, exp, secret), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      // The production frontend proxies /api, so the cookie is first-party.
      // Lax also works in mobile browsers that restrict cross-site cookies.
      sameSite: "lax",
      path: "/api/admin",
      maxAge: SESSION_SECONDS * 1000,
    });
    res.json({ ok: true, role, message: "Signed in." });
  } catch (error) {
    next(error);
  }
});
router.post("/logout", (req, res) => {
  res.clearCookie(COOKIE, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/api/admin",
  });
  res.json({ ok: true });
});

router.post(
  "/password-reset/request",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 3,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    message: {
      ok: false,
      message: "Too many recovery requests. Wait a few minutes and try again.",
    },
  }),
  async (req, res, next) => {
    try {
      const { username, secret } = credentials();
      if (!username || !secret) {
        res.status(503).json({
          ok: false,
          message: "Password recovery is not configured on this server.",
        });
        return;
      }
      const challengeId = randomBytes(32).toString("hex");
      const emailCode = String(randomInt(0, 1_000_000)).padStart(6, "0");
      const phoneCode = String(randomInt(0, 1_000_000)).padStart(6, "0");
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
      const emailCodeHash = hashResetCode(
        challengeId,
        "email",
        emailCode,
        secret,
      );
      const phoneCodeHash = hashResetCode(
        challengeId,
        "phone",
        phoneCode,
        secret,
      );
      const challengeHash = createHmac("sha256", secret)
        .update(`challenge.${challengeId}`)
        .digest("hex");

      let developmentOnlyCodes: {
        emailCode: string;
        phoneCode: string;
      } | null = null;
      try {
        await sendRecoveryCodes(emailCode, phoneCode);
      } catch {
        if (isLocalDevelopmentRequest(req)) {
          // This requires both an explicit local opt-in and a separate
          // development/test database so it cannot reset production accounts.
          developmentOnlyCodes = { emailCode, phoneCode };
          console.warn(
            "Recovery delivery failed; explicitly enabled local codes are available for the development database only.",
          );
        } else {
          console.error(
            "Admin password recovery delivery is not configured or failed.",
          );
          res.status(503).json({
            ok: false,
            message: isLocalDevelopmentOrigin(req)
              ? "Local test codes are disabled. Set ADMIN_RECOVERY_LOCAL_CODES=true and use a separate database named with dev, development, test or local; otherwise configure both email and SMS delivery services."
              : "Password reset codes could not be delivered. Ask the site owner to configure the recovery email and SMS service, then try again.",
          });
          return;
        }
      }

      await AdminPasswordReset.create({
        challengeHash,
        emailCodeHash,
        phoneCodeHash,
        expiresAt,
      });
      const destinations = getRecoveryDestinations();
      const [emailName, emailDomain] = destinations.email.split("@");
      res.status(202).json({
        ok: true,
        challengeId,
        expiresInSeconds: 600,
        destinations: {
          email:
            emailName && emailDomain
              ? `${emailName.slice(0, 1)}••••@${emailDomain}`
              : "saved email",
          phone: `••••${destinations.phone.replace(/\D/g, "").slice(-4)}`,
        },
        message: developmentOnlyCodes
          ? "Email and SMS delivery is not configured locally. Use the local codes shown below to finish testing the reset flow."
          : "Verification codes were sent to the account recovery email and phone.",
        ...(developmentOnlyCodes ? { developmentOnlyCodes } : {}),
      });
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  "/password-reset/confirm",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    message: {
      ok: false,
      message:
        "Too many verification attempts. Wait a few minutes and try again.",
    },
  }),
  async (req, res, next) => {
    try {
      const parsed = passwordResetSchema.safeParse(req.body);
      if (!parsed.success) {
        res.status(400).json({
          ok: false,
          message:
            "Enter both six-digit codes and a password of at least 12 characters.",
        });
        return;
      }
      const { secret, username } = credentials();
      if (!secret || !username) {
        res.status(503).json({
          ok: false,
          message: "Password recovery is not configured on this server.",
        });
        return;
      }
      const challengeHash = createHmac("sha256", secret)
        .update(`challenge.${parsed.data.challengeId}`)
        .digest("hex");
      const challenge = (await AdminPasswordReset.findOneAndUpdate(
        {
          challengeHash,
          expiresAt: { $gt: new Date() },
          attempts: { $lt: 5 },
          usedAt: null,
        },
        { $inc: { attempts: 1 } },
        { new: true },
      ).lean()) as {
        _id: unknown;
        emailCodeHash: string;
        phoneCodeHash: string;
        attempts: number;
      } | null;
      if (!challenge) {
        res.status(400).json({
          ok: false,
          message:
            "These codes expired or are no longer valid. Request new codes.",
        });
        return;
      }
      const validEmailCode = same(
        hashResetCode(
          parsed.data.challengeId,
          "email",
          parsed.data.emailCode,
          secret,
        ),
        challenge.emailCodeHash,
      );
      const validPhoneCode = same(
        hashResetCode(
          parsed.data.challengeId,
          "phone",
          parsed.data.phoneCode,
          secret,
        ),
        challenge.phoneCodeHash,
      );
      if (!validEmailCode || !validPhoneCode) {
        if (challenge.attempts >= 5)
          await AdminPasswordReset.deleteOne({ _id: challenge._id });
        res.status(400).json({
          ok: false,
          message: "One or both verification codes are incorrect.",
        });
        return;
      }
      const claimed = await AdminPasswordReset.findOneAndUpdate(
        { _id: challenge._id, usedAt: null },
        { $set: { usedAt: new Date() } },
        { new: true },
      ).lean();
      if (!claimed) {
        res.status(400).json({
          ok: false,
          message: "These codes have already been used. Request new codes.",
        });
        return;
      }
      const passwordHash = await hashPassword(parsed.data.newPassword);
      await AdminCredential.findOneAndUpdate(
        { key: "owner" },
        { $set: { passwordHash, passwordUpdatedAt: new Date() } },
        { upsert: true, new: true, setDefaultsOnInsert: true },
      );
      await AdminPasswordReset.deleteOne({ _id: challenge._id });
      res.json({
        ok: true,
        message: "Password changed. Sign in with your new password.",
      });
    } catch (error) {
      next(error);
    }
  },
);
router.get("/session", requireAdmin, (req, res) =>
  res.json({ ok: true, authenticated: true, role: authenticatedRole(req) }),
);

router.get("/inquiries", requireOwner, async (req, res, next) => {
  try {
    const state = typeof req.query.status === "string" ? req.query.status : "";
    if (state && !["new", "contacted", "closed"].includes(state)) {
      res.status(400).json({ ok: false, message: "Unknown status filter." });
      return;
    }
    if (mongoose.connection.readyState !== 1) {
      res.status(503).json({
        ok: false,
        message: "Admin storage is unavailable. MongoDB must be connected.",
      });
      return;
    }
    const query = state ? { status: state } : {};
    const [rows, total] = await Promise.all([
      Inquiry.find(query).sort({ createdAt: -1 }).limit(200).lean(),
      Inquiry.countDocuments(query),
    ]);
    res.json({
      ok: true,
      storage: "mongodb",
      total,
      items: rows.map(publicRecord),
    });
  } catch (error) {
    next(error);
  }
});

router.patch("/inquiries/:id", requireOwner, async (req, res, next) => {
  try {
    const parsed = statusSchema.safeParse(req.body);
    if (!parsed.success) {
      res
        .status(400)
        .json({ ok: false, message: "Choose a valid enquiry status." });
      return;
    }
    if (mongoose.connection.readyState !== 1) {
      res.status(503).json({
        ok: false,
        message: "Admin storage is unavailable. MongoDB must be connected.",
      });
      return;
    }
    const { status } = parsed.data;
    if (!mongoose.isValidObjectId(req.params.id)) {
      res.status(404).json({ ok: false, message: "Enquiry not found." });
      return;
    }
    const row = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true },
    ).lean();
    if (!row) {
      res.status(404).json({ ok: false, message: "Enquiry not found." });
      return;
    }
    res.json({ ok: true, item: publicRecord(row) });
  } catch (error) {
    next(error);
  }
});

export default router;
