import { configureStore } from '@reduxjs/toolkit';
import laporanReducer from './laporanSlice';

const store = configureStore({
  reducer: {
    laporan: laporanReducer,
  },
});

export default store;
