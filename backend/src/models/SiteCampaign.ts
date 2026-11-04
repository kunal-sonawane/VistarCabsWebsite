import { Schema, model, models } from "mongoose";

const SiteCampaignSchema = new Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 100 },
    headline: { type: String, required: true, trim: true, maxlength: 140 },
    body: { type: String, required: true, trim: true, maxlength: 500 },
    ctaLabel: { type: String, required: true, trim: true, maxlength: 50 },
    ctaUrl: { type: String, required: true, trim: true, maxlength: 300 },
    imageId: { type: String, default: "", maxlength: 40 },
    imageAlt: { type: String, default: "", trim: true, maxlength: 180 },
    startsOn: { type: String, default: "", match: /^$|^\d{4}-\d{2}-\d{2}$/ },
    endsOn: { type: String, default: "", match: /^$|^\d{4}-\d{2}-\d{2}$/ },
    placement: { type: String, enum: ["homepage"], default: "homepage" },
    status: {
      type: String,
      enum: ["draft", "active", "paused", "archived"],
      default: "draft",
    },
    priority: { type: Number, min: 0, max: 100, default: 0 },
    updatedBy: { type: String, default: "", maxlength: 80 },
  },
  { timestamps: true, versionKey: false },
);

SiteCampaignSchema.index({
  status: 1,
  placement: 1,
  priority: -1,
  startsOn: 1,
  endsOn: 1,
});
export default models.SiteCampaign || model("SiteCampaign", SiteCampaignSchema);
