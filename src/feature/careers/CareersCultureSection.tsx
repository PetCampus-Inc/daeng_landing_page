'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

import { LinkedInIcon } from '@/assets/icons';
import { Content } from '@/components/Content';
import { cn } from '@/lib/tw';

import { careersTypography } from './typography';

type WorkTool = {
  name: string;
  title: string;
  description: string;
  image: string;
  titleLines?: readonly string[];
  descriptionLines?: readonly string[];
};

const workTools: WorkTool[] = [
  {
    name: 'Jira',
    title: '현업과 같은 방식으로 Jira를 세팅합니다',
    titleLines: ['현업과 같은 방식으로', 'Jira를 세팅합니다'],
    description: '실제 현업의 방식 그대로 세팅하며, 정해진 워크플로우를 준수합니다.',
    descriptionLines: ['실제 현업의 방식 그대로 세팅하며,', '정해진 워크플로우를 준수합니다.'],
    image: '/images/careers/jira.png',
  },
  {
    name: 'Notion',
    title: 'Notion에 맥락과 결정 사항을 남깁니다',
    titleLines: ['Notion에 맥락과', '결정 사항을 남깁니다'],
    description: '회의록, 기획 배경, 운영 기준을 문서로 정리해 누구나 같은 정보를 보고 움직입니다.',
    descriptionLines: [
      '회의록, 기획 배경, 운영 기준을 문서로',
      '정리해 누구나 같은 정보를 보고 움직입니다.',
    ],
    image: '/images/careers/notion.png',
  },
  {
    name: 'Discord',
    title: 'Discord에서 회의와 모니터링을 함께합니다',
    titleLines: ['Discord에서 회의와', '모니터링을 함께합니다'],
    description: '실시간, 데일리, 주간 회의뿐만 아니라 각종 모니터링도 Discord에서 진행합니다.',
    descriptionLines: [
      '실시간, 데일리, 주간 회의뿐만 아니라',
      '각종 모니터링도 Discord에서 진행합니다.',
    ],
    image: '/images/careers/discord.png',
  },
  {
    name: 'Admin',
    title: 'Admin으로 팀의 기록을 남기고 싱크를 맞춥니다',
    titleLines: ['Admin으로 팀의 기록을 남기고', '싱크를 맞춥니다'],
    description: '사이드 프로젝트 인원끼리 싱크업을 진행하고 데일리 기록을 남깁니다.',
    descriptionLines: ['사이드 프로젝트 인원끼리 싱크업을', '진행하고 데일리 기록을 남깁니다.'],
    image: '/images/careers/admin.png',
  },
];

const sideProject = {
  name: 'Side Project',
  title: '단순한 사이드 프로젝트를 넘어 현업처럼 진행합니다',
  description:
    '친목과 커리어를 함께 생각하며 최대한 현업과 비슷한 방식으로 진행합니다. 스프린트는 짧게는 2주, 길어도 한 달을 넘기지 않고 단기간에 최대한의 output을 냅니다.',
  tabletDescriptionLines: [
    '친목과 커리어를 함께 생각하며 최대한 현업과 비슷한 방식으로 진행합니다.',
    '스프린트는 짧게는 2주, 길어도 한 달을 넘기지 않고 단기간에 최대한의 output을 냅니다.',
  ],
};

const teamMembers = [
  {
    id: 'park-naeun',
    name: '박내은',
    role: 'Product Manager',
    linkedinUrl:
      'https://www.linkedin.com/in/naeeunpark?utm_source=share_via&utm_content=profile&utm_medium=member_android',
  },
  {
    id: 'lee-sojeong',
    name: '이소정',
    role: 'Product Manager',
    linkedinUrl:
      'https://www.linkedin.com/in/소정-이-947b8131b?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
  },
  {
    id: 'son-wonjin',
    name: '손원진',
    role: 'Product Designer',
    linkedinUrl: 'https://www.linkedin.com/in/원진-손-658603359/',
  },
  {
    id: 'han-yesol',
    name: '한예솔',
    role: 'Product Designer',
    linkedinUrl:
      'https://www.linkedin.com/in/예솔-한-048580368?utm_source=share_via&utm_content=profile&utm_medium=member_android',
  },
  {
    id: 'kim-hyeonsu',
    name: '김현수',
    role: 'Front-end Developer',
    linkedinUrl:
      'https://www.linkedin.com/in/hyeonsukim?utm_source=share_via&utm_content=profile&utm_medium=member_android',
  },
  {
    id: 'kang-minje',
    name: '강민제',
    role: 'Full-stack Developer',
    linkedinUrl: 'https://www.linkedin.com/in/minsjes/',
  },
  {
    id: 'han-gyeongjun',
    name: '한경준',
    role: 'Back-end Developer',
    linkedinUrl: 'https://www.linkedin.com/in/hkjbrian/',
  },
];

