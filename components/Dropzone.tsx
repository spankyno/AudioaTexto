
import React, { useState, useCallback, useRef } from 'react';
import { UploadIcon } from './icons/UploadIcon';
import { AudioFileIcon } from './icons/AudioFileIcon';

interface DropzoneProps {
  onFileAccepted: (file: File) => void;
  audioFile: File | null;
}

export const Dropzone: React.FC<DropzoneProps> = ({ onFileAccepted, audioFile }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);
  
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      if (files[0].type.startsWith('audio/')) {
        onFileAccepted(files[0]);
      } else {
        alert('Por favor, sube un archivo de audio válido.');
      }
    }
  }, [onFileAccepted]);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        if (files[0].type.startsWith('audio/')) {
            onFileAccepted(files[0]);
        } else {
            alert('Por favor, sube un archivo de audio válido.');
        }
      }
  };

  const handleClick = () => {
      fileInputRef.current?.click();
  };
  
  const baseClasses = "w-full p-8 text-center border-2 border-dashed rounded-lg cursor-pointer transition-all duration-300 ease-in-out flex flex-col items-center justify-center h-64";
  const inactiveClasses = "border-slate-600 hover:border-sky-500 hover:bg-slate-700/30";
  const activeClasses = "border-sky-400 bg-sky-900/30 ring-4 ring-sky-500/30";

  return (
    <div
      className={`${baseClasses} ${isDragging ? activeClasses : inactiveClasses}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input 
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="audio/*"
        className="hidden"
      />
      {audioFile ? (
        <div className="flex flex-col items-center gap-4 text-slate-300">
            <AudioFileIcon />
            <span className="font-semibold">{audioFile.name}</span>
            <span className="text-sm text-slate-400">Listo para transcribir</span>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 text-slate-400">
            <UploadIcon />
            <p className="font-semibold text-slate-300">
                Arrastra y suelta un archivo de audio aquí
            </p>
            <p>o <span className="text-sky-400 font-medium">haz clic para seleccionar</span></p>
            <p className="text-xs mt-2 text-slate-500">Soportado: MP3, WAV, M4A, etc.</p>
        </div>
      )}
    </div>
  );
};
