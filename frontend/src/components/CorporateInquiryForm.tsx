"use client";

import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { getApiUrl } from "@/lib/site";

const control =
  "mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100";

export default function CorporateInquiryForm() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const city = String(data.get("city") || "").trim();
    const payload = {
      name: String(data.get("contactPerson") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      email: String(data.get("email") || "").trim(),
      companyName: String(data.get("companyName") || "").trim(),
      serviceType: "Corporate",
      journeyType: "",
      from: city,
      to: "Corporate transport enquiry",
      pickupDate: "",
      pickupTime: "",
      notes: String(data.get("requirements") || "").trim(),
      sourcePath: window.location.pathname,
    };
    setBusy(true);
    try {
      const response = await fetch(`${getApiUrl()}/api/inquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok)
        throw new Error(
          result?.message ||
            "We could not save this request. Please try again.",
        );
      setSuccess(
        "Your corporate enquiry has been saved. The Vistar Cabs team will contact you to discuss your requirements.",
      );
      form.reset();
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "We could not save this request. Please try again.",
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-2xl bg-white p-5 text-slate-900 shadow-[0_18px_55px_rgba(7,26,47,.12)] sm:p-7"
    >
      <p className="eyebrow text-amber-700">Corporate cab enquiry</p>
      <h2 className="mt-2 text-2xl font-black">
        Tell us what your team needs.
      </h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        Share your company, contact and city. We will follow up to understand
        the travel requirements.
      </p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <label className="text-[11px] font-extrabold text-slate-600">
          Contact person
          <input
            name="contactPerson"
            required
            minLength={2}
            maxLength={100}
            autoComplete="name"
            className={control}
            placeholder="Your name"
          />
        </label>
        <label className="text-[11px] font-extrabold text-slate-600">
          Company name
          <input
            name="companyName"
            required
            maxLength={140}
            autoComplete="organization"
            className={control}
            placeholder="Company or organisation"
          />
        </label>
        <label className="text-[11px] font-extrabold text-slate-600">
          Work email
          <input
            name="email"
            required
            type="email"
            maxLength={160}
            autoComplete="email"
            className={control}
            placeholder="you@company.com"
          />
        </label>
        <label className="text-[11px] font-extrabold text-slate-600">
          Contact number
          <input
            name="phone"
            required
            type="tel"
            minLength={8}
            maxLength={20}
            autoComplete="tel"
            pattern="[0-9+()\-\s]{8,20}"
            className={control}
            placeholder="Phone number for callback"
          />
        </label>
        <label className="text-[11px] font-extrabold text-slate-600 sm:col-span-2">
          City
          <input
            name="city"
            required
            minLength={2}
            maxLength={100}
            className={control}
            placeholder="e.g. Nashik"
          />
        </label>
        <label className="text-[11px] font-extrabold text-slate-600 sm:col-span-2">
          Requirements
          <textarea
            name="requirements"
            required
            minLength={5}
            maxLength={350}
            rows={3}
            className={`${control} resize-y`}
            placeholder="Tell us about your expected travel needs, cities or schedule."
          />
        </label>
      </div>
      {error && (
        <p
          role="alert"
          className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-800"
        >
          {error}
        </p>
      )}
      {success && (
        <p
          role="status"
          className="mt-4 flex items-start gap-2 rounded-xl bg-emerald-50 p-3 text-sm leading-6 text-emerald-900"
        >
          <CheckCircle2 size={17} className="mt-0.5 shrink-0" />
          {success}
        </p>
      )}
      <button
        type="submit"
        disabled={busy}
        className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0758c9] px-5 py-3 text-sm font-black text-white transition hover:bg-[#0649a6] disabled:cursor-wait disabled:opacity-60"
      >
        {busy ? "Sending enquiry…" : "Send corporate enquiry"}{" "}
        <Send size={15} />
      </button>
      <p className="mt-3 text-center text-[10px] leading-5 text-slate-500">
        Your request is saved for follow-up. It is not a confirmed booking or
        rate quote.
      </p>
    </form>
  );
}
