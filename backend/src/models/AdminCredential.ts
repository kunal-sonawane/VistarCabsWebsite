import { Schema, model, models } from "mongoose";

const AdminCredentialSchema = new Schema(
  {
    key: { type: String, required: true, unique: true, default: "owner" },
    passwordHash: { type: String, required: true, select: false },
    passwordUpdatedAt: { type: Date, required: true },
  },
  { timestamps: true, versionKey: false },
);

export default models.AdminCredential ||
  model("AdminCredential", AdminCredentialSchema);
