import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!form.email || !form.password) {
            Swal.fire({
                icon: "warning",
                title: "Form Incomplete",
                text: "Please fill in both email and password",
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
                // Simpan token ke local storage
                localStorage.setItem("auth_token", response.data.token);

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
                text: error.response?.data?.message || "Terjadi kesalahan",
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
                    <a href="/register" className="text-center text-blue-500">
                        Belum punya akun? Register
                    </a>
                </form>
            </div>
        </div>
    );
};

export default Login;
