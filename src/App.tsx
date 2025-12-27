import { AppLayout } from '@/components/layout/AppLayout';
import { ChatContainer } from '@/components/chat/ChatContainer';
import { CanvasContainer } from '@/components/canvas/CanvasContainer';

export default function App() {
  return (
    <AppLayout
      chatPanel={<ChatContainer />}
      canvasPanel={<CanvasContainer />}
    />
  );
}
