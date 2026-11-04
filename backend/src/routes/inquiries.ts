import { Router } from "express";
import { z } from "zod";
import mongoose from "mongoose";
import Inquiry from "../models/Inquiry";

const router = Router();
function isCalendarDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}
function todayInIndia() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}
const inquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2)
    .max(100)
    .regex(/^[\p{L}\p{M} .'-]+$/u, { message: "Enter a valid name." }),
  phone: z
    .string()
    .trim()
    .min(8)
    .max(20)
    .regex(/^[0-9+()\-\s]+$/)
    .refine((value) => value.replace(/\D/g, "").length >= 8, {
      message: "Enter a valid callback number.",
    }),
  companyName: z.string().trim().max(140).optional().default(""),
  email: z.string().trim().max(160).refine((value) => !value || z.string().email().safeParse(value).success, { message: "Enter a valid email." }).optional().default(""),
  serviceType: z.enum(["Outstation", "Airport", "Hourly", "Corporate"]),
  journeyType: z.enum(["", "One Way", "Round Trip"]).optional().default(""),
  from: z.string().trim().min(2).max(160),
  to: z.string().trim().min(2).max(160),
  pickupDate: z.string().trim().max(10).optional().default(""),
  pickupTime: z.string().trim().max(5).optional().default(""),
  returnDate: z
    .string()
    .trim()
    .regex(/^(?:|\d{4}-\d{2}-\d{2})$/)
    .refine((value) => value === "" || isCalendarDate(value), {
      message: "Enter a valid return date.",
    })
    .optional()
    .default(""),
  returnTime: z
    .string()
    .trim()
    .regex(/^(?:|(?:[01]\d|2[0-3]):[0-5]\d)$/)
    .optional()
    .default(""),
  duration: z
    .enum([
      "",
      "2 hours",
      "4 hours",
      "6 hours",
      "8 hours",
      "Full day",
      "To be discussed",
    ])
    .optional()
    .default(""),
  airportDirection: z
    .enum(["", "Airport pickup", "Airport drop", "Airport round trip"])
    .optional()
    .default(""),
  flightNumber: z.string().trim().max(16).optional().default(""),
  terminal: z.string().trim().max(24).optional().default(""),
  passengers: z.coerce.number().int().min(1).max(12).optional(),
  notes: z.string().trim().max(350).optional().default(""),
  sourcePath: z
    .string()
    .trim()
    .regex(/^\/(?!\/)[a-z0-9\-/]*$/i)
    .max(200)
    .optional()
    .default("/"),
});
router.post("/", async (req, res, next) => {
  try {
    const parsed = inquirySchema.safeParse(req.body);
    if (!parsed.success) {
      res
        .status(400)
        .json({
          ok: false,
          message: "Please check the enquiry details.",
          errors: parsed.error.flatten().fieldErrors,
        });
      return;
    }
    const data = parsed.data;
    if (
      data.serviceType !== "Corporate" &&
      (!/^\d{4}-\d{2}-\d{2}$/.test(data.pickupDate) ||
        !isCalendarDate(data.pickupDate))
    ) {
      res
        .status(400)
        .json({ ok: false, message: "Enter a valid pickup date." });
      return;
    }
    if (
      data.serviceType !== "Corporate" &&
      !/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(data.pickupTime)
    ) {
      res
        .status(400)
        .json({ ok: false, message: "Enter a valid pickup time." });
      return;
    }
    if (data.pickupDate && data.pickupDate < todayInIndia()) {
      res
        .status(400)
        .json({ ok: false, message: "Pickup date cannot be in the past." });
      return;
    }
    if (data.serviceType === "Outstation" && data.journeyType === "") {
      res
        .status(400)
        .json({
          ok: false,
          message: "Choose a one-way or round-trip outstation journey.",
        });
      return;
    }
    if (
      data.serviceType === "Outstation" &&
      data.journeyType === "Round Trip" &&
      (!data.returnDate || !data.returnTime)
    ) {
      res
        .status(400)
        .json({ ok: false, message: "Choose a return date and time." });
      return;
    }
    if (data.returnDate && data.returnDate < data.pickupDate) {
      res
        .status(400)
        .json({
          ok: false,
          message: "Return date must be on or after the pickup date.",
        });
      return;
    }
    if (data.serviceType === "Hourly" && !data.duration) {
      res.status(400).json({ ok: false, message: "Choose an hourly package." });
      return;
    }
    if (mongoose.connection.readyState !== 1) {
      res
        .status(503)
        .json({
          ok: false,
          message: "Enquiry storage is unavailable. Please try again shortly.",
        });
      return;
    }
    const inquiry = await Inquiry.create(data);
    res
      .status(201)
      .json({
        ok: true,
        storage: "mongodb",
        database: mongoose.connection.name,
        message: "Enquiry saved.",
        id: inquiry.id,
      });
  } catch (error) {
    next(error);
  }
});
export default router;

