import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * 테일윈드 클래스 문자열을 병합합니다.
 *
 * @example
 * ```ts
 * cn('bg-blue-500', 'text-white')
 * => 'bg-blue-500 text-white'
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
 *
 * @example
 * ```ts
 * modifier('hover', 'bg-blue-500 text-white')
 * => 'hover:bg-blue-500 hover:text-white'
 *
 * modifier('max-md', 'flex flex-col gap-4')
 * => 'max-md:flex max-md:flex-col max-md:gap-4'
 * ```
 *
 * @param modifier 적용할 테일윈드 수정자 (예: 'hover', 'focus', 'md', 'dark')
 * @param className 수정자를 적용할 테일윈드 유틸리티 클래스
 * @returns 수정자가 적용된 테일윈드 클래스 문자열
 */
export const modifier = (modifier: string, className: string) => {
  return className
    .split(' ')
    .map((utility) => `${modifier}:${utility}`)
    .join(' ');
};
