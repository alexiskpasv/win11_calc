import { useEffect } from 'react';
import useCalculatorStore from '../store/useCalculatorStore';

const useKeyboardInput = () => {
  const store = useCalculatorStore();

  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key } = event;

      // Numbers 0-9
      if (/[0-9]/.test(key)) {
        event.preventDefault();
        store.appendNumber(key);
      }

      // Operators
      if (key === '+') store.setOperator('+');
      if (key === '-') store.setOperator('-');
      if (key === '*') store.setOperator('×');
      if (key === '/') {
        event.preventDefault(); // Prevent browser search shortcut
        store.setOperator('÷');
      }

      // Actions
      if (key === '.' || key === ',') store.appendDecimal();
      if (key === 'Enter' || key === '=') {
        event.preventDefault();
        store.calculate();
      }
      if (key === 'Escape') store.clear();
      
      // Backspace logic (requires a new action in your store)
      if (key === 'Backspace') {
        // We'll assume you add a performBackspace action to your store
        // store.performBackspace(); 
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [store]);
};

export default useKeyboardInput;