import React, { useState } from 'react';
import { Trash2, X, Copy, Check } from 'lucide-react';
import useCalculatorStore from '../store/useCalculatorStore';

const HistorySidebar = ({ isOpen, onClose }) => {
  const history = useCalculatorStore((state) => state.history);
  const clearHistory = useCalculatorStore((state) => state.clearHistory);
  
  // Local states for UI interactions
  const [showConfirm, setShowConfirm] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (e, text, id) => {
    e.stopPropagation(); // Prevents loading the value into the display
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClear = () => {
    clearHistory();
    setShowConfirm(false);
  };

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />

      {/* Sidebar Panel */}
      <div className="relative w-72 bg-[#1c1c1c]/95 backdrop-blur-2xl border-l border-white/10 shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
        
        {/* Header */}
        <div className="p-4 flex justify-between items-center border-b border-white/5">
          <span className="font-semibold text-sm">History</span>
          
          <div className="flex items-center gap-1">
            {/* Clear History Confirmation Logic */}
            {!showConfirm ? (
              <button 
                onClick={() => setShowConfirm(true)} 
                className="p-2 hover:bg-white/10 rounded-md text-red-400 transition-colors"
                title="Clear all history"
              >
                <Trash2 size={16} />
              </button>
            ) : (
              <div className="flex items-center gap-1 animate-in fade-in zoom-in duration-200">
                <button 
                  onClick={handleClear}
                  className="px-2 py-1 bg-red-600 hover:bg-red-700 text-[10px] font-bold rounded text-white"
                >
                  CONFIRM
                </button>
                <button 
                  onClick={() => setShowConfirm(false)}
                  className="p-1 hover:bg-white/10 rounded text-white/60"
                >
                  <X size={14} />
                </button>
              </div>
            )}
            
            <button 
              onClick={onClose} 
              className="p-2 hover:bg-white/10 rounded-md opacity-60 hover:opacity-100"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* History List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
          {history.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 opacity-40">
              <p className="text-xs italic text-center">There's no history yet</p>
            </div>
          ) : (
            history.map((item) => (
              <div 
                key={item.id} 
                className="group relative cursor-pointer text-right p-3 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10 transition-all"
                onClick={() => {
                  useCalculatorStore.setState({ displayValue: String(item.result) });
                  onClose();
                }}
              >
                {/* Copy Button (Visible on Hover) */}
                <button
                  onClick={(e) => handleCopy(e, item.result, item.id)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-[#2b2b2b] rounded-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#3b3b3b] border border-white/10"
                  title="Copy result"
                >
                  {copiedId === item.id ? (
                    <Check size={14} className="text-green-400" />
                  ) : (
                    <Copy size={14} className="text-white/70" />
                  )}
                </button>

                {/* Mode Label */}
                <span className="text-[9px] uppercase tracking-wider opacity-30 font-bold block mb-1">
                  {item.mode || 'standard'}
                </span>
                
                {/* Expression and Result */}
                <p className="text-xs opacity-60 group-hover:opacity-100 transition-opacity break-all font-mono">
                  {item.expression} =
                </p>
                <p className="text-xl font-light text-blue-400 group-hover:text-white transition-colors">
                  {item.result}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HistorySidebar;