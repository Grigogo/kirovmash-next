import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin(); // по умолчанию ищет i18n/request.ts

const nextConfig: NextConfig = {
  reactCompiler: true,

  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [
      640, 750, 828, 1080, 1200, 1920,
    ],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },

  // Это критично для next-intl + Turbopack в Next.js 16
  turbopack: {},

  allowedDevOrigins: [
    "192.168.1.93", // твой текущий IP
    "localhost",
    "127.0.0.1",
  ],
};

export default withNextIntl(nextConfig);
