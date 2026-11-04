import { Schema, model, models } from "mongoose";

const SectionSchema = new Schema(
  {
    heading: { type: String, required: true, trim: true, maxlength: 140 },
    body: { type: String, required: true, trim: true, maxlength: 5000 },
    imageId: { type: String, default: "", maxlength: 40 },
    imageAlt: { type: String, default: "", trim: true, maxlength: 180 },
    linkLabel: { type: String, default: "", trim: true, maxlength: 80 },
    linkUrl: { type: String, default: "", trim: true, maxlength: 300 },
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

const PageContentOverrideSchema = new Schema(
  {
    path: { type: String, required: true, trim: true, maxlength: 200 },
    label: { type: String, required: true, trim: true, maxlength: 120 },
    mode: { type: String, enum: ["append", "replace"], default: "append" },
    eyebrow: { type: String, default: "", trim: true, maxlength: 100 },
    h1: { type: String, default: "", trim: true, maxlength: 140 },
    intro: { type: String, default: "", trim: true, maxlength: 2000 },
    heroImageId: { type: String, default: "", maxlength: 40 },
    heroImageAlt: { type: String, default: "", trim: true, maxlength: 180 },
    sections: {
      type: [SectionSchema],
      default: [],
      validate: (items: unknown[]) => items.length <= 16,
    },
    faqs: {
      type: [FaqSchema],
      default: [],
      validate: (items: unknown[]) => items.length <= 24,
    },
    status: {
      type: String,
      enum: ["draft", "scheduled", "published", "archived"],
      default: "draft",
    },
    publishAt: { type: Date, default: null },
    updatedBy: { type: String, default: "", maxlength: 80 },
    publishedAt: { type: Date, default: null },
  },
  { timestamps: true, versionKey: false },
);

PageContentOverrideSchema.index({ path: 1 }, { unique: true });
PageContentOverrideSchema.index({ status: 1, updatedAt: -1 });
export default models.PageContentOverride ||
  model("PageContentOverride", PageContentOverrideSchema);
