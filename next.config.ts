import type { NextConfig } from "next";

// Static export: the site ships as plain files (out/), so any static host serves it.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
