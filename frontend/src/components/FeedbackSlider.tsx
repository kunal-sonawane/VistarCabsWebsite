import { MessageSquareQuote, ShieldCheck } from "lucide-react";
import { getPublicReviews } from "@/lib/cms";
import ReviewCarousel, {
  type ReviewCardItem,
} from "@/components/ReviewCarousel";
import { workbookReviews } from "@/lib/workbookReviews";

export default async function FeedbackSlider() {
  const approved = await getPublicReviews();
  const reviews: ReviewCardItem[] = approved.length
    ? approved.map((review) => ({
        ...review,
        source: "Vistar Cabs customer feedback",
      }))
    : workbookReviews;
  return (
    <section
      id="feedback"
      aria-labelledby="feedback-title"
      className="bg-[#071a2f] py-10 text-white sm:py-12"
    >
      <div className="container-wide">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow text-amber-300">
              Vistar Cabs · customer voices
            </p>
            <h2
              id="feedback-title"
              className="mt-2 text-2xl font-black tracking-tight sm:text-3xl"
            >
              Our Valuable Customer Feedback
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
              Read feedback shared by travellers about their journeys with
              Vistar Cabs.
            </p>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-slate-300">
            <ShieldCheck size={17} className="text-emerald-300" />{" "}
            {approved.length
              ? "Approved customer feedback"
              : "Source: supplied customer review sheet"}
          </div>
        </div>
        {reviews.length > 0 ? (
          <ReviewCarousel reviews={reviews} />
        ) : (
          <div className="mt-5 rounded-2xl border border-dashed border-white/15 bg-white/[.04] p-5">
            <div className="flex items-start gap-3">
              <MessageSquareQuote
                size={20}
                className="mt-0.5 shrink-0 text-amber-300"
              />
              <p className="max-w-3xl text-sm leading-6 text-slate-300">
                The review area is ready. Add customer feedback in the admin
                panel after confirming the customer approved the exact quote and
                display name.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
