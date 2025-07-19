/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    API_BASE_URL: process.env.API_BASE_URL,
  },

  images: {
    // domains: ['res.cloudinary.com', 'i.pinimg.com'],
    remotePatterns: [new URL("https://res.cloudinary.com/**")],
  },
};

export default nextConfig;
