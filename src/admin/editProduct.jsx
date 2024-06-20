import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import baseUrl from '../../src/axios/baseUrl';
import axiosInstance from '../axios/axiosInstance';
import { imageToBase64 } from '../axios/imagetobase64';


const EditProductForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    image: '',
    inStock: false, // Initialize with a default value
  });

  const { productId } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(`/product/${productId}`);
        const productData = response?.data?.data; // Assuming the product data is in response.data.data
        setFormData(productData);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const uploadImage = async(e) =>{
    const data = await imageToBase64(e.target.files[0])
    // console.log(data)
    setFormData((preve)=>{
        return{
            ...preve,
            image : data
        }
    })
  }

  const handleInStockChange = (value) => {
    setFormData({
      ...formData,
      inStock: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/product/edit/${productId}`, formData);
      toast.success('Product updated successfully', { autoClose: 200 });
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Failed to update product', { autoClose: 200 });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Category:</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Detailed Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        <div className='uploadImage'>
                {
                    formData?.image?<img src={formData?.image}/>:<span>upload</span>
                }
                <input type={"file"} accept = "image/*" id='image' name='image' onChange = {uploadImage}/>
            </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">In Stock:</label>
          <input
            type="text"
            name="inStock"
            value={formData.inStock ? 'Yes' : 'No'}
            readOnly
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        <div className='w-full flex items-center justify-between'>
            <button type='button' onClick={() => handleInStockChange(true)} className='px-3 bg-blue-500 rounded-md text-white'>In Stock</button>
            <button type='button' onClick={() => handleInStockChange(false)} className='px-3 bg-gray-500 rounded-md text-white'>Out of Stock</button>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProductForm;