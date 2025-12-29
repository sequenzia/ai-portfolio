'use client';

import { motion } from 'framer-motion';
import { portfolioContent } from '@/lib/content/portfolio';
import { Badge, SkillLevelBadge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils/cn';
import type { CanvasData, Skill } from '@/lib/content/types';

interface SkillsMatrixProps {
  data: CanvasData | null;
}

export function SkillsMatrix({ data }: SkillsMatrixProps) {
  const skills = portfolioContent.skills;

  // Filter skills if filter is provided
  const filteredSkills = data?.filter
    ? skills.map((category) => ({
        ...category,
        skills: category.skills.filter(
          (skill) =>
            skill.name.toLowerCase().includes(data.filter!.toLowerCase()) ||
            category.name.toLowerCase().includes(data.filter!.toLowerCase())
        ),
      })).filter((category) => category.skills.length > 0)
    : skills;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Skills</h2>
          <p className="text-gray-500 text-sm mt-1">
            Technical proficiencies across different domains
          </p>
        </div>
        {data?.filter && (
          <Badge variant="outline">
            Filtered: {data.filter}
          </Badge>
        )}
      </motion.div>

      {/* Skills grid by category */}
      <div className="grid gap-6">
        {filteredSkills.map((category, categoryIndex) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: categoryIndex * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-5"
          >
            {/* Category header */}
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <CategoryIcon category={category.name} />
              {category.name}
            </h3>

            {/* Skills */}
            <div className="grid gap-3">
              {category.skills.map((skill, skillIndex) => (
                <SkillRow
                  key={skill.name}
                  skill={skill}
                  index={skillIndex}
                  categoryIndex={categoryIndex}
                  isHighlighted={data?.highlightId === skill.name.toLowerCase().replace(/\s+/g, '-')}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty state */}
      {filteredSkills.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 text-gray-500"
        >
          No skills found matching "{data?.filter}"
        </motion.div>
      )}

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex flex-wrap items-center justify-center gap-4 pt-4 text-sm text-gray-500"
      >
        <span>Proficiency levels:</span>
        <SkillLevelBadge level="beginner" />
        <SkillLevelBadge level="intermediate" />
        <SkillLevelBadge level="advanced" />
        <SkillLevelBadge level="expert" />
      </motion.div>
    </div>
  );
}

interface SkillRowProps {
  skill: Skill;
  index: number;
  categoryIndex: number;
  isHighlighted?: boolean;
}

function SkillRow({ skill, index, categoryIndex, isHighlighted }: SkillRowProps) {
  const levelWidth = {
    beginner: '25%',
    intermediate: '50%',
    advanced: '75%',
    expert: '100%',
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: categoryIndex * 0.1 + index * 0.05 + 0.1 }}
      className={cn(
        'flex items-center gap-4 p-2 rounded-lg',
        isHighlighted && 'bg-primary-50 ring-1 ring-primary-200'
      )}
    >
      {/* Skill name */}
      <div className="w-32 flex-shrink-0">
        <span className="font-medium text-gray-900">{skill.name}</span>
      </div>

      {/* Progress bar */}
      <div className="flex-1">
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: levelWidth[skill.level] }}
            transition={{ delay: categoryIndex * 0.1 + index * 0.05 + 0.3, duration: 0.5 }}
            className={cn(
              'h-full rounded-full',
              skill.level === 'beginner' && 'bg-gray-400',
              skill.level === 'intermediate' && 'bg-primary-400',
              skill.level === 'advanced' && 'bg-green-500',
              skill.level === 'expert' && 'bg-yellow-500'
            )}
          />
        </div>
      </div>

      {/* Level badge */}
      <div className="w-24 flex-shrink-0 text-right">
        <SkillLevelBadge level={skill.level} />
      </div>

      {/* Years */}
      {skill.yearsOfExperience && (
        <div className="w-16 flex-shrink-0 text-right text-sm text-gray-500">
          {skill.yearsOfExperience}y
        </div>
      )}
    </motion.div>
  );
}

function CategoryIcon({ category }: { category: string }) {
  const icons: Record<string, string> = {
    'Programming Languages': '💻',
    'Frontend Development': '🎨',
    'Backend & Infrastructure': '⚙️',
    'AI & Machine Learning': '🤖',
  };
  return <span>{icons[category] || '📚'}</span>;
}
