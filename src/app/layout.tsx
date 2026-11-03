import type { Metadata } from 'next';
import './globals.css';
import { TransitionProvider } from '@/components/transition/TransitionProvider';

export const metadata: Metadata = {
  title: 'Vookly',
  description: 'Billetera Universal de Fidelización',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full bg-white antialiased">
      <body className="h-full bg-white text-[#061b31]">
        <TransitionProvider>
          {children}
        </TransitionProvider>
      </body>
    </html>
  );
}
