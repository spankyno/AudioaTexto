import React from 'react';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from '@clerk/clerk-react';

interface AppFooterProps {
  onAboutClick: () => void;
}

export const AppFooter: React.FC<AppFooterProps> = ({ onAboutClick }) => {
  return (
    <footer className="mt-8 flex flex-col items-center gap-3 text-sm text-slate-500">
      {/* Auth area */}
      <div className="flex items-center gap-3">
        <SignedOut>
          <SignInButton mode="modal">
            <button className="text-xs text-slate-400 hover:text-sky-400 transition-colors underline underline-offset-2">
              Iniciar sesión
            </button>
          </SignInButton>
          <span className="text-slate-700">·</span>
          <SignUpButton mode="modal">
            <button className="text-xs px-3 py-1 rounded-full border border-sky-500/40 text-sky-400 hover:bg-sky-500/10 transition-colors">
              Crear cuenta gratis
            </button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <UserButton />
            <span>Sesión activa · acceso ilimitado</span>
          </div>
        </SignedIn>
      </div>

      {/* Links row */}
      <div className="flex items-center gap-2 text-xs">
        <span>Potenciado por Google Gemini · Vercel</span>
        <span className="text-slate-700">·</span>
        <button
          onClick={onAboutClick}
          className="text-slate-400 hover:text-sky-400 transition-colors underline underline-offset-2"
        >
          Acerca de
        </button>
      </div>
    </footer>
  );
};
