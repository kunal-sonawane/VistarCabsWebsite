"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type ReviewCardItem = {
  customerName: string;
  quote: string;
  source?: string;
  tripLabel?: string;
  rating?: number;
};

export default function ReviewCarousel({
  reviews,
}: {
  reviews: ReviewCardItem[];
}) {
  const rail = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [inView, setInView] = useState(false);

  const goTo = useCallback(
    (next: number) => {
      const container = rail.current;
      if (!container || !reviews.length) return;
      const cards =
        container.querySelectorAll<HTMLElement>("[data-review-card]");
      const safeIndex = (next + cards.length) % cards.length;
      const card = cards[safeIndex];
      if (card) {
        // Scroll the carousel rail itself. scrollIntoView also moves the page vertically,
        // which made the whole homepage jump back to the feedback section every few seconds.
        const left =
          container.scrollLeft +
          card.getBoundingClientRect().left -
          container.getBoundingClientRect().left;
        container.scrollTo({
          left,
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
            .matches
            ? "auto"
            : "smooth",
        });
      }
      setIndex(safeIndex);
    },
    [reviews.length],
  );

  useEffect(() => {
    const container = rail.current;
    if (!container || reviews.length < 2) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 },
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, [reviews.length]);

  useEffect(() => {
    const container = rail.current;
    if (!container || reviews.length < 2 || !inView) return;
    const timer = window.setInterval(() => {
      if (document.visibilityState === "visible") goTo(index + 1);
    }, 4000);
    return () => window.clearInterval(timer);
  }, [goTo, index, inView, reviews.length]);

  if (!reviews.length) return null;

  return (
    <div className="mt-6">
      <div className="relative">
        <div
          ref={rail}
          className="review-rail flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-3 sm:gap-4"
          aria-label="Customer feedback carousel"
          aria-live="off"
        >
          {reviews.map((review, i) => (
            <article
              data-review-card
              key={`${review.customerName}-${i}`}
              className="flex min-h-[220px] basis-[88%] shrink-0 snap-start flex-col rounded-2xl border border-white/10 bg-white/[.07] p-5 shadow-[0_18px_42px_rgba(0,0,0,.16)] sm:basis-[47%] lg:basis-[32%]"
            >
              <span
                aria-hidden="true"
                className="font-serif text-4xl leading-none text-amber-300"
              >
                “
              </span>
              <blockquote className="mt-1 flex-1 text-sm leading-6 text-white/90">
                {review.quote}
              </blockquote>
              <div className="mt-5 flex items-center gap-3 border-t border-white/10 pt-4">
                <span
                  aria-hidden="true"
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-amber-300/15 text-sm font-black text-amber-200"
                >
                  {review.customerName.trim().slice(0, 1).toUpperCase()}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-black">
                    {review.customerName}
                  </p>
                  <p className="mt-0.5 text-[10px] text-slate-400">
                    {review.tripLabel || review.source || "Customer review"}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-[#071a2f] to-transparent sm:w-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-[#071a2f] to-transparent sm:w-10" />
      </div>
      <div className="mt-2 flex items-center justify-between gap-3">
        <p className="text-[10px] text-slate-400">
          {index + 1} of {reviews.length} reviews
        </p>
      </div>
    </div>
  );
}
