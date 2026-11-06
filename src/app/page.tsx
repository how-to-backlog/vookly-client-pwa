import { TopBar } from '@/components/TopBar';
import { HomeGreeting } from '@/components/home/HomeGreeting';
import { SmartRewardBanner } from '@/components/home/SmartRewardBanner';
import { WalletSectionHeader } from '@/components/home/WalletSectionHeader';
import { CardContainer, DEFAULT_CARDS } from '@/components/cards/CardContainer';

export default function Home() {
  return (
    <div className="h-screen bg-neutral-50 flex justify-center overflow-hidden">
      {/* Shell Móvil Centrado */}
      <main className="w-full max-w-md h-screen bg-white relative flex flex-col overflow-hidden shadow-2xl">
        {/* 1. Cabecera Minimalista */}
        <TopBar />

        {/* 2. Saludo Contextual por Horario */}
        <HomeGreeting />

        {/* 3. Banner Inteligente de Recompensas (Condicional / FIFO) */}
        <SmartRewardBanner cards={DEFAULT_CARDS} />

        {/* 4. Encabezado de la Sección de Billetera */}
        <WalletSectionHeader totalCards={DEFAULT_CARDS.length} />

        {/* 5. Contenedor Modular de Tarjetas (ScrollStack) */}
        <div className="flex-1 w-full bg-white min-h-0">
          <CardContainer cards={DEFAULT_CARDS} />
        </div>
      </main>
    </div>
  );
}
