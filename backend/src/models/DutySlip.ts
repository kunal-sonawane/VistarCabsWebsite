import { Schema, model, models } from "mongoose";

const DutySlipSchema = new Schema(
  {
    slipNumber: { type: String, required: true, unique: true, trim: true },
    companyName: { type: String, required: true, trim: true, maxlength: 160 },
    guestName: { type: String, required: true, trim: true, maxlength: 100 },
    guestPhone: { type: String, required: true, trim: true, maxlength: 24 },
    coordinatorName: { type: String, default: "", trim: true, maxlength: 100 },
    coordinatorPhone: { type: String, default: "", trim: true, maxlength: 24 },
    dutyDate: { type: String, required: true, trim: true, maxlength: 10 },
    pickupTime: { type: String, required: true, trim: true, maxlength: 10 },
    pickupAddress: { type: String, required: true, trim: true, maxlength: 300 },
    dropAddress: { type: String, required: true, trim: true, maxlength: 300 },
    travelRouting: { type: String, default: "", trim: true, maxlength: 1000 },
    tripType: { type: String, default: "Corporate", trim: true, maxlength: 60 },
    driverName: { type: String, default: "", trim: true, maxlength: 100 },
    driverPhone: { type: String, default: "", trim: true, maxlength: 24 },
    vehicleNumber: { type: String, default: "", trim: true, maxlength: 24 },
    vehicleType: { type: String, default: "", trim: true, maxlength: 80 },
    startKm: { type: String, default: "", trim: true, maxlength: 20 },
    endKm: { type: String, default: "", trim: true, maxlength: 20 },
    actualStartTime: { type: String, default: "", trim: true, maxlength: 10 },
    actualEndTime: { type: String, default: "", trim: true, maxlength: 10 },
    tollAmount: { type: Number, default: 0, min: 0, max: 1000000 },
    parkingAmount: { type: Number, default: 0, min: 0, max: 1000000 },
    tripAmount: { type: Number, default: 0, min: 0, max: 10000000 },
    paymentTerms: { type: String, default: "", trim: true, maxlength: 500 },
    tripRemarks: { type: String, default: "", trim: true, maxlength: 1000 },
    status: {
      type: String,
      enum: ["prepared", "completed", "submitted", "approved", "cancelled"],
      default: "prepared",
    },
  },
  { timestamps: true, versionKey: false },
);

DutySlipSchema.index({ createdAt: -1 });
export default models.DutySlip || model("DutySlip", DutySlipSchema);
