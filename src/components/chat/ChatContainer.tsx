import { usePortfolioChat } from '@/hooks/usePortfolioChat';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';
import { SuggestedPrompts } from './SuggestedPrompts';
import { WelcomeMessage } from './WelcomeMessage';

export function ChatContainer() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    append,
  } = usePortfolioChat();

  const showWelcome = messages.length === 0;

  // Handle selecting a suggested prompt
  const handlePromptSelect = (prompt: string) => {
    append({
      role: 'user',
      content: prompt,
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Welcome message when empty */}
      {showWelcome && <WelcomeMessage />}

      {/* Message list */}
      <MessageList messages={messages} isLoading={isLoading} />

      {/* Suggested prompts - always visible */}
      <SuggestedPrompts onSelect={handlePromptSelect} />

      {/* Input */}
      <ChatInput
        value={input}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
        disabled={isLoading}
      />
    </div>
  );
}
