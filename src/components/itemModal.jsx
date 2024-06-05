import React, { useState } from 'react';
import { IoIosClose } from "react-icons/io";
import { IoBagAddOutline } from "react-icons/io5";
import Popup from './popup';
import Cantu from '../images/cantutwo.png';
import { toast } from 'react-toastify';
import axiosInstance from '../axios/axiosInstance';

const ItemModal = ({ item, isOpen, close }) => {
  const [quantity, setQuantity] = useState(1);
  const [showPopup, setShowPopup] = useState(false);

  if (!isOpen) return null;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const addToCart = async (productId, quantity) => {
    try {
      const response = await axiosInstance.post(`/cart`, { productId, quantity });

      if (response.status === 200) {
        toast.success('Product added to cart');
      } else {
        toast.error('Failed to add product to cart');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
  };

  const handleAddToCart = () => {
    if (item.inStock) {
      addToCart(item._id, quantity);
      close();
    } else {
      setShowPopup(true);
    }
  };

  return (
    <div className='w-full h-full absolute flex items-center justify-center blur-background z-50 bg-[#00000050]'>
      {showPopup && <Popup message="This item is out of stock" onClose={closePopup} />}
      <div className='md:w-[60%] w-[95%] p-4 bg-white relative rounded-[15px] flex md:flex-row flex-col items-center justify-center md:h-max h-[90dvh]'>
        <button onClick={close} className='absolute top-0 right-0 bg-[#00000020] rounded-lg m-2'>
          <IoIosClose size={35} />
        </button>
        <div className='flex items-center justify-center md:w-[40%] w-full md:h-[400px] h-[200px]'>
          <img src={Cantu} alt={item.name} className='md:h-full h-[60%]' />
        </div>
        <div className='md:w-[58%] h-[60%] w-full flex flex-col md:ml-6'>
          <p className='font-bold text-[25px] md:mb-5'>{item.name}</p>
          <p className='font-semibold md:text-[20px]'>Description:</p>
          <p className='text-[15px]'>{item.description}</p>
          <p className="md:text-xl font-bold">Price: {formatCurrency(item.price)}</p>
          <div>
            <p className='mt-2'>Quantity:</p>
            <div className='w-full flex'>
              <div className="flex items-center mt-1 mb-1 w-full">
                <button onClick={(e) => { e.stopPropagation(); decrementQuantity(); }} className="bg-gray-300 text-gray-700 px-3 py-1 rounded-l">-</button>
                <span className="px-4 py-1 bg-gray-100 border-t border-b border-gray-300">{quantity}</span>
                <button onClick={(e) => { e.stopPropagation(); incrementQuantity(); }} className="bg-gray-300 text-gray-700 px-3 py-1 rounded-r">+</button>
              </div>
              <div className='flex items-center text-white'>
                {item.inStock ? (
                  <p className='px-3 whitespace-nowrap flex items-center justify-center h-8 rounded-[10px] bg-blue-600'>In stock</p>
                ) : (
                  <p className='px-2 whitespace-nowrap flex items-center justify-center h-8 rounded-[10px] bg-slate-600'>Out of stock</p>
                )}
              </div>
            </div>
            <div className='w-full justify-end flex items-center'>
              <button
                onClick={handleAddToCart}
                className={`whitespace-nowrap flex items-center justify-center px-3 md:px-3 rounded-[10px] h-11 gap-1 ${item.inStock ? 'bg-black text-white' : 'bg-gray-400 text-gray-700 cursor-not-allowed'}`}
                disabled={!item.inStock}
              >
                Add to Cart
                <IoBagAddOutline />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
