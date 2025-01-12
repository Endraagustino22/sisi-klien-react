import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import EditLaporanModal from "./EditLaporanModal";
import Swal from "sweetalert2";

const LaporanBencanaList = () => {
  const [laporanData, setLaporanData] = useState([]);
  const [selectedLaporan, setSelectedLaporan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Ambil token dari Redux
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    // Fetch data dari API
    const fetchLaporanData = async () => {
      if (!token) return; // Jika token tidak ada, hentikan proses

      try {
        const response = await axios.get("https://slategrey-llama-121731.hostingersite.com/api/laporan-bencana", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLaporanData(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchLaporanData();
  }, [token]);

  // Handle klik tombol edit
  const handleEditClick = (laporan) => {
    setSelectedLaporan(laporan);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!token) return; // Pastikan token ada sebelum melakukan request

    try {
      const response = await axios.delete(
        `https://slategrey-llama-121731.hostingersite.com/api/laporan-bencana/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Tampilkan pesan sukses
      Swal.fire({
        icon: "success",
        title: "Data Dihapus",
        text: response.data.message,
      });

      // Hapus data dari state
      setLaporanData((prevData) =>
        prevData.filter((laporan) => laporan.id !== id)
      );
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal Menghapus Data",
        text: error.response?.data?.message || "Terjadi kesalahan",
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Link to="/create">
        <button className="bg-blue-500 text-white p-2 rounded mb-4 hover:bg-blue-600 transition duration-200">
          Tambah Laporan
        </button>
      </Link>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">ID</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Nama Gunung</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Level Bahaya</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Radius Evakuasi (km)</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Dampak Abu Vulkanik</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Penduduk Terdampak</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Fasilitas Terkena Dampak</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Waktu Update</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {laporanData.map((laporan) => (
              <tr key={laporan.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 text-sm text-gray-600">{laporan.id}</td>
                <td className="px-4 py-2 text-sm text-gray-600">{laporan.nama_gunung}</td>
                <td className="px-4 py-2 text-sm text-gray-600">{laporan.level_bahaya}</td>
                <td className="px-4 py-2 text-sm text-gray-600">{laporan.radius_evakuasi_km}</td>
                <td className="px-4 py-2 text-sm text-gray-600">{laporan.dampak_abu_vulkanik}</td>
                <td className="px-4 py-2 text-sm text-gray-600">{laporan.jumlah_penduduk_terdampak}</td>
                <td className="px-4 py-2 text-sm text-gray-600">{laporan.fasilitas_umum_terdampak}</td>
                <td className="px-4 py-2 text-sm text-gray-600">{laporan.waktu_update}</td>
                <td className="px-4 py-2 text-sm flex">
                  <button
                    className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-600 mr-2"
                    onClick={() => handleEditClick(laporan)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                    onClick={() => handleDelete(laporan.id)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <EditLaporanModal
          laporan={selectedLaporan}
          setIsModalOpen={setIsModalOpen}
          setLaporanData={setLaporanData}
        />
      )}
    </div>
  );
};

export default LaporanBencanaList;
