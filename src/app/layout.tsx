import type { Metadata } from 'next';

import { Header } from '@/components/Header';
import { cn } from '@/lib/tw';
import { pretendard } from '@/assets/fonts';
import { Footer } from '@/components/Footer';

import '../styles/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://home.knockdog.net'),
  title: '똑독 - 강아지 유치원 관리',
  description: '똑독에서 강아지 유치원・펫호텔 관리를 모바일 앱으로 간편하게 관리하세요!',
  verification: {
    google: 'HqfzVZ4quAE6WP8QT8GLULiSXWAofeIlUMiy_1YvYro',
  },
  openGraph: {
    title: '똑독 - 강아지 유치원 관리',
    description: '똑독에서 강아지 유치원・펫호텔 관리를 모바일 앱으로 간편하게 관리하세요!',
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
