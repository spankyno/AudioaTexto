import React, { useEffect } from 'react';

interface AboutModalProps {
  onClose: () => void;
}

const techStack = [
  { category: 'Frontend', items: ['React 19', 'TypeScript', 'Tailwind CSS', 'Vite 6'] },
  { category: 'IA & Transcripción', items: ['Google Gemini 2.5 Flash', '@google/genai SDK'] },
  { category: 'Autenticación', items: ['Clerk', '@clerk/clerk-react'] },
  { category: 'Backend / Serverless', items: ['Vercel Edge Functions', 'Node.js API Routes'] },
  { category: 'Infraestructura', items: ['Vercel (Hosting + CDN)', 'Google AI Studio'] },
];

export const AboutModal: React.FC<AboutModalProps> = ({ onClose }) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(2,6,23,0.85)', backdropFilter: 'blur(12px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #0c1a2e 50%, #0d1f35 100%)',
          border: '1px solid rgba(56,189,248,0.2)',
          boxShadow: '0 0 60px rgba(14,165,233,0.15), 0 25px 50px rgba(0,0,0,0.7)',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Decorative top bar */}
        <div className="h-1 w-full rounded-t-2xl" style={{ background: 'linear-gradient(90deg, #38bdf8, #22d3ee, #38bdf8)' }} />

        <div className="p-8">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
            aria-label="Cerrar"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #38bdf8, #22d3ee)' }}>
                <svg className="w-4 h-4 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
                Audio a Texto
              </h2>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-md mx-auto">
              Herramienta de transcripción de audio a texto potenciada por inteligencia artificial, gratuita y accesible desde cualquier dispositivo.
            </p>
          </div>

          {/* Tech Stack */}
          <div className="mb-8">
            <h3 className="text-xs font-bold uppercase tracking-widest text-sky-400 mb-4 flex items-center gap-2">
              <span className="block w-4 h-px bg-sky-400/50" />
              Stack Tecnológico
              <span className="block flex-1 h-px bg-sky-400/20" />
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {techStack.map(({ category, items }) => (
                <div
                  key={category}
                  className="rounded-xl p-4"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <p className="text-xs font-semibold text-cyan-400 mb-2 uppercase tracking-wider">{category}</p>
                  <ul className="space-y-1">
                    {items.map(item => (
                      <li key={item} className="flex items-center gap-2 text-slate-300 text-sm">
                        <span className="w-1 h-1 rounded-full bg-sky-400 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Author */}
          <div
            className="rounded-xl p-5 mb-6"
            style={{ background: 'rgba(56,189,248,0.05)', border: '1px solid rgba(56,189,248,0.15)' }}
          >
            <h3 className="text-xs font-bold uppercase tracking-widest text-sky-400 mb-4 flex items-center gap-2">
              <span className="block w-4 h-px bg-sky-400/50" />
              Autor y Contacto
              <span className="block flex-1 h-px bg-sky-400/20" />
            </h3>
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)', color: '#0f172a' }}
              >
                A
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold">Aitor Sánchez Gutiérrez</p>
                <p className="text-slate-400 text-xs mb-3">© 2026 — Reservados todos los derechos</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <a
                    href="mailto:blog.cottage627@passinbox.com"
                    className="flex items-center gap-2 text-xs text-slate-300 hover:text-sky-400 transition-colors group"
                  >
                    <svg className="w-3.5 h-3.5 text-slate-500 group-hover:text-sky-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="truncate">blog.cottage627@passinbox.com</span>
                  </a>
                  <a
                    href="https://aitor-blog-contacto.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs text-slate-300 hover:text-sky-400 transition-colors group"
                  >
                    <svg className="w-3.5 h-3.5 text-slate-500 group-hover:text-sky-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Formulario de contacto
                  </a>
                  <a
                    href="https://aitorblog.infinityfreeapp.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs text-slate-300 hover:text-sky-400 transition-colors group"
                  >
                    <svg className="w-3.5 h-3.5 text-slate-500 group-hover:text-sky-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    Blog
                  </a>
                  <a
                    href="https://aitorhub.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs text-slate-300 hover:text-sky-400 transition-colors group"
                  >
                    <svg className="w-3.5 h-3.5 text-slate-500 group-hover:text-sky-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    Más apps
                  </a>
                </div>
              </div>
            </div>
          </div>

          <p className="text-center text-slate-600 text-xs">
            Hecho con ♥ en España · Versión 0.1.0
          </p>
        </div>
      </div>
    </div>
  );
};
