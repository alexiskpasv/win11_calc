import { create } from 'zustand';
import Big from 'big.js';
import { create as createMath, all } from 'mathjs';

const math = createMath(all, { precision: 32, number: 'BigNumber' });

const useCalculatorStore = create((set, get) => ({
  // --- STATE ---
  displayValue: '0',
  previousValue: null,
  operator: null,
  isWaitingForNext: false,
  history: JSON.parse(localStorage.getItem('calc-history')) || [],
  
  // Programmer specific
  wordSize: 64,

  // --- STANDARD ACTIONS ---
  appendNumber: (number) => {
    set((state) => ({
      displayValue: state.displayValue === '0' || state.isWaitingForNext 
        ? String(number) 
        : state.displayValue + number,
      isWaitingForNext: false,
    }));
  },

  setOperator: (op) => {
    const { displayValue, operator, previousValue } = get();
    if (operator && !get().isWaitingForNext) {
      get().calculate();
    }
    set({
      operator: op,
      previousValue: get().displayValue,
      isWaitingForNext: true,
    });
  },

  calculate: () => {
    const { displayValue, previousValue, operator } = get();
    if (!operator || previousValue === null) return;

    try {
      const a = new Big(previousValue);
      const b = new Big(displayValue);
      let res;

      switch (operator) {
        case '+': res = a.plus(b); break;
        case '-': res = a.minus(b); break;
        case '×': res = a.times(b); break;
        case '÷': res = b.eq(0) ? 'Error' : a.div(b); break;
        default: return;
      }

      const resultStr = res.toString();
      get().addHistoryItem(`${previousValue} ${operator} ${displayValue}`, resultStr);
      
      set({
        displayValue: resultStr,
        previousValue: null,
        operator: null,
        isWaitingForNext: true,
      });
    } catch (err) {
      set({ displayValue: 'Error' });
    }
  },

  // --- SCIENTIFIC ACTIONS ---
  appendFunction: (func) => {
    set((state) => ({
      displayValue: state.displayValue === '0' ? `${func}(` : state.displayValue + `${func}(`,
      isWaitingForNext: false
    }));
  },

  evaluateScientific: () => {
    const { displayValue } = get();
    try {
      const result = math.evaluate(displayValue);
      get().addHistoryItem(displayValue, result.toString());
      set({ 
        displayValue: result.toString(),
        isWaitingForNext: true 
      });
    } catch (error) {
      set({ displayValue: 'Error' });
    }
  },

  // --- PROGRAMMER ACTIONS ---
  setProgrammerValue: (newVal) => {
    // Basic validation to ensure it's a valid number string for BigInt
    try {
      const mask = (1n << BigInt(get().wordSize)) - 1n;
      const maskedValue = BigInt(newVal || 0) & mask;
      set({ displayValue: maskedValue.toString() });
    } catch (e) {
      set({ displayValue: '0' });
    }
  },

  getFormats: () => {
    try {
      const val = BigInt(get().displayValue || 0);
      return {
        hex: val.toString(16).toUpperCase(),
        dec: val.toString(10),
        oct: val.toString(8),
        bin: val.toString(2).padStart(get().wordSize, '0').replace(/(.{4})/g, '$1 ')
      };
    } catch (e) {
      return { hex: '0', dec: '0', oct: '0', bin: '0' };
    }
  },

  // --- UTILITY ACTIONS ---
  clear: () => set({ displayValue: '0', previousValue: null, operator: null, isWaitingForNext: false }),
  
  appendDecimal: () => {
    if (!get().displayValue.includes('.')) {
      set({ displayValue: get().displayValue + '.' });
    }
  },

  addHistoryItem: (equation, result) => {
    set((state) => {
      const newItem = { id: Date.now(), equation, result };
      const newHistory = [newItem, ...state.history].slice(0, 20);
      localStorage.setItem('calc-history', JSON.stringify(newHistory));
      return { history: newHistory };
    });
  },

  clearHistory: () => {
    localStorage.removeItem('calc-history');
    set({ history: [] });
  }
}));

export default useCalculatorStore;