import { motion } from 'framer-motion';
import { portfolioContent } from '@/content/portfolio';

export function WelcomeState() {
  const { bio } = portfolioContent;

  return (
    <div className="flex h-full flex-col items-center justify-center text-center px-8">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-md"
      >
        {/* Icon */}
        <motion.div
          initial={{ y: -10 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mb-6 w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center"
        >
          <span className="text-white text-2xl font-bold">
            {bio.name
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-3xl font-bold text-gray-900 mb-3"
        >
          Welcome to My Portfolio
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-lg text-gray-600 mb-6"
        >
          {bio.title} based in {bio.location}
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-gray-500 mb-8"
        >
          Start a conversation with my AI Agent to explore my experience,
          projects, and skills. Content will appear here as we chat.
        </motion.p>

        {/* Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="flex items-center justify-center gap-2 text-sm text-gray-400"
        >
          <span className="inline-block w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
          <span>Try asking: "Tell me about your projects"</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
