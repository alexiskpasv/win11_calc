import { create } from 'zustand';
import { evaluate, sin, cos, tan, log, sqrt } from 'mathjs';

const useCalculatorStore = create((set, get) => ({
  displayValue: '0',
  prevValue: '',
  operation: null,
  history: [],

  // Helper to record operations with mode context
  addToHistory: (expression, result, mode = 'standard') => set((state) => ({
    history: [
      { expression, result, mode, id: Date.now() }, 
      ...state.history
    ].slice(0, 50) // Increased limit to 50 for better tracking
  })),

  getFormats: () => {
    const val = get().displayValue;
    const num = parseInt(val) || 0;
    return {
      hex: num.toString(16).toUpperCase(),
      dec: num.toString(10),
      oct: num.toString(8),
      bin: num.toString(2).padStart(8, '0')
    };
  },

  appendDigit: (digit) => set((state) => ({
    displayValue: state.displayValue === '0' ? String(digit) : state.displayValue + digit
  })),

  appendFunction: (fn, mode = 'scientific') => set((state) => {
    try {
      const current = parseFloat(state.displayValue);
      let result;
      switch(fn) {
        case 'sin': result = sin(current); break;
        case 'cos': result = cos(current); break;
        case 'tan': result = tan(current); break;
        case 'log': result = log(current, 10); break;
        case 'sqrt': result = sqrt(current); break;
        default: return state;
      }
      
      const resString = result.toString();
      // Record the scientific function to history
      get().addToHistory(`${fn}(${current})`, resString, mode);
      
      return { displayValue: resString };
    } catch (e) {
      return { displayValue: 'Error' };
    }
  }),

  setOperation: (op) => set((state) => ({
    operation: op,
    prevValue: state.displayValue,
    displayValue: '0'
  })),

  calculate: (mode = 'standard') => set((state) => {
    if (!state.operation) return state;

    try {
      const expression = `${state.prevValue} ${state.operation} ${state.displayValue}`;
      const mathExpr = expression.replace('×', '*').replace('÷', '/');
      const result = evaluate(mathExpr).toString();
      
      // Record the standard or programmer operation to history
      get().addToHistory(expression, result, mode);

      return {
        displayValue: result,
        prevValue: '',
        operation: null,
      };
    } catch (e) {
      return { displayValue: 'Error' };
    }
  }),

  clear: () => set({ displayValue: '0', prevValue: '', operation: null }),
  
  deleteLast: () => set((state) => ({
    displayValue: state.displayValue.length > 1 ? state.displayValue.slice(0, -1) : '0'
  })),

  clearHistory: () => set({ history: [] }) // Useful for the sidebar UI
}));

export default useCalculatorStore;