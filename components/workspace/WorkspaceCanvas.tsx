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
          {/* Content header */}
          <div className="sticky top-0 z-10 bg-surface-canvas/80 backdrop-blur-sm border-b border-border/50 px-6 py-4">
            <h1 className="text-2xl font-semibold text-foreground">
              {viewTitles[currentView]}
            </h1>
          </div>

          {/* Content area */}
          <div className="p-6">
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
    <div className="flex h-full items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="text-center px-6"
      >
        {/* Decorative gradient blob */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-br from-primary-200/30 via-primary-100/20 to-transparent rounded-full blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary-100/50 px-4 py-2 mb-6">
            <Sparkles className="h-4 w-4 text-primary-600" />
            <span className="text-sm font-medium text-primary-700">
              AI-Powered Portfolio
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {name}
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-md mx-auto">
            {title}
          </p>

          <p className="text-sm text-muted-foreground">
            Use the command palette below to explore
          </p>
        </div>
      </motion.div>
    </div>
  );
}
