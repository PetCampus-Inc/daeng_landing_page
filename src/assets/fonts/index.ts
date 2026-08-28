import localFont from 'next/font/local';

// SUIT (SIL OFL 1.1) — https://github.com/sun-typeface/SUIT
// 배포용 static woff2. 추후 프로젝트에서 실제 사용하는 글자만 담은 서브셋으로 교체 예정.
export const suit = localFont({
  src: [
    { path: './SUIT-Regular.woff2', weight: '400', style: 'normal' },
    { path: './SUIT-Medium.woff2', weight: '500', style: 'normal' },
    { path: './SUIT-SemiBold.woff2', weight: '600', style: 'normal' },
    { path: './SUIT-Bold.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--suit',
  display: 'swap',
  fallback: ['-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
});
