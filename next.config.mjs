/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
        // port: "",
        // pathname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co",
        // port: "",
        // pathname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
        // port: "",
        // pathname: "plus.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
