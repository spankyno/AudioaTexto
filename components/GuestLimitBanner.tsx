import React from 'react';
import { useClerk } from '@clerk/clerk-react';

interface GuestLimitBannerProps {
  daysLeft: number;
}

export const GuestLimitBanner: React.FC<GuestLimitBannerProps> = ({ daysLeft }) => {
  const { openSignIn, openSignUp } = useClerk();

  return (
    <div className="w-full mt-6 p-5 rounded-xl border border-amber-500/40 bg-amber-900/20 backdrop-blur-sm text-center">
      <div className="flex items-center justify-center gap-2 mb-2">
        <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        </svg>
        <p className="text-amber-400 font-semibold text-sm">Límite de uso gratuito alcanzado</p>
      </div>
      <p className="text-slate-300 text-sm mb-4">
        Como usuario invitado, puedes transcribir <strong>1 archivo cada 5 días</strong>.
        Podrás volver a usar la aplicación en <span className="text-sky-400 font-bold">{daysLeft} {daysLeft === 1 ? 'día' : 'días'}</span>.
      </p>
      <p className="text-slate-400 text-xs mb-4">
        ¿Quieres acceso ilimitado? Crea una cuenta gratis.
      </p>
      <div className="flex gap-3 justify-center">
        <button
          onClick={() => openSignUp()}
          className="px-5 py-2 bg-gradient-to-r from-sky-500 to-cyan-400 text-white text-sm font-semibold rounded-lg shadow hover:opacity-90 transition-opacity"
        >
          Crear cuenta gratis
        </button>
        <button
          onClick={() => openSignIn()}
          className="px-5 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 text-sm font-medium rounded-lg transition-colors"
        >
          Iniciar sesión
        </button>
      </div>
    </div>
  );
};
