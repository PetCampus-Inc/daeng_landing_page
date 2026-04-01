import type { Metadata } from 'next';

import { Header } from '@/components/Header';
import { cn } from '@/lib/tw';
import { pretendard } from '@/assets/fonts';
import { Footer } from '@/components/Footer';

import '../styles/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://home.knockdog.net'),
  title: '똑독 - 강아지 유치원 탐색',
  description:
    '우리 강아지에게 딱 맞는 유치원을 찾을 땐, 똑독! 지도에서 한눈에 비교하고 스마트하게 관리하세요.',
  verification: {
    google: 'HqfzVZ4quAE6WP8QT8GLULiSXWAofeIlUMiy_1YvYro',
    other: {
      'naver-site-verification': '3245936a21d83d85b971359d3c69d58fe1deee24',
    },
  },
  openGraph: {
    title: '똑독 - 강아지 유치원 탐색',
    description:
      '우리 강아지에게 딱 맞는 유치원을 찾을 땐, 똑독! 지도에서 한눈에 비교하고 스마트하게 관리하세요.',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: '똑독 미리보기 이미지',
      },
    ],
    url: '/',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={cn(pretendard.variable, 'antialiased')}>
        <main className="flex flex-col">
          <Header />
          <div className="flex-1 flex justify-center h-full w-full">{children}</div>
          <Footer />
        </main>
      </body>
    </html>
  );
}
