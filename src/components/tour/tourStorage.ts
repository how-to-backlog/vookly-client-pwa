/**
 * tourStorage.ts
 *
 * Módulo puro de almacenamiento para el estado del Tour de Driver.js.
 * Encapsula localStorage (persistencia de tour completado/omitido)
 * y sessionStorage (persistencia del paso activo durante navegación entre rutas).
 */

const STORAGE_KEY_COMPLETED = 'vookly_demo_tour_completed_v1';
const SESSION_KEY_ACTIVE_STEP = 'vookly_demo_tour_active_step_v1';

export function isTourCompleted(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return localStorage.getItem(STORAGE_KEY_COMPLETED) === 'true';
  } catch {
    return false;
  }
}

export function setTourCompleted(completed = true): void {
  if (typeof window === 'undefined') return;
  try {
    if (completed) {
      localStorage.setItem(STORAGE_KEY_COMPLETED, 'true');
    } else {
      localStorage.removeItem(STORAGE_KEY_COMPLETED);
    }
  } catch {
    // Manejo silencioso
  }
}

export function getActiveTourStep(): number | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(SESSION_KEY_ACTIVE_STEP);
    return raw !== null ? parseInt(raw, 10) : null;
  } catch {
    return null;
  }
}

export function setActiveTourStep(step: number | null): void {
  if (typeof window === 'undefined') return;
  try {
    if (step === null) {
      sessionStorage.removeItem(SESSION_KEY_ACTIVE_STEP);
    } else {
      sessionStorage.setItem(SESSION_KEY_ACTIVE_STEP, step.toString());
    }
  } catch {
    // Manejo silencioso
  }
}

export function clearTourSession(): void {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.removeItem(SESSION_KEY_ACTIVE_STEP);
  } catch {
    // Manejo silencioso
  }
}
