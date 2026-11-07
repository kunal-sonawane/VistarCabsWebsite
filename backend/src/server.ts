import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoose from "mongoose";
import { connectDatabase } from "./config/db";
import inquiriesRouter from "./routes/inquiries";
import adminRouter from "./routes/admin";
import adminResourcesRouter from "./routes/adminResources";
import publicRouter from "./routes/public";
const app = express();
const port = Number(process.env.PORT || 5000);
// Hostinger sits behind a reverse proxy and forwards the visitor IP.
app.set("trust proxy", 1);
const allowedOrigin = (
  process.env.FRONTEND_ORIGIN || "http://localhost:3000,http://127.0.0.1:3000"
)
  .split(",")
  .map((s) => s.trim());
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
      if (!origin || allowedOrigin.includes(origin) || developmentLan)
        return callback(null, true);
      return callback(new Error("Origin not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.json({ limit: "200kb" }));
app.use(
  "/api/",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: "draft-7",
    legacyHeaders: false,
  }),
);
app.get("/api/health", (_req, res) => {
  const connected = mongoose.connection.readyState === 1;
  res
    .status(connected ? 200 : 503)
    .json({
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
    res
      .status(500)
      .json({
        ok: false,
        message:
          "Something went wrong. Please try again or contact Vistar Cabs directly.",
      });
  },
);
connectDatabase()
  .then(() =>
    app.listen(port, "0.0.0.0", () =>
      console.log(
        `Vistar Cabs API listening on ${port} with MongoDB connected`,
      ),
    ),
  )
  .catch((error) => {
    console.error("API startup blocked because MongoDB is unavailable:", error);
    process.exit(1);
  });
