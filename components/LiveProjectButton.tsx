'use client';

import React from 'react';

interface LiveProjectButtonProps {
  href?: string;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

export default function LiveProjectButton({ href, onClick, className = '', children }: LiveProjectButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    if (!href && !onClick) {
      e.preventDefault();
      alert('This live project link is a placeholder for this creative showcase.');
      return;
    }
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  if (href) {
    return (
      <a
        id="live-project-link"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className={`inline-block rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base transition-all duration-300 hover:bg-[#D7E2EA]/10 hover:scale-[1.03] active:scale-95 text-center ${className}`}
      >
        {children || 'Live Project'}
      </a>
    );
  }

  return (
    <button
      id="live-project-button"
      onClick={handleClick}
      className={`rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base transition-all duration-300 hover:bg-[#D7E2EA]/10 hover:scale-[1.03] active:scale-95 ${className}`}
    >
      {children || 'Live Project'}
    </button>
  );
}
