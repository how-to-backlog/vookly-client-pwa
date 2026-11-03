'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import TearTicket from '@/components/registry/TearTicket';
import FlipCard from '@/components/registry/FlipCard';
import SlideCommit from '@/components/registry/SlideCommit';
import CodeSlots from '@/components/registry/CodeSlots';

export type RedemptionMoment = 'tear' | 'reward' | 'code';

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
  onRequestToken: () => Promise<string | null>;
  /** Called when the token expires: the card returns to the reward face. */
  onTokenExpired?: () => void;
  className?: string;
}

const TOKEN_TTL_SECONDS = 15 * 60;

function formatTimer(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

/**
 * RedemptionChoreography: the three-moment redemption sequence.
 *
 * M1 · Tear — a vertical TearTicket carries the reward. Tearing it off is
 *        the consequence of confirming the "are you at the counter?" gate.
 * M2 · Reward — a FlipCard (axis "y") shows the earned reward on its front
 *        face, with a SlideCommit below it as an independent control.
 * M3 · Code — once the SlideCommit is committed, the card flips and the back
 *        face shows the 4-digit code with a 15-minute timer.
 *
 * The SlideCommit never lives inside a card face: mixing a drag gesture with
 * a surface that owns its own flip gesture produces an ambiguous interaction.
 */
export function RedemptionChoreography({
  rewardTitle,
  stamps,
  businessName,
  onRequestToken,
  onTokenExpired,
  className = ''
}: RedemptionChoreographyProps) {
  const [moment, setMoment] = useState<RedemptionMoment>('tear');
  const [torn, setTorn] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [code, setCode] = useState<string>('');
  const [tokenPending, setTokenPending] = useState(false);
  const [tokenError, setTokenError] = useState<string | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(TOKEN_TTL_SECONDS);

  // Keeps the countdown tied to the moment the code actually became visible.
  const tokenIssuedAtRef = useRef<number | null>(null);

  const handleTear = useCallback(() => {
    setTorn(true);
    setMoment('reward');
  }, []);

  // The token is requested only after the tear, so the 15 minute window
  // starts when the customer actually sees the code.
  const handleConfirm = useCallback(async () => {
    setTokenPending(true);
    setTokenError(null);
    try {
      const issued = await onRequestToken();
      if (!issued) {
        setTokenError('No se pudo generar el código. Intentá de nuevo.');
        throw new Error('token-not-issued');
      }
      setCode(issued);
      setFlipped(true);
      setSecondsLeft(TOKEN_TTL_SECONDS);
      tokenIssuedAtRef.current = Date.now();
    } catch (error) {
      if (error instanceof Error && error.message === 'token-not-issued') throw error;
      setTokenError('No se pudo generar el código. Intentá de nuevo.');
      throw error;
    } finally {
      setTokenPending(false);
    }
  }, [onRequestToken]);

  const handleFlipDone = useCallback(() => {
    setMoment('code');
  }, []);

  const handleHideCode = useCallback(() => {
    setFlipped(false);
    setMoment('reward');
  }, []);

  // Countdown: only runs while the code face is the visible one.
  useEffect(() => {
    if (moment !== 'code' || tokenIssuedAtRef.current === null) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          // The reward is never lost: the card goes back to the reward face.
          setFlipped(false);
          setMoment('reward');
          onTokenExpired?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [moment, onTokenExpired]);

  // -----------------------------------------------------------------
  // M1 · TEAR
  // -----------------------------------------------------------------
  if (moment === 'tear') {
    return (
      <div className={`flex flex-col items-center pt-1 pb-2 ${className}`}>
        <h4 className="text-[17px] font-black text-neutral-900 tracking-tight text-center">
          ¡Te has ganado un {rewardTitle}!
        </h4>
        <p className="mt-1 text-[12.5px] text-neutral-500 font-medium text-center">
          Rasgá el ticket para canjearlo en {businessName}
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
      </div>
    );
  }

  // -----------------------------------------------------------------
  // M2 · REWARD  /  M3 · CODE
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
      <span className="mt-4 text-[11.5px] font-medium text-neutral-400">
        Deslizá para confirmar y ver tu código
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
        {moment === 'code' ? 'Mostrá este código en el mostrador' : 'Confirmá tu canje'}
      </h4>

      <div className="mt-4 w-full flex justify-center">
        <FlipCard
          axis="y"
          flipped={flipped}
          onFlipChange={(next) => {
            // The code face is never shown without an issued token: keyboard
            // flip must not bypass the SlideCommit confirmation.
            if (next && !code) return;
            setFlipped(next);
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
          ariaLabel={flipped ? 'Código de canje' : 'Premio obtenido'}
          front={rewardFace}
          back={codeFace}
        />
      </div>

      {/* The SlideCommit is an independent control, never inside a card face. */}
      <div className="mt-5 w-full max-w-[252px] flex flex-col gap-2">
        {moment === 'code' ? (
          <button
            type="button"
            onClick={handleHideCode}
            className="self-center inline-flex items-center justify-center px-5 py-2 rounded-full bg-neutral-100 hover:bg-neutral-200 active:scale-95 text-neutral-800 font-semibold text-[13px] transition-all"
          >
            Ocultar código temporalmente
          </button>
        ) : (
          <SlideCommit
            label="Deslizá para canjear"
            doneLabel="¡Canjeado!"
            errorLabel="No se pudo canjear"
            disabled={tokenPending}
            onConfirm={handleConfirm}
            onDone={handleFlipDone}
            width={252}
            height={46}
            radius={23}
            onError={() => {
              setTokenError('No se pudo generar el código. Intentá de nuevo.');
            }}
          />
        )}
      </div>

      {tokenError && (
        <p className="mt-2 text-[12px] font-semibold text-red-600 text-center">{tokenError}</p>
      )}

      {moment === 'reward' && (
        <p className="mt-3 text-[11.5px] font-medium text-neutral-400 text-center">
          El canje no suma un sello. Si comprás algo más, ¡sí te suma!
        </p>
      )}
    </div>
  );
}

export default RedemptionChoreography;
