import { cn } from '@/lib/utils/cn';

interface MobileToggleProps {
  activeView: 'chat' | 'canvas';
  onToggle: (view: 'chat' | 'canvas') => void;
  className?: string;
}

export function MobileToggle({ activeView, onToggle, className }: MobileToggleProps) {
  return (
    <div
      className={cn(
        'flex items-center bg-gray-100 p-1 rounded-lg mx-4 my-2',
        className
      )}
    >
      <button
        onClick={() => onToggle('chat')}
        className={cn(
          'flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all duration-200',
          activeView === 'chat'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        )}
      >
        <span className="flex items-center justify-center gap-2">
          <ChatIcon className="w-4 h-4" />
          Chat
        </span>
      </button>
      <button
        onClick={() => onToggle('canvas')}
        className={cn(
          'flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all duration-200',
          activeView === 'canvas'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        )}
      >
        <span className="flex items-center justify-center gap-2">
          <CanvasIcon className="w-4 h-4" />
          Content
        </span>
      </button>
    </div>
  );
}

// Simple inline icons
function ChatIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      />
    </svg>
  );
}

function CanvasIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
      />
    </svg>
  );
}
