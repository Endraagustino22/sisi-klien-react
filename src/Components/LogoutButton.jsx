import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem("auth_token");
    try {
      const response = await axios.post(
        "https://slategrey-llama-121731.hostingersite.com/api/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Berhasil Keluar",
        text: response.data.message,
      });

      // Hapus token dari localStorage
      localStorage.removeItem("auth_token");

      // Arahkan pengguna ke halaman login
      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal Keluar",
        text: "Terjadi kesalahan saat mencoba keluar.",
      });
    }
  };

  return (
    <button
      className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-200"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
