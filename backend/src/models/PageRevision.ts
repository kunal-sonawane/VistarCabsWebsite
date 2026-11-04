import { Schema, model, models } from "mongoose";

const PageRevisionSchema = new Schema(
  {
    kind: { type: String, enum: ["cms-page", "existing-page"], required: true },
    reference: { type: String, required: true, trim: true, maxlength: 200 },
    entityId: { type: String, default: "", maxlength: 40 },
    snapshot: { type: Schema.Types.Mixed, required: true },
    actor: { type: String, required: true, maxlength: 80 },
    role: { type: String, enum: ["owner", "seo"], required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false }, versionKey: false },
);

PageRevisionSchema.index({ kind: 1, reference: 1, createdAt: -1 });
export default models.PageRevision || model("PageRevision", PageRevisionSchema);
