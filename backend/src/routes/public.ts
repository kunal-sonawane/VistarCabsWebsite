import { Router } from "express";
import mongoose from "mongoose";
import ContentPage from "../models/ContentPage";
import SeoOverride from "../models/SeoOverride";
import Testimonial from "../models/Testimonial";
import SiteSettings from "../models/SiteSettings";
import MediaAsset from "../models/MediaAsset";
import PageContentOverride from "../models/PageContentOverride";
import SiteCampaign from "../models/SiteCampaign";

const router = Router();

router.get("/campaigns", async (req, res, next) => {
  try {
    const placement = req.query.placement === "homepage" ? "homepage" : "";
    if (!placement) {
      res
        .status(400)
        .json({ ok: false, message: "Choose a valid campaign placement." });
      return;
    }
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).formatToParts(new Date());
    const dateParts = Object.fromEntries(
      parts.map((part) => [part.type, part.value]),
    );
    const today = `${dateParts.year}-${dateParts.month}-${dateParts.day}`;
    const candidates = await SiteCampaign.find({ status: "active", placement })
      .select(
        "title headline body ctaLabel ctaUrl imageId imageAlt startsOn endsOn priority",
      )
      .sort({ priority: -1, updatedAt: -1 })
      .limit(30)
      .lean();
    const items = candidates
      .filter(
        (item) =>
          (!item.startsOn || item.startsOn <= today) &&
          (!item.endsOn || item.endsOn >= today),
      )
      .slice(0, 3);
    res.setHeader("Cache-Control", "no-store");
    res.json({ ok: true, items });
  } catch (error) {
    next(error);
  }
});

router.get("/page-content", async (req, res, next) => {
  try {
    const path = typeof req.query.path === "string" ? req.query.path : "";
    if (!/^\/(?!\/)[a-z0-9\-/]*$/i.test(path) || path.length > 200) {
      res
        .status(400)
        .json({ ok: false, message: "Provide a valid page path." });
      return;
    }
    const item = await PageContentOverride.findOne({
      path,
      $or: [
        { status: "published" },
        { status: "scheduled", publishAt: { $lte: new Date() } },
      ],
    })
      .select("-updatedBy -__v")
      .lean();
    res.setHeader("Cache-Control", "no-store");
    res.json({ ok: true, item: item || null });
  } catch (error) {
    next(error);
  }
});

router.get("/pages", async (_req, res, next) => {
  try {
    const items = await ContentPage.find({
      $or: [
        { status: "published" },
        { status: "scheduled", publishAt: { $lte: new Date() } },
      ],
    })
      .select(
        "slug title metaTitle metaDescription h1 intro heroImageId heroImageAlt canonicalPath noindex sections faqs status publishAt updatedAt",
      )
      .sort({ publishedAt: -1 })
      .lean();
    res.setHeader(
      "Cache-Control",
      "public, max-age=60, stale-while-revalidate=300",
    );
    res.json({ ok: true, items });
  } catch (error) {
    next(error);
  }
});

router.get("/pages/:slug", async (req, res, next) => {
  try {
    const row = await ContentPage.findOne({
      slug: req.params.slug.toLowerCase(),
      $or: [
        { status: "published" },
        { status: "scheduled", publishAt: { $lte: new Date() } },
      ],
    })
      .select("-updatedBy")
      .lean();
    if (!row) {
      res.status(404).json({ ok: false, message: "Published page not found." });
      return;
    }
    res.setHeader(
      "Cache-Control",
      "public, max-age=60, stale-while-revalidate=300",
    );
    res.json({ ok: true, item: row });
  } catch (error) {
    next(error);
  }
});

router.get("/seo", async (req, res, next) => {
  try {
    const path = typeof req.query.path === "string" ? req.query.path : "";
    if (!/^\/(?!\/)[a-z0-9\-/]*$/.test(path) || path.length > 200) {
      res
        .status(400)
        .json({ ok: false, message: "Provide a valid page path." });
      return;
    }
    const row = await SeoOverride.findOne({ path })
      .select("path title description canonicalPath noindex focusPhrase")
      .lean();
    res.setHeader(
      "Cache-Control",
      "public, max-age=60, stale-while-revalidate=300",
    );
    res.json({ ok: true, item: row || null });
  } catch (error) {
    next(error);
  }
});

router.get("/reviews", async (_req, res, next) => {
  try {
    const items = await Testimonial.find({
      status: "published",
      consentConfirmed: true,
    })
      .select("customerName quote rating tripLabel publishedAt")
      .sort({ publishedAt: -1 })
      .limit(30)
      .lean();
    res.setHeader(
      "Cache-Control",
      "public, max-age=60, stale-while-revalidate=300",
    );
    res.json({ ok: true, items });
  } catch (error) {
    next(error);
  }
});

router.get("/settings", async (_req, res, next) => {
  try {
    const row = await SiteSettings.findOne({ key: "primary" })
      .select(
        "brandName primaryPhone secondaryPhone whatsappNumber email instagramUrl facebookUrl youtubeUrl linkedinUrl operatingHours coverageSummary",
      )
      .lean();
    if (!row) {
      res.json({ ok: true, item: null });
      return;
    }
    res.setHeader(
      "Cache-Control",
      "public, max-age=60, stale-while-revalidate=300",
    );
    res.json({ ok: true, item: row });
  } catch (error) {
    next(error);
  }
});

router.get("/media/:id", async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      res.status(404).end();
      return;
    }
    const row: any = await MediaAsset.findById(req.params.id)
      .select("+data mimeType filename")
      .lean();
    if (!row) {
      res.status(404).end();
      return;
    }
    res.setHeader("Content-Type", row.mimeType);
    res.setHeader("Content-Length", String(row.size));
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    res.end(row.data);
  } catch (error) {
    next(error);
  }
});

export default router;
