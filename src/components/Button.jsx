import React from 'react';
import { cn } from '../utils/cn'; // Helper for tailwind classes

const Button = ({ label, onClick, className, variant = 'default' }) => {
  const variants = {
    default: 'bg-[var(--bg-button)] hover:bg-[var(--bg-button-hover)] text-[var(--text-main)]',
    operator: 'bg-[var(--bg-button)] hover:bg-[var(--bg-button-hover)] font-medium text-[var(--text-main)]',
    accent: 'bg-[var(--bg-accent)] hover:opacity-90 text-white font-semibold',
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        'calc-button h-12 w-full rounded-[4px] text-sm flex items-center justify-center select-none active:scale-95 transition-all duration-75',
        variants[variant],
        className
      )}
    >
      {label}
    </button>
  );
};

export default Button;