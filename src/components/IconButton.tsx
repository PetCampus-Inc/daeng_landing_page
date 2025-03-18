import { ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/tw';
import * as icons from '@/assets/icons';

const iconButtonVariants = cva(
  'flex items-center border border-transparent justify-center rounded-md transition-all duration-140 ease-in-out hover:bg-surface-accent active:scale-95 active:opacity-70',
  {
    variants: {
      size: {
        md: 'size-7 [&>*]:size-6',
        lg: 'size-9 [&>*]:size-7',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  icon: keyof typeof icons;
  iconClassName?: string;
}

export function IconButton({ size, icon, className, iconClassName, ...props }: IconButtonProps) {
  const Icon = icons[icon];

  return (
    <button className={cn(iconButtonVariants({ size, className }))} {...props}>
      <Icon className={iconClassName} />
    </button>
  );
}
