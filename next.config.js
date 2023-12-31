/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },

  images: {
    domains: [
      "unsplash.com",
      "images.unsplash.com",
      "plus.unsplash.com",
      "firebasestorage.googleapis.com",
    ],
  },
};

module.exports = nextConfig;
