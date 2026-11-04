import { Schema, model, models } from "mongoose";

const VehicleSchema = new Schema(
  {
    label: { type: String, required: true, trim: true, maxlength: 100 },
    make: { type: String, default: "", trim: true, maxlength: 80 },
    model: { type: String, default: "", trim: true, maxlength: 80 },
    category: {
      type: String,
      required: true,
      enum: ["Hatchback", "Sedan", "SUV", "MPV", "Tempo traveller", "Other"],
    },
    seats: { type: Number, required: true, min: 1, max: 30 },
    luggage: { type: Number, default: 0, min: 0, max: 30 },
    registration: { type: String, default: "", trim: true, maxlength: 24 },
    homeCity: { type: String, default: "Nashik", trim: true, maxlength: 100 },
    status: {
      type: String,
      enum: ["active", "maintenance", "inactive"],
      default: "active",
    },
    imageId: { type: String, default: "", maxlength: 40 },
    imageAlt: { type: String, default: "", trim: true, maxlength: 180 },
  },
  { timestamps: true, versionKey: false },
);

VehicleSchema.index({ status: 1, homeCity: 1 });
export default models.Vehicle || model("Vehicle", VehicleSchema);
