'use client';

import { motion } from 'framer-motion';
import { portfolioContent } from '@/lib/content/portfolio';
import { ProjectCard } from './ProjectCard';
import { Badge } from '@/components/ui/badge';
import type { CanvasData } from '@/lib/content/types';

interface ProjectGridProps {
  data: CanvasData | null;
}

export function ProjectGrid({ data }: ProjectGridProps) {
  const allProjects = portfolioContent.projects;

  // Filter projects if filter is provided
  const projects = allProjects.filter((project) => {
    if (!data?.filter) return true;
    const filterLower = data.filter.toLowerCase();
    return (
      project.name.toLowerCase().includes(filterLower) ||
      project.category.toLowerCase().includes(filterLower) ||
      project.description.toLowerCase().includes(filterLower) ||
      project.technologies.some((t) => t.toLowerCase().includes(filterLower))
    );
  });

  // Get unique categories
  const categories = [...new Set(allProjects.map((p) => p.category))];

  return (
    <div className="space-y-6">
      {/* Info bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between flex-wrap gap-4"
      >
        <p className="text-muted-foreground text-sm">
          {projects.length} project{projects.length !== 1 ? 's' : ''}
          {data?.filter && ` matching "${data.filter}"`}
        </p>
        {data?.filter && (
          <Badge variant="outline">
            Filtered: {data.filter}
          </Badge>
        )}
      </motion.div>

      {/* Category pills */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap gap-2"
      >
        {categories.map((category) => {
          const count = projects.filter((p) => p.category === category).length;
          if (count === 0) return null;
          return (
            <Badge key={category} variant="secondary">
              {category} ({count})
            </Badge>
          );
        })}
      </motion.div>

      {/* Project grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            isHighlighted={data?.highlightId === project.id}
          />
        ))}
      </div>

      {/* Empty state */}
      {projects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 text-muted-foreground"
        >
          No projects found matching "{data?.filter}"
        </motion.div>
      )}
    </div>
  );
}
