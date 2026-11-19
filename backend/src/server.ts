import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoose from "mongoose";
import { connectDatabase, isDatabaseUnavailable } from "./config/db";
import inquiriesRouter from "./routes/inquiries";
import adminRouter from "./routes/admin";
import adminResourcesRouter from "./routes/adminResources";
import publicRouter from "./routes/public";
const app = express();
const port = Number(process.env.PORT || 5000);
// Hostinger sits behind a reverse proxy and forwards the visitor IP.
app.set("trust proxy", 1);
const allowedOrigin = (
  process.env.FRONTEND_ORIGIN ||
  (process.env.NODE_ENV === "production"
    ? "https://vistarcabs.com,https://www.vistarcabs.com"
    : "http://localhost:3000,http://127.0.0.1:3000")
)
  .split(",")
  .map((s) => s.trim());
const acceptedOrigins = [
  ...allowedOrigin,
  ...(process.env.NODE_ENV === "production"
    ? ["https://vistarcabs.com", "https://www.vistarcabs.com"]
    : []),
];
function canonicalOrigin(value: string) {
  try {
    const url = new URL(value);
    const hostname = url.hostname.toLowerCase().replace(/^www\./, "");
    return `${url.protocol}//${hostname}${url.port ? `:${url.port}` : ""}`;
  } catch {
    return "";
  }
}
app.disable("x-powered-by");
app.use(helmet());
app.use(
  cors({
    origin(origin, callback) {
      const developmentLan =
        process.env.NODE_ENV !== "production" &&
        /^http:\/\/(localhost|127\.0\.0\.1|10(?:\.\d{1,3}){3}|192\.168(?:\.\d{1,3}){2}|172\.(?:1[6-9]|2\d|3[01])(?:\.\d{1,3}){2}):3000$/.test(
          origin || "",
        );
      if (
        !origin ||
        acceptedOrigins.includes(origin) ||
        acceptedOrigins.some(
          (allowed) => canonicalOrigin(allowed) === canonicalOrigin(origin),
        ) ||
        developmentLan
      )
        return callback(null, true);
      return callback(
        Object.assign(new Error("Origin not allowed by CORS"), { status: 403 }),
      );
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.json({ limit: "200kb" }));
app.use("/api", (_req, res, next) => {
  // API responses include session and admin data; never serve them from an edge cache.
  res.setHeader("Cache-Control", "private, no-store, max-age=0");
  res.setHeader("Surrogate-Control", "no-store");
  next();
});
app.use(
  "/api/",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    // Admin section changes can issue several authenticated requests at once.
    // Those routes have their own authentication and the login route has a
    // dedicated stricter limiter, so don't let normal admin use exhaust the
    // shared public API quota for an IP/network.
    skip: (req) => req.path.startsWith("/admin/"),
    limit: 100,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    message: {
      ok: false,
      message:
        "Too many public API requests from this network. Please wait a few minutes and try again.",
    },
  }),
);
app.get("/api/health", (_req, res) => {
  const connected = mongoose.connection.readyState === 1;
  res.status(connected ? 200 : 503).json({
    ok: connected,
    service: "vistar-cabs-api",
    storage: connected ? "mongodb" : "database-unavailable",
    ...(connected ? { database: mongoose.connection.name } : {}),
    time: new Date().toISOString(),
  });
});
app.use("/api/inquiries", inquiriesRouter);
app.use("/api/admin", adminRouter);
app.use("/api/admin", adminResourcesRouter);
app.use("/api/public", publicRouter);
app.use(
  (
    err: unknown,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) => {
    console.error(err);
    const unavailable = isDatabaseUnavailable(err);
    const status = unavailable
      ? 503
      : err &&
          typeof err === "object" &&
          "status" in err &&
          typeof err.status === "number" &&
          err.status >= 400 &&
          err.status < 500
        ? err.status
        : 500;
    res.status(status).json({
      ok: false,
      message: unavailable
        ? "Service data is temporarily unavailable while storage reconnects. Please retry shortly."
        : status === 403
          ? "This website address is not allowed to access the API. Check FRONTEND_ORIGIN on the backend."
          : "Something went wrong. Please try again or contact Vistar Cabs directly.",
    });
  },
);
app.listen(port, "0.0.0.0", () => {
  console.log(`Vistar Cabs API listening on ${port}; checking MongoDB`);
});

async function connectDatabaseWithRetry() {
  let delayMs = 1_000;
  for (;;) {
    try {
      await connectDatabase();
      console.log("Vistar Cabs API storage is ready");
      return;
    } catch (error) {
      const name =
        error && typeof error === "object" && "name" in error
          ? String(error.name)
          : "UnknownError";
      const uri = process.env.MONGODB_URI;
      const detail =
        error instanceof Error ? error.message : "Unknown connection error.";
      const safeDetail = uri
        ? detail.split(uri).join("[MongoDB URI redacted]")
        : detail;
      console.error(
        `MongoDB connection failed (${name}): ${safeDetail.slice(0, 240)}; retrying in ${Math.round(delayMs / 1000)} seconds.`,
      );
      await new Promise((resolve) => setTimeout(resolve, delayMs));
      delayMs = Math.min(delayMs * 2, 30_000);
    }
  }
}

void connectDatabaseWithRetry();
