import React, { useState, useCallback, useEffect } from 'react';
import { transcribeWithWhisper } from './services/openaiService';
import { Dropzone } from './components/Dropzone';
import { TranscriptionOutput } from './components/TranscriptionOutput';
import { Loader } from './components/Loader';
import { Logo } from './components/icons/Logo';
import { ApiKeyInput } from './components/ApiKeyInput';

const App: React.FC = () => {
  const [apiKey, setApiKey] = useState<string>('');
  const [isKeySet, setIsKeySet] = useState<boolean>(false);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [transcription, setTranscription] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedKey = localStorage.getItem('openai_api_key');
    if (savedKey) {
      setApiKey(savedKey);
      setIsKeySet(true);
    }
  }, []);

  const handleKeySubmit = (key: string) => {
    setApiKey(key);
    localStorage.setItem('openai_api_key', key);
    setIsKeySet(true);
  };
  
  const handleClearKey = () => {
    setApiKey('');
    localStorage.removeItem('openai_api_key');
    setIsKeySet(false);
  };

  const handleFileAccepted = useCallback(async (file: File) => {
    if (!apiKey) {
      setError('La clave API de OpenAI no está configurada.');
      return;
    }
    setAudioFile(file);
    setTranscription('');
    setError(null);
    setIsLoading(true);

    try {
      const result = await transcribeWithWhisper(file, apiKey);
      setTranscription(result);
    } catch (err) {
      if (err instanceof Error) {
        setError(`Error en la transcripción: ${err.message}.`);
      } else {
        setError('Ocurrió un error desconocido durante la transcripción.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [apiKey]);

  const handleReset = () => {
    setAudioFile(null);
    setTranscription('');
    setError(null);
    setIsLoading(false);
  };

  const MainContent = () => (
    <div className="w-full bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl shadow-2xl shadow-slate-950/50 p-6 md:p-8">
      {isLoading ? (
        <Loader message="Transcribiendo audio... esto puede tardar unos segundos." />
      ) : transcription ? (
        <TranscriptionOutput text={transcription} onReset={handleReset} />
      ) : (
        <Dropzone onFileAccepted={handleFileAccepted} audioFile={audioFile} />
      )}

      {error && (
        <div className="mt-6 p-4 bg-red-900/50 border border-red-700 text-red-300 rounded-lg text-sm">
          <p className="font-semibold">¡Ups! Algo salió mal</p>
          <p className="mt-1">{error}</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 flex flex-col items-center justify-center p-4 font-sans relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-slate-700/[0.2] [mask-image:linear-gradient(to_bottom,white_20%,transparent_100%)]"></div>
      
      <main className="w-full max-w-2xl mx-auto z-10 flex flex-col items-center text-center">
        <header className="mb-8">
          <div className="flex items-center justify-center gap-4 mb-2">
            <Logo />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-sky-400 to-cyan-300 text-transparent bg-clip-text">
              Audio a Texto
            </h1>
          </div>
          <p className="text-slate-400">by Aitor</p>
        </header>

        {isKeySet ? <MainContent /> : <ApiKeyInput onKeySubmit={handleKeySubmit} />}
        
        <footer className="mt-8 text-sm text-slate-500">
          <p>Potenciado por la API Whisper de OpenAI. Implementado en Vercel.</p>
          {isKeySet && (
             <button onClick={handleClearKey} className="mt-2 text-sky-400 hover:text-sky-300 underline">
                Cambiar Clave API
            </button>
          )}
        </footer>
      </main>
    </div>
  );
};

export default App;