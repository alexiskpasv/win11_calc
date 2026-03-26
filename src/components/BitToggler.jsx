import React from 'react';
import useCalculatorStore from '../store/useCalculatorStore';

const BitToggler = () => {
  const { displayValue } = useCalculatorStore();
  
  // SAFE CONVERSION: Check if it's Hex before converting to BigInt
  const getBigInt = (val) => {
    try {
      // If it's a hex string (contains A-F), prefix with 0x
      const isHex = /[a-fA-F]/.test(val);
      return BigInt(isHex ? `0x${val}` : val);
    } catch (e) {
      return 0n;
    }
  };

  const val = getBigInt(displayValue || "0");
  
  // Convert to 64-bit binary string
  const binary = (val >= 0n ? val : (BigInt(2)**BigInt(64) + val))
    .toString(2)
    .padStart(64, '0')
    .split('')
    .map(Number);

  return (
    <div className="grid grid-cols-8 gap-2 p-3 bg-white/5 rounded-md mx-2 my-2 font-mono text-[9px]">
      {binary.map((bit, i) => (
        <div key={i} className="flex flex-col items-center gap-1 group">
          <span className={`transition-opacity ${bit ? "text-blue-400 opacity-100" : "opacity-20"}`}>
            {bit}
          </span>
          <div className={`w-2 h-2 rounded-sm transition-all ${
            bit ? "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" : "bg-white/10 group-hover:bg-white/20"
          }`} />
        </div>
      ))}
    </div>
  );
};

export default BitToggler;