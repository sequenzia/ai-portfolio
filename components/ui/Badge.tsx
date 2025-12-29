import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'success' | 'warning' | 'error' | 'outline';
  size?: 'sm' | 'md';
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'sm', ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          // Base styles
          'inline-flex items-center font-medium rounded-full',

          // Size styles
          {
            'px-2 py-0.5 text-xs': size === 'sm',
            'px-2.5 py-1 text-sm': size === 'md',
          },

          // Variant styles
          {
            'bg-primary-100 text-primary-800': variant === 'default',
            'bg-gray-100 text-gray-800': variant === 'secondary',
            'bg-green-100 text-green-800': variant === 'success',
            'bg-yellow-100 text-yellow-800': variant === 'warning',
            'bg-red-100 text-red-800': variant === 'error',
            'border border-gray-300 text-gray-700 bg-transparent': variant === 'outline',
          },

          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';

// Skill level badge helper
export function SkillLevelBadge({
  level,
  className,
}: {
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  className?: string;
}) {
  const variantMap = {
    beginner: 'secondary',
    intermediate: 'default',
    advanced: 'success',
    expert: 'warning',
  } as const;

  const labelMap = {
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
    expert: 'Expert',
  };

  return (
    <Badge variant={variantMap[level]} className={className}>
      {labelMap[level]}
    </Badge>
  );
}
