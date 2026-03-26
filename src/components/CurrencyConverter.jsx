import React, { useEffect } from 'react';
import useConverterStore from '../store/useConverterStore';
import { fetchExchangeRates } from '../services/currencyService';

const CurrencyConverter = () => {
  const store = useConverterStore();

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchExchangeRates(store.baseCurrency);
      if (data) store.setRates(data);
    };
    loadData();
  }, [store.baseCurrency]);

  return (
    <div className="flex flex-col p-6 gap-8 animate-in fade-in duration-500">
      {/* Top Input (Base) */}
      <div className="flex flex-col gap-2">
        <select 
          className="bg-transparent text-sm font-semibold outline-none"
          value={store.baseCurrency}
          onChange={(e) => set({ baseCurrency: e.target.value })}
        >
          <option value="USD">United States - Dollar</option>
          <option value="EUR">Euro Area - Euro</option>
          <option value="GBP">United Kingdom - Pound</option>
        </select>
        <input 
          type="number" 
          value={store.baseValue}
          onChange={(e) => store.updateBaseValue(e.target.value)}
          className="text-4xl font-bold bg-transparent outline-none w-full"
        />
      </div>

      {/* Bottom Input (Target) */}
      <div className="flex flex-col gap-2 border-t border-white/10 pt-8">
        <select 
          className="bg-transparent text-sm font-semibold outline-none"
          value={store.targetCurrency}
          onChange={(e) => set({ targetCurrency: e.target.value })}
        >
          <option value="EUR">Euro Area - Euro</option>
          <option value="USD">United States - Dollar</option>
          <option value="JPY">Japan - Yen</option>
        </select>
        <div className="text-4xl font-bold opacity-70">
          {store.targetValue}
        </div>
      </div>

      <div className="text-[10px] opacity-40 mt-4">
        1 {store.baseCurrency} = {store.rates[store.targetCurrency]} {store.targetCurrency}
      </div>
    </div>
  );
};