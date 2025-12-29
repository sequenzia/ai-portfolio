'use client';

import { forwardRef } from 'react';
import { motion } from 'framer-motion';

export const TypingIndicator = forwardRef<HTMLDivElement>(
  function TypingIndicator(_props, ref) {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className="flex items-start gap-3"
      >
        {/* AI Avatar */}
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-xs font-bold">
          AI
        </div>
        {/* Typing dots */}
        <div className="bg-message-assistant rounded-message rounded-tl-sm px-4 py-3">
          <div className="flex items-center gap-1">
            <motion.span
              className="w-2 h-2 bg-gray-400 rounded-full"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0 }}
            />
            <motion.span
              className="w-2 h-2 bg-gray-400 rounded-full"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
            />
            <motion.span
              className="w-2 h-2 bg-gray-400 rounded-full"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
            />
          </div>
        </div>
      </motion.div>
    );
  }
);
