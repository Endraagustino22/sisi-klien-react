import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('auth_token') || null,
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      localStorage.setItem('auth_token', action.payload); // Simpan token di localStorage
    },
    clearToken(state) {
      state.token = null;
      localStorage.removeItem('auth_token'); // Hapus token dari localStorage
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;
