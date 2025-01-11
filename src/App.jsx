import { useState } from "react";
import "./index.css";

import Sider from "./Components/Sider";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import ItemDetail from "./Components/ItemDetail";
import AddItem from "./Components/AddItem";
import InventoryList from "./Components/InventoryList";
import Dashboard from "./Components/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Mahasiswa from "./pages/Admin/Mahasiswa";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import AdminLayout from "./layouts/AdminLayout";

const stokBarang = [
  { namaBarang: "teh pucuk", kategori: "minuman", stok: 100, harga: 3500 },
  { namaBarang: "beras", kategori: "bahan pangan", stok: 50, harga: 75000 },
  { namaBarang: "sunlight", kategori: "pembersih", stok: 40, harga: 4000 },
  { namaBarang: "lifebuoy", kategori: "sabun", stok: 30, harga: 4500 },
  { namaBarang: "chitato", kategori: "snack", stok: 50, harga: 7000 },
  { namaBarang: "teh javana", kategori: "minuman", stok: 55, harga: 4500 },
  { namaBarang: "lux", kategori: "sabun", stok: 50, harga: 5000 },
];

function App() {
  const [data, setData] = useState(stokBarang);

  return (
    <>
     
    </>
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<Login />} />
    //     <Route path="/register" element={<Register />} />
    //     <Route element={<AdminLayout />}>
    //       <Route path="/dashboard" element={<Dashboard data={data} />} />
    //       <Route
    //         path="/inventoryList"
    //         element={<InventoryList data={data} />}
    //       />
    //       <Route
    //         path="/itemdetail/:namaBarang"
    //         element={<ItemDetail data={data} />}
    //       />
    //       <Route
    //         path="/tambahbarang"
    //         element={<AddItem data={data} setData={setData} />}
    //       />
    //       <Route path="/mahasiswa" element={<Mahasiswa />} />
    //     </Route>
    //   </Routes>
    // </Router>
  );
}

export default App;