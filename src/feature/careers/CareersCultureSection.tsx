'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

import { Content } from '@/components/Content';
import { cn } from '@/lib/tw';

const workTools = [
  {
    name: 'Jira',
    title: '현업과 같은 방식으로 Jira를 세팅합니다',
    description: '실제 현업의 방식 그대로 세팅하며, 정해진 워크플로우를 준수합니다.',
    image: '/images/careers/jira.png',
  },
  {
    name: 'Notion',
    title: 'Notion에 맥락과 결정 사항을 남깁니다',
    description: '회의록, 기획 배경, 운영 기준을 문서로 정리해 누구나 같은 정보를 보고 움직입니다.',
    image: '/images/careers/notion.png',
  },
  {
    name: 'Discord',
    title: 'Discord에서 회의와 모니터링을 함께 합니다',
    description: '실시간, 데일리, 주간 회의뿐만 아니라 각종 모니터링도 Discord에서 진행합니다.',
    image: '/images/careers/discord.png',
  },
  {
    name: 'Admin',
    title: 'Admin으로 팀의 기록을 남기고 싱크를 맞춥니다',
    description: '사이드 프로젝트 인원끼리 싱크업을 진행하고, 데일리 기록을 남깁니다.',
    image: '/images/careers/admin.png',
  },
];

const sideProject = {
  name: 'Side Project',
  title: '단순한 사이드프로젝트를 넘어 현업처럼 진행합니다',
  description:
    '친목과 커리어를 함께 생각하며 최대한 현업과 비슷한 방식으로 진행합니다. 스프린트는 짧게는 2주, 길어도 한 달을 넘기지 않고 단기간에 최대한의 output을 냅니다.',
  image: '/images/careers/side-project.ico',
};

function ImageFrame({
  src,
  alt,
  className,
  imageClassName,
}: {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl border border-border-accent bg-white',
        className,
      )}
    >
      {!failed && (
        <img
          src={src}
          alt={alt}
          className={cn('absolute inset-0 h-full w-full object-contain p-3', imageClassName)}
          loading="lazy"
          onError={() => setFailed(true)}
        />
      )}
      {failed && (
        <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
          <span className="text-14 font-medium text-foreground-muted">{alt} 이미지 영역</span>
        </div>
      )}
    </div>
  );
}

export function CareersCultureSection({ className }: { className?: string }) {
  return (
    <section className={cn('w-full flex justify-center bg-white', className)}>
      <Content className="flex flex-col gap-14 py-16 max-md:gap-10">
        <motion.div
          className="flex flex-col gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <span className="text-14 font-semibold text-primary">How we work</span>
          <h2 className="text-28 font-bold text-foreground max-md:text-24">
            우리는 이렇게 일합니다
          </h2>
          <p className="max-w-[620px] text-16 text-foreground-muted">
            작은 팀이지만 업무 흐름은 투명하게 맞추고, 실제 운영 데이터를 보며 빠르게 개선합니다.
          </p>
        </motion.div>

        <div className="grid grid-cols-4 gap-5 max-lg:grid-cols-2 max-md:grid-cols-1">
          {workTools.map((tool, index) => (
            <motion.article
              key={tool.name}
              className="flex min-h-[38rem] flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
            >
              <ImageFrame
                src={tool.image}
                alt={tool.name}
                className="h-[20rem] rounded-none border-0 bg-surface"
              />
              <div className="flex flex-1 flex-col gap-3 p-6">
                <span className="w-fit rounded-full bg-surface-accent px-3 py-1 text-13 font-medium text-foreground-muted">
                  {tool.name}
                </span>
                <h3 className="text-20 font-semibold text-foreground">{tool.title}</h3>
                <p className="text-14 text-foreground-muted">{tool.description}</p>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.article
          className="grid overflow-hidden rounded-2xl border border-border bg-[#F7F9F8] shadow-card grid-cols-[1fr_1.05fr] max-md:grid-cols-1"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex flex-col justify-center gap-4 p-10 max-md:p-6">
            <span className="w-fit rounded-full bg-white px-3 py-1 text-13 font-medium text-primary">
              {sideProject.name}
            </span>
            <h3 className="text-28 font-bold text-foreground max-md:text-24">{sideProject.title}</h3>
            <p className="text-16 text-foreground-muted">{sideProject.description}</p>
          </div>
          <ImageFrame
            src={sideProject.image}
            alt={sideProject.name}
            className="min-h-[34rem] rounded-none border-0 bg-surface max-md:min-h-[24rem]"
            imageClassName="p-28 max-md:p-16"
          />
        </motion.article>
      </Content>
    </section>
  );
}
