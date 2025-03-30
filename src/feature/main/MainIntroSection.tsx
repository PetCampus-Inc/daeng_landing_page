'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

import { Content } from '@/components/Content';
import { AppDownload } from '@/components/AppDownload';

export function MainIntroSection() {
  return (
    <section className="h-screen max-lg:h-auto flex justify-center bg-gradient-to-b from-[#FFF] to-[#FFF8EF]">
      <Content className="flex items-center pt-header max-lg:flex-col max-lg:mt-16 min-md:justify-between">
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <h2 className="text-48 font-semibold max-md:text-32 max-lg:text-center">
              강아지 유치원의
            </h2>
            <h2 className="text-48 font-semibold max-md:text-32 max-lg:text-center">
              스마트한 비서
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
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5, ease: 'easeInOut' }}
          >
            운영은 간편하게, 서비스는 완벽하게
          </motion.h3>

          <motion.div
            className="mb-4 mt-14 max-lg:mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1, ease: 'easeInOut' }}
          >
            <AppDownload />
          </motion.div>
        </div>

        <motion.div
          className="relative w-full max-w-[60rem] h-[70rem] max-lg:mt-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 1, ease: 'easeInOut' }}
        >
          <Image src="/images/intro.webp" alt="intro" fill className="object-contain" />
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
