'use client';

import {
  forwardRef,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode
} from 'react';
import { animate, motion, motionValue, useReducedMotion, useTransform } from 'motion/react';
import type { MotionValue } from 'motion/react';

import './JellyRadio.css';

/**
 * Un item del control. `label` es opcional: cuando se omite, el chip renderiza
 * sólo el ícono. En ese caso hay que aportar el nombre accesible con
 * `ariaLabel`, para que el control no dependa del color ni del ícono para
 * comunicar su significado.
 */
export interface JellyRadioItem {
  /** Valor emitido por `onChange` al seleccionar el item. */
  value: string;
  /** Texto visible. Si se omite, el chip queda reducido a su ícono. */
  label?: string;
  /**
   * Nombre accesible del chip. Tiene precedencia sobre el texto visible y es
   * obligatorio cuando el chip no muestra `label`.
   */
  ariaLabel?: string;
  /** Contenido del ícono (cualquier nodo renderizable). */
  icon?: ReactNode;
  /** Item no seleccionable. */
  disabled?: boolean;
  /**
   * Color aplicado al chip cuando está activo. Tiene precedencia sobre los
   * colores globales del grupo, para poder colorear cada item por su
   * semántica (por ejemplo, el color de la categoría a la que pertenece).
   */
  activeColor?: string;
  /**
   * Color del texto/icono cuando el chip está activo. Tiene precedencia sobre
   * `activeTextColor` del grupo.
   */
  activeTextColor?: string;
  /**
   * Color del texto/icono cuando el chip está inactivo. Tiene precedencia
   * sobre `textColor` del grupo. Permite que cada item conserve su identidad
   * cromática sin que el color activo se mezcle con el inactivo.
   */
  textColor?: string;
}

export interface JellyRadioProps {
  /** Items a renderizar. Cada uno puede ser un string simple o un objeto. */
  items?: (string | JellyRadioItem)[];
  /** Valor controlado. Si se omite, el componente gestiona su propio estado. */
  value?: string;
  /** Valor inicial cuando el componente es no controlado. */
  defaultValue?: string;
  /** Callback invocado con el nuevo valor y su índice. */
  onChange?: (value: string, index: number) => void;
  /** Color de fondo de los chips inactivos. */
  chipColor?: string;
  /** Color de fondo del chip activo. */
  activeColor?: string;
  /** Color del texto de los chips inactivos. */
  textColor?: string;
  /** Color del texto del chip activo. */
  activeTextColor?: string;
  /** Tamaño del control: `sm`, `md` o `lg`. */
  size?: 'sm' | 'md' | 'lg';
  /** Separación entre chips, en píxeles. */
  gap?: number;
  /** Radio de las esquinas de los chips, en píxeles. */
  radius?: number;
  /** Cuánto se estira el chip activo. */
  swell?: number;
  /** Desplazamiento lateral entre chips, en píxeles. */
  barge?: number;
  /** Cuánto se contraen los chips inactivos. */
  shrink?: number;
  /** Intensidad del efecto gelatinoso. */
  jelly?: number;
  /** Rebote de la animación. */
  bounce?: number;
  /** Escalonado entre chips, en milisegundos. */
  stagger?: number;
  /** Rigidez del resorte. */
  stiffness?: number;
  /** Deshabilita el control completo. */
  disabled?: boolean;
  /** Etiqueta accesible del grupo de opciones. */
  ariaLabel?: string;
  /**
   * Cuando es `true`, el grupo no reserva padding lateral.
   *
   * El padding lateral existe para que el chip activo pueda crecer y desplazarse
   * sin recortarse en controles con etiquetas, donde el grupo recorta el
   * desbordamiento. En controles de chips circulares el crecimiento va hacia
   * afuera y no se recorta, así que ese padding sólo descentra los íconos
   * respecto del eje de lectura del contenido que los acompaña.
   */
  inset?: boolean;
  className?: string;
}

const DEFAULT_ITEMS = ['Off', 'Low', 'Medium', 'High', 'Max'];
const SIZES: Record<'sm' | 'md' | 'lg', [number, number, number]> = {
  sm: [28, 12, 12],
  md: [36, 13, 16],
  lg: [44, 14, 20]
};

