'use client';

import { motion } from 'framer-motion';
import { portfolioContent } from '@/lib/content/portfolio';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils/cn';
import type { CanvasData } from '@/lib/content/types';

interface ExperienceTimelineProps {
  data: CanvasData | null;
}

export function ExperienceTimeline({ data }: ExperienceTimelineProps) {
  const allExperience = portfolioContent.experience;

  // Filter experience if filter is provided
  const experience = allExperience.filter((exp) => {
    if (!data?.filter) return true;
    const filterLower = data.filter.toLowerCase();
    return (
      exp.company.toLowerCase().includes(filterLower) ||
      exp.role.toLowerCase().includes(filterLower) ||
      exp.technologies.some((t) => t.toLowerCase().includes(filterLower)) ||
      exp.description.toLowerCase().includes(filterLower)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <h2 className="text-2xl font-bold text-foreground">Experience</h2>
        {data?.filter && (
          <Badge variant="outline">
            Filtered: {data.filter}
          </Badge>
        )}
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />

        {/* Experience items */}
        <div className="space-y-6">
          {experience.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className={cn(
                'relative pl-10',
                data?.highlightId === exp.id && 'ring-2 ring-primary-500 rounded-lg p-4 -ml-4 pl-14 bg-primary-50 dark:bg-primary-950'
              )}
            >
              {/* Timeline dot */}
              <div
                className={cn(
                  'absolute left-2.5 w-3 h-3 rounded-full border-2 border-background',
                  index === 0 ? 'bg-primary-500' : 'bg-muted-foreground/40'
                )}
              />

              {/* Content */}
              <div className="bg-card rounded-lg shadow-sm border border-border p-5">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{exp.role}</h3>
                    <p className="text-primary-600 font-medium">{exp.company}</p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <span>{exp.startDate} - {exp.endDate}</span>
                    <span className="mx-2">·</span>
                    <span>{exp.location}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-foreground/80 mb-4">{exp.description}</p>

                {/* Achievements */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-foreground mb-2">Key Achievements</h4>
                  <ul className="space-y-1.5">
                    {exp.achievements.map((achievement, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + i * 0.05 + 0.2 }}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span className="text-primary-500 mt-1">•</span>
                        <span>{achievement}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1.5">
                  {exp.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" size="sm">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Empty state */}
      {experience.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 text-muted-foreground"
        >
          No experience found matching "{data?.filter}"
        </motion.div>
      )}
    </div>
  );
}
