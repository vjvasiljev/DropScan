// src/api/etherscan.js

export async function fetchGasPrices() {
  const apiKey = import.meta.env.VITE_ETHERSCAN_API;
  const url = `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    console.error('Fetch error:', error);
  }
}
