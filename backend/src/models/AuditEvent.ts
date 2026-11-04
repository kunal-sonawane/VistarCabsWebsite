import { Schema, model, models } from "mongoose";

const AuditEventSchema = new Schema(
  {
    actor: { type: String, required: true, maxlength: 80 },
    role: { type: String, enum: ["owner", "seo"], required: true },
    action: { type: String, required: true, maxlength: 80 },
    entity: { type: String, required: true, maxlength: 80 },
    entityId: { type: String, default: "", maxlength: 80 },
    summary: { type: String, default: "", maxlength: 240 },
  },
  { timestamps: true, versionKey: false },
);

AuditEventSchema.index({ createdAt: -1 });
export default models.AuditEvent || model("AuditEvent", AuditEventSchema);
