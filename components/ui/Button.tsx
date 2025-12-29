import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          // Base styles
          'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          'active:scale-[0.98]',

          // Variant styles
          {
            // Primary - filled blue
            'bg-primary-600 text-white hover:bg-primary-700 shadow-sm':
              variant === 'primary',

            // Secondary - gray background
            'bg-gray-100 text-gray-900 hover:bg-gray-200': variant === 'secondary',

            // Ghost - transparent with hover
            'text-gray-700 hover:bg-gray-100 hover:text-gray-900': variant === 'ghost',

            // Outline - bordered
            'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400':
              variant === 'outline',
          },

          // Size styles
          {
            'h-8 px-3 text-sm': size === 'sm',
            'h-10 px-4 text-sm': size === 'md',
            'h-12 px-6 text-base': size === 'lg',
            'h-10 w-10 p-0': size === 'icon',
          },

          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