const aiWorkflow = {
  name: 'AI Workflow',
  title: 'AI 시대에서 살아남는 방법을 실전 업무로 익힙니다',
  desktopTitleLines: ['AI 시대에서 살아남는 방법을', '실전 업무로 익힙니다'],
  description:
    '기획 AI로 문제 정의와 요구사항을 빠르게 정리하고, 개발 AI로 구현과 코드 리뷰의 밀도를 높입니다. 데이터 분석·수집 AI로 운영 데이터를 읽고, 하네스 프로그래밍으로 반복 가능한 테스트와 검증 흐름까지 만들어갑니다.',
  descriptionLines: [
    '기획 AI로 문제 정의와 요구사항을 빠르게 정리하고,',
    '개발 AI로 구현과 코드 리뷰의 밀도를 높입니다.',
    '데이터 분석·수집 AI로 운영 데이터를 읽고,',
    '하네스 프로그래밍으로 반복 가능한 테스트와 검증 흐름까지 만들어갑니다.',
  ],
  image: '/images/careers/ai-workflow-python-md.png',
  items: [
    {
      label: '기획 AI',
      description: 'Markdown 문서로 문제 정의, 기능 범위, 사용자 시나리오를 빠르게 구체화합니다.',
    },
    {
      label: '개발 AI',
      description: 'Python 코드와 리뷰 흐름을 함께 다루며 구현 속도와 코드 품질을 끌어올립니다.',
    },
    {
      label: '데이터 분석·수집 AI',
      description: '운영 데이터와 리서치 자료를 수집·정리해 판단 가능한 인사이트로 연결합니다.',
    },
    {
      label: '하네스 프로그래밍',
      description: '자동화된 테스트와 검증 루프를 만들어 AI 결과물을 반복 가능하게 다룹니다.',
    },
  ],
};

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: 'easeInOut' as const },
};

