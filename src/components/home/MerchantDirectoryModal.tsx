'use client';

import React, { useState } from 'react';
import { X, ChevronRight, ExternalLink, ArrowLeft } from 'lucide-react';
import type { CategoryIconName } from '@/components/icons/CategoryIcon';
import { CATEGORY_LABELS, CategoryIcon } from '@/components/icons/CategoryIcon';

export interface MerchantDirectoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: CategoryIconName | 'all';
}

interface DirectoryMerchant {
  id: string;
  name: string;
  category: CategoryIconName;
  neighborhood: string;
  address: string;
  featuredProducts: string[];
  mapsUrl: string;
}

const DIRECTORY_MERCHANTS: DirectoryMerchant[] = [
  // Cafeterías
  {
    id: 'caf-1',
    name: 'Coffee Shop',
    category: 'cafeteria',
    neighborhood: 'Centro',
    address: 'Av. San Martín 450',
    featuredProducts: ['Café de Especialidad', 'Tostado Especial', 'Taza Cerámica Térmica'],
    mapsUrl: 'https://maps.google.com/?q=Av.+San+Martin+450+Cordoba'
  },
  {
    id: 'caf-2',
    name: 'Café Roma',
    category: 'cafeteria',
    neighborhood: 'Güemes',
    address: 'Belgrano 720',
    featuredProducts: ['Espresso Doble', 'Porción de Torta', 'Taza Coleccionable Roma'],
    mapsUrl: 'https://maps.google.com/?q=Belgrano+720+Cordoba'
  },
  {
    id: 'caf-3',
    name: 'Mondieu Café',
    category: 'cafeteria',
    neighborhood: 'Nueva Córdoba',
    address: 'Chacabuco 820',
    featuredProducts: ['Flat White', 'Cookie Artesanal', 'Cold Brew Especial'],
    mapsUrl: 'https://maps.google.com/?q=Chacabuco+820+Cordoba'
  },

  // Heladerías
  {
    id: 'hel-1',
    name: 'Heladería del Parque',
    category: 'heladeria',
    neighborhood: 'Parque Sarmiento',
    address: 'Av. Poeta Lugones 210',
    featuredProducts: ['Cucurucho 2 bochas', '1/4 Kg Artesanal', 'Vaso Térmico + 1 Kg'],
    mapsUrl: 'https://maps.google.com/?q=Av.+Poeta+Lugones+210+Cordoba'
  },
  {
    id: 'hel-2',
    name: 'Gelato & Co.',
    category: 'heladeria',
    neighborhood: 'Nueva Córdoba',
    address: 'Chacabuco 650',
    featuredProducts: ['Cucurucho Bañado', 'Pistacho Italiano', 'Vaso Térmico Gelato'],
    mapsUrl: 'https://maps.google.com/?q=Chacabuco+650+Cordoba'
  },

  // Barberías
  {
    id: 'bar-1',
    name: 'La Barbería Club',
    category: 'barberia',
    neighborhood: 'Nueva Córdoba',
    address: 'Estrada 120',
    featuredProducts: ['Perfilado de Barba', 'Corte Clásico', 'Servicio VIP con toalla'],
    mapsUrl: 'https://maps.google.com/?q=Estrada+120+Cordoba'
  },
  {
    id: 'bar-2',
    name: 'Barber Studio',
    category: 'barberia',
    neighborhood: 'Güemes',
    address: 'Rondeau 480',
    featuredProducts: ['Lavado Premium', 'Corte Fade', 'Pomada Fijadora Studio'],
    mapsUrl: 'https://maps.google.com/?q=Rondeau+480+Cordoba'
  },

  // Panaderías
  {
    id: 'pan-1',
    name: 'Panadería La Espiga',
    category: 'panaderia',
    neighborhood: 'Centro',
    address: 'Bv. Illia 340',
    featuredProducts: ['Medialunas de Manteca', 'Pan de Masa Madre', 'Docena de Facturas'],
    mapsUrl: 'https://maps.google.com/?q=Bv.+Illia+340+Cordoba'
  },
  {
    id: 'pan-2',
    name: 'Masa Madre Bakery',
    category: 'panaderia',
    neighborhood: 'Güemes',
    address: 'Fructuoso Rivera 260',
    featuredProducts: ['Chipá Caliente', 'Baguette Rústica', 'Docena Especial + Torta'],
    mapsUrl: 'https://maps.google.com/?q=Fructuoso+Rivera+260+Cordoba'
  }
];

