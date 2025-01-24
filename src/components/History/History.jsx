import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setHistoricalData } from "../../redux/cryptoSlice";
import "./History.css";

const History = () => {
  const dispatch = useDispatch();
  const historyData = useSelector((state) => state.crypto.historicalData);
  const [searchText, setSearchText] = React.useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd",
        {
          method: "GET",
          headers: {
            accept: "application/json",
            "x-cg-demo-api-key": import.meta.env.REACT_APP_CG_API_KEY,
          },
        }
      );
      const data = await response.json();
      dispatch(setHistoricalData(data)); // Dispatch historical data to Redux
    };

    fetchData();
  }, [dispatch]);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value.toLowerCase());
  };

  const filteredData = historyData.filter((item) =>
    item.name ? item.name.toLowerCase().includes(searchText) : false
  );

  return (
    <div className="history-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by coin name"
          value={searchText}
          onChange={handleSearchChange}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Coin</th>
            <th>Price (USD)</th>
            <th>Date</th>
            <th>24h Volume</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.id}>
              <td>
                <img src={item.image} alt={item.name} /> {item.name}
              </td>
              <td>${item.current_price.toLocaleString()}</td>
              <td>{new Date(item.last_updated).toLocaleDateString()}</td>
              <td>${item.total_volume.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default History;
