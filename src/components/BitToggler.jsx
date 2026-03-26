// src/components/BitToggler.jsx
import React from 'react';
import useCalculatorStore from '../store/useCalculatorStore';

const BitToggler = () => {
  const { value, setProgrammerValue } = useCalculatorStore();
  
  // Logic to flip a single bit using BigInt XOR
  const toggleBit = (bitIndex) => {
    const currentValue = BigInt(value || 0);
    const newValue = currentValue ^ (1n << BigInt(bitIndex));
    setProgrammerValue(newValue.toString());
  };

  return (
    <div className="grid grid-cols-8 gap-x-2 gap-y-1 p-4 font-mono text-[9px] bg-black/10 rounded-lg mx-2">
      {/* Generate 64 bits (from 63 down to 0) */}
      {Array.from({ length: 64 }).map((_, i) => {
        const bitIdx = 63 - i;
        const isOn = (BigInt(value || 0) >> BigInt(bitIdx)) & 1n;
        return (
          <div key={bitIdx} className="flex flex-col items-center">
            <button 
              onClick={() => toggleBit(bitIdx)}
              className={`h-3 w-5 rounded-sm transition-colors ${isOn ? 'bg-blue-500' : 'bg-gray-600'}`}
            />
            <span className="opacity-40 mt-1">{bitIdx}</span>
          </div>
        );
      })}
    </div>
  );
};

export default BitToggler;