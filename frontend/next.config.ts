import type { NextConfig } from "next";

const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "");

const nextConfig: NextConfig = {
  poweredByHeader: false,
  distDir: process.env.NEXT_DIST_DIR || ".next",
  experimental: { cpus: 1, workerThreads: false },
  async rewrites() {
    if (!apiUrl) return [];
    const parsed = new URL(apiUrl);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      throw new Error("NEXT_PUBLIC_API_URL must use http or https.");
    }
    return [
      {
        source: "/api/:path*",
        destination: `${apiUrl}/api/:path*`,
      },
    ];
  },
};
export default nextConfig;
