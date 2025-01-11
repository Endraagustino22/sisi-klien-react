import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";  // Menggunakan ikon hamburger menu
import LogoutButton from "./LogoutButton";

function Sider() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <aside className="bg-indigo-900 text-white">
      <nav className="px-4 py-16 w-full">
        {/* Tombol Hamburger untuk layar kecil */}
        <div className="sm:hidden">
          <button onClick={toggleMenu} className="text-2xl">
            <FaBars />
          </button>
        </div>

        {/* Sidebar untuk layar besar */}
        <div className="hidden sm:block">
          <ul className="flex flex-col">
            <li className="py-2 px-4 hover:bg-indigo-700">
              <Link to="/admin/">Dashboard</Link>
            </li>
            <LogoutButton />
          </ul>
        </div>

        {/* Sidebar untuk layar kecil */}
        <div className={`sm:hidden ${isOpen ? "block" : "hidden"}`}>
          <ul className="flex flex-col">
            <li className="py-2 px-4 hover:bg-indigo-700">
              <Link to="/admin/">Dashboard</Link>
            </li>
            <LogoutButton />
          </ul>
        </div>
      </nav>
    </aside>
  );
}

export default Sider;
