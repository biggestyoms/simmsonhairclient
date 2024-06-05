import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const AdminHome = () => {
  return (
    <div className="flex h-screen">
      <div className="w-1/5 bg-gray-800 text-white p-4">
        <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
        <ul className="space-y-4">
          <li>
            <Link to="/add-product" className="hover:text-yellow-400">Add Product</Link>
          </li>
          <li>
            <Link to="/all-products" className="hover:text-yellow-400">All Products</Link>
          </li>
          <li>
            <Link to="/all-orders" className="hover:text-yellow-400">All Orders</Link>
          </li>
        </ul>
      </div>
      <div className="w-4/5 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminHome;