'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

import { Content } from '@/components/Content';
import { AppDownload } from '@/components/AppDownload';

export function MainIntroSection() {
  return (
    <section className="relative min-h-screen flex justify-center bg-gradient-to-b from-[#FFF] to-[#FFF8EF] max-lg:min-h-0">
      <Content className="flex items-center justify-center gap-16 pt-header max-lg:flex-col max-lg:gap-10 max-lg:pt-32 max-lg:pb-16 max-md:pt-28">
        <div className="text-center">
          <h1 className="sr-only">똑독 – 강아지 유치원 탐색</h1>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <h2 className="text-48 font-semibold max-md:text-32">우리 강아지에게</h2>
            <h2 className="text-48 font-semibold max-md:text-32">
              딱 맞는 유치원
              <motion.span
                className="text-primary ml-2 inline-block"
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: [0, -14, 0] }}
                transition={{ duration: 0.3, delay: 1.7, ease: 'easeInOut' }}
              >
                똑
              </motion.span>
              <motion.span
                className="text-primary inline-block"
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: [0, -14, 0] }}
                transition={{ duration: 0.3, delay: 1.9, ease: 'easeInOut' }}
              >
                독!
              </motion.span>
            </h2>
          </motion.div>

          <motion.h3
            className="text-28 mt-4 text-foreground-muted max-md:text-24"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5, ease: 'easeInOut' }}
          >
            탐색부터 비교까지, 스마트하게
          </motion.h3>

          <motion.div
            className="mb-4 mt-14 max-lg:mt-8 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1, ease: 'easeInOut' }}
          >
            <AppDownload />
          </motion.div>
        </div>

        <motion.div
          className="w-[min(30vw,36rem)] shrink-0 max-lg:w-[min(62vw,30rem)] max-md:w-[min(68vw,27rem)]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
        >
          <Image
            src="/images/home/brand-cover.webp"
            alt="찾고, 연결하고, 모아보는 똑독 브랜드 소개"
            width={900}
            height={1948}
            priority
            sizes="(max-width: 767px) 68vw, (max-width: 1199px) 30rem, 30vw"
            className="h-auto w-full rounded-[2.8rem] shadow-card max-md:rounded-2xl"
          />
        </motion.div>
      </Content>

      <motion.div
        className="absolute left-1/2 -translate-x-1/2 bottom-20 animate-bounce max-lg:hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.6, y: 0 }}
        transition={{ duration: 0.5, delay: 2.5, ease: 'easeInOut' }}
      >
        <span className="relative text-13 text-foreground-muted after:content-[''] after:w-px after:bg-foreground-muted/40 after:absolute after:bottom-0 after:animate-line-drop after:left-1/2 after:-translate-x-1/2">
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
