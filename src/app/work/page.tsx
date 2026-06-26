import type { Metadata } from 'next';

import { CareersCultureSection } from '@/feature/careers/CareersCultureSection';

export const metadata: Metadata = {
  title: '일하는 방식 | 똑독',
  description: '똑독 팀이 Jira, Notion, Discord, Admin과 AI를 활용해 일하는 방식을 소개합니다.',
};

export default function WorkPage() {
  return (
    <div className="w-screen pt-header">
      <CareersCultureSection />
    </div>
  );
}
