import React from 'react';
import Button from './Button';
import useCalculatorStore from '../store/useCalculatorStore';

const Keypad = ({ mode = 'standard' }) => { // Added mode prop
  const store = useCalculatorStore();

  // Helper to handle equals click with mode context
  const handleEquals = () => {
    store.calculate(mode); // Passes 'standard' or 'programmer' to history
  };

  return (
    <div className="grid grid-cols-4 gap-[2px] p-1 bg-transparent flex-1">
      {/* Row 1 */}
      <Button label="CE" onClick={() => store.clear()} variant="operator" />
      <Button label="C" onClick={() => store.clear()} variant="operator" />
      <Button label="⌫" onClick={() => store.deleteLast()} variant="operator" />
      <Button label="÷" onClick={() => store.setOperation('÷')} variant="operator" />

      {/* Row 2 */}
      <Button label="7" onClick={() => store.appendDigit('7')} />
      <Button label="8" onClick={() => store.appendDigit('8')} />
      <Button label="9" onClick={() => store.appendDigit('9')} />
      <Button label="×" onClick={() => store.setOperation('×')} variant="operator" />

      {/* Row 3 */}
      <Button label="4" onClick={() => store.appendDigit('4')} />
      <Button label="5" onClick={() => store.appendDigit('5')} />
      <Button label="6" onClick={() => store.appendDigit('6')} />
      <Button label="-" onClick={() => store.setOperation('-')} variant="operator" />

      {/* Row 4 */}
      <Button label="1" onClick={() => store.appendDigit('1')} />
      <Button label="2" onClick={() => store.appendDigit('2')} />
      <Button label="3" onClick={() => store.appendDigit('3')} />
      <Button label="+" onClick={() => store.setOperation('+')} variant="operator" />

      {/* Row 5 */}
      <Button label="+/-" onClick={() => { /* toggle logic */ }} />
      <Button label="0" onClick={() => store.appendDigit('0')} />
      <Button label="." onClick={() => store.appendDigit('.')} />
      {/* Fixed: Pass the current mode to the calculate action */}
      <Button label="=" onClick={handleEquals} variant="accent" />
    </div>
  );
};

export default Keypad;