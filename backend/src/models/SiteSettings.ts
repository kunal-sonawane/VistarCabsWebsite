import { Schema, model, models } from "mongoose";

const SiteSettingsSchema = new Schema(
  {
    key: { type: String, required: true, unique: true, default: "primary" },
    brandName: {
      type: String,
      default: "Vistar Cabs",
      enum: ["Vistar Cabs"],
    },
    primaryPhone: { type: String, default: "8485884417", maxlength: 24 },
    secondaryPhone: { type: String, default: "8788373586", maxlength: 24 },
    whatsappNumber: {
      type: String,
      default: "918767613575",
      maxlength: 24,
    },
    email: { type: String, default: "", maxlength: 160 },
    instagramUrl: { type: String, default: "", maxlength: 300 },
    facebookUrl: { type: String, default: "", maxlength: 300 },
    youtubeUrl: { type: String, default: "", maxlength: 300 },
    linkedinUrl: { type: String, default: "", maxlength: 300 },
    operatingHours: { type: String, default: "", maxlength: 160 },
    coverageSummary: {
      type: String,
      default: "Nashik rooted. Maharashtra connected.",
      maxlength: 300,
    },
    updatedBy: { type: String, default: "", maxlength: 80 },
  },
  { timestamps: true, versionKey: false },
);

export default models.SiteSettings || model("SiteSettings", SiteSettingsSchema);
