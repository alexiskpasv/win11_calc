import React from 'react';
import useCalculatorStore from '../store/useCalculatorStore';
import Button from './Button';

const ScientificKeypad = () => {
  const store = useCalculatorStore();

  const scientificButtons = [
    // These now pass 'scientific' to the store to trigger history recording
    { label: 'sin', action: () => store.appendFunction('sin', 'scientific') },
    { label: 'cos', action: () => store.appendFunction('cos', 'scientific') },
    { label: 'tan', action: () => store.appendFunction('tan', 'scientific') },
    { label: 'log', action: () => store.appendFunction('log', 'scientific') },
    { label: 'ln',  action: () => store.appendFunction('log', 'scientific') }, // mathjs log is natural log
    { label: 'sqrt', action: () => store.appendFunction('sqrt', 'scientific') },
    { label: 'π',   action: () => store.appendDigit(Math.PI.toFixed(4)) }, // Changed appendNumber to appendDigit
    { label: '(',   action: () => store.appendDigit('(') },
    { label: ')',   action: () => store.appendDigit(')') },
    { label: '^',   action: () => store.setOperation('^') },
  ];

  const numbers = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '.'];

  return (
    <div className="flex flex-col gap-2 p-1">
      {/* Scientific Functions Grid */}
      <div className="grid grid-cols-5 gap-1">
        {scientificButtons.map((btn) => (
          <Button 
            key={btn.label} 
            label={btn.label} 
            onClick={btn.action} 
            variant="operator" 
            className="text-[11px] h-9"
          />
        ))}
      </div>

      {/* Standard Numbers & Operators inside Scientific View */}
      <div className="grid grid-cols-4 gap-1">
        {numbers.map((num) => (
          <Button 
            key={num} 
            label={num} 
            onClick={() => store.appendDigit(num)} // Fixed: appendNumber -> appendDigit
          />
        ))}
        <Button label="C" onClick={() => store.clear()} className="text-red-400" />
        <Button 
          label="=" 
          onClick={() => store.calculate('scientific')} // Fixed: evaluateScientific -> calculate('scientific')
          variant="accent" 
          className="col-span-2" 
        />
      </div>
    </div>
  );
};

export default ScientificKeypad;