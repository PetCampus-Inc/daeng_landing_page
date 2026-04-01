import { AppDownload } from '@/components/AppDownload';
import { Content } from '@/components/Content';
import { cn } from '@/lib/tw';
import Image from 'next/image';

export function AppDownloadSection({ className }: { className?: string }) {
  return (
    <section className={cn('relative w-full flex justify-center', className)}>
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <Image
          src="/images/banner.webp"
          alt="banner"
          sizes="100%"
          fill
          className="object-cover"
          loading="lazy"
        />
      </div>

      <Content className="pt-28 pb-40">
        <p className="text-42 max-sm:text-28 max-md:text-32 font-semibold text-primary-foreground">
          유치원 탐색부터 비교까지
          <br />
          똑독과 함께 현명하게 선택하세요
        </p>
        <AppDownload className="w-full mt-12 min-sm:max-w-96 max-lg:mt-8" theme="dark" />
      </Content>
    </section>
  );
}
