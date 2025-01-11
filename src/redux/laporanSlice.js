import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const token = localStorage.getItem("auth_token");

export const fetchLaporanData = createAsyncThunk("laporan/fetchLaporanData", async () => {
  const response = await axios.get("https://slategrey-llama-121731.hostingersite.com/api/laporan-bencana", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
});

export const updateLaporan = createAsyncThunk("laporan/updateLaporan", async ({ id, data }) => {
  const response = await axios.put(`https://slategrey-llama-121731.hostingersite.com/api/laporan-bencana/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.data; // Sesuaikan dengan struktur respons dari server
});

// Thunk untuk menghapus data laporan
export const deleteLaporan = createAsyncThunk(
    'laporan/deleteLaporan',
    async (id, { rejectWithValue, dispatch }) => {
      const token = localStorage.getItem('auth_token');
      try {
        await axios.delete(`https://slategrey-llama-121731.hostingersite.com/api/laporan-bencana/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(removeLaporan(id));
      } catch (error) {
        return rejectWithValue(error.response?.data || 'Error deleting data');
      }
    }
  );

export const laporanSlice = createSlice({
  name: "laporan",
  initialState: { data: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLaporanData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLaporanData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchLaporanData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateLaporan.fulfilled, (state, action) => {
        const index = state.data.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      });
  },
});

export default laporanSlice.reducer;
