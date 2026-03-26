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
    <div className="flex flex-col p-6 gap-6 animate-in fade-in duration-500 text-white">
      {/* Base Currency Selection */}
      <div className="flex flex-col gap-1">
        <select 
          className="bg-transparent text-sm font-semibold outline-none cursor-pointer hover:text-blue-400"
          value={store.baseCurrency}
          onChange={(e) => useConverterStore.setState({ baseCurrency: e.target.value })}
        >
          <option value="USD" className="bg-[#1a1a1a]">USD - US Dollar</option>
          <option value="EUR" className="bg-[#1a1a1a]">EUR - Euro</option>
          <option value="GBP" className="bg-[#1a1a1a]">GBP - British Pound</option>
          <option value="NGN" className="bg-[#1a1a1a]">NGN - Nigerian Naira</option>
        </select>
        <input 
          type="number" 
          value={store.baseValue}
          onChange={(e) => store.updateBaseValue(e.target.value)}
          className="text-5xl font-light bg-transparent outline-none w-full"
        />
      </div>

      {/* Target Currency Selection */}
      <div className="flex flex-col gap-1 border-t border-white/10 pt-6">
        <select 
          className="bg-transparent text-sm font-semibold outline-none cursor-pointer hover:text-blue-400"
          value={store.targetCurrency}
          onChange={(e) => useConverterStore.setState({ targetCurrency: e.target.value })}
        >
          <option value="EUR" className="bg-[#1a1a1a]">EUR - Euro</option>
          <option value="USD" className="bg-[#1a1a1a]">USD - US Dollar</option>
          <option value="NGN" className="bg-[#1a1a1a]">NGN - Nigerian Naira</option>
        </select>
        <div className="text-5xl font-light opacity-60">
          {store.targetValue}
        </div>
      </div>

      <div className="text-[10px] opacity-40 mt-2">
        1 {store.baseCurrency} = {store.rates[store.targetCurrency] || '...'} {store.targetCurrency}
      </div>
    </div>
  );
};

// CRITICAL: This is the line your error is complaining about!
export default CurrencyConverter;