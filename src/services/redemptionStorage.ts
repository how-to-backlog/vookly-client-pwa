import { CustomerVoucher, VoucherTokenEntity } from '@/types/loyalty';

/**
 * Persistencia de canjes para el showroom.
 *
 * El estado "canjeado" tiene que sobrevivir al cierre del bottom sheet y a la
 * recarga de la página: el token emitido (con su `expiresAt`) es la fuente de
 * verdad del canje, no el estado local del componente que lo muestra.
 *
 * La clave de almacenamiento combina cliente y comercio para no mezclar
 * billeteras de negocios distintos.
 */

const STORAGE_PREFIX = 'vookly_redemptions_';
const REDEMPTIONS_EVENT = 'vookly:redemptions-changed';

interface StoredRedemption {
  /** Milestone (stampThreshold) del premio canjeado. */
  milestoneStamp: number;
  /** Token emitido: código de 4 dígitos con su ventana de validez. */
  activeCode: VoucherTokenEntity;
}

function storageKey(customerId: string, businessId: string): string {
  return `${STORAGE_PREFIX}${customerId}_${businessId}`;
}

/**
 * Notifica a los suscriptores que los canjes cambiaron.
 *
 * localStorage no emite eventos por sí mismo, así que cada escritura dispara
 * un evento propio. `useSyncExternalStore` lo usa para re-renderizar.
 */
function notifyRedemptionsChanged(customerId: string, businessId: string): void {
  if (typeof window === 'undefined') return;
  // El snapshot cacheado quedó viejo: se invalida para que el próximo
  // getSnapshot devuelva el contenido nuevo.
  snapshotCache.delete(cacheKey(customerId, businessId));
  window.dispatchEvent(
    new CustomEvent(REDEMPTIONS_EVENT, { detail: { customerId, businessId } })
  );
}

/**
 * Se suscribe a los cambios de los canjes de una billetera.
 * Devuelve la función de limpieza para desuscribirse.
 */
export function subscribeToRedemptions(
  customerId: string,
  businessId: string,
  onStoreChange: () => void
): () => void {
  if (typeof window === 'undefined') return () => {};

  const handler = (event: Event) => {
    const detail = (event as CustomEvent<{ customerId: string; businessId: string }>).detail;
    if (!detail || detail.customerId !== customerId || detail.businessId !== businessId) return;
    onStoreChange();
  };

  window.addEventListener(REDEMPTIONS_EVENT, handler);
  return () => window.removeEventListener(REDEMPTIONS_EVENT, handler);
}

/**
 * Cache de los snapshots leídos.
 *
 * `useSyncExternalStore` exige que el snapshot sea referencialmente estable:
 * si el getter devolviera un Map nuevo en cada llamada, React entraría en un
 * loop de renders. Cacheamos por clave y solo invalidamos cuando el storage
 * cambia de verdad.
 */
const snapshotCache = new Map<
  string,
  { raw: string | null; value: Map<number, VoucherTokenEntity> }
>();

function cacheKey(customerId: string, businessId: string): string {
  return storageKey(customerId, businessId);
}

/**
 * Lee los canjes guardados. Devuelve un mapa por hito (milestoneStamp).
 * Los registros corruptos se descartan sin romper el resto.
 */
export function loadRedemptions(
  customerId: string,
  businessId: string
): Map<number, VoucherTokenEntity> {
  const result = new Map<number, VoucherTokenEntity>();
  if (typeof window === 'undefined') return result;

  try {
    const raw = window.localStorage.getItem(storageKey(customerId, businessId));
    if (!raw) return result;

    const parsed = JSON.parse(raw) as StoredRedemption[];
    if (!Array.isArray(parsed)) return result;

    for (const entry of parsed) {
      if (
        entry &&
        typeof entry.milestoneStamp === 'number' &&
        entry.activeCode &&
        typeof entry.activeCode.code === 'string' &&
        typeof entry.activeCode.expiresAt === 'string'
      ) {
        result.set(entry.milestoneStamp, entry.activeCode);
      }
    }
  } catch {
    // Entornos restringidos o datos inválidos: arrancamos sin canjes previos.
  }

  return result;
}