const spring = (k: number, m: number, bounce: number) => ({
  type: 'spring' as const,
  stiffness: k,
  damping: 2 * Math.sqrt(k * m) * (1 - bounce),
  mass: m
});

interface ChipMotionValues {
  x: MotionValue<number>;
  sx: MotionValue<number>;
  sy: MotionValue<number>;
}

interface ChipProps extends Omit<React.ComponentPropsWithoutRef<typeof motion.button>, 'ref'> {
  mv: ChipMotionValues;
}

const Chip = forwardRef<HTMLButtonElement, ChipProps>(function Chip({ mv, children, ...rest }, ref) {
  const transform = useTransform(
    () => `translateX(${mv.x.get()}px) scale(${mv.sx.get()}, ${mv.sy.get()})`
  );
  return (
    <motion.button ref={ref} style={{ transform }} {...rest}>
      {children}
    </motion.button>
  );
});

export const JellyRadio = ({
  items = DEFAULT_ITEMS,
  value,
  defaultValue,
  onChange,
  chipColor = '#27272a',
  activeColor = '#f5f5f5',
  textColor = '#f5f5f5',
  activeTextColor = '#18181b',
  size = 'md',
  gap = 8,
  radius = 18,
  swell = 0.2,
  barge = 6,
  shrink = 0.05,
  jelly = 1,
  bounce = 0.25,
  stagger = 22,
  stiffness = 580,
  disabled = false,
  ariaLabel = 'Options',
  inset = false,
  className = ''
}: JellyRadioProps) => {
  const list: JellyRadioItem[] = items.map(it =>
    typeof it === 'string' ? { value: it, label: it } : it
  );
  const [inner, setInner] = useState(() => defaultValue ?? list[0]?.value);
  const current = value ?? inner;
  const at = Math.max(
    0,
    list.findIndex(it => it.value === current)
  );
  const reduce = useReducedMotion();
  const groupRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const widths = useRef<number[]>([]);
  const applied = useRef(at);
  const cfg = useRef({
    swell,
    barge,
    shrink,
    jelly,
    bounce,
    stagger,
    stiffness,
    reduce,
    count: list.length
  });
  const [h, font, px] = SIZES[size] ?? SIZES.md;
  const itemsKey = list.map(it => it.value).join('|');

  // Los MotionValues se crean una vez por item y viven fuera del ciclo de
  // render: mutarlos durante el render rompería las reglas de React.
  const mvs = useMemo<ChipMotionValues[]>(
    () => list.map(() => ({ x: motionValue(0), sx: motionValue(1), sy: motionValue(1) })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [itemsKey]
  );

  // La configuración de la animación se lee desde las callbacks, que corren
  // fuera del render: se sincroniza en un efecto, no durante el render.
  useEffect(() => {
    cfg.current = {
      swell,
      barge,
      shrink,
      jelly,
      bounce,
      stagger,
      stiffness,
      reduce,
      count: list.length
    };
  }, [swell, barge, shrink, jelly, bounce, stagger, stiffness, reduce, list.length]);

  const apply = (sel: number, instant: boolean) => {
    const C = cfg.current;
    const group = groupRef.current;
    const rtl = group ? getComputedStyle(group).direction === 'rtl' : false;
    const push = ((widths.current[sel] ?? 0) * C.swell) / 2 + C.barge;
    for (let i = 0; i < C.count; i++) {
      const mv = mvs[i];
      if (!mv) continue;
      const on = i === sel;
      const far = Math.abs(i - sel);
      const dir = Math.sign(i - sel) * (rtl ? -1 : 1);
      const x = dir * push;
      const s = on ? 1 + C.swell : 1 - C.shrink;
      if (instant || C.reduce) {
        mv.x.jump(x);
        mv.sx.jump(s);
        mv.sy.jump(s);
        continue;
      }
      const k = C.stiffness * (1 - 0.12 * Math.min(far, 3));
      const inFlight = mv.x.isAnimating() || mv.sx.isAnimating() || mv.sy.isAnimating();
      const delay = inFlight ? 0 : (far * C.stagger) / 1000;
      animate(mv.x, x, { ...spring(k, 0.9, C.bounce), delay });
      const j = C.jelly;
      animate(mv.sx, s, {
        ...spring(k * (1 + 0.24 * j), 0.9 - 0.1 * j, Math.min(0.85, C.bounce + 0.3 * j)),
        delay
      });
      animate(mv.sy, s, {
        ...spring(k * (1 - 0.14 * j), 0.9 + 0.05 * j, C.bounce),
        delay: delay + 0.05 * j
      });
    }
  };

  const measure = () => {
    const group = groupRef.current;
    if (!group) return;
    widths.current = chipRefs.current.map(el => el?.offsetWidth ?? 0);
    const chipH = chipRefs.current[0]?.offsetHeight ?? 0;
    const maxW = Math.max(0, ...widths.current);
    group.style.setProperty('--jr-pad-x', inset ? '0px' : `${Math.ceil((maxW * swell * 1.3) / 2 + barge) + 2}px`);
    group.style.setProperty('--jr-pad-y', `${Math.ceil((chipH * swell) / 2) + 2}px`);
  };

  useLayoutEffect(() => {
    const settle = () => {
      measure();
      apply(applied.current, true);
    };
    settle();
    const observer = new ResizeObserver(settle);
    if (groupRef.current) observer.observe(groupRef.current);
    document.fonts?.ready.then(settle);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsKey, size, gap, swell, barge, shrink, inset]);

  useEffect(() => {
    if (applied.current === at) return;
    applied.current = at;
    // La animación se mantiene también en modo controlado: el efecto anterior
    // (con `instant`) anulaba el rebote cuando el padre movía `value`.
    apply(at, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [at]);

  useEffect(
    () => () =>
      mvs.forEach(mv => {
        mv.x.destroy();
        mv.sx.destroy();
        mv.sy.destroy();
      }),
    [mvs]
  );

  const commit = (i: number, instant: boolean) => {
    if (disabled || i === at || !list[i] || list[i].disabled) return;
    applied.current = i;
    apply(i, instant);
    if (value === undefined) setInner(list[i].value);
    onChange?.(list[i].value, i);
  };

  const stepFrom = (i: number, dir: number) => {
    const n = list.length;
    let j = i;
    for (let tries = 0; tries < n; tries++) {
      j = (j + dir + n) % n;
      if (!list[j].disabled) return j;
    }
    return i;
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    let next: number | null = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = stepFrom(i, 1);
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = stepFrom(i, -1);
    else if (e.key === 'Home') next = stepFrom(-1, 1);
    else if (e.key === 'End') next = stepFrom(list.length, -1);
    else if (e.key === ' ' || e.key === 'Enter') next = i;
    if (next === null) return;
    e.preventDefault();
    commit(next, true);
    chipRefs.current[next]?.focus();
  };

  return (
    <div
      ref={groupRef}
      role="radiogroup"
      aria-label={ariaLabel}
      data-disabled={disabled ? '' : undefined}
      className={`jelly-radio${className ? ` ${className}` : ''}`}
      style={{
        '--jr-chip': chipColor,
        '--jr-active': activeColor,
        '--jr-text': textColor,
        '--jr-active-text': activeTextColor,
        '--jr-gap': `${gap}px`,
        '--jr-radius': `${radius}px`,
        '--jr-h': `${h}px`,
        '--jr-font': `${font}px`,
        '--jr-px': `${px}px`
      } as CSSProperties}
    >
      {list.map((it, i) => (
        <Chip
          key={it.value}
          mv={mvs[i]}
          ref={el => {
            chipRefs.current[i] = el;
          }}
          type="button"
          role="radio"
          aria-checked={i === at}
          aria-label={it.ariaLabel ?? it.label}
          tabIndex={i === at ? 0 : -1}
          disabled={disabled || !!it.disabled}
          className="jelly-radio__chip"
          data-on={i === at ? 'true' : 'false'}
          style={{
            '--jr-item-active': it.activeColor ?? activeColor,
            '--jr-item-active-text': it.activeTextColor ?? activeTextColor,
            '--jr-item-text': it.textColor ?? textColor
          } as CSSProperties}
          onClick={e => commit(i, e.detail === 0)}
          onKeyDown={e => onKeyDown(e, i)}
        >
          <span className="jelly-radio__skin">
            {it.icon ? <span className="jelly-radio__icon">{it.icon}</span> : null}
            {it.label ? <span className="jelly-radio__label">{it.label}</span> : null}
          </span>
        </Chip>
      ))}
    </div>
  );
};

export default JellyRadio;
