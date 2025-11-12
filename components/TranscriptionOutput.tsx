
import React, { useState, useEffect } from 'react';
import { CopyIcon } from './icons/CopyIcon';
import { CheckIcon } from './icons/CheckIcon';
import { RedoIcon } from './icons/RedoIcon';


interface TranscriptionOutputProps {
  text: string;
  onReset: () => void;
}

export const TranscriptionOutput: React.FC<TranscriptionOutputProps> = ({ text, onReset }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
  };

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  return (
    <div className="w-full flex flex-col gap-4">
      <h2 className="text-xl font-semibold text-left text-slate-200">Transcripción completada</h2>
      <div className="relative">
        <textarea
          readOnly
          value={text}
          className="w-full h-64 p-4 bg-slate-900 border border-slate-700 rounded-lg text-slate-300 resize-none focus:ring-2 focus:ring-sky-500 focus:outline-none"
          aria-label="Texto transcrito"
        />
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 p-2 bg-slate-700 hover:bg-slate-600 rounded-md transition-colors text-slate-300"
          aria-label="Copiar texto"
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
        </button>
      </div>
      <div className="flex justify-center">
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-sky-500 to-cyan-400 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-300 ease-in-out"
        >
          <RedoIcon/>
          Transcribir otro archivo
        </button>
      </div>
    </div>
  );
};
