import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateLaporan } from "../redux/laporanSlice";

const EditLaporanModal = ({ laporan, setIsModalOpen }) => {
  const [form, setForm] = useState({ ...laporan });
  const dispatch = useDispatch();

  // Menyinkronkan form dengan data laporan yang dipilih
  useEffect(() => {
    setForm({ ...laporan });
  }, [laporan]);

  // Handle perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  // Handle submit untuk menyimpan data yang diubah
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateLaporan({ id: laporan.id, data: form }));
      setIsModalOpen(false); // Tutup modal setelah berhasil menyimpan
    } catch (error) {
      console.error("Gagal memperbarui data laporan:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg relative">
        {/* Tombol untuk menutup modal */}
        <button
          className="absolute top-2 right-2 text-xl text-gray-500 hover:text-gray-700"
          onClick={() => setIsModalOpen(false)}
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold mb-4">Edit Laporan Bencana</h2>

        <form onSubmit={handleSubmit}>
          {/* Input Nama Gunung */}
          <div className="mb-4">
            <label htmlFor="nama_gunung" className="block text-sm font-medium text-gray-700">
              Nama Gunung
            </label>
            <input
              type="text"
              name="nama_gunung"
              value={form.nama_gunung}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {/* Input Level Bahaya */}
          <div className="mb-4">
            <label htmlFor="level_bahaya" className="block text-sm font-medium text-gray-700">
              Level Bahaya
            </label>
            <input
              type="text"
              name="level_bahaya"
              value={form.level_bahaya}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {/* Input Radius Evakuasi */}
          <div className="mb-4">
            <label htmlFor="radius_evakuasi_km" className="block text-sm font-medium text-gray-700">
              Radius Evakuasi (km)
            </label>
            <input
              type="number"
              name="radius_evakuasi_km"
              value={form.radius_evakuasi_km}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {/* Input Dampak Abu Vulkanik */}
          <div className="mb-4">
            <label htmlFor="dampak_abu_vulkanik" className="block text-sm font-medium text-gray-700">
              Dampak Abu Vulkanik
            </label>
            <input
              type="text"
              name="dampak_abu_vulkanik"
              value={form.dampak_abu_vulkanik}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {/* Input Jumlah Penduduk Terdampak */}
          <div className="mb-4">
            <label htmlFor="jumlah_penduduk_terdampak" className="block text-sm font-medium text-gray-700">
              Jumlah Penduduk Terdampak
            </label>
            <input
              type="number"
              name="jumlah_penduduk_terdampak"
              value={form.jumlah_penduduk_terdampak}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {/* Input Fasilitas Umum Terkena Dampak */}
          <div className="mb-4">
            <label htmlFor="fasilitas_umum_terdampak" className="block text-sm font-medium text-gray-700">
              Fasilitas Umum Terkena Dampak
            </label>
            <input
              type="text"
              name="fasilitas_umum_terdampak"
              value={form.fasilitas_umum_terdampak}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {/* Input Waktu Update */}
          <div className="mb-4">
            <label htmlFor="waktu_update" className="block text-sm font-medium text-gray-700">
              Waktu Update
            </label>
            <input
              type="datetime-local"
              name="waktu_update"
              value={form.waktu_update}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {/* Tombol Simpan */}
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-600 w-full"
          >
            Simpan Perubahan
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditLaporanModal;
