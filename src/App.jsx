import React, { useState } from 'react';
import useKeyboardInput from './hooks/useKeyboardInput';

// Core Components
import Display from './components/Display';
import Keypad from './components/Keypad'; // Standard Keypad
import ModeSwitcher from './components/ModeSwitcher'; // Optional: if you want a dedicated mode switcher instead of the menu button

// Scientific Features
import ScientificKeypad from './components/ScientificKeypad'; 

// Programmer Features
import ProgrammerDisplay from './components/ProgrammerDisplay';
import BitToggler from './components/BitToggler';

// Icons (Optional: if you have Lucide React installed)
import { Menu } from 'lucide-react';

// Windows 11 Mica Effect and Fluent Design styles are handled in CSS (fluent-glass.css) and applied via classNames
import { useRef } from 'react';
import useRevealEffect from './hooks/useRevealEffect';

function App() {
  // 1. State for Mode Management
  const [mode, setMode] = useState('standard'); // 'standard', 'scientific', 'programmer'
  const [isMenuOpen, setIsMenuOpen] = useState(false);
    
  // 2. Initialize Keyboard Listeners
  useKeyboardInput(); 

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center p-4">
      
      {/* The Main "Mica" Window Wrapper */}
      <div className="mica-window w-full max-w-[350px] min-h-[550px] flex flex-col text-[var(--text-main)] shadow-2xl transition-all duration-300">
        <div className="relative mica-window w-[350px] min-h-[580px] overflow-hidden">
        
        {/* The Flyout Menu Component */}
        <ModeSwitcher 
          isOpen={isMenuOpen} 
          onClose={() => setIsMenuOpen(false)} 
          currentMode={mode} 
          onModeChange={setMode} 
        />

        {/* Title Bar with Menu Button */}
        <div className="h-10 flex items-center px-4">
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="p-2 hover:bg-white/10 rounded-md transition-colors"
          >
            <Menu size={18} />
          </button>
          <h1 className="ml-3 text-xs font-bold uppercase tracking-wider opacity-80">
            {mode}
          </h1>
        </div>

        {/* The rest of your app logic... */}
        {mode === 'programmer' ? <ProgrammerView /> : <StandardView />}
        
      </div>
        
        {/* --- Windows 11 Title Bar --- */}
        <div className="h-10 flex justify-between items-center px-4 text-xs font-medium">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => {
                // Quick cycle through modes for testing
                if (mode === 'standard') setMode('scientific');
                else if (mode === 'scientific') setMode('programmer');
                else setMode('standard');
              }}
              className="p-1 hover:bg-white/10 rounded"
            >
              <Menu size={16} />
            </button>
            <span className="capitalize">{mode} Calculator</span>
          </div>
          <div className="flex gap-6 text-sm">
            <span className="cursor-default hover:bg-white/10 px-2">−</span> 
            <span className="cursor-default hover:bg-white/10 px-2">▢</span> 
            <span className="cursor-default hover:bg-red-600 px-2 transition-colors">✕</span>
          </div>
        </div>

        {/* --- Dynamic Display Area --- */}
        <div className="flex-grow flex flex-col">
          {mode === 'programmer' ? (
            <>
              <ProgrammerDisplay />
              <BitToggler />
            </>
          ) : (
            <Display />
          )}
        </div>

        {/* --- Dynamic Keypad Area --- */}
        <div className="p-1 pb-2">
          {mode === 'scientific' ? (
            <ScientificKeypad />
          ) : (
            /* Note: You might want to pass 'mode' to Keypad to show A-F buttons in hex */
            <Keypad mode={mode} />
          )}
        </div>

        {/* Bottom Status (Optional) */}
        <div className="h-6 px-4 pb-2 text-[10px] opacity-40">
          {mode === 'programmer' ? 'QWORD | DEC' : ''}
        </div>
        
      </div>
    </div>
  );
}

function App() {
  const windowRef = useRef(null);
  useRevealEffect(windowRef); // Activate the spotlight

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div 
        ref={windowRef} 
        className="mica-window reveal-container w-[350px] min-h-[600px] flex flex-col"
      >
        {/* Your TitleBar, Display, and Keypads here */}
      </div>
    </div>
  );
}

export default App;