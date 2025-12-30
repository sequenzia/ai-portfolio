'use client';

import { motion } from 'framer-motion';
import { portfolioContent } from '@/lib/content/portfolio';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils/cn';
import type { CanvasData } from '@/lib/content/types';

interface EducationListProps {
  data: CanvasData | null;
}

export function EducationList({ data }: EducationListProps) {
  const education = portfolioContent.education;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold text-foreground">Education</h2>
      </motion.div>

      {/* Education cards */}
      <div className="space-y-4">
        {education.map((edu, index) => (
          <motion.div
            key={edu.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.15 }}
          >
            <Card
              variant="elevated"
              className={cn(
                data?.highlightId === edu.id && 'ring-2 ring-primary-500'
              )}
            >
              <CardContent className="p-6">
                <div className="flex gap-5">
                  {/* Icon/Logo placeholder */}
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900 dark:to-primary-800 flex items-center justify-center">
                      <GraduationCapIcon className="w-7 h-7 text-primary-600" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">
                          {edu.degree}
                        </h3>
                        <p className="text-primary-600 dark:text-primary-400 font-medium">{edu.field}</p>
                        <p className="text-muted-foreground">{edu.institution}</p>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {edu.startDate} - {edu.endDate}
                      </div>
                    </div>

                    {/* GPA if available */}
                    {edu.gpa && (
                      <p className="text-sm text-muted-foreground mt-2">
                        GPA: <span className="font-medium">{edu.gpa}</span>
                      </p>
                    )}

                    {/* Honors */}
                    {edu.honors && edu.honors.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {edu.honors.map((honor, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.15 + i * 0.05 + 0.2 }}
                          >
                            <Badge variant="success" size="sm">
                              {honor}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function GraduationCapIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path d="M12 14l9-5-9-5-9 5 9 5z" />
      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
      />
    </svg>
  );
}