function ResponsiveLines({
  text,
  desktopLines,
}: {
  text: string;
  desktopLines?: readonly string[];
}) {
  if (!desktopLines) return text;

  return (
    <>
      <span className="xl:hidden">{text}</span>
      <span className="hidden xl:block">
        {desktopLines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </span>
    </>
  );
}

function FixedLines({ text, lines }: { text: string; lines?: readonly string[] }) {
  if (!lines) return text;

  return lines.map((line) => (
    <span key={line} className="block">
      {line}
    </span>
  ));
}

function MobileSingleLine({ text, lines }: { text: string; lines?: readonly string[] }) {
  return (
    <>
      <span className="block min-[360px]:whitespace-nowrap md:hidden">{text}</span>
      <span className="hidden md:block">
        <FixedLines text={text} lines={lines} />
      </span>
    </>
  );
}

function TabletLines({ text, lines }: { text: string; lines: readonly string[] }) {
  return (
    <>
      <span className="md:hidden">{text}</span>
      <span className="hidden md:block">
        {lines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </span>
    </>
  );
}

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
  return (
    <div className={cn('relative overflow-hidden rounded-r5 bg-surface', className)}>
      <Image
        src={src}
        alt={alt}
        fill
        unoptimized={src.endsWith('.ico')}
        sizes="(max-width: 767px) 100vw, (max-width: 1359px) 50vw, 33vw"
        className={cn('object-contain p-6', imageClassName)}
      />
    </div>
  );
}

export function CareersCultureSection({ className }: { className?: string }) {
  return (
    <section className={cn('w-full bg-background', className)}>
      <Content className="flex flex-col gap-16 py-16 md:py-24 xl:py-32">
        <motion.header className="max-w-180" {...reveal}>
          <p className={cn(careersTypography.sectionGuide, 'font-bold text-primary')}>
            How we work
          </p>
          <h1
            className={cn(careersTypography.sectionMain, 'mt-4 font-bold text-foreground md:mt-5')}
          >
            우리는 이렇게 일합니다
          </h1>
          <p
            className={cn(
              careersTypography.sectionSupporting,
              'mt-2 text-foreground-muted xl:mt-4',
            )}
          >
            <span className="md:hidden">
              <span className="block min-[360px]:whitespace-nowrap">
                작은 팀이지만 업무 흐름은 투명하게 맞추고,
              </span>
              <span className="block min-[360px]:whitespace-nowrap">
                실제 운영 데이터를 보며 빠르게 개선합니다.
              </span>
            </span>
            <span className="hidden md:inline">
              작은 팀이지만 업무 흐름은 투명하게 맞추고, 실제 운영 데이터를 보며 빠르게 개선합니다.
            </span>
          </p>
        </motion.header>

        <div className="grid items-start gap-6 md:grid-cols-2 xl:grid-cols-4">
          {workTools.map((tool, index) => (
            <motion.article
              key={tool.name}
              className="flex flex-col overflow-hidden rounded-r5 border border-border bg-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeInOut', delay: index * 0.06 }}
            >
              <ImageFrame
                src={tool.image}
                alt={tool.name}
                className="aspect-4/3 shrink-0 rounded-none"
              />
              <div className="flex flex-1 flex-col px-4 py-6">
                <span
                  className={cn(
                    careersTypography.badge,
                    'mb-4 font-bold bg-surface-accent text-primary',
                  )}
                >
                  {tool.name}
                </span>
                <h2
                  className={cn(
                    careersTypography.contentMain,
                    'mb-2 font-bold text-foreground xl:mb-4',
                  )}
                >
                  <MobileSingleLine text={tool.title} lines={tool.titleLines} />
                </h2>
                <p className={cn(careersTypography.contentSupporting, 'text-foreground-muted')}>
                  <FixedLines text={tool.description} lines={tool.descriptionLines} />
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.article
          className="grid overflow-hidden rounded-r6 bg-neutral-900 text-white lg:grid-cols-2"
          {...reveal}
        >
          <div className="flex flex-col justify-center px-4 py-6 md:px-6 md:py-10 xl:px-8 xl:py-16">
            <span className={cn(careersTypography.badge, 'font-bold bg-primary text-white')}>
              {aiWorkflow.name}
            </span>
            <h2 className={cn(careersTypography.sectionMain, 'mt-5 font-bold text-white')}>
              <ResponsiveLines
                text={aiWorkflow.title}
                desktopLines={aiWorkflow.desktopTitleLines}
              />
            </h2>
            <p className={cn(careersTypography.sectionSupporting, 'mt-2 text-neutral-300 xl:mt-4')}>
              <FixedLines text={aiWorkflow.description} lines={aiWorkflow.descriptionLines} />
            </p>
            <div className="mt-8 grid gap-4">
              {aiWorkflow.items.map((item) => (
                <div
                  key={item.label}
                  className="grid gap-2 border-t border-white/20 pt-4 md:grid-cols-3 xl:gap-6"
                >
                  <span
                    className={cn(careersTypography.contentMain, 'font-semibold text-orange-300')}
                  >
                    {item.label}
                  </span>
                  <p
                    className={cn(
                      careersTypography.contentSupporting,
                      'text-neutral-300 md:col-span-2',
                    )}
                  >
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <ImageFrame
            src={aiWorkflow.image}
            alt={aiWorkflow.name}
            className="aspect-4/3 rounded-none bg-neutral-800 lg:aspect-auto"
            imageClassName="object-cover p-0"
          />
        </motion.article>

        <motion.article {...reveal}>
          <div className="max-w-180 xl:max-w-none">
            <span
              className={cn(careersTypography.badge, 'font-bold bg-surface-accent text-primary')}
            >
              {sideProject.name}
            </span>
            <h2
              className={cn(
                careersTypography.sectionMain,
                'mt-5 font-bold text-foreground xl:whitespace-nowrap',
              )}
            >
              <span className="md:hidden">
                <span className="block">단순한 사이드 프로젝트를 넘어</span>
                <span className="block">현업처럼 진행합니다</span>
              </span>
              <span className="hidden md:inline">{sideProject.title}</span>
            </h2>
            <p
              className={cn(
                careersTypography.sectionSupporting,
                'mt-2 text-foreground-muted xl:mt-4',
              )}
            >
              <TabletLines
                text={sideProject.description}
                lines={sideProject.tabletDescriptionLines}
              />
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4">
            {teamMembers.map((member) => (
              <article
                key={member.id}
                className="flex min-h-[18rem] flex-col rounded-r4 border border-border bg-surface p-6"
              >
                <h3 className={cn(careersTypography.contentMain, 'font-semibold text-foreground')}>
                  {member.name}
                </h3>
                <p
                  className={cn(
                    careersTypography.contentSupporting,
                    'mt-2 font-semibold text-foreground-muted',
                  )}
                >
                  {member.role}
                </p>
                <a
                  href={member.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} LinkedIn 프로필로 이동`}
                  className="mt-auto flex w-full items-end justify-between text-left text-label font-semibold text-foreground transition-colors duration-140 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                >
                  <span>LinkedIn</span>
                  <span className="flex size-10 items-center justify-center rounded-r3 bg-primary text-primary-foreground">
                    <LinkedInIcon className="size-5" aria-hidden="true" />
                  </span>
                </a>
              </article>
            ))}
          </div>
        </motion.article>
      </Content>
    </section>
  );
}
