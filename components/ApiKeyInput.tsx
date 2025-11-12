import React, { useState } from 'react';
import { KeyIcon } from './icons/KeyIcon';
import { EyeIcon } from './icons/EyeIcon';
import { EyeOffIcon } from './icons/EyeOffIcon';

interface ApiKeyInputProps {
  onKeySubmit: (key: string) => void;
}

export const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ onKeySubmit }) => {
  const [key, setKey] = useState('');
  const [showKey, setShowKey] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (key.trim()) {
      onKeySubmit(key.trim());
    }
  };

  return (
    <div className="w-full bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl shadow-2xl shadow-slate-950/50 p-6 md:p-8 flex flex-col items-center">
      <KeyIcon />
      <h2 className="text-xl font-semibold mt-4 mb-2">Introduce tu Clave API de OpenAI</h2>
      <p className="text-slate-400 mb-6 text-center max-w-md">
        Para usar esta aplicación, necesitas una clave API de OpenAI. Tu clave se guarda de forma segura en tu navegador y nunca se comparte.
      </p>
      <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col gap-4">
        <div className="relative">
          <input
            type={showKey ? 'text' : 'password'}
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="sk-..."
            className="w-full pl-4 pr-10 py-3 bg-slate-900 border border-slate-700 rounded-lg text-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
            required
          />
          <button
            type="button"
            onClick={() => setShowKey(!showKey)}
            className="absolute inset-y-0 right-0 px-3 flex items-center text-slate-400 hover:text-slate-200"
            aria-label={showKey ? 'Ocultar clave' : 'Mostrar clave'}
          >
            {showKey ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>
        <button
          type="submit"
          className="w-full px-6 py-3 bg-gradient-to-r from-sky-500 to-cyan-400 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!key.trim()}
        >
          Guardar y Continuar
        </button>
      </form>
    </div>
  );
};
