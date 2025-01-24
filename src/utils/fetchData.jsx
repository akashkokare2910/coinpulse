import axios from "axios";

export const fetchCurrentPrice = async (crypto) => {
  const response = await axios.get(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd`
  );
  return response.data[crypto].usd;
};

export const fetchHistoricalData = async (crypto) => {
  const response = await axios.get(
    `https://api.coingecko.com/api/v3/coins/${crypto}/market_chart?vs_currency=usd&days=7`
  );
  return response.data.prices;
};

export const fetchOverviewData = async (crypto) => {
  const response = await axios.get(
    `https://api.coingecko.com/api/v3/coins/${crypto}`
  );
  return response.data;
};
