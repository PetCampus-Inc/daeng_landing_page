import { HTMLAttributes, ReactNode, useEffect, useRef } from 'react';

import { cn } from '@/lib/tw';

interface StickyHorizontalScrollProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export function StickyHorizontalScroll({
  children,
  className,
  ...props
}: StickyHorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyContainerRef = useRef<HTMLDivElement>(null);
  const horizontalContainerRef = useRef<HTMLDivElement>(null);
  const ticking = useRef(false);

  // 컨테이너 높이 설정 함수
  const setContainerHeight = () => {
    if (!containerRef.current || !horizontalContainerRef.current || !stickyContainerRef.current)
      return;

    containerRef.current.style.height =
      horizontalContainerRef.current.offsetWidth -
      stickyContainerRef.current.offsetWidth +
      stickyContainerRef.current.offsetHeight +
      'px';
  };

  // 가로 스크롤 변환 함수
  const setHorizontalScroll = () => {
    if (!containerRef.current || !horizontalContainerRef.current || !stickyContainerRef.current)
      return;

    const scrollOffset = window.scrollY - containerRef.current.offsetTop;
    const maxTranslateX =
      horizontalContainerRef.current.offsetWidth - stickyContainerRef.current.offsetWidth;
    const translateX = Math.min(maxTranslateX, Math.max(0, scrollOffset));

    horizontalContainerRef.current.style.transform = `translate3d(-${translateX}px, 0, 0)`;
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          setHorizontalScroll();
          ticking.current = false;
        });

        ticking.current = true;
      }
    };

    const handleResize = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          setContainerHeight();
          setHorizontalScroll();
          ticking.current = false;
        });

        ticking.current = true;
      }
    };

    setContainerHeight();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn('relative w-[calc(100vw-1.5rem)] h-screen', className)}
      {...props}
    >
      <div
        ref={stickyContainerRef}
        className="sticky top-0 overflow-x-hidden w-full h-screen will-change-transform"
      >
        <div ref={horizontalContainerRef} className="inline-flex h-full will-change-transform">
          {children}
        </div>
      </div>
    </div>
  );
}
