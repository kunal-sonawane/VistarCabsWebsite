function MastercardMark() {
  return (
    <svg
      width="34"
      height="22"
      viewBox="0 0 34 22"
      role="img"
      aria-label="Mastercard"
    >
      <circle cx="12" cy="11" r="9" fill="#eb001b" />
      <circle cx="22" cy="11" r="9" fill="#f79e1b" />
      <path d="M17 3.6a9 9 0 0 1 0 14.8 9 9 0 0 1 0-14.8z" fill="#ff5f00" />
    </svg>
  );
}

export default function PaymentMarks() {
  return (
    <div
      className="rounded-md bg-white px-3.5 py-2.5"
      role="group"
      aria-label="Payment method marks; confirm arrangements directly with Vistar Cabs"
    >
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-slate-700">
        <span className="inline-flex items-center gap-0.5" aria-label="UPI">
          <span className="text-[15px] font-black italic tracking-tight text-[#3b3a6d]">
            UPI
          </span>
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
            <path d="M2 2l5 5-5 5z" fill="#f47a20" />
            <path d="M6 2l5 5-5 5z" fill="#0a9d58" />
          </svg>
        </span>
        <span className="text-[17px] font-black italic tracking-tight text-[#1a1f71]">
          VISA
        </span>
        <MastercardMark />
        <span className="inline-flex items-center gap-0.5">
          <span className="text-[16px] font-black italic tracking-tight text-[#1c3d8f]">
            RuPay
          </span>
          <svg width="12" height="14" viewBox="0 0 12 14" aria-hidden="true">
            <path d="M1 1l5 6-5 6z" fill="#f47a20" />
            <path d="M5.5 1l5 6-5 6z" fill="#0a9d58" />
          </svg>
        </span>
        <span className="text-[12px] font-black italic text-[#003087]">
          PayPal
        </span>
        <span className="rounded-sm bg-[#153887] px-1.5 py-1 text-[9px] font-black tracking-wider text-white">
          AMERICAN
          <br />
          EXPRESS
        </span>
      </div>
      <div className="mt-2 h-[2px] w-full rounded-full bg-gradient-to-r from-amber-400 via-slate-300 to-blue-700" />
    </div>
  );
}
