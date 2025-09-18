import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.r2.cloudflarestorage.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        // public development URLs from R2 like: pub-<id>.r2.dev
        hostname: 'pub-*.r2.dev',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
