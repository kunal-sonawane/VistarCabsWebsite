import { Schema, model, models } from "mongoose";

const MediaAssetSchema = new Schema(
  {
    filename: { type: String, required: true, trim: true, maxlength: 160 },
    mimeType: {
      type: String,
      required: true,
      enum: ["image/jpeg", "image/png", "image/webp"],
    },
    size: { type: Number, required: true, max: 4 * 1024 * 1024 },
    alt: { type: String, required: true, trim: true, maxlength: 180 },
    data: { type: Buffer, required: true, select: false },
    uploadedBy: { type: String, default: "", maxlength: 80 },
  },
  { timestamps: true, versionKey: false },
);

export default models.MediaAsset || model("MediaAsset", MediaAssetSchema);
