import { Schema, model, models } from "mongoose";

const DriverSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    phone: { type: String, required: true, trim: true, maxlength: 24 },
    homeCity: { type: String, default: "Nashik", trim: true, maxlength: 100 },
    vehicleId: { type: Schema.Types.ObjectId, ref: "Vehicle", default: null },
    status: {
      type: String,
      enum: ["available", "assigned", "inactive"],
      default: "available",
    },
    internalNotes: { type: String, default: "", trim: true, maxlength: 1000 },
  },
  { timestamps: true, versionKey: false },
);

DriverSchema.index({ phone: 1 });
export default models.Driver || model("Driver", DriverSchema);
