/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  transpilePackages: ['@today-digitech/shared', 'lucide-react'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/blogs',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blogs/:slug*',
        destination: '/blog/:slug*',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    const backendUrl = (process.env.NEXT_PUBLIC_API_URL || 'https://today-digitech-backend.onrender.com/api/v1').replace(/\/api\/v1\/?$/, '');
    return [
      {
        source: '/api/:path*',
        destination: `${backendUrl}/api/:path*`,
      },
      {
        source: '/uploads/:path*',
        destination: `${backendUrl}/uploads/:path*`,
      },
    ];
  },
};

export default nextConfig;
