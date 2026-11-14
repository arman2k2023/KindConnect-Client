import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: `${
          process.env.AUTH_PROXY_TARGET || "https://kindconnect-server.onrender.com"
        }/api/auth/:path*`,
      },
    ];
  },
};

export default nextConfig;