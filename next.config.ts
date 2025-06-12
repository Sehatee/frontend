import createNextIntlPlugin from "next-intl/plugin";
import withPWA from "next-pwa";
import type { NextConfig } from "next";

// إعداد PWA
const withPWANext = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

// إعداد Next-Intl
const withNextIntl = createNextIntlPlugin();

// الدمج بين الإضافتين (PWA + Next-Intl)
const nextConfig: NextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },
};

export default withNextIntl(withPWANext(nextConfig));
