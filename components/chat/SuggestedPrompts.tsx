'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

const SUGGESTED_PROMPTS = [
  { label: 'About Me', prompt: 'Tell me about yourself', icon: '👤' },
  { label: 'Experience', prompt: 'What is your work experience?', icon: '💼' },
  { label: 'Projects', prompt: 'Show me your projects', icon: '🚀' },
  { label: 'Skills', prompt: 'What are your technical skills?', icon: '⚡' },
  { label: 'Education', prompt: 'Tell me about your education', icon: '🎓' },
  { label: 'Contact', prompt: 'How can I get in touch?', icon: '📬' },
];

interface SuggestedPromptsProps {
  onSelect: (prompt: string) => void;
  className?: string;
}

export function SuggestedPrompts({ onSelect, className }: SuggestedPromptsProps) {
  return (
    <div className={cn('px-4 py-3', className)}>
      <div className="flex flex-wrap gap-2">
        {SUGGESTED_PROMPTS.map(({ label, prompt, icon }, index) => (
          <motion.button
            key={label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onSelect(prompt)}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full',
              'bg-muted px-3 py-1.5 text-sm text-foreground/80',
              'hover:bg-muted/80 hover:text-foreground',
              'transition-colors duration-150',
              'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1'
            )}
          >
            <span>{icon}</span>
            <span>{label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
