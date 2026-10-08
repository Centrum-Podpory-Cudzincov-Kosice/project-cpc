import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cpc-storage.s3.eu-central-1.amazonaws.com",
            },
        ],
    },
};

export default nextConfig;
