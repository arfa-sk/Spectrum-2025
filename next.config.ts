import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [60, 75, 85, 100],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  outputFileTracingRoot: path.join(__dirname),
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  // Removing global security headers to avoid interfering with WebGL/animations.
};

export default nextConfig;
