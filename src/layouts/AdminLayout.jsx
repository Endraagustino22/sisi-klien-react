import React from 'react';
import { Outlet } from 'react-router-dom';
import '../index.css';
import Button from '../Components/Button';
import Sider from '../Components/Sider';

function AdminLayout({}) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <Sider />
      <Content />
    </div>
  );
}

function Content() {
  return (
    <div className="flex-1 flex flex-col">
      <Main />
      <Footer />
    </div>
  );
}

function Main({ children }) {
  return (
    <main className="flex-grow bg-blue-50 p-4">
      <Outlet />
    </main>
  );
}

function Footer() {
  return (
    <footer className="bg-indigo-900 text-white text-center p-4">
      <p>&copy; Endra Agustino</p>
    </footer>
  );
}

export default AdminLayout;
