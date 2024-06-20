import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import baseUrl from '../axios/baseUrl'; // Ensure baseUrl is correctly set up

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const adminInfoFromStorage = JSON.parse(localStorage.getItem('userInfo')) || null;

  const fetchOrders = async (status = '', page = 1) => {
    setLoading(true);
    setError(null); // Reset error state before fetching
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${adminInfoFromStorage.token}`,
        },
      };
      const response = await axios.get(`${baseUrl}/order/all`, {
        params: { status, page, limit: 10 },
        ...config,
      });
      setOrders(response.data.data);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch orders');
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        console.error('Request data:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(filter, currentPage);
  }, [filter, currentPage]);

  const updateOrderStatus = async (orderId, status) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${adminInfoFromStorage.token}`,
        },
      };
      const response = await axios.put(
        `${baseUrl}/order/updateStatus`,
        { orderId, status },
        config
      );
      if (response.data.success) {
        toast.success('Order status updated successfully', { autoClose: 200 });
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: response.data.data.status } : order
          )
        );
      } else {
        toast.error('Failed to update order status', { autoClose: 300 });
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.', { autoClose: 300 });
    }
  };

  const handleFilter = (status) => {
    setFilter(status);
    setCurrentPage(1); // Reset to the first page when the filter changes
    fetchOrders(status, 1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchOrders(filter, page);
  };

  return (
    <div className="container mx-auto p-4 text-white">
      <h1 className="text-3xl font-bold mb-6">All Orders</h1>
      <div className="flex mb-6 space-x-2">
        <button
          onClick={() => handleFilter('')}
          className={`px-4 py-2 rounded-lg ${filter === '' ? 'bg-gray-500' : 'bg-gray-700'} text-white`}
          disabled={loading}
        >
          All
        </button>
        <button
          onClick={() => handleFilter('Pending')}
          className={`px-4 py-2 rounded-lg ${filter === 'Pending' ? 'bg-yellow-500' : 'bg-yellow-700'} text-white`}
          disabled={loading}
        >
          Pending
        </button>
        <button
          onClick={() => handleFilter('Completed')}
          className={`px-4 py-2 rounded-lg ${filter === 'Completed' ? 'bg-green-500' : 'bg-green-700'} text-white`}
          disabled={loading}
        >
          Completed
        </button>
        <button
          onClick={() => handleFilter('Cancelled')}
          className={`px-4 py-2 rounded-lg ${filter === 'Cancelled' ? 'bg-red-500' : 'bg-red-700'} text-white`}
          disabled={loading}
        >
          Cancelled
        </button>
      </div>
      {loading && <p className="text-white">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {orders?.length === 0 && !loading && <p className="text-white">No orders found.</p>}
      {orders.map((order) => (
        <div key={order?._id} className="border border-gray-700 p-6 mb-6 rounded-lg shadow-lg bg-gray-800">
          <h2 className="text-2xl font-semibold mb-2">Order ID: {order?._id}</h2>
          <p className="mb-2">Status: <span className={`${order?.status === 'Pending' ? 'text-yellow-500' : order?.status === 'Completed' ? 'text-green-500' : 'text-red-500'}`}>{order?.status}</span></p>
          <p className="mb-2">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
          <p className="mb-2">User: {order?.user?.email}</p>
          <p className="mb-2 font-[900] text-[18px] text-green-500">PAID</p>
          <h3 className="text-xl font-semibold mt-4">Products:</h3>
          <ul className="space-y-2">
            {order.products.map((product) => (
              <li key={product?.product?._id} className="p-4 bg-gray-700 rounded-lg">
                <p className="text-lg">Product Name: {product?.product?.name}</p>
                <img src={product?.product?.image} className="h-20" alt="" />
                <p className="text-lg">Quantity: {product?.quantity}</p>
                <p className="text-lg">Price: ${product?.product?.price}</p>
              </li>
            ))}
          </ul>
          <div className="flex mt-6 space-x-4">
            <button
              onClick={() => updateOrderStatus(order?._id, 'Pending')}
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
            >
              Set Pending
            </button>
            <button
              onClick={() => updateOrderStatus(order?._id, 'Completed')}
              className="px-4 py-2 bg-green-500 text-white rounded-lg"
            >
              Set Completed
            </button>
            <button
              onClick={() => updateOrderStatus(order?._id, 'Cancelled')}
              className="px-4 py-2 bg-red-500 text-white rounded-lg"
            >
              Set Cancelled
            </button>
          </div>
        </div>
      ))}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-3 py-2 mx-1 bg-gray-700 text-white rounded-lg"
          disabled={loading || currentPage === 1}
        >
          Prev.
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-2 mx-1 rounded-lg ${currentPage === index + 1 ? 'bg-blue-500' : 'bg-gray-700'} text-white`}
            disabled={loading}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-3 py-2 mx-1 bg-gray-700 text-white rounded-lg"
          disabled={loading || currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllOrders;
