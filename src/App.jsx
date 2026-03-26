import React, { useState, useRef } from 'react';
import useKeyboardInput from './hooks/useKeyboardInput';
import useRevealEffect from './hooks/useRevealEffect';

// Core UI Components
import Display from './components/Display';
import Keypad from './components/Keypad';
import ModeSwitcher from './components/ModeSwitcher';
import HistorySidebar from './components/HistorySidebar';

// Mode Specific Components
import ScientificKeypad from './components/ScientificKeypad';
import ProgrammerDisplay from './components/ProgrammerDisplay';
import BitToggler from './components/BitToggler';
import CurrencyConverter from './components/CurrencyConverter';

// Icons
import { Menu, History as HistoryIcon } from 'lucide-react';

function App() {
  // 1. All States must be inside the function
  const [mode, setMode] = useState('standard'); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  
  const windowRef = useRef(null);

  // 2. All Hooks must be inside the function
  useKeyboardInput(); 
  useRevealEffect(windowRef);

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      
      <div 
        ref={windowRef}
        className="mica-window reveal-container relative w-full max-w-[350px] min-h-[600px] flex flex-col text-white shadow-2xl overflow-hidden"
      >
        {/* --- Sidebars --- */}
        <ModeSwitcher 
          isOpen={isMenuOpen} 
          onClose={() => setIsMenuOpen(false)} 
          currentMode={mode} 
          onModeChange={setMode} 
        />
        
        <HistorySidebar 
          isOpen={isHistoryOpen} 
          onClose={() => setIsHistoryOpen(false)} 
        />

        {/* --- Title Bar --- */}
        <div className="h-10 flex justify-between items-center px-2">
          <div className="flex items-center">
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="p-2 hover:bg-white/10 rounded-md transition-colors"
            >
              <Menu size={18} />
            </button>
            <span className="ml-2 text-[10px] font-bold uppercase tracking-widest opacity-70">
              {mode}
            </span>
          </div>
          <button 
            onClick={() => setIsHistoryOpen(true)}
            className="p-2 hover:bg-white/10 rounded-md transition-colors"
          >
            <HistoryIcon size={18} />
          </button>
        </div>

        {/* --- Dynamic Body Content --- */}
        <div className="flex-grow flex flex-col">
          {mode === 'programmer' ? (
            <>
              <ProgrammerDisplay />
              <BitToggler />
            </>
          ) : mode === 'converter' ? (
            <CurrencyConverter />
          ) : (
            <Display />
          )}
        </div>

        {/* --- Dynamic Keypad --- */}
        <div className="p-1">
          {mode === 'scientific' ? (
            <ScientificKeypad />
          ) : (
            <Keypad mode={mode} />
          )}
        </div>
        
      </div>
    </div>
  );
}

export default App;