import React from 'react';
import { Trash2 } from 'lucide-react';
import useCalculatorStore from '../store/useCalculatorStore';

const HistorySidebar = ({ isOpen, onClose }) => {
  const { history, clearHistory, setProgrammerValue } = useCalculatorStore();

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/10" onClick={onClose} />

      {/* Panel */}
      <div className="relative w-72 bg-[var(--bg-mica)] backdrop-blur-2xl border-l border-white/10 shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
        <div className="p-4 flex justify-between items-center border-b border-white/5">
          <span className="font-semibold text-sm">History</span>
          <button onClick={clearHistory} className="p-2 hover:bg-white/10 rounded-md text-red-400">
            <Trash2 size={16} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {history.length === 0 ? (
            <p className="text-xs opacity-50 text-center mt-10">There's no history yet</p>
          ) : (
            history.map((item) => (
              <div 
                key={item.id} 
                className="group cursor-pointer text-right space-y-1"
                onClick={() => {
                  setProgrammerValue(item.result);
                  onClose();
                }}
              >
                <p className="text-xs opacity-60 group-hover:opacity-100 transition-opacity">{item.equation}</p>
                <p className="text-xl font-bold">{item.result}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HistorySidebar;