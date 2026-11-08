import { networkInterfaces } from "node:os";
import type { NextConfig } from "next";

/**
 * Dev-server origins are allowed dynamically.
 *
 * The site is previewed from other devices on the local network, and the LAN
 * address changes with DHCP. Enumerating the machine's current IPv4 addresses
 * keeps `next dev` working for those devices without a manual edit each time.
 */
const devPorts = [3000, 3001, 3100];

const lanOrigins = Object.values(networkInterfaces())
  .flatMap((entries) => entries ?? [])
  .filter((entry) => entry.family === "IPv4" && !entry.internal)
  .flatMap((entry) => [
    entry.address,
    ...devPorts.map((port) => `${entry.address}:${port}`),
  ]);

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  allowedDevOrigins: [
    "localhost",
    "127.0.0.1",
    ...devPorts.flatMap((port) => [`localhost:${port}`, `127.0.0.1:${port}`]),
    ...lanOrigins,
  ],
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 480, 640, 768, 1024, 1280, 1536, 1920],
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
