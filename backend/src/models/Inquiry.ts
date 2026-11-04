import { Schema, model, models } from "mongoose";
const InquirySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    phone: { type: String, required: true, trim: true, maxlength: 24 },
    companyName: { type: String, default: "", trim: true, maxlength: 140 },
    email: {
      type: String,
      default: "",
      trim: true,
      lowercase: true,
      maxlength: 160,
    },
    serviceType: {
      type: String,
      required: true,
      enum: ["Outstation", "Airport", "Hourly", "Corporate"],
    },
    journeyType: {
      type: String,
      default: "",
      enum: ["", "One Way", "Round Trip"],
    },
    from: { type: String, required: true, trim: true, maxlength: 160 },
    to: { type: String, default: "", trim: true, maxlength: 160 },
    pickupDate: { type: String, default: "", maxlength: 20 },
    pickupTime: { type: String, default: "", maxlength: 10 },
    returnDate: { type: String, default: "", maxlength: 20 },
    returnTime: { type: String, default: "", maxlength: 10 },
    duration: {
      type: String,
      default: "",
      enum: [
        "",
        "2 hours",
        "4 hours",
        "6 hours",
        "8 hours",
        "Full day",
        "To be discussed",
      ],
    },
    airportDirection: { type: String, default: "", maxlength: 32 },
    flightNumber: { type: String, default: "", trim: true, maxlength: 16 },
    terminal: { type: String, default: "", trim: true, maxlength: 24 },
    passengers: { type: Number, min: 1, max: 12 },
    notes: { type: String, default: "", trim: true, maxlength: 350 },
    sourcePath: { type: String, default: "/", trim: true, maxlength: 200 },
    status: {
      type: String,
      enum: ["new", "contacted", "closed"],
      default: "new",
    },
  },
  { timestamps: true, versionKey: false },
);
InquirySchema.index({ createdAt: -1 });
InquirySchema.index({ sourcePath: 1, createdAt: -1 });
export default models.Inquiry || model("Inquiry", InquirySchema);
