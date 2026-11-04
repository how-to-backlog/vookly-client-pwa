import { TopBar } from '@/components/TopBar';
import { CardContainer } from '@/components/cards/CardContainer';

export default function Home() {
  return (
    <div className="h-screen bg-white flex justify-center overflow-hidden">
      {/* Shell Móvil Centrado */}
      <main className="w-full max-w-md h-screen bg-white relative flex flex-col overflow-hidden">
        <TopBar />

        {/* Contenedor Modular de 4 Tarjetas (ScrollStack) */}
        <div className="flex-1 w-full bg-white min-h-0">
          <CardContainer />
        </div>
      </main>
    </div>
  );
}
