import { Schema, model, models } from "mongoose";

const AdminPasswordResetSchema = new Schema(
  {
    challengeHash: { type: String, required: true, unique: true },
    emailCodeHash: { type: String, required: true },
    phoneCodeHash: { type: String, required: true },
    attempts: { type: Number, default: 0, min: 0, max: 5 },
    expiresAt: { type: Date, required: true, expires: 0 },
    usedAt: { type: Date, default: null },
  },
  { timestamps: true, versionKey: false },
);

export default models.AdminPasswordReset ||
  model("AdminPasswordReset", AdminPasswordResetSchema);
