'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils/cn';
import type { ProjectItem } from '@/lib/content/types';

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  isHighlighted?: boolean;
}

export function ProjectCard({ project, index, isHighlighted }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      className={cn(
        'group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden',
        'hover:shadow-md hover:-translate-y-1 transition-all duration-200',
        isHighlighted && 'ring-2 ring-primary-500 shadow-md'
      )}
    >
      {/* Image placeholder */}
      <div className="h-40 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl text-gray-300">
            {project.category === 'ai' && '🤖'}
            {project.category === 'open-source' && '🌐'}
            {project.category === 'devops' && '⚙️'}
            {project.category === 'mobile' && '📱'}
            {!['ai', 'open-source', 'devops', 'mobile'].includes(project.category) && '💻'}
          </span>
        </div>
        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-3 right-3">
            <Badge variant="warning" size="sm">Featured</Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
            {project.name}
          </h3>
          <span className="text-xs text-gray-400 whitespace-nowrap">{project.date}</span>
        </div>

        {/* Category */}
        <Badge variant="outline" size="sm" className="mb-3">
          {project.category}
        </Badge>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.technologies.slice(0, 4).map((tech) => (
            <Badge key={tech} variant="secondary" size="sm">
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 4 && (
            <Badge variant="secondary" size="sm">
              +{project.technologies.length - 4}
            </Badge>
          )}
        </div>

        {/* Links */}
        <div className="flex gap-3 pt-3 border-t border-gray-100">
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1"
            >
              <ExternalLinkIcon className="w-4 h-4" />
              Live Demo
            </a>
          )}
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
            >
              <GithubIcon className="w-4 h-4" />
              GitHub
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
      />
    </svg>
  );
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}
