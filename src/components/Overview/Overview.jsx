import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCryptoDetails } from "../../api/cryptoApi";
import { setOverviewData } from "../../redux/cryptoSlice";
import Loader from "../Loader/Loader";
import "./Overview.css";

const Overview = () => {
  const dispatch = useDispatch();
  const { selectedCrypto, overviewData } = useSelector((state) => state.crypto);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  useEffect(() => {
    if (!selectedCrypto) return;

    const fetchCryptoDetails = async () => {
      setLoading(true);
      try {
        const details = await getCryptoDetails(selectedCrypto); // Updated API call
        console.log("Fetched details:", details); // Log the fetched details
        dispatch(setOverviewData(details)); // Push data to Redux
      } catch (err) {
        console.error("Error fetching cryptocurrency details:", err);
        setError("Failed to load cryptocurrency data.");
      } finally {
        setLoading(false);
      }
    };

    fetchCryptoDetails();
  }, [dispatch, selectedCrypto]);

  if (loading) return <Loader />;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!overviewData || !overviewData.market_data) {
    return (
      <div className="text-center text-lg text-gray-600">No data available</div>
    );
  }

  return (
    <div className="overview p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h3 className="text-3xl font-semibold text-center mb-6">
          {overviewData.name} Overview
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-6 border border-gray-200 rounded-lg shadow-md">
            <p className="text-lg font-medium text-gray-700">
              <strong>Market Cap:</strong> $
              {overviewData.market_data.market_cap.usd.toLocaleString()}
            </p>
          </div>
          <div className="p-6 border border-gray-200 rounded-lg shadow-md">
            <p className="text-lg font-medium text-gray-700">
              <strong>Total Supply:</strong>{" "}
              {overviewData.total_supply
                ? overviewData.total_supply.toLocaleString()
                : "N/A"}
            </p>
          </div>
          <div className="p-6 border border-gray-200 rounded-lg shadow-md">
            <p className="text-lg font-medium text-gray-700">
              <strong>Circulating Supply:</strong>{" "}
              {overviewData.market_data.circulating_supply.toLocaleString()}
            </p>
          </div>
          <div className="p-6 border border-gray-200 rounded-lg shadow-md">
            <p className="text-lg font-medium text-gray-700">
              <strong>All-time High (ATH):</strong> $
              {overviewData.market_data.ath.usd.toLocaleString()}
            </p>
          </div>
          <div className="p-6 border border-gray-200 rounded-lg shadow-md">
            <p className="text-lg font-medium text-gray-700">
              <strong>Rank:</strong> #{overviewData.market_cap_rank}
            </p>
          </div>
        </div>
        <div className="mt-6 bg-gray-50 p-6 rounded-lg shadow-md">
          <h4 className="text-xl font-semibold mb-4">Description</h4>
          <p
            className="text-gray-700"
            dangerouslySetInnerHTML={{
              __html:
                overviewData.description?.en || "No description available.",
            }}
          ></p>
        </div>
      </div>
    </div>
  );
};

export default Overview;
