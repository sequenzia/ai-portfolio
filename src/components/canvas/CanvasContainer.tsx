import { AnimatePresence, motion } from 'framer-motion';
import { useCanvasStore } from '@/stores/canvasStore';
import { WelcomeState } from './WelcomeState';
import { BioCard } from './BioCard';
import { ExperienceTimeline } from './ExperienceTimeline';
import { ProjectGrid } from './ProjectGrid';
import { EducationList } from './EducationList';
import { SkillsMatrix } from './SkillsMatrix';
import { ContactSection } from './ContactSection';
import type { CanvasViewType, CanvasData } from '@/content/types';

// Map view types to components
const contentComponents: Record<
  CanvasViewType,
  React.ComponentType<{ data: CanvasData | null }>
> = {
  welcome: WelcomeState as React.ComponentType<{ data: CanvasData | null }>,
  bio: BioCard,
  experience: ExperienceTimeline,
  projects: ProjectGrid,
  education: EducationList,
  skills: SkillsMatrix,
  contact: ContactSection,
};

export function CanvasContainer() {
  const { currentView, data } = useCanvasStore();
  const ContentComponent = contentComponents[currentView];

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-6 md:p-8 max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <ContentComponent data={data} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
