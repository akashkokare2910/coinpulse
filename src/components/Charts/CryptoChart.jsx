import React from "react";
import { Line, Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import PropTypes from "prop-types";
import "./CryptoChart.css";

const ChartTypes = {
  line: Line,
  bar: Bar,
};

const CryptoChart = ({
  cryptoDetails,
  historicalData,
  chartTitle,
  chartType = "line",
  chartDataKey = "prices",
}) => {
  if (!historicalData || historicalData.length === 0) {
    return (
      <div className="crypto-chart-card bg-white p-4 rounded shadow">
        <h3 className="text-xl font-semibold mb-4">{chartTitle}</h3>
        <p>Loading data...</p>
      </div>
    );
  }

  const labels = historicalData.map((data) =>
    new Date(data[0]).toLocaleDateString()
  );
  const dataValues = historicalData.map((data) => data[1]);

  const ChartComponent = ChartTypes[chartType];

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: `${chartTitle} of ${cryptoDetails.name}`,
        data: dataValues,
        borderColor: "#2563EB",
        backgroundColor:
          chartType === "bar"
            ? "rgba(37, 99, 235, 0.2)"
            : "rgba(37, 99, 235, 0.2)",
        fill: true,
      },
    ],
  };

  return (
    <div className="crypto-chart-card bg-white p-4 rounded shadow">
      <h3 className="text-xl font-semibold mb-4">{chartTitle}</h3>
      <div className="chart-container">
        <ChartComponent data={chartData} />
      </div>
    </div>
  );
};

// PropTypes validation
CryptoChart.propTypes = {
  cryptoDetails: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  historicalData: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.number.isRequired)
  ), // Removed the .isRequired
  chartTitle: PropTypes.string.isRequired,
  chartType: PropTypes.oneOf(["line", "bar"]), // Enforce valid chart types
  chartDataKey: PropTypes.string,
};

export default CryptoChart;
