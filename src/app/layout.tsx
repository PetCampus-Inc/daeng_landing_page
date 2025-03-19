import type { Metadata } from 'next';

import { Header } from '@/components/Header';
import { cn } from '@/lib/tw';
import { pretendard } from '@/assets/fonts';

import '../styles/globals.css';

export const metadata: Metadata = {
  title: '똑독',
  description:
    '똑독에서 강아지 유치원・펫호텔 관리, 신뢰있는 유치원 찾기부터 가격 비교까지 모두 경험하세요!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={cn(pretendard.variable, 'antialiased')}>
        <div className="flex flex-col">
          <Header />
          <div className="flex-1 flex justify-center h-full w-full pt-header">
            <div className="w-full max-w-content mx-8 max-md:mx-4">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
