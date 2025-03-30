'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

import { Logo } from '@/components/Logo';
import { IconButton } from '@/components/IconButton';
import { cn } from '@/lib/tw';

export function Header() {
  const headerRef = useRef<HTMLElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(0);

  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (!headerRef.current) return;

      const { height } = headerRef.current.getBoundingClientRect();
      const scrollPosition = window.scrollY;
      const scrollRatio = Math.min(scrollPosition / height, 1);
      setScrolled(scrollRatio);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menus = [
    { label: '똑독', href: '/' },
    { label: '팀 소개', href: '/team' },
    { label: '도입문의', href: '/inquiry' },
  ];

  return (
    <motion.nav
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-10 flex justify-center overflow-hidden"
      initial={{ height: 'var(--height-header)' }}
      animate={{
        height: isOpen ? 'auto' : `var(--height-header)`,
        backgroundColor: isOpen ? 'var(--color-background)' : `rgba(255, 255, 255, ${scrolled})`,
      }}
      transition={{ duration: 0.2 }}
    >
      <div className="mx-8 w-full max-w-content flex items-center justify-between max-md:mx-4 max-md:flex-col">
        <div className="min-h-header flex items-center max-md:w-full">
          <Logo />

          <IconButton
            className="absolute right-2 md:hidden"
            size="lg"
            icon={isOpen ? 'Close' : 'Menu'}
            aria-label={isOpen ? '메뉴 닫기' : '메뉴 열기'}
            onClick={() => setIsOpen((prev) => !prev)}
          />
        </div>

        <div className="flex gap-8 md:items-center max-md:flex-col max-md:gap-12 max-md:w-full max-md:pt-2 max-md:pb-8">
          {/* 네비게이션 메뉴 */}
          <ul className="flex gap-3 max-md:flex-col max-md:w-full max-md:gap-0">
            {menus.map((menu) => (
              <li key={menu.href}>
                <Link
                  href={menu.href}
                  className={cn(
                    'block w-full h-full px-3 py-2 text-16 font-semibold text-foreground rounded-md hover:bg-surface-accent max-md:py-4',
                    menu.href === pathname && 'text-primary font-semibold',
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {menu.label}
                </Link>
              </li>
            ))}
          </ul>

          <button className="h-fit w-fit px-2.5 py-1 bg-primary rounded-sm text-14 font-semibold text-primary-foreground">
            앱 다운로드
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
