import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  reactStrictMode: false,
  output: 'standalone',
};

export default nextConfig;
