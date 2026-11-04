import { Schema, model, models } from "mongoose";

const TestimonialSchema = new Schema(
  {
    customerName: { type: String, required: true, trim: true, maxlength: 100 },
    quote: { type: String, required: true, trim: true, maxlength: 1200 },
    rating: { type: Number, required: true, min: 1, max: 5 },
    tripLabel: { type: String, default: "", trim: true, maxlength: 120 },
    consentConfirmed: { type: Boolean, required: true, default: false },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
    publishedAt: { type: Date, default: null },
    updatedBy: { type: String, default: "", maxlength: 80 },
  },
  { timestamps: true, versionKey: false },
);

TestimonialSchema.index({ status: 1, publishedAt: -1 });
export default models.Testimonial || model("Testimonial", TestimonialSchema);
