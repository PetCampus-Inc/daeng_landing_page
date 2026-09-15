import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [
        'display-1',
        'display-2',
        'display-3',
        'heading-1',
        'heading-2',
        'heading-3',
        'body-1',
        'body-2',
        'label',
        'caption-1',
        'caption-2',
      ],
    },
  },
});

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
