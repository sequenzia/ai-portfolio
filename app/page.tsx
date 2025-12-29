import { AppLayout } from '@/components/layout/AppLayout';
import { ChatContainer } from '@/components/chat/ChatContainer';

export default function Home() {
  return (
    <AppLayout>
      <ChatContainer />
    </AppLayout>
  );
}
