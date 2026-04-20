import React, { useState, useCallback } from 'react';
import { useUser } from '@clerk/clerk-react';
import { transcribeAudio } from './services/geminiService';
import { Dropzone } from './components/Dropzone';
import { TranscriptionOutput } from './components/TranscriptionOutput';
import { Loader } from './components/Loader';
import { Logo } from './components/icons/Logo';
import { GuestLimitBanner } from './components/GuestLimitBanner';
import { AppFooter } from './components/AppFooter';
import { AboutModal } from './components/AboutModal';
import { useCookieLimit } from './hooks/useCookieLimit';

const App: React.FC = () => {
  const { isSignedIn, isLoaded } = useUser();
  const { canUse, daysLeft, markUsed } = useCookieLimit();

  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [transcription, setTranscription] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showAbout, setShowAbout] = useState<boolean>(false);

  // Guests can only use the app if they haven't exceeded the cookie limit
  const hasAccess = isSignedIn || canUse;

  const handleFileAccepted = useCallback(async (file: File) => {
    // Double-check access at call time (in case state changed)
    if (!isSignedIn && !canUse) return;

    setAudioFile(file);
    setTranscription('');
    setError(null);
    setIsLoading(true);

    // Mark usage for guests before the API call
    if (!isSignedIn) {
      markUsed();
    }

    try {
      const result = await transcribeAudio(file);
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
  }, [isSignedIn, canUse, markUsed]);

  const handleReset = () => {
    setAudioFile(null);
    setTranscription('');
    setError(null);
    setIsLoading(false);
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}

      <div className="min-h-screen bg-slate-900 text-slate-200 flex flex-col items-center justify-center p-4 font-sans relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-700/[0.2] [mask-image:linear-gradient(to_bottom,white_20%,transparent_100%)]" />

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

          <div className="w-full bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl shadow-2xl shadow-slate-950/50 p-6 md:p-8">
            {isLoading ? (
              <Loader message="Transcribiendo audio... esto puede tardar unos segundos." />
            ) : transcription ? (
              <TranscriptionOutput text={transcription} onReset={handleReset} />
            ) : hasAccess ? (
              <Dropzone onFileAccepted={handleFileAccepted} audioFile={audioFile} />
            ) : (
              /* Guest with exhausted limit: show dropzone disabled + banner */
              <div className="opacity-50 pointer-events-none">
                <Dropzone onFileAccepted={() => {}} audioFile={null} />
              </div>
            )}

            {error && (
              <div className="mt-6 p-4 bg-red-900/50 border border-red-700 text-red-300 rounded-lg text-sm">
                <p className="font-semibold">¡Ups! Algo salió mal</p>
                <p className="mt-1">{error}</p>
              </div>
            )}
          </div>

          {/* Show limit banner for guests who have used their free transcription */}
          {!isSignedIn && !canUse && (
            <GuestLimitBanner daysLeft={daysLeft} />
          )}

          {/* Show a subtle note for guests who still have access */}
          {!isSignedIn && canUse && (
            <p className="mt-4 text-xs text-slate-600">
              Modo invitado · 1 transcripción gratuita cada 5 días
            </p>
          )}

          <AppFooter onAboutClick={() => setShowAbout(true)} />
        </main>
      </div>
    </>
  );
};

export default App;
