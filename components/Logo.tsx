import React from 'react';

export const Logo: React.FC<{ className?: string; simple?: boolean }> = ({ className = "w-8 h-8", simple = false }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <div className="relative flex items-center justify-center">
      <svg viewBox="0 0 100 100" className="w-10 h-10 text-primary-600 dark:text-primary-400 fill-current" xmlns="http://www.w3.org/2000/svg">
        {/* Stethoscope Shape forming an S */}
        <path d="M70,20 C70,10 60,5 50,5 C40,5 35,15 35,25 L35,45 C35,55 25,60 15,60 C5,60 5,50 5,50" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
        <path d="M35,25 L35,45" fill="none" stroke="currentColor" strokeWidth="8" />
        <path d="M70,20 L85,20" fill="none" stroke="currentColor" strokeWidth="6" />
        <circle cx="85" cy="20" r="5" fill="currentColor" />
        <path d="M70,20 L70,50 C70,70 50,85 30,85" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
        
        {/* Heart icon at the end */}
        <path d="M30,85 L30,90" fill="none" stroke="currentColor" strokeWidth="6" />
        <path d="M20,75 C20,70 25,65 30,75 C35,65 40,70 40,75 L30,90 Z" fill="#fb7185" stroke="#fb7185" strokeWidth="2" />
      </svg>
    </div>
    {!simple && (
      <div className="flex flex-col">
        <span className="font-bold text-lg leading-tight tracking-tight text-slate-800 dark:text-slate-100">
          Swasthya
        </span>
        <span className="font-medium text-sm text-primary-600 dark:text-primary-400 leading-tight">
          Saarthi
        </span>
      </div>
    )}
  </div>
);
