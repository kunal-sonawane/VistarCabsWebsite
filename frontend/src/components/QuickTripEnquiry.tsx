"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { getApiUrl, site } from "@/lib/site";

const control =
  "mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100";

type Props = {
  initialFrom?: string;
  initialTo?: string;
  title?: string;
  light?: boolean;
};

export default function QuickTripEnquiry({
  initialFrom = "",
  initialTo = "",
  title = "Quick trip enquiry",
  light = false,
}: Props) {
  const [from, setFrom] = useState(initialFrom);
  const [to, setTo] = useState(initialTo);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [phone, setPhone] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [whatsappFallback, setWhatsappFallback] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState(site.whatsapp);
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

  useEffect(() => {
    let active = true;
    fetch(`${getApiUrl()}/api/public/settings`)
      .then((response) => (response.ok ? response.json() : null))
      .then((result) => {
        const configured = String(result?.item?.whatsappNumber || "").replace(
          /\D/g,
          "",
        );
        if (active && configured) setWhatsappNumber(configured);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");
    setWhatsappFallback("");
    setBusy(true);

    const message = [
      "Hello Vistar Cabs, I would like to enquire about a cab journey.",
      `From: ${from.trim()}`,
      `To: ${to.trim()}`,
      `Travel date: ${date}`,
      `Pickup time: ${time}`,
      `Callback mobile: ${phone.trim()}`,
      `Page: ${window.location.pathname}`,
    ].join("\n");
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    // Open during the click gesture to reduce the chance that the browser blocks WhatsApp.
    const whatsappWindow = window.open("about:blank", "_blank");
    if (whatsappWindow) whatsappWindow.opener = null;

    try {
      const response = await fetch(`${getApiUrl()}/api/inquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // The quick form intentionally does not ask for a name.
          name: "Website enquiry",
          phone: phone.trim(),
          serviceType: "Outstation",
          journeyType: "One Way",
          from: from.trim(),
          to: to.trim(),
          pickupDate: date,
          pickupTime: time,
          sourcePath: window.location.pathname,
        }),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok)
        throw new Error(result?.message || "We could not save your enquiry. Please try again.");
      setSuccess(
        "Your enquiry was saved. WhatsApp is opening with the details; press Send there to message Vistar Cabs.",
      );
      setWhatsappFallback(whatsappUrl);
      if (whatsappWindow && !whatsappWindow.closed) {
        whatsappWindow.location.href = whatsappUrl;
      }
      setPhone("");
    } catch (cause) {
      const reason =
        cause instanceof Error
          ? cause.message
          : "We could not save your enquiry.";
      setWhatsappFallback(whatsappUrl);
      if (whatsappWindow && !whatsappWindow.closed) {
        whatsappWindow.location.href = whatsappUrl;
      }
      setError(`${reason} WhatsApp is available as a fallback, but this enquiry was not saved to the database.`);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form
      id="quick-enquiry"
      onSubmit={submit}
      className={`rounded-2xl p-5 shadow-xl sm:p-6 ${light ? "border border-slate-200 bg-white text-slate-900" : "bg-white text-slate-900"}`}
    >
      <p className="eyebrow text-amber-700">Vistar Cabs</p>
      <h2 className="mt-1 text-xl font-black">{title}</h2>
      <p className="mt-1 text-xs leading-5 text-slate-600">Share the journey details and a callback number. No name is needed.</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="text-[11px] font-bold text-slate-600">From
          <input className={control} required minLength={2} maxLength={160} value={from} onChange={(e) => setFrom(e.target.value)} autoComplete="street-address" />
        </label>
        <label className="text-[11px] font-bold text-slate-600">To
          <input className={control} required minLength={2} maxLength={160} value={to} onChange={(e) => setTo(e.target.value)} />
        </label>
        <label className="text-[11px] font-bold text-slate-600">Travel date
          <input className={control} type="date" required min={today} value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
        <label className="text-[11px] font-bold text-slate-600">Pickup time
          <input className={control} type="time" required value={time} onChange={(e) => setTime(e.target.value)} />
        </label>
        <label className="text-[11px] font-bold text-slate-600 sm:col-span-2">Mobile number
          <input className={control} type="tel" required minLength={8} maxLength={20} pattern="[0-9+()\-\s]{8,20}" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Number for callback" />
        </label>
      </div>
      {error && (
        <p role="alert" className="mt-3 rounded-lg bg-red-50 p-3 text-xs leading-5 text-red-800">
          {error}
          {whatsappFallback && (
            <a className="ml-1 inline-block font-black underline" href={whatsappFallback} target="_blank" rel="noreferrer">
              Open WhatsApp with enquiry
            </a>
          )}
        </p>
      )}
      {success && (
        <p role="status" className="mt-3 flex gap-2 rounded-lg bg-emerald-50 p-3 text-xs leading-5 text-emerald-900">
          <CheckCircle2 size={16} className="shrink-0" />
          <span>
            {success}
            {whatsappFallback && (
              <a className="ml-1 font-black underline" href={whatsappFallback} target="_blank" rel="noreferrer">
                Open WhatsApp
              </a>
            )}
          </span>
        </p>
      )}
      <button type="submit" disabled={busy} className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#0758c9] px-4 py-3 text-sm font-black text-white disabled:opacity-60">
        {busy ? "Sending…" : "Send enquiry"} <Send size={15} />
      </button>
      <p className="mt-2 text-center text-[10px] leading-4 text-slate-500">This is an enquiry, not a confirmed booking or fare quote.</p>
    </form>
  );
}
