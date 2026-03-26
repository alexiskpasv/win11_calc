import React from 'react';
import Button from './Button';
import useCalculatorStore from '../store/useCalculatorStore';

const Keypad = () => {
  const store = useCalculatorStore();

  return (
    <div className="grid grid-cols-4 gap-[2px] p-1 bg-transparent flex-1">
      {/* Row 1: Memory/Function Row (Simplified for Standard) */}
      <Button label="CE" onClick={() => store.clear()} variant="operator" />
      <Button label="C" onClick={() => store.clear()} variant="operator" />
      <Button label="⌫" onClick={() => {/* logic for backspace */}} variant="operator" />
      <Button label="÷" onClick={() => store.setOperator('÷')} variant="operator" />

      {/* Row 2 */}
      <Button label="7" onClick={() => store.appendNumber('7')} />
      <Button label="8" onClick={() => store.appendNumber('8')} />
      <Button label="9" onClick={() => store.appendNumber('9')} />
      <Button label="×" onClick={() => store.setOperator('×')} variant="operator" />

      {/* Row 3 */}
      <Button label="4" onClick={() => store.appendNumber('4')} />
      <Button label="5" onClick={() => store.appendNumber('5')} />
      <Button label="6" onClick={() => store.appendNumber('6')} />
      <Button label="-" onClick={() => store.setOperator('-')} variant="operator" />

      {/* Row 4 */}
      <Button label="1" onClick={() => store.appendNumber('1')} />
      <Button label="2" onClick={() => store.appendNumber('2')} />
      <Button label="3" onClick={() => store.appendNumber('3')} />
      <Button label="+" onClick={() => store.setOperator('+')} variant="operator" />

      {/* Row 5 */}
      <Button label="+/-" onClick={() => {}} />
      <Button label="0" onClick={() => store.appendNumber('0')} />
      <Button label="." onClick={() => store.appendDecimal()} />
      <Button label="=" onClick={() => store.calculate()} variant="accent" />
    </div>
  );
};

export default Keypad;