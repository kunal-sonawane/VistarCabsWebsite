import { Router, type Request } from "express";
import express from "express";
import mongoose from "mongoose";
import { z } from "zod";
import Inquiry from "../models/Inquiry";
import ContentPage from "../models/ContentPage";
import SeoOverride from "../models/SeoOverride";
import Testimonial from "../models/Testimonial";
import Customer from "../models/Customer";
import Driver from "../models/Driver";
import Vehicle from "../models/Vehicle";
import SiteSettings from "../models/SiteSettings";
import MediaAsset from "../models/MediaAsset";
import AuditEvent from "../models/AuditEvent";
import PageContentOverride from "../models/PageContentOverride";
import SiteCampaign from "../models/SiteCampaign";
import PageRevision from "../models/PageRevision";
import DutySlip from "../models/DutySlip";
import { authenticatedRole, requireAdmin, requireOwner } from "./admin";

const router = Router();
const phone = z
  .string()
  .trim()
  .min(8)
  .max(24)
  .regex(/^[0-9+()\-\s]+$/);
const safeUrl = z
  .string()
  .trim()
  .max(300)
  .refine(
    (value) => !value || /^https:\/\//i.test(value),
    "Use a secure https:// URL.",
  );
const section = z.object({
  heading: z.string().trim().min(2).max(140),
  body: z.string().trim().min(2).max(5000),
  imageId: z.string().trim().max(40).optional().default(""),
  imageAlt: z.string().trim().max(180).optional().default(""),
});
const faq = z.object({
  question: z.string().trim().min(5).max(240),
  answer: z.string().trim().min(5).max(2000),
});
const publishDate = z
  .string()
  .trim()
  .regex(/^$|^\d{4}-\d{2}-\d{2}$/)
  .default("");
const pageSchema = z
  .object({
    slug: z
      .string()
      .trim()
      .toLowerCase()
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
      .max(100),
    title: z.string().trim().min(3).max(120),
    metaTitle: z.string().trim().min(3).max(70),
    metaDescription: z.string().trim().min(30).max(320),
    h1: z.string().trim().min(3).max(140),
    intro: z.string().trim().min(10).max(2000),
    sections: z.array(section).max(12).default([]),
    faqs: z.array(faq).max(20).default([]),
    heroImageId: z.string().trim().max(40).default(""),
    heroImageAlt: z.string().trim().max(180).default(""),
    canonicalPath: z.string().trim().max(200).default(""),
    noindex: z.boolean().default(true),
    status: z
      .enum(["draft", "scheduled", "published", "archived"])
      .default("draft"),
    publishAt: publishDate,
  })
  .strict()
  .superRefine((value, ctx) => {
    if (
      value.status === "scheduled" &&
      (!value.publishAt ||
        new Date(`${value.publishAt}T00:00:00+05:30`).getTime() <= Date.now())
    )
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Choose a future publication date.",
        path: ["publishAt"],
      });
  });
const seoSchema = z
  .object({
    path: z
      .string()
      .trim()
      .regex(/^\/(?!\/)[a-z0-9\-/]*$/)
      .max(200),
    title: z.string().trim().min(3).max(70),
    description: z.string().trim().min(30).max(320),
    canonicalPath: z.string().trim().max(200).default(""),
    noindex: z.boolean().default(false),
    focusPhrase: z.string().trim().max(100).default(""),
  })
  .strict();
const reviewSchema = z
  .object({
    customerName: z.string().trim().min(2).max(100),
    quote: z.string().trim().min(15).max(1200),
    rating: z.number().int().min(1).max(5),
    tripLabel: z.string().trim().max(120).default(""),
    consentConfirmed: z
      .boolean()
      .refine(Boolean, "Confirm that the customer approved this review."),
    status: z.enum(["draft", "published", "archived"]).default("draft"),
  })
  .strict();
const customerSchema = z
  .object({
    name: z.string().trim().min(2).max(100),
    phone,
    notes: z.string().trim().max(1000).default(""),
    tags: z.array(z.string().trim().min(1).max(32)).max(20).default([]),
    marketingConsent: z.boolean().default(false),
  })
  .strict();
const dutySlipSchema = z.object({
  companyName: z.string().trim().min(2).max(160),
  guestName: z.string().trim().min(2).max(100),
  guestPhone: phone,
  coordinatorName: z.string().trim().max(100).default(""),
  coordinatorPhone: z.string().trim().max(24).default(""),
  dutyDate: z.string().trim().min(8).max(10),
  pickupTime: z.string().trim().min(3).max(10),
  pickupAddress: z.string().trim().min(3).max(300),
  dropAddress: z.string().trim().min(3).max(300),
  travelRouting: z.string().trim().max(1000).default(""),
  tripType: z.string().trim().max(60).default("Corporate"),
  driverName: z.string().trim().max(100).default(""),
  driverPhone: z.string().trim().max(24).default(""),
  vehicleNumber: z.string().trim().max(24).default(""),
  vehicleType: z.string().trim().max(80).default(""),
  startKm: z.string().trim().max(20).default(""),
  endKm: z.string().trim().max(20).default(""),
  actualStartTime: z.string().trim().max(10).default(""),
  actualEndTime: z.string().trim().max(10).default(""),
  tollAmount: z.number().min(0).max(1000000).default(0),
  parkingAmount: z.number().min(0).max(1000000).default(0),
  tripAmount: z.number().min(0).max(10000000).default(0),
  paymentTerms: z.string().trim().max(500).default(""),
  tripRemarks: z.string().trim().max(1000).default(""),
  status: z.enum(["prepared", "completed", "submitted", "approved", "cancelled"]).default("prepared"),
}).strict();
const driverSchema = z
  .object({
    name: z.string().trim().min(2).max(100),
    phone,
    homeCity: z.string().trim().max(100).default("Nashik"),
    vehicleId: z.string().trim().max(40).default(""),
    status: z.enum(["available", "assigned", "inactive"]).default("available"),
    internalNotes: z.string().trim().max(1000).default(""),
  })
  .strict();
