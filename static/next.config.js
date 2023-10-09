/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8999/:path*", // Proxy to Backend
      },
    ];
  },
  output: "standalone",
};

module.exports = nextConfig;
