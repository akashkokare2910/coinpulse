import axios from "axios";

const API_BASE = "https://api.coingecko.com/api/v3";
const API_KEY = import.meta.env.REACT_APP_CG_API_KEY;

// Fetch cryptocurrency details (current price, market data, etc.)
export const getCryptoDetails = async (endpoint = "markets", params = {}) => {
  try {
    const { data } = await axios.get(`${API_BASE}/coins/${endpoint}`, {
      params: {
        vs_currency: "usd",
        ...params,
      },
      headers: {
        "x-cg-demo-api-key": API_KEY,
      },
    });
    return data;
  } catch (error) {
    console.error(`Error fetching data from endpoint: ${endpoint}`, error);
    throw error;
  }
};

// Fetch historical price data for the past 7 days (OHLCV)
export const getHistoricalData = async (cryptoId) => {
  try {
    const { data } = await axios.get(
      `${API_BASE}/coins/${cryptoId}/market_chart`,
      {
        params: {
          vs_currency: "usd",
          days: "7",
        },
        headers: {
          "x-cg-demo-api-key": API_KEY,
        },
      }
    );
    return data.prices;
  } catch (error) {
    console.error("Error fetching historical data:", error);
    throw error;
  }
};
