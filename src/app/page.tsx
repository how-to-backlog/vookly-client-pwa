import { TopBar } from '@/components/TopBar';
import { CardContainer } from '@/components/cards/CardContainer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex justify-center">
      {/* Shell Móvil Centrado */}
      <main className="w-full max-w-md min-h-screen bg-white relative flex flex-col">
        <TopBar />
        
        {/* Contenedor Modular de 4 Tarjetas */}
        <div className="flex-1 w-full bg-white">
          <CardContainer />
        </div>
      </main>
    </div>
  );
}
