import React from 'react';
import useCalculatorStore from '../store/useCalculatorStore';
import Button from './Button';

const ScientificKeypad = () => {
  const store = useCalculatorStore();

  const scientificButtons = [
    { label: 'sin', action: () => store.appendFunction('sin') },
    { label: 'cos', action: () => store.appendFunction('cos') },
    { label: 'tan', action: () => store.appendFunction('tan') },
    { label: 'log', action: () => store.appendFunction('log') },
    { label: 'ln', action: () => store.appendFunction('ln') },
    { label: 'sqrt', action: () => store.appendFunction('sqrt') },
    { label: 'pow', action: () => store.appendFunction('pow') },
    { label: 'π', action: () => store.appendNumber(Math.PI.toFixed(8)) },
    { label: '(', action: () => store.appendNumber('(') },
    { label: ')', action: () => store.appendNumber(')') },
  ];

  const numbers = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0'];

  return (
    <div className="grid grid-cols-5 gap-1 p-1">
      {/* Scientific Functions */}
      {scientificButtons.map((btn) => (
        <Button 
          key={btn.label} 
          label={btn.label} 
          onClick={btn.action} 
          variant="operator" 
          className="text-[11px] h-10"
        />
      ))}

      {/* Standard Numbers & Operators inside Scientific View */}
      <div className="col-span-5 grid grid-cols-4 gap-1 mt-2">
        {numbers.map((num) => (
          <Button key={num} label={num} onClick={() => store.appendNumber(num)} />
        ))}
        <Button label="C" onClick={store.clear} className="text-red-400" />
        <Button 
          label="=" 
          onClick={store.evaluateScientific} 
          variant="action" 
          className="col-span-2" 
        />
      </div>
    </div>
  );
};

// THE FIX:
export default ScientificKeypad;