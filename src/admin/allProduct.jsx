import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import baseURL from '../../src/axios/baseUrl';
import axiosInstance from '../axios/axiosInstance';

const AllProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${baseURL}/product/all`);
        setProducts(response.data.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    try {
      await axiosInstance.delete(`/product/delete/${productId}`);
      // Optionally, you can update the product list after deletion
      const updatedProducts = products.filter(product => product?._id !== productId);
      setProducts(updatedProducts);
      alert('Product deleted successfully');
    } catch (error) {
      console.log('Error deleting product:', error);
      alert('Failed to delete product');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-white">Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product?._id} className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-white">{product?.name}</h3>
            <p className="text-lg text-yellow-400">Price: ${product?.price}</p>
            <p>inStock: {product?.instock}</p>
            <p className="text-sm text-gray-300">{product?.description}</p>
            <div className="flex justify-between mt-4">
              <Link to={`/product/edit/${product?._id}`} className="text-blue-500 hover:underline">Edit</Link>
              <button
                onClick={() => handleDelete(product?._id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProduct;