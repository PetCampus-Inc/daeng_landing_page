'use client';

import { IconType, IconButton } from '@/components/IconButton';
import Image from 'next/image';

import { motion } from 'framer-motion';
import { cn } from '@/lib/tw';
import { useEffect, useRef, useState } from 'react';
import { CaretDown } from '@/assets/icons';

export type LinkType = Extract<IconType, 'GitHub' | 'LinkedIn' | 'Velog' | 'Instagram'>;

export interface MemberInfo {
  name: string;
  introduction: string;
  badges: string[];
  links: { type: LinkType; url: string }[];
}

export function MemberCard({ name, introduction, badges, links }: MemberInfo) {
  const textRef = useRef<HTMLParagraphElement>(null);

  const [isExpanded, setIsExpanded] = useState(false);
  const [isTextTruncated, setIsTextTruncated] = useState(false);

  useEffect(() => {
    if (!textRef.current) return;

    const { scrollHeight, clientHeight, scrollWidth, clientWidth } = textRef.current;
    setIsTextTruncated(scrollHeight > clientHeight || scrollWidth > clientWidth);
  }, []);

  return (
    <div className="rounded-tl-md rounded-br-md rounded-tr-2xl rounded-bl-2xl p-4 bg-background shadow-card">
      <div className="relative flex-1 aspect-square bg-surface-accent rounded-lg overflow-hidden">
        <Image
          className="object-contain"
          src="https://picsum.photos/300/300"
          alt="프로필 사진"
          fill
        />
      </div>

      {/* 이름 및 소개글 */}
      <div className="px-1 mt-6">
        <p className="text-title-18">{name}</p>
        <div
          className="flex-1 mt-1 h-15 text-body-14"
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
        >
          <motion.p
            ref={textRef}
            className={cn('overflow-hidden text-foreground-muted bg-background')}
            initial={{ height: '6rem' }}
            animate={{ height: isTextTruncated && isExpanded ? '11.4rem' : '6rem' }}
            transition={{ duration: 0.1 }}
          >
            {introduction}
          </motion.p>

          {isTextTruncated && (
            <motion.span
              className="text-foreground-muted flex items-center justify-center"
              initial={{ opacity: 1 }}
              animate={{ opacity: isExpanded ? 0 : 1 }}
              transition={{ duration: 0.2 }}
            >
              <CaretDown />
            </motion.span>
          )}
        </div>
      </div>

      <motion.div
        className="flex items-center justify-between px-1 mt-8 gap-5"
        initial={{ opacity: 1, y: 0 }}
        animate={{
          opacity: isTextTruncated && isExpanded ? 0 : 1,
          y: isTextTruncated && isExpanded ? 20 : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        {/* 링크 버튼 */}
        <div className="flex gap-1">
          {links.map(({ type, url }) => (
            <a key={type} href={url} target="_blank" rel="noopener noreferrer">
              <IconButton icon={type} />
            </a>
          ))}
        </div>

        {/* 뱃지 */}
        <div className="flex-1 flex overflow-hidden rotate-180">
          <div className="flex gap-1 overflow-x-auto rotate-180">
            {badges.map((badge) => (
              <span
                key={badge}
                className="bg-surface-accent text-body-13 text-foreground-muted px-2 py-1 rounded-sm whitespace-nowrap"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
