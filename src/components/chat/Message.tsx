import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

interface MessageProps {
  role: 'user' | 'assistant';
  content: string;
}

export function Message({ role, content }: MessageProps) {
  const isUser = role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={cn('flex', isUser ? 'justify-end' : 'justify-start')}
    >
      <div
        className={cn(
          'max-w-[85%] rounded-message px-4 py-3',
          isUser
            ? 'bg-message-user text-white rounded-br-sm'
            : 'bg-message-assistant text-gray-900 rounded-bl-sm'
        )}
      >
        <div className="whitespace-pre-wrap text-sm leading-relaxed">
          {content}
        </div>
      </div>
    </motion.div>
  );
}

// Assistant message with avatar
export function AssistantMessage({ content }: { content: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="flex items-start gap-3"
    >
      {/* AI Avatar */}
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-xs font-bold">
        AI
      </div>
      {/* Message */}
      <div className="flex-1 max-w-[85%]">
        <div className="bg-message-assistant text-gray-900 rounded-message rounded-tl-sm px-4 py-3">
          <div className="whitespace-pre-wrap text-sm leading-relaxed">
            {content}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// User message (right-aligned)
export function UserMessage({ content }: { content: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="flex justify-end"
    >
      <div className="max-w-[85%] bg-message-user text-white rounded-message rounded-br-sm px-4 py-3">
        <div className="whitespace-pre-wrap text-sm leading-relaxed">
          {content}
        </div>
      </div>
    </motion.div>
  );
}
