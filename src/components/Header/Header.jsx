// eslint-disable-next-line
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CryptoDropdown from "../CryptoDropdown";
import { useDispatch } from "react-redux";
import { setSelectedCrypto } from "../../redux/cryptoSlice";
import "./Header.css";
import Logo from "../../assets/coinpulse.png";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleCryptoSelect = (crypto) => {
    dispatch(setSelectedCrypto(crypto));
  };

  const handleClick = () => {
    navigate("/");
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <header className="header bg-blue-600 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img
            src={Logo}
            alt="Logo"
            className="h-10 w-10 hover"
            onClick={handleClick}
          />
          <h1 className="text-2xl font-semibold text-white">CoinPulse</h1>
        </div>

        <div className="ml-4 w-50">
          <CryptoDropdown onCryptoSelect={handleCryptoSelect} />
        </div>
        <div className="mobile-menu" onClick={toggleMobileMenu}>
          <span className="text-white">Menu</span>
        </div>
        <nav
          className={`text-white flex items-center space-x-6 ${
            showMobileMenu ? "block" : "hidden"
          }`}
        >
          <Link
            to="/"
            className="hover:text-gray-300 transition-colors duration-200"
          >
            Dashboard
          </Link>
          <Link
            to="/overview"
            className="hover:text-gray-300 transition-colors duration-200"
          >
            Overview
          </Link>
          <Link
            to="/history"
            className="hover:text-gray-300 transition-colors duration-200"
          >
            History
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