const vehicleSchema = z
  .object({
    label: z.string().trim().min(2).max(100),
    make: z.string().trim().max(80).default(""),
    model: z.string().trim().max(80).default(""),
    category: z.enum([
      "Hatchback",
      "Sedan",
      "SUV",
      "MPV",
      "Tempo traveller",
      "Other",
    ]),
    seats: z.number().int().min(1).max(30),
    luggage: z.number().int().min(0).max(30).default(0),
    registration: z.string().trim().max(24).default(""),
    homeCity: z.string().trim().max(100).default("Nashik"),
    status: z.enum(["active", "maintenance", "inactive"]).default("active"),
    imageId: z.string().trim().max(40).default(""),
    imageAlt: z.string().trim().max(180).default(""),
  })
  .strict();
const settingsSchema = z
  .object({
    primaryPhone: phone,
    secondaryPhone: phone,
    whatsappNumber: z
      .string()
      .trim()
      .min(8)
      .max(24)
      .regex(/^[0-9]+$/),
    email: z
      .string()
      .trim()
      .max(160)
      .refine((value) => !value || z.string().email().safeParse(value).success),
    instagramUrl: safeUrl,
    facebookUrl: safeUrl,
    youtubeUrl: safeUrl,
    linkedinUrl: safeUrl,
    operatingHours: z.string().trim().max(160),
    coverageSummary: z.string().trim().min(10).max(300),
  })
  .strict();
const safePath = z
  .string()
  .trim()
  .regex(/^\/(?!\/)[a-z0-9\-/]*$/i)
  .max(200)
  .refine(
    (path) =>
      !path.startsWith("/api") &&
      !path.startsWith("/admin") &&
      !path.startsWith("/pages/"),
    "Choose an existing public website page.",
  );
const managedPageSchema = z
  .object({
    path: safePath,
    label: z.string().trim().min(2).max(120),
    mode: z.enum(["append", "replace"]),
    eyebrow: z.string().trim().max(100).default(""),
    h1: z.string().trim().max(140).default(""),
    intro: z.string().trim().max(2000).default(""),
    heroImageId: z.string().trim().max(40).default(""),
    heroImageAlt: z.string().trim().max(180).default(""),
    sections: z
      .array(
        z.object({
          heading: z.string().trim().min(2).max(140),
          body: z.string().trim().min(2).max(5000),
          imageId: z.string().trim().max(40).default(""),
          imageAlt: z.string().trim().max(180).default(""),
          linkLabel: z.string().trim().max(80).default(""),
          linkUrl: z
            .string()
            .trim()
            .max(300)
            .refine(
              (value) =>
                !value ||
                (value.startsWith("/") && !value.startsWith("//")) ||
                /^https:\/\//i.test(value),
              "Use a website path or secure https link.",
            )
            .default(""),
        }),
      )
      .max(16)
      .default([]),
    faqs: z.array(faq).max(24).default([]),
    status: z
      .enum(["draft", "scheduled", "published", "archived"])
      .default("draft"),
    publishAt: publishDate,
  })
  .strict()
  .superRefine((value, ctx) => {
    if (
      value.mode === "replace" &&
      (value.h1.length < 3 || value.intro.length < 10)
    )
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Replacement pages need a heading and introduction.",
        path: ["h1"],
      });
    if (
      value.status === "scheduled" &&
      (!value.publishAt ||
        new Date(`${value.publishAt}T00:00:00+05:30`).getTime() <= Date.now())
    )
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Choose a future publication date.",
        path: ["publishAt"],
      });
  });
const campaignSchema = z
  .object({
    title: z.string().trim().min(2).max(100),
    headline: z.string().trim().min(3).max(140),
    body: z.string().trim().min(8).max(500),
    ctaLabel: z.string().trim().min(2).max(50),
    ctaUrl: z
      .string()
      .trim()
      .min(1)
      .max(300)
      .refine(
        (value) =>
          (value.startsWith("/") && !value.startsWith("//")) ||
          /^https:\/\//i.test(value),
        "Use a website path or secure https link.",
      ),
    imageId: z.string().trim().max(40).default(""),
    imageAlt: z.string().trim().max(180).default(""),
    startsOn: z
      .string()
      .trim()
      .regex(/^$|^\d{4}-\d{2}-\d{2}$/)
      .default(""),
    endsOn: z
      .string()
      .trim()
      .regex(/^$|^\d{4}-\d{2}-\d{2}$/)
      .default(""),
    placement: z.enum(["homepage"]).default("homepage"),
    status: z.enum(["draft", "active", "paused", "archived"]).default("draft"),
    priority: z.number().int().min(0).max(100).default(0),
  })
  .strict()
  .superRefine((value, ctx) => {
    if (value.startsOn && value.endsOn && value.endsOn < value.startsOn)
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "End date must be on or after the start date.",
        path: ["endsOn"],
      });
  });

