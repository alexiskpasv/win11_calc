import { create } from 'mathjs';

// Configuration for high precision in Scientific Mode
const math = create(all, { precision: 32, number: 'BigNumber' });

export const scientificActions = (set, get) => ({
  // Add a function (sin, cos, log)
  appendFunction: (func) => {
    set((state) => ({
      displayValue: state.displayValue === '0' ? `${func}(` : state.displayValue + `${func}(`,
      isWaitingForNext: false
    }));
  },

  // Specialized Scientific Evaluation
  evaluateScientific: () => {
    const { displayValue } = get();
    try {
      const result = math.evaluate(displayValue);
      set({ 
        equation: displayValue + ' =',
        displayValue: result.toString(),
        isWaitingForNext: true 
      });
    } catch (error) {
      set({ displayValue: 'Error' });
    }
  },

  // Toggle Degree / Radian mode
  toggleAngleUnit: () => {
    // Logic to switch math.js config between 'deg' and 'rad'
  }
});