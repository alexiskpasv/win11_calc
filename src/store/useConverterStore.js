import { create } from 'zustand';

const useConverterStore = create((set, get) => ({
  baseValue: "1",
  targetValue: "0",
  baseCurrency: "USD",
  targetCurrency: "EUR",
  rates: {},

  setRates: (rates) => {
    set({ rates });
    get().convert();
  },

  updateBaseValue: (val) => {
    set({ baseValue: val });
    get().convert();
  },

  convert: () => {
    const { baseValue, baseCurrency, targetCurrency, rates } = get();
    if (!rates[targetCurrency]) return;
    
    const rate = rates[targetCurrency];
    const result = (parseFloat(baseValue || 0) * rate).toFixed(2);
    set({ targetValue: result.toString() });
  },

  swapCurrencies: () => {
    const { baseCurrency, targetCurrency } = get();
    set({ baseCurrency: targetCurrency, targetCurrency: baseCurrency });
    get().convert();
  }
}));

export default useConverterStore;