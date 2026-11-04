import {
  Router,
  type Request,
  type Response,
  type NextFunction,
} from "express";
import rateLimit from "express-rate-limit";
import mongoose from "mongoose";
import { createHmac, timingSafeEqual } from "node:crypto";
import { z } from "zod";
import Inquiry from "../models/Inquiry";

const router = Router();
const COOKIE = "vistar_admin_session";
const SESSION_SECONDS = 8 * 60 * 60;
const loginLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
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
    res
      .status(401)
      .json({
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
    res
      .status(401)
      .json({
        ok: false,
        message: "Please sign in to access the admin panel.",
      });
    return;
  }
  if (role !== "owner") {
    res
      .status(403)
      .json({
        ok: false,
        message:
          "Owner access is required for customer and operations records.",
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

router.post("/login", loginLimit, async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    res
      .status(400)
      .json({ ok: false, message: "Enter both username and password." });
    return;
  }
  const { username, password, secret, seoUsername, seoPassword } =
    credentials();
  if (!username || !password || !secret) {
    res
      .status(503)
      .json({
        ok: false,
        message: "Admin login is not configured on this server.",
      });
    return;
  }
  let role: AdminRole | null = null;
  if (
    same(parsed.data.username, username) &&
    same(parsed.data.password, password)
  )
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
    sameSite: "lax",
    path: "/api/admin",
    maxAge: SESSION_SECONDS * 1000,
  });
  res.json({ ok: true, role, message: "Signed in." });
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
      res
        .status(503)
        .json({
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
      res
        .status(503)
        .json({
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
