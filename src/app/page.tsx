import { HeroSection } from '@/feature/main/HeroSection';
import { TrustStatsSection } from '@/feature/main/TrustStatsSection';
import { LocalDiscoverySection } from '@/feature/main/LocalDiscoverySection';
import { GuardianSection } from '@/feature/main/GuardianSection';
import { DirectorSection } from '@/feature/main/DirectorSection';
import { FAQSection } from '@/feature/main/FAQSection';
import { FinalCtaSection } from '@/feature/main/FinalCtaSection';

export default function Home() {
  return (
    <div className="w-screen">
      {/* 히어로 (S-02) */}
      <HeroSection />

      {/* 신뢰지표 (S-03) */}
      <TrustStatsSection />

      {/* 우리 동네에서 (S-04) */}
      <LocalDiscoverySection />

      {/* 보호자와 함께 (S-05) */}
      <GuardianSection />

      {/* 원장님과 함께 (S-06) */}
      <DirectorSection />

      {/* 자주 묻는 질문 (S-07) */}
      <FAQSection />

      {/* 최종 CTA (S-08) */}
      <FinalCtaSection />
    </div>
  );
}
