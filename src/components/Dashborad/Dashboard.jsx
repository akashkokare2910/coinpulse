import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import CryptoChart from "../Charts/CryptoChart";
import CryptoDetails from "../Charts/CryptoDetails";
import "./Dashboard.css";
import Loader from "../Loader/Loader";
import { setHistoricalData, setCurrentPrice } from "../../redux/cryptoSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const selectedCrypto = useSelector((state) => state.crypto.selectedCrypto);
  const [cryptoDetails, setCryptoDetails] = useState(null);
  const [historicalData, setHistoricalDataState] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiKey = import.meta.env.REACT_APP_CG_API_KEY;

  useEffect(() => {
    if (!selectedCrypto) return;

    const fetchCryptoDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${selectedCrypto}`,
          {
            headers: {
              "x-cg-demo-api-key": apiKey,
            },
          }
        );
        setCryptoDetails(response.data);
        dispatch(setCurrentPrice(response.data.market_data.current_price.usd)); // Dispatch current price

        const historicalResponse = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${selectedCrypto}/market_chart`,
          {
            params: {
              vs_currency: "usd",
              days: "7",
              interval: "daily",
            },
            headers: {
              "x-cg-demo-api-key": apiKey,
            },
          }
        );
        setHistoricalDataState(historicalResponse.data.prices);
        dispatch(setHistoricalData(historicalResponse.data.prices)); // Dispatch historical data
      } catch (err) {
        console.error("Error fetching cryptocurrency details:", err);
        setError("Failed to load cryptocurrency data.");
      } finally {
        setLoading(false);
      }
    };

    fetchCryptoDetails();
  }, [selectedCrypto, apiKey, dispatch]);

  if (loading) return <Loader />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="dashboard-container flex justify-center items-center p-4">
      <div className="dashboard-card bg-white p-6 shadow-lg rounded-lg w-full max-w-4xl">
        {cryptoDetails && historicalData.length > 0 && (
          <>
            <div className="crypto-details-container">
              <CryptoDetails cryptoDetails={cryptoDetails} />
            </div>
            <div className="charts-container flex flex-row justify-between mt-6">
              <CryptoChart
                cryptoDetails={cryptoDetails}
                historicalData={historicalData}
                chartTitle="Price Trend (Last 7 days)"
                chartType="line"
              />
              <CryptoChart
                cryptoDetails={cryptoDetails}
                historicalData={historicalData}
                chartTitle="Daily Prices (Last 7 days)"
                chartType="bar"
                chartDataKey="open"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
