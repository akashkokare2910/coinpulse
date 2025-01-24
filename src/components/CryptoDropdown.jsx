import { useState, useEffect } from "react";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { setSelectedCrypto } from "../redux/cryptoSlice";
import { getCryptoDetails } from "../api/cryptoApi";

const CryptoDropdown = () => {
  const dispatch = useDispatch();
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const cryptoList = await getCryptoDetails("markets");
        const formattedData = cryptoList.map((crypto) => ({
          value: crypto.id,
          label: `${crypto.name} (${crypto.symbol.toUpperCase()})`,
        }));
        setCryptos(formattedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cryptocurrencies:", error);
        setLoading(false);
      }
    };

    fetchCryptos();
  }, []);

  const handleSelect = (selectedOption) => {
    dispatch(setSelectedCrypto(selectedOption.value)); // Dispatch selected crypto to Redux
  };

  return (
    <div className="w-full max-w-sm">
      {loading ? (
        <p className="text-gray-200">Loading...</p>
      ) : (
        <Select
          options={cryptos}
          onChange={handleSelect}
          placeholder="Search Cryptocurrency..."
          className="text-black"
          styles={{
            control: (base) => ({
              ...base,
              backgroundColor: "#1E3A8A",
              color: "white",
              border: "none",
              boxShadow: "none",
              padding: "0.25rem",
            }),
            singleValue: (base) => ({
              ...base,
              color: "white",
            }),
            placeholder: (base) => ({
              ...base,
              color: "white",
            }),
            menu: (base) => ({
              ...base,
              backgroundColor: "#111111",
              color: "white",
            }),
            option: (base, state) => ({
              ...base,
              backgroundColor: state.isFocused ? "#2563EB" : "#1E3A8A",
              color: "white",
              cursor: "pointer",
            }),
          }}
        />
      )}
    </div>
  );
};

export default CryptoDropdown;
