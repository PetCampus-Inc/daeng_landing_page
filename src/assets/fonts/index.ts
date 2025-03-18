import localFont from 'next/font/local';

export const pretendard = localFont({
  src: [
    {
      path: './Pretendard-Regular.subset.woff2',
      weight: '400',
    },
    {
      path: './Pretendard-SemiBold.subset.woff2',
      weight: '600',
    },
  ],
  variable: '--pretendard',
  display: 'swap',
});
