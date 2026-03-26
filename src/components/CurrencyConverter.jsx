import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const currencies = [
  { code: 'NGN', name: 'Nigerian Naira', rate: 1 },
  { code: 'USD', name: 'US Dollar', rate: 0.00067 },
  { code: 'GBP', name: 'British Pound', rate: 0.00053 },
  { code: 'EUR', name: 'Euro', rate: 0.00062 }
];

const CurrencyConverter = ({ externalInput, onInputHandled }) => {
  const [amount, setAmount] = useState('1');
  const [fromCurr] = useState(currencies[0]); // NGN
  const [toCurr] = useState(currencies[1]);   // USD

  // Listen for physical keyboard events from the hook
  useEffect(() => {
    if (externalInput) {
      if (externalInput.type === 'digit') handleInput(externalInput.value);
      if (externalInput.type === 'backspace') backspace();
      if (externalInput.type === 'clear') setAmount('0');
      onInputHandled(); 
    }
  }, [externalInput]);

  const handleInput = (val) => {
    if (amount === '0' && val !== '.') setAmount(val);
    else if (val === '.' && amount.includes('.')) return;
    else setAmount(prev => prev + val);
  };

  const backspace = () => setAmount(prev => prev.length > 1 ? prev.slice(0, -1) : '0');
  const result = ((parseFloat(amount || 0) / fromCurr.rate) * toCurr.rate).toFixed(2);

  return (
    <div className="flex flex-col h-full bg-[#202020] text-white">
      <div className="p-6 space-y-8">
        <div className="space-y-1">
          <div className="text-[11px] opacity-60 font-bold uppercase">{fromCurr.code} - {fromCurr.name}</div>
          <div className="text-5xl font-light">{amount}</div>
        </div>
        <div className="space-y-1">
          <div className="text-[11px] opacity-60 font-bold uppercase">{toCurr.code} - {toCurr.name}</div>
          <div className="text-5xl font-light text-blue-400">{result}</div>
        </div>
      </div>

      {/* Internal Keypad for Converter */}
      <div className="grid grid-cols-3 gap-1 p-2 mt-auto bg-black/10">
        {[7, 8, 9, 4, 5, 6, 1, 2, 3].map(n => (
          <button key={n} onClick={() => handleInput(String(n))} className="h-14 hover:bg-white/10 rounded text-xl">{n}</button>
        ))}
        <button onClick={() => setAmount('0')} className="h-14 hover:bg-white/10 rounded text-xs opacity-50">CE</button>
        <button onClick={() => handleInput('0')} className="h-14 hover:bg-white/10 rounded text-xl">0</button>
        <button onClick={backspace} className="h-14 hover:bg-white/10 rounded text-xl">⌫</button>
      </div>
    </div>
  );
};

export default CurrencyConverter;