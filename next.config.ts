import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
// GitHub Pages deployment typically requires a base path if deploying to a project repository.
// The basePath should match the repository name (e.g., '/home').
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath,
  images: {
    unoptimized: true,
  },
  // Ensure links end with trailing slashes for static hosting environments like github.io
  trailingSlash: true,
};

export default nextConfig;
