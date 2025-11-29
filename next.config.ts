import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "api.microlink.io"
      },
      {
        hostname: "qingwuwei.github.io"
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      }
    ]
  },
  // 跳过构建时的 ESLint（线上依赖安装缺少插件会导致失败）
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Tell Next.js these packages use native Node.js modules
  serverExternalPackages: ['binance-api-node'],
};

export default nextConfig;
