'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import TearTicket from '@/components/registry/TearTicket';
import FlipCard from '@/components/registry/FlipCard';
import CodeSlots from '@/components/registry/CodeSlots';
import { VoucherTokenEntity } from '@/types/loyalty';

export type RedemptionMoment = 'tear' | 'code';

export interface RedemptionChoreographyProps {
  /** Reward title displayed on the ticket and on the front face of the card. */
  rewardTitle: string;
  /** Number of stamps consumed by this redemption. */
  stamps: number;
  /** Business name shown in the copy. */
  businessName: string;
  /**
   * Requests a fresh redemption token. Called after the ticket is torn,
   * right before the code becomes visible.
   */
  onRequestToken: () => Promise<VoucherTokenEntity | null>;
  /** Called when the token expires: the reward becomes claimable again. */
  onTokenExpired?: () => void;
  /**
   * Token already issued for this reward, if any. When present and still
   * valid, the choreography opens directly on the code face and the countdown
   * resumes from its real remaining time.
   */
  existingToken?: VoucherTokenEntity | null;
  className?: string;
}

function formatTimer(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

function remainingSeconds(token: VoucherTokenEntity, now = Date.now()): number {
  const expiresAt = new Date(token.expiresAt).getTime();
  if (!Number.isFinite(expiresAt)) return 0;
  return Math.max(0, Math.ceil((expiresAt - now) / 1000));
}

/**
 * RedemptionChoreography: the redemption sequence for the showroom.
 *
 * M1 · Tear — a vertical TearTicket carries the reward. Tearing it off is
 *        the consequence of confirming the "are you at the counter?" gate,
 *        and the only gesture of the flow.
 * M2 · Code — tearing the ticket issues the token and the FlipCard (axis "y")
 *        flips to the back face, where the 4-digit code and its 15-minute
 *        timer live.
 *
 * There is no intermediate confirmation step: the reward information already
 * travelled on the ticket, so repeating it before the code only adds friction
 * to the showroom. The flip is the animation that connects both moments, not
 * an extra screen to get through.
 *
 * The redemption is a one-way door: once the ticket is torn there is no "hide
 * the code" gesture. The countdown is derived from the token's `expiresAt`, so
 * closing the bottom sheet does not pause or reset it — when the sheet opens
 * again the code is still there with the real remaining time, and once the
 * window closes the reward becomes claimable again.
 */
export function RedemptionChoreography({
  rewardTitle,
  stamps,
  businessName,
  onRequestToken,
  onTokenExpired,
  existingToken = null,
  className = ''
}: RedemptionChoreographyProps) {
  // Token issued during this session. It is kept so the code can be shown
  // immediately, but the persisted redemption always wins: when the parent
  // clears it (demo reset), the session token must not resurrect it.
  const [sessionToken, setSessionToken] = useState<VoucherTokenEntity | null>(existingToken);
  const [tokenPending, setTokenPending] = useState(false);
  const [tokenError, setTokenError] = useState<string | null>(null);

  // The live token is the one issued by the parent (persisted redemption) or,
  // while the sheet is open, the one issued in this session. The parent is the
  // source of truth: when the demo is reset the persisted redemption is
  // cleared and this component must fall back to a fresh, tearable ticket.
  const liveToken = existingToken ?? sessionToken;
  const code = liveToken?.code ?? '';
  const expiresAt = liveToken?.expiresAt ?? null;
  // The ticket is torn as soon as there is a live token, and the card shows
  // the code face whenever that token exists.
  const torn = Boolean(liveToken);
  const flipped = Boolean(liveToken);

  // Ticking clock used to render the countdown. It is NOT the source of truth:
  // the expiry timestamp is. This only tells the UI "hey, re-read the clock",
  // so the timer stays live without ever drifting from `expiresAt`.
  const [now, setNow] = useState(() => Date.now());

  // The countdown is always derived from the absolute expiry timestamp, never
  // from a local counter: the timer must keep running while the sheet is
  // closed and must survive a reload.
  const secondsLeft = useMemo(
    () => (expiresAt ? remainingSeconds({ code, generatedAt: '', expiresAt }, now) : 0),
    [code, expiresAt, now]
  );

  const moment: RedemptionMoment = code && expiresAt ? 'code' : 'tear';

  // The ticket is the confirmation gesture: tearing it issues the token, so
  // the 15 minute window starts exactly when the customer sees the code.
  const handleTear = useCallback(async () => {
    setTokenPending(true);
    setTokenError(null);
    try {
      const issued = await onRequestToken();
      if (!issued) {
        setTokenError('No se pudo generar el código. Intentá de nuevo.');
        return;
      }
      setSessionToken(issued);
      setNow(Date.now());
    } catch {
      setTokenError('No se pudo generar el código. Intentá de nuevo.');
    } finally {
      setTokenPending(false);
    }
  }, [onRequestToken]);

  // Countdown: ticks once per second while the code is visible. When the
  // window closes, the token is invalidated and the reward becomes claimable
  // again — the customer is sent back to the ticket.
  useEffect(() => {
    if (moment !== 'code') return;

    const interval = setInterval(() => {
      const current = Date.now();
      // Re-render first so the countdown updates on every tick...
      setNow(current);
      if (remainingSeconds({ code, generatedAt: '', expiresAt: expiresAt ?? '' }, current) > 0) return;

      // ...and invalidate the token only when the window really closed.
      clearInterval(interval);
      setSessionToken(null);
      onTokenExpired?.();
    }, 1000);

    return () => clearInterval(interval);
  }, [moment, code, expiresAt, onTokenExpired]);

  // -----------------------------------------------------------------
  // M1 · TEAR
  // -----------------------------------------------------------------
  if (moment === 'tear') {
    return (
      <div className={`flex flex-col items-center pt-1 pb-2 ${className}`}>
        <h4 className="text-[17px] font-black text-neutral-900 tracking-tight text-center">
          {tokenPending ? 'Generando tu código…' : `¡Te has ganado un ${rewardTitle}!`}
        </h4>
        <p className="mt-1 text-[12.5px] text-neutral-500 font-medium text-center">
          {tokenPending
            ? 'Soltá el ticket y mostrá el código en el mostrador'
            : `Rasgá el ticket para canjearlo en ${businessName}`}
        </p>

        {/* The TearTicket stage is absolutely positioned: this wrapper gives
            the ticket its real box (300px + headroom for the post-tear shift). */}
        <div className="mt-4 w-full flex justify-center" style={{ height: 320 }}>
          <TearTicket
            orientation="vertical"
            width={220}
            height={300}
            stubSize={110}
            radius={18}
            background="#0a0a0b"
            stubBackground="#27272a"
            color="#fafafa"
            border
            borderColor="rgba(255,255,255,0.14)"
            borderWidth={1}
            ariaLabel="Rasgar el ticket para canjear el premio"
            onTear={handleTear}
            torn={torn}
            className="tear-ticket--demo"
            stub={
              <div className="flex flex-col items-center justify-center h-full w-full px-4 text-center">
                <span className="text-[11px] font-black uppercase tracking-[0.16em] text-white/80">
                  Rasgá acá
                </span>
                <span className="mt-1 text-[9.5px] font-medium text-white/40">
                  Arrastrá hacia abajo
                </span>
              </div>
            }
          >
            <div className="flex flex-col items-center justify-center h-full px-5 text-center">
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/45">
                Premio
              </span>
              <span className="mt-2 text-[19px] font-black tracking-tight text-white leading-tight">
                {rewardTitle}
              </span>
              <span className="mt-3 inline-flex items-center px-2.5 py-1 rounded-full bg-white/10 text-[11px] font-bold text-white/70">
                {stamps} {stamps === 1 ? 'sello' : 'sellos'}
              </span>
            </div>
          </TearTicket>
        </div>

        {tokenError && (
          <p className="mt-2 text-[12px] font-semibold text-red-600 text-center">{tokenError}</p>
        )}
      </div>
    );
  }

  // -----------------------------------------------------------------
  // M2 · CODE
  // -----------------------------------------------------------------
  const rewardFace = (
    <div className="flex h-full flex-col items-center justify-center px-6 text-center">
      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
        Premio
      </span>
      <span className="mt-2 text-[22px] font-black leading-tight tracking-tight text-neutral-900">
        {rewardTitle}
      </span>
      <span className="mt-3 inline-flex items-center px-3 py-1 rounded-full bg-neutral-100 text-[11px] font-bold text-neutral-600">
        {stamps} {stamps === 1 ? 'sello' : 'sellos'} canjeados
      </span>
    </div>
  );

  const codeFace = (
    <div className="flex h-full w-full flex-col items-center justify-center bg-neutral-950 px-6 text-center">
      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/45">
        Tu código
      </span>
      <div className="mt-4 flex justify-center">
        <CodeSlots
          length={4}
          value={code}
          accentColor="#ffffff"
          inkColor="#0a0a0b"
          slotColor="rgba(255,255,255,0.08)"
          digitColor="#0a0a0b"
          ariaLabel="Código de canje"
        />
      </div>
      <div className="mt-5 inline-flex items-center gap-1.5 text-[12px] font-semibold text-white/60">
        <svg
          className="w-3.5 h-3.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        <span>Vence en {formatTimer(secondsLeft)} min</span>
      </div>
    </div>
  );

  return (
    <div className={`flex flex-col items-center pt-1 pb-2 ${className}`}>
      <h4 className="text-[17px] font-black text-neutral-900 tracking-tight text-center">
        Mostrá este código en el mostrador
      </h4>

      <div className="mt-4 w-full flex justify-center">
        <FlipCard
          axis="y"
          flipped={flipped}
          onFlipChange={(next) => {
            // The code face is never shown without an issued token, and the
            // card never flips back: the redemption is a one-way door.
            if (!next || !code) return;
          }}
          flipOnClick={false}
          draggable={false}
          tilt={false}
          glare
          width={252}
          height={300}
          radius={22}
          background="#ffffff"
          shadow
          shadowOpacity={0.14}
          ariaLabel="Código de canje"
          front={rewardFace}
          back={codeFace}
        />
      </div>

      {tokenError && (
        <p className="mt-2 text-[12px] font-semibold text-red-600 text-center">{tokenError}</p>
      )}

      <p className="mt-3 text-[11.5px] font-medium text-neutral-400 text-center">
        El canje no suma un sello. Si comprás algo más, ¡sí te suma!
      </p>
    </div>
  );
}

export default RedemptionChoreography;
