import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "", // untuk password confirmation
  });

  const [loading, setLoading] = useState(false); // untuk loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "https://slategrey-llama-121731.hostingersite.com/api/auth/register", // ganti dengan URL yang benar
        form,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      // Tangani response sukses
      Swal.fire({
        icon: "success",
        title: "Daftar Berhasil",
        text: "Anda telah berhasil mendaftar.",
      });

      setForm({ name: "", email: "", password: "", password_confirmation: "" });
      navigate("/"); // navigasi ke halaman login setelah register berhasil
    } catch (error) {
      setLoading(false);

      // Menangani kesalahan jika ada
      if (error.response && error.response.data) {
        Swal.fire({
          icon: "error",
          title: "Gagal Daftar",
          text:
            error.response.data.message || "Terjadi kesalahan saat mendaftar.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal Daftar",
          text: "Terjadi kesalahan, coba lagi.",
        });
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          Halaman Register
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="name" className="block font-semibold">
              Name
            </label>
            <input
              type="text"
              name="name"
              className="w-full border rounded-md p-2"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block font-semibold">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="w-full border rounded-md p-2"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block font-semibold">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="w-full border rounded-md p-2"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label
              htmlFor="password_confirmation"
              className="block font-semibold"
            >
              Konfirmasi Password
            </label>
            <input
              type="password"
              name="password_confirmation"
              className="w-full border rounded-md p-2"
              value={form.password_confirmation}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className={`w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-800 transition ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Mendaftar..." : "Register"}
            </button>
          </div>
          <div className="text-center mt-4">
            <p
              className="text-blue-500 hover:underline cursor-pointer"
              onClick={() => navigate("/")}
            >
              Sudah punya akun? Login
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
