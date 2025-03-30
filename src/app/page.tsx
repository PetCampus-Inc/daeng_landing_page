import { MainIntroSection } from '@/feature/main/MainIntroSection';
import { AppFunctionSection } from '@/feature/main/AppFunctionSection';
import { AppDownloadSection } from '@/feature/main/AppDownloadSection';
import { FAQSection } from '@/feature/main/FAQSection';

export default function Home() {
  return (
    <div className="w-screen">
      {/* 메인 */}
      <MainIntroSection />

      {/* 앱 기능 소개 (가로 스크롤) */}
      <AppFunctionSection className="mt-48" />

      {/* 앱 다운로드 배너 */}
      <AppDownloadSection className="mt-32" />

      {/* 자주 묻는 질문 */}
      <FAQSection className="mt-32" />
    </div>
  );
}
