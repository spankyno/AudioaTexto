
import React from 'react';

interface LoaderProps {
    message: string;
}

export const Loader: React.FC<LoaderProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-center">
      <div className="w-12 h-12 border-4 border-slate-600 border-t-sky-400 rounded-full animate-spin"></div>
      <p className="mt-4 text-slate-300 font-medium">{message}</p>
    </div>
  );
};
