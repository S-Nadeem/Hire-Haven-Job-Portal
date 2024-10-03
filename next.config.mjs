/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nadeem-hire-haven.s3.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
