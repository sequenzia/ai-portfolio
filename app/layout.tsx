import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI Portfolio',
  description: 'AI-powered portfolio - Explore my professional background through conversation',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="h-full">{children}</body>
    </html>
  );
}
