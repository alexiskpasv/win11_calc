import { useEffect } from 'react';
import useCalculatorStore from '../store/useCalculatorStore';

const useKeyboardInput = (mode, setConvInput) => {
  const store = useCalculatorStore();

  useEffect(() => {
    const handleKeyDown = (e) => {
      // 1. Converter Mode Bridge
      if (mode === 'converter') {
        if (/[0-9]/.test(e.key)) setConvInput({ type: 'digit', value: e.key });
        if (e.key === '.') setConvInput({ type: 'digit', value: '.' });
        if (e.key === 'Backspace') setConvInput({ type: 'backspace' });
        return;
      }

      // 2. Calculator Logic
      if (/[0-9]/.test(e.key)) store.appendDigit(e.key);
      if (e.key === '.') store.appendDigit('.');
      if (e.key === 'Enter' || e.key === '=') store.calculate();
      if (e.key === 'Backspace') store.deleteLast();
      if (e.key === 'Escape') store.clear();
      
      const ops = { '+': '+', '-': '-', '*': '×', '/': '÷' };
      if (ops[e.key]) store.setOperation(ops[e.key]);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mode, store, setConvInput]);
};

export default useKeyboardInput;