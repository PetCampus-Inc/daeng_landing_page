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
