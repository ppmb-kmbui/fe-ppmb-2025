/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    API_BASE_URL: process.env.API_BASE_URL,
  },
  
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `https://ppmb-server.vercel.app/api/v1/:path*`
      }
    ];
  },

  images: {
    // domains: ['res.cloudinary.com', 'i.pinimg.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
        port: '',
        pathname: '/api/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/api/**',
      },
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
        port: '',
        pathname: '/api/**',
      }
    ],
  },
};

export default nextConfig;
