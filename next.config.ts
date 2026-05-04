import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/bill-saver2",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
