import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import baseUrl from '../axios/baseUrl'; 

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const userInfoFromStorage = JSON.parse(localStorage.getItem('userInfo')) || null;

  useEffect(() => {
    if (!userInfoFromStorage) {
      toast.error('You must be logged in to view orders.', { autoClose: 300 });
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      setLoading(true);
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfoFromStorage.token}`,
          },
        };
        const response = await axios.get(`${baseUrl}/order/user`, config);
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch orders');
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate, userInfoFromStorage]);

  return (
    <div className="container mx-auto p-4">
  <h1 className="text-3xl font-bold mb-6 text-white">My Orders</h1>
  {/* {loading && <p>Loading...</p>} */}
  {error && <p className="text-red-500 ">{error}</p>}
  {orders.length === 0 && !loading && <p className="text-white">No orders found.</p>}
  {orders.map((order) => (
    <div key={order._id} className="border p-6 mb-6 rounded-lg shadow-lg bg-gray-800 text-white">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Order ID: {order._id}</h2>
        <p className={`mb-2 text-lg`}>Status: <span className={`${order?.status === 'Pending' ? 'text-yellow-500' : order?.status === 'Completed' ? 'text-green-500' : 'text-red-500'}`}>{order?.status}</span></p>
        <p className="mb-2 text-lg">Date: {new Date(order?.createdAt).toLocaleDateString()}</p>
        <p className="text-green-500 text-lg">Paid</p>
      </div>
      <h3 className="text-xl font-semibold mb-4">Products:</h3>
      <ul>
        {order.products.map((product) => (
          <li key={product?.product?._id} className="mb-4 p-4 border rounded-lg bg-gray-700">
            <p className="text-lg font-medium">Product Name: {product?.product?.name} </p>
            <p className="text-lg">Quantity: {product?.quantity}</p>
            <p className="text-lg">Price: ${product?.product?.price}</p>
            <p className="text-lg text-green-500">In-Store Pickup Available</p>
          </li>
        ))}
      </ul>
    </div>
  ))}
</div>
  );
};

export default Orders;
