// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "/todo-list",
  assetPrefix: "/todo-list",
};

module.exports = nextConfig;
