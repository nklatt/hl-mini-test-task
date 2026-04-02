import type { NextConfig } from "next";

if (!process.env.NEXT_PUBLIC_HAVEN_URL) {
  throw new Error("NEXT_PUBLIC_HAVEN_URL is not set");
}

const config: NextConfig = {
  transpilePackages: ["nuqs"],
  output: "standalone",
};

export default config;
