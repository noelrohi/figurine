import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  experimental: {
    browserDebugInfoInTerminal: true,
  },
};

export default nextConfig;