/**
 * Snapshot estable para `useSyncExternalStore`: devuelve la misma referencia
 * mientras el almacenamiento no cambie.
 */
export function getRedemptionsSnapshot(
  customerId: string,
  businessId: string
): Map<number, VoucherTokenEntity> {
  const key = cacheKey(customerId, businessId);

  if (typeof window === 'undefined') return new Map<number, VoucherTokenEntity>();

  const raw = window.localStorage.getItem(storageKey(customerId, businessId));
  const cached = snapshotCache.get(key);
  if (cached && cached.raw === raw) return cached.value;

  const value = loadRedemptions(customerId, businessId);
  snapshotCache.set(key, { raw, value });
  return value;
}

/**
 * Guarda el token emitido de un canje, reemplazando el anterior del mismo hito.
 */
export function saveRedemption(
  customerId: string,
  businessId: string,
  milestoneStamp: number,
  activeCode: VoucherTokenEntity
): void {
  if (typeof window === 'undefined') return;

  try {
    const existing = loadRedemptions(customerId, businessId);
    existing.set(milestoneStamp, activeCode);

    const payload: StoredRedemption[] = Array.from(existing.entries()).map(
      ([stamp, code]) => ({ milestoneStamp: stamp, activeCode: code })
    );

    window.localStorage.setItem(storageKey(customerId, businessId), JSON.stringify(payload));
    notifyRedemptionsChanged(customerId, businessId);
  } catch {
    // Manejo silencioso en entornos restringidos (cuota llena, modo privado).
  }
}

/**
 * Elimina el canje de un hito (por ejemplo, cuando el token venció y el premio
 * vuelve a estar disponible para reclamar).
 */
export function clearRedemption(
  customerId: string,
  businessId: string,
  milestoneStamp: number
): void {
  if (typeof window === 'undefined') return;

  try {
    const existing = loadRedemptions(customerId, businessId);
    existing.delete(milestoneStamp);

    const payload: StoredRedemption[] = Array.from(existing.entries()).map(
      ([stamp, code]) => ({ milestoneStamp: stamp, activeCode: code })
    );

    window.localStorage.setItem(storageKey(customerId, businessId), JSON.stringify(payload));
    notifyRedemptionsChanged(customerId, businessId);
  } catch {
    // Manejo silencioso en entornos restringidos.
  }
}

/**
 * Devuelve true cuando el token sigue vigente (aún dentro de su ventana).
 */
export function isTokenActive(activeCode: VoucherTokenEntity | undefined, now = Date.now()): boolean {
  if (!activeCode) return false;
  const expiresAt = new Date(activeCode.expiresAt).getTime();
  return Number.isFinite(expiresAt) && expiresAt > now;
}

/**
 * Reinyecta los canjes persistidos sobre los vouchers de la billetera.
 *
 * Los vouchers con token vigente quedan en estado 'redeemed' (el premio ya se
 * canjeó); los vouchers cuyo token venció vuelven a 'ready' para que el
 * cliente pueda reclamarlo de nuevo.
 */
export function applyRedemptionsToWallet(
  wallet: {
    vouchers?: CustomerVoucher[];
    [key: string]: unknown;
  },
  redemptions: Map<number, VoucherTokenEntity>,
  now = Date.now()
): { vouchers?: CustomerVoucher[]; [key: string]: unknown } {
  if (!wallet.vouchers || redemptions.size === 0) return wallet;

  return {
    ...wallet,
    vouchers: wallet.vouchers.map((voucher) => {
      const token = redemptions.get(voucher.milestoneStamp);
      if (!token) return voucher;

      if (isTokenActive(token, now)) {
        return {
          ...voucher,
          status: 'redeemed' as const,
          redeemedAt: token.generatedAt,
          activeCode: token
        };
      }

      // El token venció: el premio vuelve a estar disponible para reclamar.
      // Se descarta el activeCode vencido para que no se muestre como canjeado.
      const expiredVoucher = { ...voucher };
      delete expiredVoucher.activeCode;
      return { ...expiredVoucher, status: 'ready' as const };
    })
  };
}
