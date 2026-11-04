import { Schema, model, models } from "mongoose";

const CustomerSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    phone: { type: String, required: true, trim: true, maxlength: 24 },
    notes: { type: String, default: "", trim: true, maxlength: 1000 },
    tags: {
      type: [String],
      default: [],
      validate: (items: string[]) => items.length <= 20,
    },
    marketingConsent: { type: Boolean, default: false },
    lastContactAt: { type: Date, default: null },
  },
  { timestamps: true, versionKey: false },
);

CustomerSchema.index({ phone: 1 }, { unique: true });
CustomerSchema.index({ name: 1 });
export default models.Customer || model("Customer", CustomerSchema);
