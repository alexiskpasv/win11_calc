import React, { useState } from 'react'; // Fixes: useState is not defined
import useKeyboardInput from './hooks/useKeyboardInput';

// Core Components
import Display from './components/Display';
import Keypad from './components/Keypad'; 
import ModeSwitcher from './components/ModeSwitcher'; 
import HistorySidebar from './components/HistorySidebar';

// Special Mode Components
import ScientificKeypad from './components/ScientificKeypad'; 
import ProgrammerDisplay from './components/ProgrammerDisplay';
import BitToggler from './components/BitToggler';
import CurrencyConverter from './components/CurrencyConverter';

import { Menu, History } from 'lucide-react';

// --- View Wrappers ---
const StandardView = () => (
  <div className="flex flex-col flex-grow">
    <Display />
    <Keypad />
  </div>
);

const ScientificView = () => (
  <div className="flex flex-col flex-grow">
    <Display />
    <ScientificKeypad />
  </div>
);

const ProgrammerView = () => (
  <div className="flex flex-col flex-grow">
    <ProgrammerDisplay />
    <BitToggler />
    <Keypad mode="programmer" />
  </div>
);

function App() {
  const [mode, setMode] = useState('standard'); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  
  // Bridge state for keyboard -> currency converter logic
  const [convInput, setConvInput] = useState(null);

  // Keyboard hook integrated with mode awareness
  useKeyboardInput(mode, setConvInput); 

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="mica-window relative w-[350px] min-h-[580px] flex flex-col overflow-hidden shadow-2xl border border-white/10 rounded-lg bg-[#202020]">
        
        <ModeSwitcher 
          isOpen={isMenuOpen} 
          onClose={() => setIsMenuOpen(false)} 
          currentMode={mode} 
          onModeChange={(newMode) => {
            setMode(newMode);
            setIsMenuOpen(false);
          }} 
        />

        <HistorySidebar 
          isOpen={isHistoryOpen} 
          onClose={() => setIsHistoryOpen(false)} 
        />

        {/* Title Bar */}
        <div className="h-10 flex justify-between items-center px-4 text-[11px] font-medium z-10">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsMenuOpen(true)} className="p-1 hover:bg-white/10 rounded transition-colors">
              <Menu size={16} />
            </button>
            <span className="capitalize">{mode} Calculator</span>
          </div>
          <div className="flex gap-2 items-center">
            <button 
              onClick={() => setIsHistoryOpen(!isHistoryOpen)} 
              className={`p-1 rounded transition-colors ${isHistoryOpen ? 'bg-blue-500/20 text-blue-400' : 'hover:bg-white/10'}`}
            >
              <History size={16} />
            </button>
            <span className="px-2 hover:bg-white/10 cursor-default">−</span> 
            <span className="px-3 hover:bg-red-600 transition-colors cursor-default">✕</span>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-grow flex flex-col p-1">
          {mode === 'standard' && <StandardView />}
          {mode === 'scientific' && <ScientificView />}
          {mode === 'programmer' && <ProgrammerView />}
          {/* Fixes: onInputHandled is not a function */}
          {mode === 'converter' && (
            <CurrencyConverter 
              externalInput={convInput} 
              onInputHandled={() => setConvInput(null)} 
            />
          )}
        </div>

        <div className="h-6 px-4 pb-2 text-[10px] opacity-40 font-mono">
          STABLE MODE | {isHistoryOpen ? "HISTORY ACTIVE" : "CALCULATOR"}
        </div>
      </div>
    </div>
  );
}

export default App;