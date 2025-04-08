import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    // Next15 에서 외부 링크 이미지 최적화에 이슈 있음
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'raw.githubusercontent.com',
    //     pathname: '/PetCampus-Inc/**',
    //   },
    // ],
  },
};

export default nextConfig;
