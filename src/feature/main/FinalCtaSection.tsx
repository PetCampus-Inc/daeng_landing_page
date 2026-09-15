import Image from 'next/image';

import { QRDownloadIcon } from '@/assets/icons';
import s08CtaImage from '@/assets/images/s08-cta.jpg';
import { AppDownloadDrawer } from '@/components/AppDownloadDrawer';
import { Content } from '@/components/Content';
import { cn } from '@/lib/tw';

export function FinalCtaSection({ className }: { className?: string }) {
  return (
    <section
      id="s08"
      className={cn(
        // 모바일 전용 고정 높이 200px. md 이상은 fixed-final-cta/tablet-viewport-section의
        // CSS 규칙(globals.css, unlayered)이 항상 우선해서 그대로 유지된다.
        'fixed-final-cta tablet-viewport-section relative flex h-[200px] w-full justify-center overflow-hidden bg-neutral-900 text-white md:items-center',
        className,
      )}
    >
      <div className="absolute inset-0">
        <Image
          src={s08CtaImage}
          alt="유치원에서 즐거운 시간을 보내는 강아지"
          fill
          sizes="100vw"
          className="object-cover object-[center_55%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/85 via-neutral-900/60 to-neutral-900/35 md:bg-gradient-to-r md:from-neutral-900/85 md:via-neutral-900/60 md:to-neutral-900/35" />
      </div>

      {/* 모바일: 콘텐츠 더미를 섹션(200px) 안에서 가로·세로 모두 중앙(items-center + justify-center).
          <Content>는 안쪽에 div가 한 번 더 있는 구조라, h-full을 줘야 그 안쪽 div가
          바깥(섹션 높이 stretch로 200px가 된) div를 실제로 채우고, 그래야 justify-center가
          중앙 정렬할 여유 공간을 갖는다. */}
      <Content className="relative z-10 flex h-full flex-col items-center justify-center gap-8 py-20 md:h-auto md:flex-row md:items-center md:justify-between md:py-28">
        <div className="flex flex-col items-center text-center md:block md:text-left">
          {/* 모바일: 헤드라인 1줄(md은 기존 2줄 유지). 18px(text-heading-3), leading-none. */}
          <h2 className="text-heading-3 font-bold leading-none md:flex md:flex-col md:gap-2 md:text-display-2 md:leading-[58px]">
            <span className="whitespace-nowrap md:hidden">
              지금 바로 <span className="text-primary">똑독</span>과 함께하세요!
            </span>
            <span className="hidden md:inline">지금 바로</span>
            <span className="hidden md:inline">
              <span className="text-primary">똑독</span>과 함께하세요!
            </span>
          </h2>

          <AppDownloadDrawer>
            <button
              type="button"
              className={cn(
                'mt-5 inline-flex h-12 items-center rounded-full bg-primary px-6 text-label font-bold text-primary-foreground md:mt-8',
                'transition-colors duration-150 hover:bg-orange-600',
                'active:scale-[0.98] active:transition-transform',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
              )}
            >
              지금 시작하기
            </button>
          </AppDownloadDrawer>
        </div>

        <div className="rounded-2xl bg-white p-5 max-md:hidden">
          <QRDownloadIcon className="size-32" />
        </div>
      </Content>
    </section>
  );
}
