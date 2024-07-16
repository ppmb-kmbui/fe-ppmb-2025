/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: 'https://ppmb-server.vercel.app/api/v1/:path*'
          }
        ]
      }
};

export default nextConfig;
