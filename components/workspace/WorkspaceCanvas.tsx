'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useCanvasStore } from '@/stores/canvasStore';
import { portfolioContent } from '@/lib/content/portfolio';
import { BioCard } from '@/components/canvas/BioCard';
import { ExperienceTimeline } from '@/components/canvas/ExperienceTimeline';
import { ProjectGrid } from '@/components/canvas/ProjectGrid';
import { EducationList } from '@/components/canvas/EducationList';
import { SkillsMatrix } from '@/components/canvas/SkillsMatrix';
import { ContactSection } from '@/components/canvas/ContactSection';
import type { CanvasViewType, CanvasData } from '@/lib/content/types';
import { Sparkles } from 'lucide-react';

// Map view types to components
const contentComponents: Record<
  Exclude<CanvasViewType, 'welcome'>,
  React.ComponentType<{ data: CanvasData | null }>
> = {
  bio: BioCard,
  experience: ExperienceTimeline,
  projects: ProjectGrid,
  education: EducationList,
  skills: SkillsMatrix,
  contact: ContactSection,
};

const viewTitles: Record<CanvasViewType, string> = {
  welcome: 'Welcome',
  bio: 'About Me',
  experience: 'Experience',
  projects: 'Projects',
  education: 'Education',
  skills: 'Skills',
  contact: 'Contact',
};

interface WorkspaceCanvasProps {
  className?: string;
}

export function WorkspaceCanvas({ className }: WorkspaceCanvasProps) {
  const { currentView, data } = useCanvasStore();
  const { bio } = portfolioContent;

  // Render welcome/empty state
  if (currentView === 'welcome') {
    return (
      <div className={className}>
        <WelcomeView name={bio.name} title={bio.title} />
      </div>
    );
  }

  const ContentComponent = contentComponents[currentView];

  if (!ContentComponent) {
    return (
      <div className={className}>
        <WelcomeView name={bio.name} title={bio.title} />
      </div>
    );
  }

  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentView}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="h-full overflow-auto"
        >
          {/* Content header - full width */}
          <div className="sticky top-0 z-10 bg-surface-canvas/80 backdrop-blur-sm border-b border-border/50 px-6 py-4">
            <h1 className="text-2xl font-semibold text-foreground max-w-full lg:max-w-[90%] mx-auto">
              {viewTitles[currentView]}
            </h1>
          </div>

          {/* Content area - constrained width */}
          <div className="p-6 max-w-full lg:max-w-[90%] mx-auto">
            <ContentComponent data={data} />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

interface WelcomeViewProps {
  name: string;
  title: string;
}

function WelcomeView({ name, title }: WelcomeViewProps) {
  return (
    <div className="flex h-full items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 -left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
          animate={{
            x: [0, -20, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="text-center px-6 relative z-10">
        {/* Animated badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-2 mb-8"
        >
          <motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Sparkles className="h-4 w-4 text-primary" />
          </motion.div>
          <span className="text-sm font-medium text-primary">
            AI-Powered Portfolio
          </span>
        </motion.div>

        {/* Name with gradient */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text"
        >
          {name}
        </motion.h1>

        {/* Animated title with typing cursor effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center justify-center gap-2 mb-10"
        >
          <div className="h-px w-8 bg-gradient-to-r from-transparent to-muted-foreground/50" />
          <p className="text-xl md:text-2xl text-muted-foreground font-light tracking-wide">
            {title}
          </p>
          <div className="h-px w-8 bg-gradient-to-l from-transparent to-muted-foreground/50" />
        </motion.div>

        {/* CTA hint with animated arrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col items-center gap-3"
        >
          <p className="text-sm text-muted-foreground">
            Select a topic below or ask me anything
          </p>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="text-muted-foreground/50"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
