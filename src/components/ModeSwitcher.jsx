import React from 'react';
import { Calculator, Beaker, Binary, Monitor, Settings } from 'lucide-react';

const modes = [
  { id: 'standard', label: 'Standard', icon: <Calculator size={18} /> },
  { id: 'scientific', label: 'Scientific', icon: <Beaker size={18} /> },
  { id: 'programmer', label: 'Programmer', icon: <Binary size={18} /> },
  { id: 'converter', label: 'Currency', icon: <Monitor size={18} /> },
];

const ModeSwitcher = ({ isOpen, onClose, currentMode, onModeChange }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 flex">
      {/* Semi-transparent Backdrop */}
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />

      {/* Slide-out Menu */}
      <div className="relative w-64 bg-[var(--bg-mica)] backdrop-blur-xl border-r border-white/10 shadow-2xl flex flex-col p-2 animate-in slide-in-from-left duration-200">
        <div className="flex items-center gap-4 p-3 mb-2 font-semibold">
          <Calculator size={20} />
          <span>Calculator</span>
        </div>

        {modes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => {
              onModeChange(mode.id);
              onClose();
            }}
            className={`flex items-center gap-4 p-3 w-full rounded-md transition-colors ${
              currentMode === mode.id 
                ? 'bg-blue-500/20 text-blue-400 border-l-4 border-blue-500' 
                : 'hover:bg-white/5'
            }`}
          >
            {mode.icon}
            <span className="text-sm font-medium">{mode.label}</span>
          </button>
        ))}

        <div className="mt-auto border-t border-white/10 p-2">
          <button className="flex items-center gap-4 p-3 w-full hover:bg-white/5 rounded-md opacity-70">
            <Settings size={18} />
            <span className="text-sm">Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModeSwitcher;