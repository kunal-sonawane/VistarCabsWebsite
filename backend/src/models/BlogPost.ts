import { Schema, model, models } from "mongoose";

const BlogSectionSchema = new Schema({
  heading: { type: String, required: true, trim: true, maxlength: 140 },
  paragraphs: { type: [String], default: [], validate: (items: string[]) => items.length <= 10 },
}, { _id: false });
const BlogFaqSchema = new Schema({
  question: { type: String, required: true, trim: true, maxlength: 240 },
  answer: { type: String, required: true, trim: true, maxlength: 2000 },
}, { _id: false });
const BlogPostSchema = new Schema({
  slug: { type: String, required: true, trim: true, lowercase: true, match: /^[a-z0-9]+(?:-[a-z0-9]+)*$/, maxlength: 120 },
  title: { type: String, required: true, trim: true, maxlength: 140 },
  summary: { type: String, required: true, trim: true, maxlength: 500 },
  metaTitle: { type: String, required: true, trim: true, maxlength: 70 },
  metaDescription: { type: String, required: true, trim: true, maxlength: 320 },
  image: { type: String, default: "/images/blogs.jpg", trim: true, maxlength: 300 },
  imageAlt: { type: String, required: true, trim: true, maxlength: 180 },
  publishedLabel: { type: String, default: "Vistar Cabs · travel guide", trim: true, maxlength: 80 },
  sections: { type: [BlogSectionSchema], default: [], validate: (items: unknown[]) => items.length <= 20 },
  faqs: { type: [BlogFaqSchema], default: [], validate: (items: unknown[]) => items.length <= 20 },
  status: { type: String, enum: ["draft", "published", "archived"], default: "draft" },
  publishedAt: { type: Date, default: null },
  updatedBy: { type: String, default: "", maxlength: 80 },
}, { timestamps: true, versionKey: false });
BlogPostSchema.index({ slug: 1 }, { unique: true });
BlogPostSchema.index({ status: 1, publishedAt: -1 });
export default models.BlogPost || model("BlogPost", BlogPostSchema);
