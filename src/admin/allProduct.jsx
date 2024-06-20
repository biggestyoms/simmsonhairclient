import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import baseURL from '../../src/axios/baseUrl';
import axiosInstance from '../axios/axiosInstance';

const AllProduct = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10; // Number of products per page

  const fetchProducts = async (page = 1) => {
    try {
      const response = await axios.get(`${baseURL}/product/all`, {
        params: { page, limit }
      });
      setProducts(response.data.data);
      setCurrentPage(page);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

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

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      fetchProducts(newPage);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-white">Products</h2>
      <div className="grid h-[85dvh] overflow-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-20 py-1 mr-2 bg-[#ebdd79] text-black rounded-[50px]"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-1 mr-2 bg-[#ebdd79] text-black rounded-[50px] ${
              currentPage === index + 1 && 'bg-yellow-500'
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-20 py-1 ml-2 bg-[#ebdd79] text-black rounded-[50px]"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllProduct;
