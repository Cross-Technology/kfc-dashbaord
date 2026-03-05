import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.111.76", "192.168.0.31", "localhost", "192.168.0.34", "192.168.0.31"],
  images: {
    qualities: [75, 80, 90, 100],
  },
};

export default nextConfig;
