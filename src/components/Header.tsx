'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { Logo } from '@/components/Logo';
import { IconButton } from '@/components/IconButton';
import { AppDownloadDrawer } from '@/components/AppDownloadDrawer';
import { cn } from '@/lib/tw';

// S-01: 앵커 5개 (최종 시안 그대로 — "똑독은"은 S-03으로 연결된다)
const NAV_ITEMS = [
  { label: '똑독은', id: 's03' },
  { label: '우리 동네에서', id: 's04' },
  { label: '보호자와 함께', id: 's05' },
  { label: '원장님과 함께', id: 's06' },
  { label: '무엇이든', id: 's07' },
];

export function Header() {
  // 캡슐(pill) 바 자체에만 건다 — <header>는 드롭다운이 열리면 함께 커져서,
  // 거기서 높이를 재면 드롭다운 높이까지 포함돼 스크롤이 필요 이상으로 내려간다.
  const pillRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  // 모바일 드롭다운 메뉴 전용: fixed 헤더(pill)가 가리는 높이만큼 보정해서 스크롤한다.
  // (헤더 높이는 --height-header 토큰이 실제 캡슐형 헤더와 어긋나 있어 직접 측정한다.)
  // 메뉴는 무슨 일이 있어도 닫혀야 하므로 스크롤 계산은 try/finally로 감싼다.
  const scrollToSection = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    try {
      const target = document.getElementById(id);
      if (!target) return;

      // pill이 fixed라 bottom 좌표 자체가 "뷰포트 top에서부터 가려지는 높이"다
      // (header의 자체 top padding까지 자동으로 포함됨).
      const coveredHeight = pillRef.current?.getBoundingClientRect().bottom ?? 0;
      const top = target.getBoundingClientRect().top + window.scrollY - coveredHeight;
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' });
    } finally {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 현재 스크롤 위치가 속한 섹션의 메뉴 항목 강조 (FR-LP-002)
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;

    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 py-3 md:px-8 md:py-4">
      {/* 끝까지 둥근 캡슐형 헤더 — 배경색은 유지하고 스크롤 이후에만 그림자 표시 (FR-LP-001) */}
      <div
        ref={pillRef}
        className={cn(
          'mx-auto flex h-14 w-full max-w-content items-center justify-between gap-4 rounded-full border border-border bg-white px-5 transition-shadow duration-140',
          'md:h-16 md:py-2 md:pl-6 md:pr-2 xl:pl-10',
          isScrolled && 'shadow-card',
        )}
      >
        <Logo
          aria-label="똑독 홈으로 이동"
          className="flex h-6 shrink-0 items-center text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary [&>svg]:h-full [&>svg]:w-auto xl:h-7"
        />

        <nav className="hidden items-center gap-6 md:flex xl:gap-10">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.id}
              href={`/#${item.id}`}
              className={cn(
                'text-body-2 font-medium text-foreground transition-colors duration-140 xl:text-body-1',
                'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary',
                active === item.id && 'font-semibold text-primary underline underline-offset-4',
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <AppDownloadDrawer>
            <button
              type="button"
              className={cn(
                'hidden h-12 items-center rounded-full bg-primary px-6 text-label font-bold text-primary-foreground md:inline-flex',
                'transition-colors duration-140 hover:bg-orange-600 active:scale-95',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
              )}
            >
              앱 다운로드
            </button>
          </AppDownloadDrawer>

          <IconButton
            className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:hidden"
            size="lg"
            icon={isOpen ? 'CloseIcon' : 'MenuIcon'}
            aria-label={isOpen ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsOpen((prev) => !prev)}
          />
        </div>
      </div>

      {/* 모바일 펼침 메뉴 — height:'auto' framer-motion 애니메이션이 클릭을 막는 상태를
          남기는 것 같아서, 안 열려있을 땐 DOM에서 완전히 빼는 조건부 렌더링으로 바꿨다.
          (열려있을 때만 존재하니 뭔가가 클릭을 가로챌 여지가 없다) */}
      {isOpen && (
        <motion.nav
          id="mobile-navigation"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
          className="mx-auto mt-2 w-full max-w-content rounded-xl border border-border bg-white md:hidden"
        >
          <ul className="flex flex-col p-2">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                {/* 같은 페이지 안 이동이라 next/link 대신 일반 <a>로 직접 제어한다
                    (Link의 자체 hash-scroll 처리와 우리 offset 스크롤이 겹치지 않게) */}
                <a
                  href={`#${item.id}`}
                  onClick={scrollToSection(item.id)}
                  className={cn(
                    'block rounded-xl px-4 py-4 text-body-2 font-semibold text-foreground',
                    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
                    active === item.id && 'text-primary',
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </motion.nav>
      )}
    </header>
  );
}
