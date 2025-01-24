import { configureStore } from "@reduxjs/toolkit";
import cryptoReducer from "../redux/CryptoSlice";

const store = configureStore({
  reducer: {
    crypto: cryptoReducer,
  },
});

export { store };
