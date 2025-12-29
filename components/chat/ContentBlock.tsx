'use client';

import { motion } from 'framer-motion';
import { BioCard } from '@/components/canvas/BioCard';
import { ExperienceTimeline } from '@/components/canvas/ExperienceTimeline';
import { ProjectGrid } from '@/components/canvas/ProjectGrid';
import { EducationList } from '@/components/canvas/EducationList';
import { SkillsMatrix } from '@/components/canvas/SkillsMatrix';
import { ContactSection } from '@/components/canvas/ContactSection';
import type { CanvasViewType, CanvasData } from '@/lib/content/types';

// Map view types to components (excluding welcome which isn't rendered inline)
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

interface ContentBlockProps {
  type: CanvasViewType;
  filter?: string;
  highlightId?: string;
}

export function ContentBlock({ type, filter, highlightId }: ContentBlockProps) {
  // Don't render welcome type inline
  if (type === 'welcome') {
    return null;
  }

  const ContentComponent = contentComponents[type];

  if (!ContentComponent) {
    return null;
  }

  const data: CanvasData = {
    type,
    filter,
    highlightId,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="mt-4 rounded-lg bg-gray-50 p-4"
    >
      <ContentComponent data={data} />
    </motion.div>
  );
}
