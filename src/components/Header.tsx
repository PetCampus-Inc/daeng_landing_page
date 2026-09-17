'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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

const PAGE_NAV_ITEMS = [
  { label: '똑독', href: '/' },
  { label: '일하는 방식', href: '/work' },
  { label: '지원하기', href: '/careers' },
];

export function Header() {
  const pathname = usePathname();
  const normalizedPathname = pathname?.replace(/\/+$/, '') || '/';
  const isHome = normalizedPathname === '/';
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 현재 스크롤 위치가 속한 섹션의 메뉴 항목 강조 (FR-LP-002)
  useEffect(() => {
    if (!isHome) return;
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
  }, [isHome]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 h-[60px] border-b border-border bg-white transition-shadow duration-140 md:h-[76px] md:max-[920px]:h-[60px]',
        isScrolled && 'shadow-card',
      )}
    >
      {/* Content와 동일하게 바깥 wrapper가 page padding, 안쪽 grid가 실제 1320px 폭을 담당한다. */}
      <div className="h-full w-full px-4 md:px-8">
        <div
          className={cn(
            'mx-auto grid h-full w-full max-w-content grid-cols-[1fr_auto] items-center gap-2 py-4',
            'md:grid-cols-[auto_auto_1fr] md:gap-6 md:max-[920px]:grid-cols-[1fr_auto]',
            'xl:grid-cols-[1fr_auto_1fr] xl:gap-2',
          )}
        >
          <Logo
            aria-label="똑독 홈으로 이동"
            className="flex h-6 shrink-0 justify-self-start text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary [&>svg]:h-full [&>svg]:w-auto xl:h-7"
          />

          <nav
            aria-label="랜딩페이지 섹션"
            className="hidden min-w-max items-center gap-6 md:ml-6 md:flex md:max-[920px]:hidden xl:ml-0"
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.id}
                href={`/#${item.id}`}
                className={cn(
                  'whitespace-nowrap text-label-lg font-medium text-foreground transition-colors duration-140',
                  'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary',
                  isHome &&
                    active === item.id &&
                    'font-semibold text-primary underline underline-offset-4',
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex min-w-max shrink-0 items-center justify-self-end gap-2 xl:gap-4">
            <nav
              aria-label="페이지 이동"
              className="hidden h-11 min-w-max items-center rounded-full border border-border bg-white px-6 md:flex md:max-[920px]:h-auto md:max-[920px]:rounded-none md:max-[920px]:border-0 md:max-[920px]:bg-transparent md:max-[920px]:px-0"
            >
              {PAGE_NAV_ITEMS.slice(1).map((item, index) => (
                <div key={item.href} className="flex items-center">
                  {index > 0 && <span aria-hidden="true" className="mx-3 h-5 w-px bg-border" />}
                  <Link
                    href={item.href}
                    aria-current={normalizedPathname === item.href ? 'page' : undefined}
                    className={cn(
                      'whitespace-nowrap text-label-lg font-medium text-foreground transition-colors duration-140',
                      'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary',
                      normalizedPathname === item.href && 'font-semibold text-primary',
                    )}
                  >
                    {item.label}
                  </Link>
                </div>
              ))}
            </nav>

            <AppDownloadDrawer>
              <button
                type="button"
                className={cn(
                  'hidden h-11 items-center whitespace-nowrap rounded-full bg-primary px-6 text-label-lg font-bold text-primary-foreground xl:inline-flex',
                  'transition-colors duration-140 hover:bg-orange-600 active:scale-95',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
                )}
              >
                앱 다운로드
              </button>
            </AppDownloadDrawer>

            <IconButton
              className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:hidden"
              size="md"
              icon={isOpen ? 'CloseIcon' : 'MenuIcon'}
              aria-label={isOpen ? '메뉴 닫기' : '메뉴 열기'}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
              onClick={() => setIsOpen((prev) => !prev)}
            />
          </div>
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
          className="w-full border-t border-border bg-white md:hidden"
        >
          <ul className="mx-auto flex w-full max-w-content flex-col px-4 py-2">
            {PAGE_NAV_ITEMS.slice(1).map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  aria-current={normalizedPathname === item.href ? 'page' : undefined}
                  className={cn(
                    'block rounded-r3 px-4 py-4 text-label-lg font-semibold text-foreground',
                    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
                    normalizedPathname === item.href && 'text-primary',
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.nav>
      )}
    </header>
  );
}
