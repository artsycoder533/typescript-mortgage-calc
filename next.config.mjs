/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    loader: "akamai",
    path: "",
  },
  assetPrefix: "./typescript-mortgage-calc",
  // assetPrefix: "./"
};

export default nextConfig;
//module.exports = nextConfig
