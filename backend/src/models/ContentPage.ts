import { Schema, model, models } from "mongoose";

const SectionSchema = new Schema(
  {
    heading: { type: String, required: true, trim: true, maxlength: 140 },
    body: { type: String, required: true, trim: true, maxlength: 5000 },
    imageId: { type: String, default: "", maxlength: 40 },
    imageAlt: { type: String, default: "", trim: true, maxlength: 180 },
  },
  { _id: false },
);

const FaqSchema = new Schema(
  {
    question: { type: String, required: true, trim: true, maxlength: 240 },
    answer: { type: String, required: true, trim: true, maxlength: 2000 },
  },
  { _id: false },
);

const ContentPageSchema = new Schema(
  {
    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      maxlength: 100,
    },
    title: { type: String, required: true, trim: true, maxlength: 120 },
    metaTitle: { type: String, required: true, trim: true, maxlength: 70 },
    metaDescription: {
      type: String,
      required: true,
      trim: true,
      maxlength: 320,
    },
    h1: { type: String, required: true, trim: true, maxlength: 140 },
    intro: { type: String, required: true, trim: true, maxlength: 2000 },
    sections: {
      type: [SectionSchema],
      default: [],
      validate: (items: unknown[]) => items.length <= 12,
    },
    faqs: {
      type: [FaqSchema],
      default: [],
      validate: (items: unknown[]) => items.length <= 20,
    },
    heroImageId: { type: String, default: "", maxlength: 40 },
    heroImageAlt: { type: String, default: "", trim: true, maxlength: 180 },
    canonicalPath: { type: String, default: "", trim: true, maxlength: 200 },
    noindex: { type: Boolean, default: true },
    status: {
      type: String,
      enum: ["draft", "scheduled", "published", "archived"],
      default: "draft",
    },
    publishAt: { type: Date, default: null },
    publishedAt: { type: Date, default: null },
    updatedBy: { type: String, default: "", maxlength: 80 },
  },
  { timestamps: true, versionKey: false },
);

ContentPageSchema.index({ slug: 1 }, { unique: true });
ContentPageSchema.index({ status: 1, updatedAt: -1 });
export default models.ContentPage || model("ContentPage", ContentPageSchema);
