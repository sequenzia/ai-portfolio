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
          "border-transparent bg-green-100 text-green-800 shadow-sm",
        warning:
          "border-transparent bg-yellow-100 text-yellow-800 shadow-sm",
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
  beginner: { label: 'Beginner', className: 'bg-gray-100 text-gray-700' },
  intermediate: { label: 'Intermediate', className: 'bg-blue-100 text-blue-700' },
  advanced: { label: 'Advanced', className: 'bg-green-100 text-green-700' },
  expert: { label: 'Expert', className: 'bg-yellow-100 text-yellow-700' },
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
