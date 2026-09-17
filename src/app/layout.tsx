import type { Metadata, Viewport } from 'next';

import { Header } from '@/components/Header';
import { cn } from '@/lib/tw';
import { suit } from '@/assets/fonts';
import { Footer } from '@/components/Footer';

import '../styles/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: '똑독 - 강아지 유치원 탐색부터 알림장까지',
  description:
    '유치원을 찾는 순간부터 등하원, 알림장까지 - 보호자와 원장님이 똑독 하나로 이어져요.',
  keywords: [
    '강아지 유치원',
    '애견유치원 앱',
    '반려견 유치원 추천',
    '유치원 알림장',
    '등하원 관리',
  ],
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
  },
  verification: {
    google: 'HqfzVZ4quAE6WP8QT8GLULiSXWAofeIlUMiy_1YvYro',
    other: {
      'naver-site-verification': '3245936a21d83d85b971359d3c69d58fe1deee24',
    },
  },
  openGraph: {
    title: '똑독 - 강아지 유치원 탐색부터 알림장까지',
    description:
      '유치원을 찾는 순간부터 등하원, 알림장까지 - 보호자와 원장님이 똑독 하나로 이어져요.',
    type: 'website',
    images: [
      {
        url: '/og-image-v1.png',
        width: 1024,
        height: 500,
        alt: '똑독 - 강아지 유치원 탐색부터 알림장까지',
      },
    ],
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: '똑독 - 강아지 유치원 탐색부터 알림장까지',
    description:
      '유치원을 찾는 순간부터 등하원, 알림장까지 - 보호자와 원장님이 똑독 하나로 이어져요.',
    images: ['/og-image-v1.png'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={cn(suit.variable, 'antialiased')}>
        <main className="flex flex-col">
          <Header />
          <div className="flex-1 flex justify-center h-full w-full">{children}</div>
          <Footer />
        </main>
      </body>
    </html>
  );
}
