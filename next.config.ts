import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    loader: 'akamai',
    path: '/',
    unoptimized: true,
  },
};

export default nextConfig;
