import React, { useEffect, useRef, useState } from 'react';
import { payments } from '@square/web-sdk';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import baseURL from "../axios/baseUrl";

const CheckoutPage = () => {
  const cardRef = useRef(null);
  const [cart, setCart] = useState([]);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    country: ''
  });

  const userLoginFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : undefined;

  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (userLoginFromStorage) {
          const config = {
            headers: {
              Authorization: `Bearer ${userLoginFromStorage.token}`,
            },
          };
          const { data } = await axios.get(`${baseURL}/cart`, config);
          setCart(data);
        }
      } catch (error) {
        console.error("Error fetching the cart:", error);
        toast.error("Failed to fetch cart items.");
      }
    };

    fetchCart();
  }, [userLoginFromStorage]);

  useEffect(() => {
    const initializeCard = async () => {
      try {
        const paymentsInstance = await payments('sq0idp-P55l0jNW-HrK7pEovZdzyg', 'L5K37VVVNABKY');
        const card = await paymentsInstance.card();
        await card.attach('#card-container');
        cardRef.current = card;
      } catch (error) {
        console.error('Error initializing card:', error);
        toast.error('Failed to initialize card.');
      }
    };

    if (!cardRef.current) {
      initializeCard();
    }

    return () => {
      if (cardRef.current) {
        cardRef.current.destroy();
        cardRef.current = null;
      }
    };
  }, []);

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const price = item?.product?.price ? parseFloat(item?.product?.price) : 0;
      return total + price * item?.quantity;
    }, 0);
  };

  const handlePayment = async () => {
    try {
      if (cardRef.current) {
        const result = await cardRef.current.tokenize();
        console.log('Tokenization result:', result);

        if (result.status === 'OK') {
          console.log('Payment token:', result.token);
          const paymentData = {
            token: result.token,
            amount: getTotalPrice(),
            cartItems: cart.map(item => ({
              productId: item.product._id,
              quantity: item.quantity
            })),
            userInfo
          };

          const config = {
            headers: {
              Authorization: `Bearer ${userLoginFromStorage.token}`,
              'Content-Type': 'application/json'
            },
          };

          // Process payment
          await axios.post(`${baseURL}/payments`, paymentData, config);

          // Create order after successful payment
          const orderData = {
            products: cart.map(item => ({
              productId: item.product._id,
              quantity: item.quantity
            }))
          };

          await axios.post(`${baseURL}/order`, orderData, config);

          toast.success('Payment and order successful');

          // Optionally clear the cart on the frontend
          setCart([]);
        } else {
          console.error('Tokenization failed:', result.errors);
          toast.error('Payment failed. Please check your card details and try again.');
        }
      }
    } catch (error) {
      console.error('Payment handling error:', error);
      toast.error('Payment failed. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  return (
    <div className="min-h-screen bg-black p-6 text-white">
      <ToastContainer />
      <div className="max-w-lg mx-auto bg-black p-8 rounded shadow">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Cart Items</h2>
          {cart.map((item) => (
            <div key={item.product._id} className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <img src={item.product.image} alt={item.product.name} className="h-12 w-12 object-cover mr-2" />
                <p>{item.product.name}</p>
              </div>
              <p>{item.quantity} x ${item.product.price}</p>
            </div>
          ))}
          <div className="flex justify-between items-center font-bold">
            <p>Total:</p>
            <p>${getTotalPrice().toFixed(2)}</p>
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={userInfo.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded border-[#ebdd79] bg-transparent outline-none "
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={userInfo.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded border-[#ebdd79] bg-transparent outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Phone</label>
          <input
            type="tel"
            name="phone"
            value={userInfo.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded border-[#ebdd79] bg-transparent outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Address</label>
          <input
            type="text"
            name="address"
            value={userInfo.address}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded border-[#ebdd79] bg-transparent outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Country</label>
          <input
            type="text"
            name="country"
            value={userInfo.country}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded border-[#ebdd79] bg-transparent outline-none"
          />
        </div>
        <div id="card-container" className="mb-4"></div>
        <button
          className="bg-[#ebdd79] text-black px-4 py-2 rounded"
          onClick={handlePayment}
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
