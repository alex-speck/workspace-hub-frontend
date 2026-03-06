import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL("https://statics.forbesargentina.com/2023/04/6446cc8bd9410.jpg")]
  }
};

export default nextConfig;
