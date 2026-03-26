import React from 'react';
import useCalculatorStore from '../store/useCalculatorStore';

const Display = () => {
  const { displayValue, equation } = useCalculatorStore();

  // Helper to format numbers with commas for the UI
  const formatDisplay = (val) => {
    if (isNaN(val) || val === "Cannot divide by zero") return val;
    const parts = val.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join('.');
  };

  return (
    <div className="flex flex-col items-end justify-end px-4 py-6 h-32 select-none">
      {/* The "History" or Equation Trace */}
      <div className="text-sm text-gray-500 font-medium h-5 mb-1 transition-all">
        {equation}
      </div>
      
      {/* The Main Result */}
      <div 
        className={`w-full text-right font-semibold transition-all duration-75 overflow-hidden whitespace-nowrap ${
          displayValue.length > 10 ? 'text-3xl' : 'text-5xl'
        }`}
      >
        {formatDisplay(displayValue)}
      </div>
    </div>
  );
};

export default Display;