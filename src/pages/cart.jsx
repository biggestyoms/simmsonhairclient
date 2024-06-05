import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../images/simms.jpg";
import { FaLongArrowAltRight, FaTimes } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import CartTwo from "../images/gold.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import baseURL from "../axios/baseUrl";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

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
  }, []);

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const price = item.product.price ? parseFloat(item.product.price) : 0;
      return total + price * item.quantity;
    }, 0);
  };

  const signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    navigate("/");
    toast("Signed Out");
  };

  const incrementQuantity = async (id) => {
    const updatedCart = cart.map((item) => {
      if (item.product._id === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCart(updatedCart);

    try {
      const userLoginFromStorage = localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : undefined;
      if (userLoginFromStorage) {
        const config = {
          headers: {
            Authorization: `Bearer ${userLoginFromStorage.token}`,
          },
        };
        await axios.put(`${baseURL}/cart/increment`, { productId: id }, config);
      }
    } catch (error) {
      console.error("Error incrementing quantity:", error);
      toast.error("Failed to increment quantity.");
    }
  };

  const decrementQuantity = async (id) => {
    const updatedCart = cart.map((item) => {
      if (item.product._id === id) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    }).filter(item => item.quantity > 0);
    setCart(updatedCart);

    try {
      const userLoginFromStorage = localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : undefined;
      if (userLoginFromStorage) {
        const config = {
          headers: {
            Authorization: `Bearer ${userLoginFromStorage.token}`,
          },
        };
        await axios.put(`${baseURL}/cart/decrement`, { productId: id }, config);
      }
    } catch (error) {
      console.error("Error decrementing quantity:", error);
      toast.error("Failed to decrement quantity.");
    }
  };

  const removeItem = async (id) => {
  const updatedCart = cart.filter((item) => item.product._id !== id);
  setCart(updatedCart);

  try {
    if (userLoginFromStorage) {
      const config = {
        headers: {
          Authorization: `Bearer ${userLoginFromStorage.token}`,
        },
      };
      await axios.delete(`${baseURL}/cart/delete`, {
        headers: config.headers,
        data: { productId: id },
        
      });
      toast.success("Product removed from cart.");
    }
  } catch (error) {
    console.error("Error removing item:", error);
    toast.error("Failed to remove item.");
  }
};

//   return (
//     <div className="w-full h-full flex flex-col items-center justify-center gap-6 font-[inter]">
//       {/* Navbar Container */}
//       <div className="w-full h-[30%] flex flex-col items-center justify-center pl-5 pr-5 gap-8">
//         <div className="md:w-[80%] w-full h-20 flex items-center justify-between">
//           <div className="h-full md:w-[20%] w-[27%] flex items-center justify-center">
//             <img src={Logo} alt="Logo" className="h-14" />
//           </div>
//           <a href="https://booksy.com/en-ca/7399_simms-on-hair_barbershop_713169_brantford?hl=en-CA&gei=rXFWZoVF862m1A-D_Z_IAw&rwg_token=AJKvS9UxsU1eRN-LEnJnlwe45GhYDXInq5LWSxgefxxSpWx2XU0gfwL6TvtlMDkrVy6kD87ym_wB5VzI5_-DROxFN2KVFaF1fg%3D%3D#ba_s=seo">
//             <div className="hidden md:flex items-center justify-center gap-5 cursor-pointer arrow-icon">
//               <p className="text-white md:text-[15px] text-[30px] font-light border-b border-[#ffffff90] w-[100%]">
//                 Online appointment
//               </p>
//               <FaLongArrowAltRight className="mt-1" color="#ebdd79" />
//             </div>
//           </a>
//           <div className="flex items-center justify-center gap-5">
//             <IoMdCart className="text-[20px]" color="#ebdd79" />
//             <CiSearch className="text-[20px] font-bold" color="#ebdd79" />
//             {
//               userLoginFromStorage === undefined
//                 ? <Link to="/login"><button className="px-3 bg-[#ebdd79] text-black rounded-[50px]">Sign In</button></Link>
//                 : <button onClick={signOut} className="px-3 bg-[#ebdd79] text-black rounded-[50px]">Sign Out</button>
//             }
//           </div>
//         </div>
//         <div className="w-full items-center flex justify-center h-[30%] gap-2 mt-5 relative">
//           <div className="flex flex-col items-center justify-center z-10 absolute">
//             <p className="text-white text-[35px]">My Cart</p>
//             <p className="text-white">Shop.Cart</p>
//           </div>
//           <div>
//             <img src={CartTwo} alt="Cart" className="w-20 h-20" />
//           </div>
//         </div>
//       </div>

//       {/* Subtotal */}
//       <div className="flex flex-col items-center justify-center md:w-[50%] w-[80%] mt-10">
//         <div className="bg-[#2b2b2b] h-[5dvh] w-full flex items-center justify-between pl-5 pr-5 mb-4 rounded-lg text-white">
//           <p>Products</p>
//           <p>Price</p>
//           <p>Quantity</p>
//           <p>Subtotal</p>
//         </div>

//         {cart.map((item) => {
//           const price = item.product.price ? parseFloat(item.product.price) : 0;
//           return (
//             <div key={item.product._id} className="flex justify-between items-center w-full px-5 mb-4 text-white border border-[#ebdd79]">
//               <div className="flex items-center gap-3">
//                   <button onClick={() => removeItem(item.product._id)}>
//                   <FaTimes color="#ebdd79" size={20} />
//                 </button>
//                 <img src={item.product.image} alt={item.product.name} className="h-16 w-16 object-cover" />
//               </div>
//               <p>${price.toFixed(2)}</p>
//               <div className="flex items-center space-x-2">
//                 <button
//                   onClick={() => decrementQuantity(item.product._id)}
//                   className="px-2  bg-gray-700 rounded hover:bg-[#ebdd79] text-white"
//                 >
//                   -
//                 </button>
//                 <span>{item.quantity}</span>
//                 <button
//                   onClick={() => incrementQuantity(item.product._id)}
//                   className="px-2  bg-gray-700 rounded hover:bg-[#ebdd79] text-white"
//                 >
//                   +
//                 </button>
//               </div>
//               <p>${(price * item.quantity).toFixed(2)}</p>
//             </div>
//           );
//         })}

//         <div className="w-full flex items-center justify-between pr-5 text-white">
//           <p className="text-xl font-bold">Subtotal:</p>
//           <p className="text-xl font-bold">Total: ${getTotalPrice().toFixed(2)}</p>
//         </div>
//       </div>

//       <div className="flex items-center justify-center w-full h-20">
//         <Link to="/checkout" className="p-3 bg-[#ebdd79] rounded-lg">
//           Proceed To Checkout
//         </Link>
//       </div>
//     </div>
//   );
return (
  <div className="w-full h-full flex flex-col items-center gap-6 font-[inter] bg-black p-6">
    {/* Navbar Container */}
    <div className="w-full flex flex-col items-center pl-5 pr-5 gap-8">
      <div className="md:w-[80%] w-full flex items-center justify-between py-4">
        <div className="md:w-[20%] w-[27%] flex items-center justify-center">
          <img src={Logo} alt="Logo" className="h-14" />
        </div>
        <a href="https://booksy.com/en-ca/7399_simms-on-hair_barbershop_713169_brantford?hl=en-CA&gei=rXFWZoVF862m1A-D_Z_IAw&rwg_token=AJKvS9UxsU1eRN-LEnJnlwe45GhYDXInq5LWSxgefxxSpWx2XU0gfwL6TvtlMDkrVy6kD87ym_wB5VzI5_-DROxFN2KVFaF1fg%3D%3D#ba_s=seo" className="hidden md:flex items-center gap-5 cursor-pointer arrow-icon">
          <p className="text-white text-[15px] border-b border-[#ffffff90] w-full">Online appointment</p>
          <FaLongArrowAltRight className="mt-1" color="#ebdd79" />
        </a>
        <div className="flex items-center gap-5">
          <IoMdCart className="text-[20px]" color="#ebdd79" />
          <CiSearch className="text-[20px] font-bold" color="#ebdd79" />
          {
            userLoginFromStorage === undefined
              ? <Link to="/login"><button className="px-3 bg-[#ebdd79] text-black rounded-[50px]">Sign In</button></Link>
              : <button onClick={signOut} className="px-3 bg-[#ebdd79] text-black rounded-[50px]">Sign Out</button>
          }
        </div>
      </div>
      <div className="w-full flex flex-col items-center justify-center gap-2 mt-5 relative">
        <div className="flex flex-col items-center z-10 absolute">
          <p className="text-white text-[35px]">My Cart</p>
          <p className="text-white">Shop.Cart</p>
        </div>
        <div>
          <img src={CartTwo} alt="Cart" className="w-20 h-20" />
        </div>
      </div>
    </div>

    {/* Subtotal */}
    <div className="flex flex-col items-center w-full md:w-[60%] mt-10 bg-black p-6 rounded-lg shadow-md">
      <div className="bg-[#2b2b2b] h-12 w-full flex items-center justify-between px-5 mb-4 rounded-lg text-white">
        <p>Products</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Subtotal</p>
      </div>

      {cart.map((item) => {
        const price = item.product.price ? parseFloat(item.product.price) : 0;
        return (
          <div key={item.product._id} className="flex justify-between items-center w-full px-5 py-2 mb-4 text-white bg-black border border-gray-300 rounded-lg">
            <div className="flex items-center gap-3">
              <button onClick={() => removeItem(item.product._id)}>
                <FaTimes color="#ebdd79" size={20} />
              </button>
              <img src={item.product.image} alt={item.product.name} className="h-16 w-16 object-cover" />
            </div>
            <p>${price.toFixed(2)}</p>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => decrementQuantity(item.product._id)}
                className="px-2 bg-gray-700 text-white rounded hover:bg-[#ebdd79] transition duration-200"
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => incrementQuantity(item.product._id)}
                className="px-2 bg-gray-700 text-white rounded hover:bg-[#ebdd79] transition duration-200"
              >
                +
              </button>
            </div>
            <p>${(price * item.quantity).toFixed(2)}</p>
          </div>
        );
      })}

      <div className="w-full flex items-center justify-between px-5 text-white font-bold">
        <p className="text-xl">Subtotal:</p>
        <p className="text-xl">Total: ${getTotalPrice().toFixed(2)}</p>
      </div>
    </div>

    <div className="flex items-center justify-center w-full mt-10">
      <Link to="/checkout" className="p-3 bg-[#ebdd79] text-black rounded-lg hover:bg-[#d4c95d] transition duration-200">
        Proceed To Checkout
      </Link>
    </div>
  </div>
);
};

export default Cart;