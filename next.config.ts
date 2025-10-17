import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Removing global security headers to avoid interfering with WebGL/animations.
};

export default nextConfig;
