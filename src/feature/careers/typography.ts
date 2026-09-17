/**
 * 페이지 공통 반응형 타이포 역할.
 * CLAUDE.md 2.3.1의 canonical mapping과 같은 값을 유지한다.
 */
export const careersTypography = {
  badge:
    'inline-flex w-fit items-center rounded-full px-2 py-1 text-caption-1 md:px-3 md:py-2 md:text-label',
  sectionGuide: 'text-caption-1 md:text-body-1',
  sectionMain:
    'text-heading-3 leading-[28px] md:text-display-4 md:leading-[50px] xl:text-display-3 xl:leading-[54px]',
  sectionSupporting: 'text-body-1 md:text-heading-2',
  contentMain: 'text-body-2 md:text-heading-2',
  contentSupporting: 'text-body-2 md:text-body-1',
} as const;
