import { createSlice } from "@reduxjs/toolkit";

export const cryptoSlice = createSlice({
  name: "crypto",
  initialState: {
    selectedCrypto: "bitcoin", // Default selected cryptocurrency
    currentPrice: null,
    historicalData: [],
    overviewData: {},
  },
  reducers: {
    setSelectedCrypto: (state, action) => {
      state.selectedCrypto = action.payload;
    },
    setCurrentPrice: (state, action) => {
      state.currentPrice = action.payload;
    },
    setHistoricalData: (state, action) => {
      state.historicalData = action.payload;
    },
    setOverviewData: (state, action) => {
      state.overviewData = action.payload;
    },
  },
});

export const {
  setSelectedCrypto,
  setCurrentPrice,
  setHistoricalData,
  setOverviewData,
} = cryptoSlice.actions;

export default cryptoSlice.reducer;
