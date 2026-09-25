import React from 'react';

interface PaippaBadgeProps {
  isVerified?: boolean;
}

export const PaippaBadge: React.FC<PaippaBadgeProps> = ({ isVerified }) => {
  // Si no está verificado, no mostramos nada
  if (!isVerified) return null;

  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-300 shadow-sm mt-2">
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
      Feria PAIPPA
    </span>
  );
};