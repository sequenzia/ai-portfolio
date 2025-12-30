import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
        success:
          "border-transparent bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 shadow-sm",
        warning:
          "border-transparent bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 shadow-sm",
      },
      size: {
        default: "px-2.5 py-0.5",
        sm: "px-2 py-0.5 text-[0.65rem]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
  )
}

// Skill level badge for the skills matrix
type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

const skillLevelConfig: Record<SkillLevel, { label: string; className: string }> = {
  beginner: { label: 'Beginner', className: 'bg-muted text-muted-foreground' },
  intermediate: { label: 'Intermediate', className: 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' },
  advanced: { label: 'Advanced', className: 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' },
  expert: { label: 'Expert', className: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300' },
};

function SkillLevelBadge({ level }: { level: SkillLevel }) {
  const config = skillLevelConfig[level];
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
        config.className
      )}
    >
      {config.label}
    </span>
  );
}

export { Badge, badgeVariants, SkillLevelBadge }
