import React, { useState, useContext, useEffect } from "react";
import ItemModal from "../components/itemModal";
import Badge from "../components/Badge";

import Logo from "../images/simms.jpg";

import { IoSearch } from "react-icons/io5";
import { IoBag } from "react-icons/io5";
import Cantu from "../images/cantutwo.png";
import { Link } from "react-router-dom";
import { CartContext } from "../cartContext";
import axios from "axios";
import baseUrl from "../../src/axios/baseUrl";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

const Shop = () => {
  // Call modal
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [itemData, setItemData] = useState(null);
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const [cart, setCart] = useState([]);

  const openItemModal = (item) => {
    setIsItemModalOpen(true);
    setItemData(item);
  };

  const closeItemModal = () => setIsItemModalOpen(false);

  const fetchFilteredProducts = async (category = "All") => {
    setLoading(true); // Set loading to true before fetching
    try {
      const response = await axios.get(
        `${baseUrl}/product?category=${category}`
      );
      const { data } = response?.data;

      if (data.length === 0) {
        setMessage("No products found");
        setProducts([]);
      } else {
        setMessage("");
        setProducts(data);
      }
    } catch (error) {
      console.error("Error fetching filtered products:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    fetchFilteredProducts();
  }, []);

  const userLoginFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
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
          const { data } = await axios.get(`${baseUrl}/cart`, config);
          setCart(data);
        }
      } catch (error) {
        console.error("Error fetching the cart:", error);
        toast.error("Failed to fetch cart items.");
      }
    };

    // Fetch cart data immediately
    fetchCart();

    // Set up interval to fetch cart data every second
    const interval = setInterval(fetchCart, 1000);

    // Clear interval when component unmounts
    return () => clearInterval(interval);
  }, [userLoginFromStorage, baseUrl]);

  console.log(cart.length)



  

  return (
    <div className="bg-black w-full h-[100dvh] overflow-auto">
      {/* HEADER */}

      <ItemModal
        isOpen={isItemModalOpen}
        item={itemData}
        close={closeItemModal}
      />

      <div className="flex items-center justify-between w-full pl-10 pr-10 h-[15dvh] border-b border-[#00000020] ">
        <div className="w-16 h-16 cursor-pointer flex items-center justify-center text-white">
          <IoSearch size={20} />
        </div>
        {userLoginFromStorage?.usertype === "admin" && (
          <Link to="/admin" className="px-4 bg-gray-500 text-white">
            admindashboard
          </Link>
        )}

        <Link to="/" className="h-[9dvh]">
          <img src={Logo} alt="" className="h-full md:w-full w-[120px] " />
        </Link>

        <Link
          to="/cart"
          className=" relative w-16 h-16 cursor-pointer flex items-center justify-center text-white "
        >
          <IoBag size={20} />
          {cart?.length > 0 && (
            <Badge count={cart?.length} />
          )}
        </Link>
      </div>

      {/* PRODUCTS */}

      <div>
        {/* BUTTON */}
        <div>
          <div className=" flex items-center gap-5 overflow-auto md:justify-between w-full md:p-10 p-5  text-white   ">
            <button
              onClick={() => fetchFilteredProducts("All")}
              className="shadow-md p-3 rounded-[10px] whitespace-nowrap border border-[#ebdd79] shop-hover"
            >
              All
            </button>
            <button
              onClick={() => fetchFilteredProducts("Hair Attachment")}
              className="shadow-md p-3 rounded-[10px] whitespace-nowrap border border-[#ebdd79] shop-hover"
            >
              Hair Attachment
            </button>
            <button
              onClick={() => fetchFilteredProducts("Locks Gel")}
              className="shadow-md p-3 rounded-[10px] whitespace-nowrap border border-[#ebdd79] shop-hover"
            >
              Locks Gel
            </button>
            <button
              onClick={() => fetchFilteredProducts("Durag")}
              className="shadow-md p-3 rounded-[10px] whitespace-nowrap border border-[#ebdd79] shop-hover"
            >
              Durag
            </button>
            <button
              onClick={() => fetchFilteredProducts("Conditioner")}
              className="shadow-md p-3 rounded-[10px] whitespace-nowrap border border-[#ebdd79] shop-hover"
            >
              Conditioner
            </button>
            <button
              onClick={() => fetchFilteredProducts("Shampoo")}
              className="shadow-md p-3 rounded-[10px] whitespace-nowrap border border-[#ebdd79] shop-hover"
            >
              Shampoo
            </button>
            <button
              onClick={() => fetchFilteredProducts("Shoes")}
              className="shadow-md p-3 rounded-[10px] whitespace-nowrap border border-[#ebdd79] shop-hover"
            >
              Shoes
            </button>
            <button
              onClick={() => fetchFilteredProducts("Combs")}
              className="shadow-md p-3 rounded-[10px] whitespace-nowrap border border-[#ebdd79] shop-hover"
            >
              Combs
            </button>
            <button
              onClick={() => fetchFilteredProducts("Wigs")}
              className="shadow-md p-3 rounded-[10px] whitespace-nowrap border border-[#ebdd79] shop-hover"
            >
              Wigs
            </button>
            <button
              onClick={() => fetchFilteredProducts("Gel")}
              className="shadow-md p-3 rounded-[10px] whitespace-nowrap border border-[#ebdd79] shop-hover"
            >
              Gel
            </button>
          </div>
        </div>
        {/* PRODUCTS DISPLAY */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 sm:px-8 md:px-20 ">
          {loading && (
            <div className=" absolute left-[50%] top-[50%] ">
              <p className="text-white">Loading....</p>
            </div>
          )}
          {message && (
            <p className="text-white absolute top-[50%] left-[50%]">
              {message}
            </p>
          )}
          {!loading &&
            products.map((product) => (
              <div
                key={product?.id}
                onClick={() => openItemModal(product)}
                className=" p-6 rounded-lg custom-shadow cursor-pointer border border-[#ebdd79] shop-hover "
              >
                <div className="mb-3 md:h-[25vh] h-[12vh] flex items-center justify-center">
                  <img
                    src={Cantu}
                    alt={product?.name}
                    className="rounded-t-lg md:h-full  h-[90%] object-cover"
                  />
                </div>
                <h2 className="md:text-lg text-white text-[15px] font-semibold md:mb-2 mb-1">
                  {product?.name}
                </h2>
                <p className="md:text-xl text-white text-[13px] font-bold">
                  {formatCurrency(product?.price)}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
