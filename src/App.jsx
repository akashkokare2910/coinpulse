import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashborad/Dashboard";
import Overview from "./components/Overview/Overview";
import History from "./components/History/History";
import Header from "./components/Header/Header";
import Footer from "./Footer/Footer";

function App() {
  const [selectedCrypto, setSelectedCrypto] = useState(null);

  return (
    <div className="app">
      <Header onCryptoSelect={setSelectedCrypto} />
      <Routes>
        <Route
          path="/"
          element={<Dashboard selectedCrypto={selectedCrypto} />}
        />
        <Route
          path="/overview"
          element={<Overview selectedCrypto={selectedCrypto} />}
        />
        <Route path="/history" element={<History />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
