import React from 'react';
import useCalculatorStore from '../store/useCalculatorStore';

const ProgrammerDisplay = () => {
  const { getFormats } = useCalculatorStore();
  const formats = getFormats();

  return (
    <div className="flex flex-col p-4 gap-2 text-white">
      {/* Primary Display (Decimal) */}
      <div className="text-5xl font-light text-right mb-6 overflow-hidden truncate">
        {formats.dec}
      </div>

      {/* Format Stack */}
      <div className="space-y-1">
        <div className="flex items-center gap-4 p-1 hover:bg-white/5 rounded cursor-default group">
          <span className="text-[10px] font-bold w-8 opacity-50 group-hover:text-blue-400">HEX</span>
          <span className="text-sm font-medium tracking-wider">{formats.hex}</span>
        </div>
        
        <div className="flex items-center gap-4 p-1 bg-white/10 border-l-2 border-blue-500 rounded cursor-default">
          <span className="text-[10px] font-bold w-8 text-blue-400">DEC</span>
          <span className="text-sm font-medium tracking-wider">{formats.dec}</span>
        </div>

        <div className="flex items-center gap-4 p-1 hover:bg-white/5 rounded cursor-default group">
          <span className="text-[10px] font-bold w-8 opacity-50 group-hover:text-blue-400">OCT</span>
          <span className="text-sm font-medium tracking-wider">{formats.oct}</span>
        </div>

        <div className="flex items-center gap-4 p-1 hover:bg-white/5 rounded cursor-default group">
          <span className="text-[10px] font-bold w-8 opacity-50 group-hover:text-blue-400">BIN</span>
          <span className="text-xs font-mono tracking-tighter opacity-80">{formats.bin}</span>
        </div>
      </div>
    </div>
  );
};

// THIS IS THE CRITICAL LINE THAT FIXES THE ERROR:
export default ProgrammerDisplay;