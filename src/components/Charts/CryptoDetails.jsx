import React from "react";
import PropTypes from "prop-types";
import "./CryptoChart.css";

const CryptoDetails = ({ cryptoDetails }) => {
  return (
    <div className="crypto-details">
      <h3 className="text-xl font-semibold mb-4">
        {cryptoDetails.name} Details
      </h3>
      <ul>
        <li>Symbol: {cryptoDetails.symbol}</li>
        <li>
          Current Price: $
          {cryptoDetails.market_data.current_price.usd.toLocaleString()}
        </li>
        <li>
          24h Change:{" "}
          <span
            className={`${
              cryptoDetails.market_data.price_change_percentage_24h < 0
                ? "text-red-500"
                : "text-green-500"
            }`}
          >
            {cryptoDetails.market_data.price_change_percentage_24h}%
          </span>
        </li>
        {/* Add more details as needed, e.g., market cap, volume */}
      </ul>
    </div>
  );
};

CryptoDetails.propTypes = {
  cryptoDetails: PropTypes.shape({
    name: PropTypes.string.isRequired,
    symbol: PropTypes.string.isRequired,
    market_data: PropTypes.shape({
      current_price: PropTypes.shape({
        usd: PropTypes.number.isRequired,
      }).isRequired,
      price_change_percentage_24h: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export default CryptoDetails;