export const MerchantDirectoryModal: React.FC<MerchantDirectoryModalProps> = ({
  isOpen,
  onClose,
  initialCategory = 'all'
}) => {
  const [selectedFilter, setSelectedFilter] = useState<CategoryIconName | 'all'>(initialCategory);
  const [activeMerchant, setActiveMerchant] = useState<DirectoryMerchant | null>(null);

  // El modal se monta sólo cuando se abre (ver `src/app/hub/page.tsx`), así que
  // el listado arranca siempre en el filtro con el que se abrió y sin detalle
  // activo. Sin efecto de reseteo: el estado inicial ya es el correcto.

  const handleClose = () => {
    setActiveMerchant(null);
    onClose();
  };

  if (!isOpen) return null;

  const filteredMerchants = DIRECTORY_MERCHANTS.filter((m) => {
    return selectedFilter === 'all' || m.category === selectedFilter;
  });

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={handleClose}
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex justify-center items-end sm:items-center p-0 sm:p-4 select-none animate-in fade-in duration-150"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white rounded-t-[28px] sm:rounded-[28px] p-5 shadow-xl flex flex-col max-h-[80vh] overflow-hidden animate-in slide-in-from-bottom duration-200 text-left"
      >
        {/* Handle superior móvil */}
        <div className="w-10 h-1 bg-neutral-200 rounded-full mx-auto mb-3 shrink-0 sm:hidden" />

        {/* Header minimalista y dinámico */}
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100 shrink-0">
          {activeMerchant ? (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveMerchant(null)}
                aria-label="Volver al listado"
                className="w-8 h-8 rounded-full hover:bg-neutral-100 active:scale-95 text-neutral-500 hover:text-neutral-900 flex items-center justify-center transition-all -ml-1.5"
              >
                <ArrowLeft className="w-5 h-5" strokeWidth={2.4} />
              </button>
              <h2 className="text-[20px] font-bold text-neutral-900 leading-tight">
                {activeMerchant.name}
              </h2>
            </div>
          ) : (
            <h2 className="text-[17px] font-bold text-neutral-900 leading-tight">
              Nuestros Comercios Adheridos
            </h2>
          )}
          <button
            type="button"
            onClick={handleClose}
            className="w-7 h-7 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-400 hover:text-neutral-900 flex items-center justify-center transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Filtros por rubro (solo visibles en el listado general, ocultos al entrar a un local) */}
        {!activeMerchant && (
          <div className="grid grid-cols-5 gap-1.5 py-3 shrink-0">
            <button
              type="button"
              onClick={() => setSelectedFilter('all')}
              className={`py-1.5 px-1 rounded-xl text-[11px] font-semibold transition-all text-center truncate ${
                selectedFilter === 'all'
                  ? 'bg-neutral-950 text-white shadow-xs'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              Todos
            </button>
            {[
              { id: 'cafeteria', label: 'Cafeterías' },
              { id: 'heladeria', label: 'Heladerías' },
              { id: 'barberia', label: 'Barberías' },
              { id: 'panaderia', label: 'Panaderías' }
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedFilter(cat.id as CategoryIconName)}
                className={`py-1.5 px-0.5 rounded-xl text-[10.5px] font-semibold transition-all text-center truncate ${
                  selectedFilter === cat.id
                    ? 'bg-neutral-950 text-white shadow-xs'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}

        {/* Vista detallada del comercio seleccionado (Aplica dinámicamente a todos los locales) */}
        {activeMerchant ? (
          <div className="flex-1 overflow-y-auto pt-3 flex flex-col justify-between">
            <div className="flex flex-col gap-3">
              {/* Ficha de Productos Destacados */}
              <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-100 flex flex-col gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                  Productos destacados
                </span>
                <div className="flex flex-col gap-1.5 pt-0.5">
                  {activeMerchant.featuredProducts.map((prod, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[13px] font-semibold text-neutral-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                      <span>{prod}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cómo sumarlo: copy exacto para todos los comercios */}
              <div className="p-3.5 bg-neutral-50 rounded-2xl border border-neutral-100 text-[12px] text-neutral-600 leading-relaxed flex flex-col gap-1">
                <span className="font-bold text-neutral-900 text-[13px]">
                  Sumate a {activeMerchant.name}
                </span>
                <p className="text-neutral-500">
                  Acercate al local y adherite a Vookly.
                </p>
              </div>
            </div>

            {/* Pie inferior: Dirección con px-4 para compartir la misma plomada que el contenido interior */}
            <div className="pt-3.5 border-t border-neutral-100 flex items-center justify-between gap-3 px-4">
              <div className="flex flex-col min-w-0">
                <span className="text-[14px] font-bold text-neutral-900 truncate leading-tight">
                  {activeMerchant.address}
                </span>
                <span className="text-[12px] font-medium text-neutral-500 truncate mt-0.5">
                  {activeMerchant.neighborhood}
                </span>
              </div>

              <a
                href={activeMerchant.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit px-3.5 py-2 bg-neutral-950 hover:bg-neutral-800 text-white rounded-xl text-[12px] font-semibold flex items-center gap-1.5 transition-all shadow-2xs shrink-0"
              >
                <span>Ver en Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ) : (
          /* Listado de Comercios minimalista con icono limpio a la izquierda */
          <div className="flex-1 overflow-y-auto no-scrollbar pt-1 flex flex-col gap-1.5">
            {filteredMerchants.length === 0 ? (
              <div className="py-8 text-center">
                <p className="text-[12px] font-normal text-neutral-400">
                  No hay comercios en esta búsqueda.
                </p>
              </div>
            ) : (
              filteredMerchants.map((merchant) => (
                <div
                  key={merchant.id}
                  onClick={() => setActiveMerchant(merchant)}
                  className="p-3 hover:bg-neutral-50 active:scale-[0.99] rounded-xl border border-neutral-100 flex items-center justify-between cursor-pointer transition-all gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Icono de rubro gris, directo y sin caja/disco */}
                    <div className="shrink-0 text-neutral-400">
                      <CategoryIcon name={merchant.category} size={22} strokeWidth={1.5} />
                    </div>

                    <div className="flex flex-col gap-0.5 min-w-0">
                      <h4 className="text-[13.5px] font-bold text-neutral-900 leading-tight truncate">
                        {merchant.name}
                      </h4>
                      <p className="text-[11px] font-normal text-neutral-400 truncate">
                        {merchant.neighborhood} • {merchant.address}
                      </p>
                      <p className="text-[11px] font-medium text-emerald-700 truncate">
                        {merchant.featuredProducts[0]}
                      </p>
                    </div>
                  </div>

                  <ChevronRight className="w-3.5 h-3.5 text-neutral-300 shrink-0" />
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MerchantDirectoryModal;
