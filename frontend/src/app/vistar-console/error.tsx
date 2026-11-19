"use client";

import Link from "next/link";

export default function AdminPageError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="grid min-h-screen place-items-center bg-[#071a2f] px-4 py-12">
      <section
        role="alert"
        className="w-full max-w-md rounded-3xl bg-white p-6 text-slate-900 shadow-2xl sm:p-8"
      >
        <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-700">
          Vistar Cabs · secure workspace
        </p>
        <h1 className="mt-3 text-2xl font-black">Admin page couldn’t load</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          The workspace hit a page error. Retry the page; if it continues, check
          the website deployment and admin service status.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={reset}
            className="min-h-11 rounded-xl bg-blue-700 px-4 py-2 text-sm font-bold text-white hover:bg-blue-800"
          >
            Retry admin page
          </button>
          <Link
            href="/"
            className="grid min-h-11 place-items-center rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-blue-800 hover:bg-slate-50"
          >
            Back to website
          </Link>
        </div>
      </section>
    </main>
  );
}