function role(req: Request) {
  return authenticatedRole(req) || "owner";
}
function actor(req: Request) {
  return role(req) === "seo" ? "SEO editor" : "Owner";
}
function audit(
  req: Request,
  action: string,
  entity: string,
  entityId = "",
  summary = "",
) {
  void AuditEvent.create({
    actor: actor(req),
    role: role(req),
    action,
    entity,
    entityId,
    summary,
  }).catch((error) => console.error("Admin audit write failed:", error));
}
function idOr404(id: string, res: any) {
  if (!mongoose.isValidObjectId(id)) {
    res.status(404).json({ ok: false, message: "Record not found." });
    return false;
  }
  return true;
}
function duplicateSafe(error: any, res: any) {
  if (error?.code === 11000) {
    res
      .status(409)
      .json({
        ok: false,
        message: "A record with this slug, path or phone already exists.",
      });
    return true;
  }
  return false;
}

router.get("/overview", requireAdmin, async (_req, res, next) => {
  try {
    const [
      inquiries,
      newInquiries,
      pages,
      publishedPages,
      reviews,
      customers,
      drivers,
      vehicles,
      managedPages,
      activeManagedPages,
      campaigns,
      activeCampaigns,
    ] = await Promise.all([
      Inquiry.countDocuments(),
      Inquiry.countDocuments({ status: "new" }),
      ContentPage.countDocuments(),
      ContentPage.countDocuments({ status: "published" }),
      Testimonial.countDocuments({ status: "published" }),
      Customer.countDocuments(),
      Driver.countDocuments({ status: { $ne: "inactive" } }),
      Vehicle.countDocuments({ status: { $ne: "inactive" } }),
      PageContentOverride.countDocuments(),
      PageContentOverride.countDocuments({ status: "published" }),
      SiteCampaign.countDocuments(),
      SiteCampaign.countDocuments({ status: "active" }),
    ]);
    res.json({
      ok: true,
      storage: "mongodb",
      counts: {
        inquiries,
        newInquiries,
        pages,
        publishedPages,
        reviews,
        customers,
        drivers,
        vehicles,
        managedPages,
        activeManagedPages,
        campaigns,
        activeCampaigns,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/analytics", requireAdmin, async (req, res, next) => {
  try {
    const days = req.query.days === "90" ? 90 : 30;
    const from = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    const previousFrom = new Date(from.getTime() - days * 24 * 60 * 60 * 1000);
    const [
      currentTotal,
      previousTotal,
      daily,
      services,
      statuses,
      topPages,
      customerActivity,
    ] = await Promise.all([
      Inquiry.countDocuments({ createdAt: { $gte: from } }),
      Inquiry.countDocuments({ createdAt: { $gte: previousFrom, $lt: from } }),
      Inquiry.aggregate([
        { $match: { createdAt: { $gte: from } } },
        {
          $group: {
            _id: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$createdAt",
                timezone: "Asia/Kolkata",
              },
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]),
      Inquiry.aggregate([
        { $match: { createdAt: { $gte: from } } },
        { $group: { _id: "$serviceType", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
      Inquiry.aggregate([
        { $match: { createdAt: { $gte: from } } },
        { $group: { _id: "$status", count: { $sum: 1 } } },
      ]),
      Inquiry.aggregate([
        { $match: { createdAt: { $gte: from } } },
        { $group: { _id: "$sourcePath", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 8 },
      ]),
      Inquiry.aggregate([
        { $match: { createdAt: { $gte: from } } },
        { $group: { _id: "$phone", inquiries: { $sum: 1 } } },
        {
          $group: {
            _id: null,
            uniqueCustomers: { $sum: 1 },
            repeatCustomers: {
              $sum: { $cond: [{ $gte: ["$inquiries", 2] }, 1, 0] },
            },
          },
        },
      ]),
    ]);
    res.json({
      ok: true,
      days,
      currentTotal,
      previousTotal,
      change: previousTotal
        ? Math.round(((currentTotal - previousTotal) / previousTotal) * 100)
        : null,
      uniqueCustomers: customerActivity[0]?.uniqueCustomers || 0,
      repeatCustomers: customerActivity[0]?.repeatCustomers || 0,
      daily,
      services,
      statuses,
      topPages,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/page-content", requireAdmin, async (_req, res, next) => {
  try {
    res.json({
      ok: true,
      items: await PageContentOverride.find().sort({ updatedAt: -1 }).lean(),
    });
  } catch (error) {
    next(error);
  }
});
router.put("/page-content", requireAdmin, async (req, res, next) => {
  try {
    const parsed = managedPageSchema.safeParse(req.body);
    if (!parsed.success) {
      res
        .status(400)
        .json({
          ok: false,
          message: "Check the page content and field limits.",
          errors: parsed.error.flatten().fieldErrors,
        });
      return;
    }
    const previous = await PageContentOverride.findOne({
      path: parsed.data.path,
    });
    if (previous)
      await PageRevision.create({
        kind: "existing-page",
        reference: parsed.data.path,
        entityId: String(previous.id),
        snapshot: previous.toObject(),
        actor: actor(req),
        role: role(req),
      });
    const publishAt = parsed.data.publishAt
      ? new Date(`${parsed.data.publishAt}T00:00:00+05:30`)
      : null;
    const row = await PageContentOverride.findOneAndUpdate(
      { path: parsed.data.path },
      {
        ...parsed.data,
        publishAt,
        updatedBy: actor(req),
        publishedAt:
          parsed.data.status === "published" ? new Date() : publishAt,
      },
      {
        upsert: true,
        new: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      },
    );
    audit(
      req,
      "upsert",
      "existing-page-content",
      String(row.id),
      `${row.path} · ${row.status}`,
    );
    res.json({ ok: true, item: row });
  } catch (error) {
    if (duplicateSafe(error, res)) return;
    next(error);
  }
});
router.delete("/page-content/:id", requireAdmin, async (req, res, next) => {
  try {
    if (!idOr404(req.params.id, res)) return;
    const row = await PageContentOverride.findByIdAndDelete(req.params.id);
    if (!row) {
      res
        .status(404)
        .json({ ok: false, message: "Page content record not found." });
      return;
    }
    audit(
      req,
      "restore-default",
      "existing-page-content",
      String(row.id),
      row.path,
    );
    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
});

router.get("/page-revisions", requireAdmin, async (req, res, next) => {
  try {
    const kind = req.query.kind === "cms-page" ? "cms-page" : "existing-page";
    const reference =
      typeof req.query.reference === "string" ? req.query.reference.trim() : "";
    if (!reference || reference.length > 200) {
      res
        .status(400)
        .json({ ok: false, message: "Choose a valid page reference." });
      return;
    }
    const items = await PageRevision.find({ kind, reference })
      .select("-snapshot")
      .sort({ createdAt: -1 })
      .limit(30)
      .lean();
    res.json({ ok: true, items });
  } catch (error) {
    next(error);
  }
});
router.post(
  "/page-revisions/:id/restore",
  requireAdmin,
  async (req, res, next) => {
    try {
      if (!idOr404(req.params.id, res)) return;
      const revision = await PageRevision.findById(req.params.id);
      if (!revision) {
        res
          .status(404)
          .json({ ok: false, message: "Page revision not found." });
        return;
      }
      if (revision.kind === "existing-page") {
        const snapshot = revision.snapshot as Record<string, unknown>;
        const { _id, createdAt, updatedAt, ...data } = snapshot;
        const current = await PageContentOverride.findOne({
          path: revision.reference,
        });
        if (current)
          await PageRevision.create({
            kind: "existing-page",
            reference: revision.reference,
            entityId: String(current.id),
            snapshot: current.toObject(),
            actor: actor(req),
            role: role(req),
          });
        const restored = await PageContentOverride.findOneAndUpdate(
          { path: revision.reference },
          { ...data, updatedBy: actor(req) },
          {
            upsert: true,
            new: true,
            runValidators: true,
            setDefaultsOnInsert: true,
          },
        );
        audit(
          req,
          "restore",
          "existing-page-content",
          String(restored.id),
          revision.reference,
        );
        res.json({ ok: true, item: restored });
        return;
      }
      const snapshot = revision.snapshot as Record<string, unknown>;
      const { _id, createdAt, updatedAt, ...data } = snapshot;
      const current = await ContentPage.findById(revision.reference);
      if (current)
        await PageRevision.create({
          kind: "cms-page",
          reference: revision.reference,
          entityId: String(current.id),
          snapshot: current.toObject(),
          actor: actor(req),
          role: role(req),
        });
      const restored = await ContentPage.findByIdAndUpdate(
        revision.reference,
        { ...data, updatedBy: actor(req) },
        { new: true, runValidators: true },
      );
      if (!restored) {
        res
          .status(404)
          .json({
            ok: false,
            message:
              "The page was removed; it cannot be restored from this revision.",
          });
        return;
      }
      audit(
        req,
        "restore",
        "content-page",
        String(restored.id),
        String(restored.slug),
      );
      res.json({ ok: true, item: restored });
    } catch (error) {
      next(error);
    }
  },
);

router.get("/campaigns", requireAdmin, async (_req, res, next) => {
  try {
    res.json({
      ok: true,
      items: await SiteCampaign.find()
        .sort({ updatedAt: -1 })
        .limit(300)
        .lean(),
    });
  } catch (error) {
    next(error);
  }
});
router.post("/campaigns", requireAdmin, async (req, res, next) => {
  try {
    const parsed = campaignSchema.safeParse(req.body);
    if (!parsed.success) {
      res
        .status(400)
        .json({
          ok: false,
          message: "Check the campaign fields and dates.",
          errors: parsed.error.flatten().fieldErrors,
        });
      return;
    }
    const row = await SiteCampaign.create({
      ...parsed.data,
      updatedBy: actor(req),
    });
    audit(
      req,
      "create",
      "site-campaign",
      String(row.id),
      `${row.title} · ${row.status}`,
    );
    res.status(201).json({ ok: true, item: row });
  } catch (error) {
    next(error);
  }
});
router.put("/campaigns/:id", requireAdmin, async (req, res, next) => {
  try {
    if (!idOr404(req.params.id, res)) return;
    const parsed = campaignSchema.safeParse(req.body);
    if (!parsed.success) {
      res
        .status(400)
        .json({
          ok: false,
          message: "Check the campaign fields and dates.",
          errors: parsed.error.flatten().fieldErrors,
        });
      return;
    }
    const row = await SiteCampaign.findByIdAndUpdate(
      req.params.id,
      { ...parsed.data, updatedBy: actor(req) },
      { new: true, runValidators: true },
    );
    if (!row) {
      res.status(404).json({ ok: false, message: "Campaign not found." });
      return;
    }
    audit(
      req,
      "update",
      "site-campaign",
      String(row.id),
      `${row.title} · ${row.status}`,
    );
    res.json({ ok: true, item: row });
  } catch (error) {
    next(error);
  }
});
router.delete("/campaigns/:id", requireAdmin, async (req, res, next) => {
  try {
    if (!idOr404(req.params.id, res)) return;
    const row = await SiteCampaign.findByIdAndUpdate(
      req.params.id,
      { status: "archived", updatedBy: actor(req) },
      { new: true },
    );
    if (!row) {
      res.status(404).json({ ok: false, message: "Campaign not found." });
      return;
    }
    audit(req, "archive", "site-campaign", String(row.id), row.title);
    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
});

router.get("/pages", requireAdmin, async (_req, res, next) => {
  try {
    res.json({
      ok: true,
      items: await ContentPage.find()
        .select("-__v")
        .sort({ updatedAt: -1 })
        .limit(500)
        .lean(),
    });
  } catch (error) {
    next(error);
  }
});
router.post("/pages", requireAdmin, async (req, res, next) => {
  try {
    const parsed = pageSchema.safeParse(req.body);
    if (!parsed.success) {
      res
        .status(400)
        .json({
          ok: false,
          message: "Check the page fields and limits.",
          errors: parsed.error.flatten().fieldErrors,
        });
      return;
    }
    const publishAt = parsed.data.publishAt
      ? new Date(`${parsed.data.publishAt}T00:00:00+05:30`)
      : null;
    const row = await ContentPage.create({
      ...parsed.data,
      publishAt,
      publishedAt: parsed.data.status === "published" ? new Date() : publishAt,
      updatedBy: actor(req),
    });
    audit(req, "create", "content-page", String(row.id), row.slug);
    res.status(201).json({ ok: true, item: row });
  } catch (error) {
    if (duplicateSafe(error, res)) return;
    next(error);
  }
});
router.put("/pages/:id", requireAdmin, async (req, res, next) => {
  try {
    if (!idOr404(req.params.id, res)) return;
    const parsed = pageSchema.safeParse(req.body);
    if (!parsed.success) {
      res
        .status(400)
        .json({
          ok: false,
          message: "Check the page fields and limits.",
          errors: parsed.error.flatten().fieldErrors,
        });
      return;
    }
    const previous = await ContentPage.findById(req.params.id);
    if (!previous) {
      res.status(404).json({ ok: false, message: "Page not found." });
      return;
    }
    if (parsed.data.slug !== previous.slug) {
      res
        .status(400)
        .json({
          ok: false,
          message:
            "This page URL is fixed. Create a separate page for a new URL.",
        });
      return;
    }
    await PageRevision.create({
      kind: "cms-page",
      reference: String(previous.id),
      entityId: String(previous.id),
      snapshot: previous.toObject(),
      actor: actor(req),
      role: role(req),
    });
    const publishAt = parsed.data.publishAt
      ? new Date(`${parsed.data.publishAt}T00:00:00+05:30`)
      : null;
    const row = await ContentPage.findByIdAndUpdate(
      req.params.id,
      {
        ...parsed.data,
        publishAt,
        publishedAt:
          parsed.data.status === "published" ? new Date() : publishAt,
        updatedBy: actor(req),
      },
      { new: true, runValidators: true },
    );
    if (!row) {
      res.status(404).json({ ok: false, message: "Page not found." });
      return;
    }
    audit(req, "update", "content-page", String(row.id), row.slug);
    res.json({ ok: true, item: row });
  } catch (error) {
    if (duplicateSafe(error, res)) return;
    next(error);
  }
});

router.get("/seo", requireAdmin, async (_req, res, next) => {
  try {
    res.json({
      ok: true,
      items: await SeoOverride.find().sort({ path: 1 }).lean(),
    });
  } catch (error) {
    next(error);
  }
});
router.put("/seo", requireAdmin, async (req, res, next) => {
  try {
    const parsed = seoSchema.safeParse(req.body);
    if (!parsed.success) {
      res
        .status(400)
        .json({
          ok: false,
          message: "Check the SEO fields and limits.",
          errors: parsed.error.flatten().fieldErrors,
        });
      return;
    }
    const row = await SeoOverride.findOneAndUpdate(
      { path: parsed.data.path },
      { ...parsed.data, updatedBy: actor(req) },
      {
        upsert: true,
        new: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      },
    );
    audit(req, "upsert", "seo-override", String(row.id), row.path);
    res.json({ ok: true, item: row });
  } catch (error) {
    if (duplicateSafe(error, res)) return;
    next(error);
  }
});
router.delete("/seo/:id", requireAdmin, async (req, res, next) => {
  try {
    if (!idOr404(req.params.id, res)) return;
    const row = await SeoOverride.findByIdAndDelete(req.params.id);
    if (!row) {
      res.status(404).json({ ok: false, message: "SEO override not found." });
      return;
    }
    audit(req, "delete", "seo-override", String(row.id), row.path);
    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
});

router.get("/reviews", requireAdmin, async (_req, res, next) => {
  try {
    res.json({
      ok: true,
      items: await Testimonial.find().sort({ updatedAt: -1 }).limit(500).lean(),
    });
  } catch (error) {
    next(error);
  }
});
router.post("/reviews", requireAdmin, async (req, res, next) => {
  try {
    const parsed = reviewSchema.safeParse(req.body);
    if (!parsed.success) {
      res
        .status(400)
        .json({
          ok: false,
          message: "Confirm review consent and check the review fields.",
          errors: parsed.error.flatten().fieldErrors,
        });
      return;
    }
    const row = await Testimonial.create({
      ...parsed.data,
      publishedAt: parsed.data.status === "published" ? new Date() : null,
      updatedBy: actor(req),
    });
    audit(
      req,
      "create",
      "review",
      String(row.id),
      "Customer-approved feedback",
    );
    res.status(201).json({ ok: true, item: row });
  } catch (error) {
    next(error);
  }
});
router.put("/reviews/:id", requireAdmin, async (req, res, next) => {
  try {
    if (!idOr404(req.params.id, res)) return;
    const parsed = reviewSchema.safeParse(req.body);
    if (!parsed.success) {
      res
        .status(400)
        .json({
          ok: false,
          message: "Confirm review consent and check the review fields.",
          errors: parsed.error.flatten().fieldErrors,
        });
      return;
    }
    const row = await Testimonial.findByIdAndUpdate(
      req.params.id,
      {
        ...parsed.data,
        publishedAt: parsed.data.status === "published" ? new Date() : null,
        updatedBy: actor(req),
      },
      { new: true, runValidators: true },
    );
    if (!row) {
      res.status(404).json({ ok: false, message: "Review not found." });
      return;
    }
    audit(req, "update", "review", String(row.id), row.status);
    res.json({ ok: true, item: row });
  } catch (error) {
    next(error);
  }
});
router.delete("/reviews/:id", requireAdmin, async (req, res, next) => {
  try {
    if (!idOr404(req.params.id, res)) return;
    const row = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { status: "archived", updatedBy: actor(req) },
      { new: true, runValidators: true },
    );
    if (!row) {
      res.status(404).json({ ok: false, message: "Review not found." });
      return;
    }
    audit(req, "archive", "review", String(row.id), row.customerName);
    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
});

router.get("/customers", requireOwner, async (_req, res, next) => {
  try {
    const [profiles, leads] = await Promise.all([
      Customer.find().sort({ updatedAt: -1 }).limit(1000).lean(),
      Inquiry.aggregate([
        {
          $group: {
            _id: "$phone",
            name: { $last: "$name" },
            inquiryCount: { $sum: 1 },
            lastInquiryAt: { $max: "$createdAt" },
          },
        },
        { $sort: { lastInquiryAt: -1 } },
        { $limit: 1000 },
      ]),
    ]);
    const profileByPhone = new Map(
      profiles.map((item: any) => [item.phone, item]),
    );
    const items: any[] = leads.map((lead: any) => ({
      ...(profileByPhone.get(lead._id) || {}),
      name: profileByPhone.get(lead._id)?.name || lead.name || "Customer",
      phone: lead._id,
      inquiryCount: lead.inquiryCount,
      lastInquiryAt: lead.lastInquiryAt,
      source: "website enquiries",
    }));
    for (const profile of profiles)
      if (!leads.some((lead: any) => lead._id === profile.phone))
        items.push({ ...profile, inquiryCount: 0, source: "manual profile" });
    res.json({ ok: true, items });
  } catch (error) {
    next(error);
  }
});
router.post("/customers", requireOwner, async (req, res, next) => {
  try {
    const parsed = customerSchema.safeParse(req.body);
    if (!parsed.success) {
      res
        .status(400)
        .json({
          ok: false,
          message: "Check the customer fields.",
          errors: parsed.error.flatten().fieldErrors,
        });
      return;
    }
    const row = await Customer.create(parsed.data);
    audit(req, "create", "customer", String(row.id), "Customer record");
    res.status(201).json({ ok: true, item: row });
  } catch (error) {
    if (duplicateSafe(error, res)) return;
    next(error);
  }
});
router.put("/customers/:id", requireOwner, async (req, res, next) => {
  try {
    if (!idOr404(req.params.id, res)) return;
    const parsed = customerSchema.safeParse(req.body);
    if (!parsed.success) {
      res
        .status(400)
        .json({
          ok: false,
          message: "Check the customer fields.",
          errors: parsed.error.flatten().fieldErrors,
        });
      return;
    }
    const row = await Customer.findByIdAndUpdate(req.params.id, parsed.data, {
      new: true,
      runValidators: true,
    });
    if (!row) {
      res.status(404).json({ ok: false, message: "Customer not found." });
      return;
    }
    audit(req, "update", "customer", String(row.id), "Customer record");
    res.json({ ok: true, item: row });
  } catch (error) {
    if (duplicateSafe(error, res)) return;
    next(error);
  }
});

router.get("/duty-slips", requireOwner, async (_req, res, next) => {
  try {
    const items = await DutySlip.find().sort({ createdAt: -1 }).limit(500).lean();
    res.json({ ok: true, items });
  } catch (error) {
    next(error);
  }
});
router.post("/duty-slips", requireOwner, async (req, res, next) => {
  try {
    const parsed = dutySlipSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({
        ok: false,
        message: "Check the corporate trip fields.",
        errors: parsed.error.flatten().fieldErrors,
      });
      return;
    }
    const dateCode = new Date().toISOString().slice(0, 10).replaceAll("-", "");
    const slipNumber = `VC-${dateCode}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
    const row = await DutySlip.create({ ...parsed.data, slipNumber });
    audit(req, "create", "duty-slip", String(row.id), slipNumber);
    res.status(201).json({ ok: true, item: row });
  } catch (error) {
    next(error);
  }
});
router.put("/duty-slips/:id", requireOwner, async (req, res, next) => {
  try {
    if (!idOr404(req.params.id, res)) return;
    const parsed = dutySlipSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ ok: false, message: "Check the duty slip fields.", errors: parsed.error.flatten().fieldErrors });
      return;
    }
    const row = await DutySlip.findByIdAndUpdate(req.params.id, parsed.data, { new: true, runValidators: true });
    if (!row) {
      res.status(404).json({ ok: false, message: "Duty slip not found." });
      return;
    }
    audit(req, "update", "duty-slip", String(row.id), row.slipNumber);
    res.json({ ok: true, item: row });
  } catch (error) {
    next(error);
  }
});

router.get("/drivers", requireOwner, async (_req, res, next) => {
  try {
    res.json({
      ok: true,
      items: await Driver.find()
        .populate("vehicleId", "label category")
        .sort({ updatedAt: -1 })
        .limit(500)
        .lean(),
    });
  } catch (error) {
    next(error);
  }
});
router.post("/drivers", requireOwner, async (req, res, next) => {
  try {
    const parsed = driverSchema.safeParse(req.body);
    if (!parsed.success) {
      res
        .status(400)
        .json({
          ok: false,
          message: "Check the driver fields.",
          errors: parsed.error.flatten().fieldErrors,
        });
      return;
    }
    const row = await Driver.create({
      ...parsed.data,
      vehicleId: parsed.data.vehicleId || null,
    });
    audit(req, "create", "driver", String(row.id), "Driver record");
    res.status(201).json({ ok: true, item: row });
  } catch (error) {
    next(error);
  }
});
router.put("/drivers/:id", requireOwner, async (req, res, next) => {
  try {
    if (!idOr404(req.params.id, res)) return;
    const parsed = driverSchema.safeParse(req.body);
    if (!parsed.success) {
      res
        .status(400)
        .json({
          ok: false,
          message: "Check the driver fields.",
          errors: parsed.error.flatten().fieldErrors,
        });
      return;
    }
    const row = await Driver.findByIdAndUpdate(
      req.params.id,
      { ...parsed.data, vehicleId: parsed.data.vehicleId || null },
      { new: true, runValidators: true },
    );
    if (!row) {
      res.status(404).json({ ok: false, message: "Driver not found." });
      return;
    }
    audit(req, "update", "driver", String(row.id), row.status);
    res.json({ ok: true, item: row });
  } catch (error) {
    next(error);
  }
});

router.get("/vehicles", requireOwner, async (_req, res, next) => {
  try {
    res.json({
      ok: true,
      items: await Vehicle.find().sort({ updatedAt: -1 }).limit(500).lean(),
    });
  } catch (error) {
    next(error);
  }
});
router.post("/vehicles", requireOwner, async (req, res, next) => {
  try {
    const parsed = vehicleSchema.safeParse(req.body);
    if (!parsed.success) {
      res
        .status(400)
        .json({
          ok: false,
          message: "Check the vehicle fields.",
          errors: parsed.error.flatten().fieldErrors,
        });
      return;
    }
    const row = await Vehicle.create(parsed.data);
    audit(req, "create", "vehicle", String(row.id), row.label);
    res.status(201).json({ ok: true, item: row });
  } catch (error) {
    next(error);
  }
});
router.put("/vehicles/:id", requireOwner, async (req, res, next) => {
  try {
    if (!idOr404(req.params.id, res)) return;
    const parsed = vehicleSchema.safeParse(req.body);
    if (!parsed.success) {
      res
        .status(400)
        .json({
          ok: false,
          message: "Check the vehicle fields.",
          errors: parsed.error.flatten().fieldErrors,
        });
      return;
    }
    const row = await Vehicle.findByIdAndUpdate(req.params.id, parsed.data, {
      new: true,
      runValidators: true,
    });
    if (!row) {
      res.status(404).json({ ok: false, message: "Vehicle not found." });
      return;
    }
    audit(req, "update", "vehicle", String(row.id), row.label);
    res.json({ ok: true, item: row });
  } catch (error) {
    next(error);
  }
});

router.get("/settings", requireAdmin, async (_req, res, next) => {
  try {
    const row = await SiteSettings.findOne({ key: "primary" }).lean();
    res.json({
      ok: true,
      item: row || {
        brandName: "Vistar Cabs",
        primaryPhone: "8485884417",
        secondaryPhone: "8788373586",
        whatsappNumber: "918767613575",
        email: "",
        instagramUrl: "",
        facebookUrl: "",
        youtubeUrl: "",
        linkedinUrl: "",
        operatingHours: "",
        coverageSummary: "Nashik rooted. Maharashtra connected.",
      },
    });
  } catch (error) {
    next(error);
  }
});
router.put("/settings", requireAdmin, async (req, res, next) => {
  try {
    const parsed = settingsSchema.safeParse(req.body);
    if (!parsed.success) {
      res
        .status(400)
        .json({
          ok: false,
          message: "Check site settings and URL fields.",
          errors: parsed.error.flatten().fieldErrors,
        });
      return;
    }
    const row = await SiteSettings.findOneAndUpdate(
      { key: "primary" },
      { ...parsed.data, brandName: "Vistar Cabs", updatedBy: actor(req) },
      {
        upsert: true,
        new: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      },
    );
    audit(
      req,
      "update",
      "site-settings",
      String(row.id),
      "Contact and public settings",
    );
    res.json({ ok: true, item: row });
  } catch (error) {
    next(error);
  }
});

router.get("/audit", requireOwner, async (_req, res, next) => {
  try {
    res.json({
      ok: true,
      items: await AuditEvent.find().sort({ createdAt: -1 }).limit(300).lean(),
    });
  } catch (error) {
    next(error);
  }
});

router.get("/media", requireAdmin, async (_req, res, next) => {
  try {
    const items = await MediaAsset.find()
      .select("-data")
      .sort({ createdAt: -1 })
      .limit(500)
      .lean();
    res.json({
      ok: true,
      items: items.map((item) => ({
        ...item,
        id: String(item._id),
        url: `/api/public/media/${item._id}`,
      })),
    });
  } catch (error) {
    next(error);
  }
});
router.post(
  "/media/upload",
  requireAdmin,
  express.raw({ type: "application/octet-stream", limit: "4mb" }),
  async (req, res, next) => {
    try {
      if (!Buffer.isBuffer(req.body) || req.body.length < 16) {
        res
          .status(400)
          .json({ ok: false, message: "Choose a valid image under 4 MB." });
        return;
      }
      const data: Buffer = req.body;
      const isPng = data
        .subarray(0, 8)
        .equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
      const isJpeg = data[0] === 0xff && data[1] === 0xd8 && data[2] === 0xff;
      const isWebp =
        data.toString("ascii", 0, 4) === "RIFF" &&
        data.toString("ascii", 8, 12) === "WEBP";
      const mimeType = isPng
        ? "image/png"
        : isJpeg
          ? "image/jpeg"
          : isWebp
            ? "image/webp"
            : "";
      if (!mimeType) {
        res
          .status(415)
          .json({
            ok: false,
            message: "Only real JPG, PNG or WebP image files are supported.",
          });
        return;
      }
      const alt =
        typeof req.query.alt === "string"
          ? req.query.alt.trim().slice(0, 180)
          : "";
      const filename =
        typeof req.query.filename === "string"
          ? req.query.filename.replace(/[^a-zA-Z0-9._-]/g, "-").slice(0, 160)
          : "vistar-image";
      if (alt.length < 3) {
        res
          .status(400)
          .json({
            ok: false,
            message: "Add descriptive alt text before uploading.",
          });
        return;
      }
      const row = await MediaAsset.create({
        filename,
        mimeType,
        size: data.length,
        alt,
        data,
        uploadedBy: actor(req),
      });
      audit(req, "upload", "media", String(row.id), filename);
      res
        .status(201)
        .json({
          ok: true,
          item: {
            id: String(row.id),
            filename,
            mimeType,
            size: data.length,
            alt,
            url: `/api/public/media/${row.id}`,
          },
        });
    } catch (error) {
      next(error);
    }
  },
);
router.delete("/media/:id", requireAdmin, async (req, res, next) => {
  try {
    if (!idOr404(req.params.id, res)) return;
    const imageId = req.params.id;
    const [pageUse, managedPageUse, campaignUse, vehicleUse] =
      await Promise.all([
        ContentPage.exists({
          $or: [{ heroImageId: imageId }, { "sections.imageId": imageId }],
        }),
        PageContentOverride.exists({
          $or: [{ heroImageId: imageId }, { "sections.imageId": imageId }],
        }),
        SiteCampaign.exists({ imageId, status: { $ne: "archived" } }),
        Vehicle.exists({ imageId }),
      ]);
    if (pageUse || managedPageUse || campaignUse || vehicleUse) {
      res
        .status(409)
        .json({
          ok: false,
          message:
            "This image is used by a page, campaign or vehicle. Remove it from that record before deleting the asset.",
        });
      return;
    }
    const row = await MediaAsset.findByIdAndDelete(imageId);
    if (!row) {
      res.status(404).json({ ok: false, message: "Image not found." });
      return;
    }
    audit(req, "delete", "media", String(row.id), row.filename);
    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
});

export default router;
