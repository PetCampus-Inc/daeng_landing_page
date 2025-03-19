'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

import { Logo } from '@/components/Logo';
import { IconButton } from '@/components/IconButton';
import { cn } from '@/lib/tw';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const menus = [
    { label: '팻 캠퍼스', href: '/' },
    { label: '팀 소개', href: '/team' },
    { label: '도입문의', href: '/inquiry' },
  ];

  return (
    <motion.nav
      className="fixed h-header top-0 left-0 right-0 z-10 flex justify-center overflow-hidden bg-background"
      initial={{ height: 'var(--height-header)' }}
      animate={{ height: isOpen ? 'auto' : 'var(--height-header)' }}
      transition={{ duration: 0.3 }}
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
                    'block w-full h-full px-3 py-2 text-title-16 text-foreground rounded-md hover:bg-surface-accent max-md:py-4',
                    menu.href === pathname && 'text-primary font-semibold',
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {menu.label}
                </Link>
              </li>
            ))}
          </ul>

          <button className="h-fit w-fit px-2.5 py-1 bg-primary rounded-sm text-body-14 font-semibold text-primary-foreground">
            앱 다운로드
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
