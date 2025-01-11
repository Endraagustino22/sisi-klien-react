import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateLaporanBencana = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nama_gunung: "",
    level_bahaya: "",
    radius_evakuasi_km: "",
    dampak_abu_vulkanik: "",
    jumlah_penduduk_terdampak: "",
    fasilitas_umum_terdampak: "",
    waktu_update: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("auth_token");

      const response = await axios.post(
        "https://slategrey-llama-121731.hostingersite.com/api/laporan-bencana",
        form,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.message === "Data berhasil ditambahkan") {
        // Tampilkan pesan sukses dan redirect ke halaman utama
        alert("Laporan berhasil ditambahkan!");
        navigate("/admin");
      }
    } catch (error) {
      alert("Terjadi kesalahan saat menambahkan laporan");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Tambah Laporan Bencana</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nama_gunung">Nama Gunung</label>
          <input
            type="text"
            name="nama_gunung"
            id="nama_gunung"
            value={form.nama_gunung}
            onChange={handleChange}
            required
            className="border rounded p-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="level_bahaya">Level Bahaya</label>
          <input
            type="text"
            name="level_bahaya"
            id="level_bahaya"
            value={form.level_bahaya}
            onChange={handleChange}
            className="border rounded p-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="radius_evakuasi_km">Radius Evakuasi (km)</label>
          <input
            type="number"
            name="radius_evakuasi_km"
            id="radius_evakuasi_km"
            value={form.radius_evakuasi_km}
            onChange={handleChange}
            required
            className="border rounded p-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="dampak_abu_vulkanik">Dampak Abu Vulkanik</label>
          <input
            type="text"
            name="dampak_abu_vulkanik"
            id="dampak_abu_vulkanik"
            value={form.dampak_abu_vulkanik}
            onChange={handleChange}
            className="border rounded p-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="jumlah_penduduk_terdampak">Jumlah Penduduk Terdampak</label>
          <input
            type="number"
            name="jumlah_penduduk_terdampak"
            id="jumlah_penduduk_terdampak"
            value={form.jumlah_penduduk_terdampak}
            onChange={handleChange}
            required
            className="border rounded p-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="fasilitas_umum_terdampak">Fasilitas Umum Terkena Dampak</label>
          <input
            type="text"
            name="fasilitas_umum_terdampak"
            id="fasilitas_umum_terdampak"
            value={form.fasilitas_umum_terdampak}
            onChange={handleChange}
            className="border rounded p-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="waktu_update">Waktu Update</label>
          <input
            type="datetime-local"
            name="waktu_update"
            id="waktu_update"
            value={form.waktu_update}
            onChange={handleChange}
            required
            className="border rounded p-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
        >
          Simpan Laporan
        </button>
      </form>
    </div>
  );
};

export default CreateLaporanBencana;
