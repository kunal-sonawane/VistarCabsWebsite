import { Schema, model, models } from "mongoose";

const SeoOverrideSchema = new Schema(
  {
    path: {
      type: String,
      required: true,
      trim: true,
      match: /^\/(?!\/)[a-z0-9\-/]*$/,
      maxlength: 200,
    },
    title: { type: String, required: true, trim: true, maxlength: 70 },
    description: { type: String, required: true, trim: true, maxlength: 320 },
    canonicalPath: { type: String, default: "", trim: true, maxlength: 200 },
    noindex: { type: Boolean, default: false },
    focusPhrase: { type: String, default: "", trim: true, maxlength: 100 },
    targetKeywords: { type: [String], default: [], validate: (items: string[]) => items.length <= 12 },
    seoNotes: { type: String, default: "", trim: true, maxlength: 1500 },
    updatedBy: { type: String, default: "", maxlength: 80 },
  },
  { timestamps: true, versionKey: false },
);

SeoOverrideSchema.index({ path: 1 }, { unique: true });
export default models.SeoOverride || model("SeoOverride", SeoOverrideSchema);
