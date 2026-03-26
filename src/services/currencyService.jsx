const BASE_URL = "https://open.er-api.com/v6/latest";

export const fetchExchangeRates = async (baseCurrency = "USD") => {
  try {
    const response = await fetch(`${BASE_URL}/${baseCurrency}`);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    
    // System Engineer's Note: Cache the result in LocalStorage for offline use
    localStorage.setItem(`rates_${baseCurrency}`, JSON.stringify({
      rates: data.rates,
      timestamp: Date.now()
    }));
    
    return data.rates;
  } catch (error) {
    console.error("Fetch error, loading from cache...", error);
    const cached = localStorage.getItem(`rates_${baseCurrency}`);
    return cached ? JSON.parse(cached).rates : null;
  }
};