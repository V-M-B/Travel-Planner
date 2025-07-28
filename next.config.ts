import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ge2j3pcqyy.ufs.sh",
        port: "",
        pathname: "/**",
      },
    ],
  }
};

export default nextConfig;
