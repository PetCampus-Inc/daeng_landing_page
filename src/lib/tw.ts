import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * 테일윈드 클래스 문자열을 병합합니다.
 *
 * @example
 * ```ts
 * cn('bg-primary', 'text-foreground')
 * => 'bg-primary text-foreground'
 * ```
 *
 * @param inputs 병합할 테일윈드 클래스 문자열
 * @returns 병합된 테일윈드 클래스 문자열
 */
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

/**
 * 테일윈드 수정자(modifier)를 여러 클래스에 한 번에 적용합니다.
 * 여러 수정자를 공백으로 구분하여 전달할 수 있습니다.
 *
 * @example
 * ```ts
 * // 단일 수정자 적용
 * modifier('hover', 'bg-primary text-foreground')
 * => 'hover:bg-primary hover:text-foreground'
 *
 * // 여러 수정자 적용
 * modifier('hover focus', 'bg-primary text-foreground')
 * => 'hover:bg-primary hover:text-foreground focus:bg-primary focus:text-foreground'
 *
 * modifier('max-md', 'flex flex-col gap-4')
 * => 'max-md:flex max-md:flex-col max-md:gap-4'
 * ```
 *
 * @param modifier 적용할 테일윈드 수정자 (예: 'hover', 'focus', 'md', 'dark')
 *                 여러 수정자는 공백으로 구분 (예: 'hover focus')
 * @param className 수정자를 적용할 테일윈드 유틸리티 클래스들
 * @returns 수정자가 적용된 테일윈드 클래스 문자열
 */
export const modifier = (modifier: string, className: string) => {
  return modifier
    .split(' ')
    .map((mod) =>
      className
        .split(' ')
        .map((utility) => `${mod}:${utility}`)
        .join(' '),
    )
    .join(' ');
};
