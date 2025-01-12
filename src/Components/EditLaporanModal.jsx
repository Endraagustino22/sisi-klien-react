import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux"; // Import useSelector untuk mengambil data dari Redux

const EditLaporanModal = ({ laporan, setIsModalOpen, setLaporanData }) => {
    const [form, setForm] = useState({ ...laporan });

    // Ambil token dari Redux
    const token = useSelector((state) => state.auth.token);

    useEffect(() => {
        setForm({ ...laporan });
    }, [laporan]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(
                `https://slategrey-llama-121731.hostingersite.com/api/laporan-bencana/${laporan.id}`,
                form,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Gunakan token dari Redux
                        "Content-Type": "application/json",
                    },
                }
            );

            // Update data di daftar laporan
            setLaporanData((prevData) =>
                prevData.map((item) =>
                    item.id === laporan.id ? { ...item, ...response.data.data } : item
                )
            );
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error updating data", error);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg max-h-screen overflow-y-auto relative">
                <button
                    className="absolute top-2 right-2 text-xl text-gray-500 hover:text-gray-700"
                    onClick={() => setIsModalOpen(false)}
                >
                    &times;
                </button>
                <h2 className="text-2xl font-semibold mb-4">Edit Laporan Bencana</h2>
                <form onSubmit={handleSubmit}>
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

                    <div className="mb-4">
                        <label htmlFor="level_bahaya" className="block text-sm font-medium text-gray-700">
                            Level Bahaya
                        </label>
                        <input
                            type="text"
                            name="level_bahaya"
                            value={form.level_bahaya}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                    </div>

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

                    <div className="mb-4">
                        <label htmlFor="dampak_abu_vulkanik" className="block text-sm font-medium text-gray-700">
                            Dampak Abu Vulkanik
                        </label>
                        <input
                            type="text"
                            name="dampak_abu_vulkanik"
                            value={form.dampak_abu_vulkanik}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                    </div>

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

                    <div className="mb-4">
                        <label htmlFor="fasilitas_umum_terdampak" className="block text-sm font-medium text-gray-700">
                            Fasilitas Umum Terkena Dampak
                        </label>
                        <input
                            type="text"
                            name="fasilitas_umum_terdampak"
                            value={form.fasilitas_umum_terdampak}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                    </div>

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
