import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLaporanData, deleteLaporan } from '../redux/laporanSlice';
import EditLaporanModal from "./EditLaporanModal";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const LaporanBencanaList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLaporan, setSelectedLaporan] = useState(null);
  const dispatch = useDispatch();
  const { data: laporanData, loading, error } = useSelector((state) => state.laporan);

  useEffect(() => {
    dispatch(fetchLaporanData());
  }, [dispatch]);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Data akan dihapus secara permanen!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, hapus!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteLaporan(id))
          .then(() =>
            Swal.fire('Dihapus!', 'Data telah dihapus.', 'success')
          )
          .catch(() =>
            Swal.fire('Error!', 'Gagal menghapus data.', 'error')
          );
      }
    });
  };

  // Handle Edit button click
  const handleEditClick = (laporan) => {
    setSelectedLaporan(laporan);
    setIsModalOpen(true);
  };
  console.log(isModalOpen);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className='font-serif font-bold text-center text-2xl'>Laporan Bencana Gunung Berapi</h1>
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
      />
      )}
    </div>
  );
};

export default LaporanBencanaList;
