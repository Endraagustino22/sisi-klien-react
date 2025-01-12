import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"; // Import useDispatch
import Swal from "sweetalert2";
import { setToken } from "../../redux/authSlice"; // Import setToken dari authSlice

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Inisialisasi useDispatch
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  // handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      Swal.fire({
        icon: "warning",
        title: "Form Tidak Lengkap",
        text: "Silakan isi email dan password.",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "https://slategrey-llama-121731.hostingersite.com/api/auth/login",
        form,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        const { token } = response.data;

        // Simpan token ke Redux
        dispatch(setToken(token));

        // Tampilkan pesan sukses
        Swal.fire({
          icon: "success",
          title: "Login Berhasil",
          text: "Selamat datang, " + response.data.user.name,
        });

        // Reset form
        setForm({ email: "", password: "" });

        // Navigasi ke halaman dashboard
        navigate("/admin/");
      }
    } catch (error) {
      // Tampilkan pesan error
      Swal.fire({
        icon: "error",
        title: "Login Gagal",
        text: error.response?.data?.message || "Terjadi kesalahan.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center mb-6">Halaman Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
            <button
              type="submit"
              className="w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-800 transition"
              disabled={loading}
            >
              {loading ? "Tunggu..." : "Login"}
            </button>
          </div>
          <div className="text-center">
            <p
              className="text-blue-500 cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Belum punya akun? Register
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
