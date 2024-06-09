import React, { useState } from 'react';
import axiosInstance from "../axios/axiosInstance";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { imageToBase64 } from '../axios/imagetobase64';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    image: '',
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post(`/product/add`, formData);
      toast.success('Product added successfully', { autoClose: 200 });
      setFormData({
        name: '',
        category: '',
        price: '',
        description: '',
        image: '',
      });
    } catch (error) {
      if (error.response) {
        console.error('Server error:', error.response.data);
        toast.error('Server error. Please try again later.', { autoClose: 200 });
      } else if (error.request) {
        console.error('Network error:', error.request);
        toast.error('Network error. Please check your internet connection.', { autoClose: 200 });
      } else {
        console.error('Error:', error.message);
        toast.error('An unexpected error occurred.', { autoClose: 200 });
      }
    }
  };
  

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Add Product</h2>
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
        {/* <div>
          <label className="block text-sm font-medium text-gray-700">Image URL:</label>
          <input
            type="file"
            name="image"
            accept = "image/*"
            value={formData.image}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div> */}

            <div className='uploadImage'>
                {
                    formData?.image?<img src={formData?.image}/>:<span>upload</span>
                }
                <input type={"file"} accept = "image/*" id='image' name='image' onChange = {uploadImage}/>
            </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;