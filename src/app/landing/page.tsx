import { LandingScreen } from '@/components/landing/LandingScreen';

/**
 * Ruta de entrada de la demo. La landing muestra el pitch y deriva en dos
 * flujos: personalizar el local (alta en una lámina) u omitir y entrar con los
 * datos precargados del hub.
 */
export default function LandingPage() {
  return <LandingScreen />;
}
