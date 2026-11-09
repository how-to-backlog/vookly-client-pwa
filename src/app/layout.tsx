import type { Metadata } from 'next';
import Script from "next/script";
import './globals.css';
import { TransitionProvider } from '@/components/transition/TransitionProvider';
import { DemoTourProvider } from '@/components/tour/DemoTourProvider';
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

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
    <html lang="es" className={cn("h-full bg-white antialiased", "font-sans", inter.variable)}>
      <head>
        {process.env.NODE_ENV === "development" && (
          <Script
            src="//unpkg.com/react-grab/dist/index.global.js"
            crossOrigin="anonymous"
            strategy="beforeInteractive"
          />
        )}
      </head>
      <body className="h-full bg-white text-[#061b31]">
        <TransitionProvider>
          <DemoTourProvider>
            {children}
          </DemoTourProvider>
        </TransitionProvider>
      </body>
    </html>
  );
}
