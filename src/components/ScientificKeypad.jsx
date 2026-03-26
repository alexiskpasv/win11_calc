import React from 'react';
import Button from './Button';
import useCalculatorStore from '../store/useCalculatorStore';

const ScientificKeypad = () => {
  const store = useCalculatorStore();

  return (
    <div className="grid grid-cols-5 gap-[2px] p-1 h-full">
      {/* Scientific Specific Row */}
      <Button label="sin" onClick={() => store.appendFunction('sin')} variant="operator" />
      <Button label="cos" onClick={() => store.appendFunction('cos')} variant="operator" />
      <Button label="tan" onClick={() => store.appendFunction('tan')} variant="operator" />
      <Button label="π" onClick={() => store.appendNumber('pi')} variant="operator" />
      <Button label="e" onClick={() => store.appendNumber('e')} variant="operator" />

      {/* Power and Roots */}
      <Button label="x²" onClick={() => store.appendNumber('^2')} variant="operator" />
      <Button label="xʸ" onClick={() => store.appendNumber('^')} variant="operator" />
      <Button label="√" onClick={() => store.appendFunction('sqrt')} variant="operator" />
      <Button label="(" onClick={() => store.appendNumber('(')} variant="operator" />
      <Button label=")" onClick={() => store.appendNumber(')')} variant="operator" />

      {/* Standard keys would follow below in a 5-column span... */}
    </div>
  );
};