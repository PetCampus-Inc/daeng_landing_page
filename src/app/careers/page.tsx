import type { Metadata } from 'next';

import { CareersContent } from '@/feature/careers/CareersContent';

export const metadata: Metadata = {
  title: '지원하기 | 똑독',
  description: '똑독과 함께 성장할 동료를 찾습니다. 지금 지원하세요!',
};

export default function CareersPage() {
  return <CareersContent />;
}
