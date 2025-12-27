import { motion } from 'framer-motion';
import { portfolioContent } from '@/content/portfolio';

export function WelcomeMessage() {
  const { bio } = portfolioContent;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="px-4 py-6"
    >
      <div className="flex items-start gap-3">
        {/* AI Avatar */}
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold">
          AI
        </div>

        {/* Welcome content */}
        <div className="flex-1">
          <div className="bg-message-assistant rounded-2xl rounded-tl-sm px-4 py-3">
            <p className="text-gray-900 mb-3">
              Hi! I'm an AI Agent for <strong>{bio.name}'s</strong> portfolio.
            </p>
            <p className="text-gray-700 text-sm mb-3">
              I'm here to help you learn about {bio.name}'s professional background,
              projects, skills, and more. Feel free to ask me anything!
            </p>
            <p className="text-gray-500 text-sm">
              Try asking about experience, projects, or skills - or use the suggestions below.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
