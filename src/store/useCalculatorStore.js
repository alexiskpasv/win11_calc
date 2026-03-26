import { create } from 'zustand';
import Big from 'big.js';

const useCalculatorStore = create((set, get) => ({
  displayValue: '0',
  equation: '',
  previousValue: null,
  operator: null,
  isWaitingForNext: false,
  value: "0", // For Programmer Mode (BigInt string)
  history: JSON.parse(localStorage.getItem('calc-history')) || [],

    addHistoryItem: (equation, result) => {
    set((state) => {
      const newItem = { id: Date.now(), equation, result };
      const newHistory = [newItem, ...state.history].slice(0, 20); // Keep last 20
      localStorage.setItem('calc-history', JSON.stringify(newHistory));
      return { history: newHistory };
      });
    },

  clearHistory: () => {
    localStorage.removeItem('calc-history');
    set({ history: [] });
  },

  // --- BITWISE ACTIONS ---
  executeBitwise: (operation, operandB = null) => {
    const a = BigInt(get().value);
    const b = operandB ? BigInt(operandB) : 0n;
    let result;

    switch (operation) {
      case 'AND': result = a & b; break;
      case 'OR':  result = a | b; break;
      case 'XOR': result = a ^ b; break;
      case 'NOT': result = ~a;    break;
      case 'Lsh': result = a << b; break;
      case 'Rsh': result = a >> b; break;
      default: return;
    }
    
    // Apply word-size mask (e.g., QWORD 64-bit)
    const mask = (1n << 64n) - 1n; 
    set({ value: (result & mask).toString() });
  },
  
  setProgrammerValue: (val) => set({ value: val }),
}));

  // Action: Append a number
  appendNumber: (num) => {
    set((state) => {
      if (state.isWaitingForNext) {
        return { displayValue: num, isWaitingForNext: false };
      }
      const newValue = state.displayValue === '0' ? num : state.displayValue + num;
      return { displayValue: newValue };
    });
  },

  // Action: Add Decimal
  appendDecimal: () => {
    set((state) => {
      if (state.isWaitingForNext) return { displayValue: '0.', isWaitingForNext: false };
      if (state.displayValue.includes('.')) return state;
      return { displayValue: state.displayValue + '.' };
    });
  },

  // Action: Set Operator (+, -, *, /)
  setOperator: (nextOperator) => {
    const { displayValue, previousValue, operator } = get();
    
    if (previousValue === null) {
      set({
        previousValue: displayValue,
        operator: nextOperator,
        equation: `${displayValue} ${nextOperator}`,
        isWaitingForNext: true,
      });
    } else {
      // Chain calculations (e.g., 5 + 5 + ...)
      const result = get().calculate();
      const result = a.plus(b).toString();
      get().addHistoryItem(`${previousValue} ${operator} ${displayValue}`, result);
      set({
        previousValue: result,
        displayValue: result,
        operator: nextOperator,
        equation: `${result} ${nextOperator}`,
        isWaitingForNext: true,
      });
    }
  },

  // Action: Use Backspace (Delete last character)
  performBackspace: () => {
    set((state) => {
    if (state.displayValue.length <= 1) {
      return { displayValue: '0' };
    }
    return { displayValue: state.displayValue.slice(0, -1) };
    });
  }

  // The Logic Engine
  calculate: () => {
    const { displayValue, previousValue, operator } = get();
    if (!operator || previousValue === null) return displayValue;

    const a = new Big(previousValue);
    const b = new Big(displayValue);
    let result;

    switch (operator) {
      case '+': result = a.plus(b); break;
      case '-': result = a.minus(b); break;
      case '×': result = a.times(b); break;
      case '÷': 
        if (b.eq(0)) return "Cannot divide by zero";
        result = a.div(b); 
        break;
      default: return displayValue;
    }

    const finalResult = result.toString();
    set({ 
      displayValue: finalResult, 
      previousValue: null, 
      operator: null, 
      equation: '',
      isWaitingForNext: true 
    });
    return finalResult;
  },

  clear: () => set({ displayValue: '0', equation: '', previousValue: null, operator: null, isWaitingForNext: false }),
}));

export default useCalculatorStore;