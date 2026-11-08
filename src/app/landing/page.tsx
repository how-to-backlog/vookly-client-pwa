import { redirect } from 'next/navigation';

/**
 * `/landing` queda como alias de la ruta canónica (`/`), que es el entry point
 * de la demo. Así hay una sola URL pública para la pantalla de bienvenida.
 */
export default function Landing() {
  redirect('/');
}
