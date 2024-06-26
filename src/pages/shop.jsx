import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IoSearch, IoBag } from "react-icons/io5";
import { SpinningCircles } from 'react-loading-icons';
import Logo from "../images/simms.jpg";
import ItemModal from "../components/itemModal";
import Badge from "../components/Badge";
import baseUrl from "../../src/axios/baseUrl";
import { IoMdCart } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import { Spin as Hamburger } from 'hamburger-react';

const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

const Shop = () => {
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [itemData, setItemData] = useState(null);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Assuming initial total pages is 1
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuOpen = () => {
    setMenuOpen(!menuOpen);
  };

  const signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    navigate("/");
    toast("Signed Out", { autoClose: 200 });
  };

  const openItemModal = (item) => {
    setIsItemModalOpen(true);
    setItemData(item);
  };

  const closeItemModal = () => setIsItemModalOpen(false);

  const fetchFilteredProducts = async (category = "All", search = "", page = 1, limit = 8) => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseUrl}/product`, {
        params: {
          category,
          search,
          page,
          limit
        }
      });
      const { data, totalPages } = response?.data;

      if (data.length === 0) {
        setMessage("No products found");
        setProducts([]);
        setFilteredProducts([]);
      } else {
        setMessage("");
        setProducts(data);
        setFilteredProducts(data);
        setTotalPages(totalPages);
      }
    } catch (error) {
      console.error("Error fetching filtered products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFilteredProducts();
  }, []);

  const userLoginFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : undefined;

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
      // toast.error("Failed to fetch cart items.");
    }
  };

  useEffect(() => {
    fetchCart();
  }, [userLoginFromStorage]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setSearchActive(true);
    fetchFilteredProducts("All", query, currentPage);
  };

  const handleSearchIconClick = () => {
    setSearchActive((prev) => !prev);
    if (!searchActive) {
      setSearchQuery("");
      fetchFilteredProducts("All", "", currentPage);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchFilteredProducts("All", searchQuery, page);
  };

  return (
    <div className="bg-black w-full h-[100dvh] overflow-auto">

{searchActive && (
        <div className="flex justify-center items-center mt-4 absolute top-[10%] w-[100%]">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            className="p-2 rounded border text-white bg-[#ebde7948] outline-none border-[#ebdd79] w-1/2"
            placeholder="Search products..."
          />
        </div>
      )}

      {/* HEADER */}
      <ItemModal
        isOpen={isItemModalOpen}
        item={itemData}
        close={closeItemModal}
        fetchCart={fetchCart} 
      />
      <div
        className={`absolute w-full h-full bg-black flex md:hidden z-20 text-white items-center justify-center flex-col gap-5 ${
          menuOpen ? "" : "ml-[-1000px]"
        } transition-all duration-1000`}
      >
        <Link to="/orders">
          <button className="border-b border-[#ffffff90] text-[30px]">
            Orders
          </button>
        </Link>

        {userLoginFromStorage?.usertype === "admin" && (
        <Link to="/admin">
        <button className="border-b border-[#ffffff90] text-[30px]">
          Admin
        </button>
      </Link>
      )}

        {userLoginFromStorage === undefined ? (
          <Link to="/login">
            <button className="border-b border-[#ffffff90] text-[30px]">
              Sign In
            </button>
          </Link>
        ) : (
          <button
            onClick={signOut}
            className="border-b border-[#ffffff90] text-[30px]"
          >
            Sign Out
          </button>
        )}
      </div>

      <div className="flex items-center justify-between w-full pl-8 pr-8 md:h-[14dvh] h-[10dvh] border-b border-[#00000020]">
        <Link to="/" className="md:h-[9dvh] h-[8dvh] w-28">
          <img src={Logo} alt="simms" className="h-full md:w-full w-[120px]" />
        </Link>

        <div className="md:flex hidden items-center md:gap-10 gap-4 ">
          <div className="h-16 cursor-pointer flex items-center justify-center text-white">
          {
              searchActive ? <IoCloseOutline size={20} onClick={handleSearchIconClick}/> : <IoSearch size={20} onClick={handleSearchIconClick} />
            }
          </div>
          <Link
            to="/cart"
            className="relative h-16 cursor-pointer flex items-center justify-center text-white"
          >
            <IoBag size={20} />
            {cart?.length > 0 && <Badge count={cart?.length} />}
          </Link>

          <Link to="/orders">
            <button className="px-3 py-2 bg-[#ebdd79] text-black rounded-[50px]">
              Orders
            </button>
          </Link>

          {userLoginFromStorage?.usertype === "admin" && (
        <Link to="/admin" className="px-3 py-2 bg-[#ebdd79] text-black rounded-[50px]">
          admin
        </Link>
      )}

          {userLoginFromStorage === undefined ? (
            <Link to="/login">
              <button className="px-3 py-2 bg-[#ebdd79] text-black rounded-[50px]">
                Sign In
              </button>
            </Link>
          ) : (
            <button
              onClick={signOut}
              className="px-3 py-2 bg-[#ebdd79] text-black rounded-[50px]"
            >
              Sign Out
            </button>
          )}
        </div>

        <div className="md:hidden gap-6 flex items-center justify-end">
          <div className="h-16 cursor-pointer flex items-center justify-center text-white">
            {
              searchActive ? <IoCloseOutline size={20} onClick={handleSearchIconClick}/> : <IoSearch size={20} onClick={handleSearchIconClick} />
            }
            
          </div>
          <Link
            to="/cart"
            className="relative h-16 cursor-pointer flex items-center justify-center text-white"
          >
            <IoBag size={20} />
            {cart?.length > 0 && <Badge count={cart?.length} />}
          </Link>
          <div className="z-30" onClick={handleMenuOpen}>
            <Hamburger color="white" />
          </div>
        </div>
      </div>

      {/* PRODUCTS */}
      <div>
        {/* BUTTON */}
        <div className="flex items-center gap-5 overflow-x-auto scrollbar-none md:justify-between w-full md:p-10 p-5 text-white">
          <button
            onClick={() => fetchFilteredProducts("All", searchQuery)}
            className="shadow-md px-3 py-2 rounded-[10px] text-[12px] whitespace-nowrap border border-[#ebdd79] shop-hover"
          >
            All
          </button>
          <button
            onClick={() => fetchFilteredProducts("Hair Extention", searchQuery)}
            className="shadow-md px-3 py-2 rounded-[10px] text-[12px] whitespace-nowrap border border-[#ebdd79] shop-hover"
          >
            Hair Extention
          </button>
          <button
            onClick={() => fetchFilteredProducts("Locks Gel", searchQuery)}
            className="shadow-md px-3 py-2 rounded-[10px] text-[12px] whitespace-nowrap border border-[#ebdd79] shop-hover"
          >
            Locks Gel
          </button>
          <button
            onClick={() => fetchFilteredProducts("Hair accessories", searchQuery)}
            className="shadow-md px-3 py-2 rounded-[10px] text-[12px] whitespace-nowrap border border-[#ebdd79] shop-hover"
          >
            Hair Accessories
          </button>
          <button
            onClick={() => fetchFilteredProducts("Conditioner", searchQuery)}
            className="shadow-md px-3 py-2 rounded-[10px] text-[12px] whitespace-nowrap border border-[#ebdd79] shop-hover"
          >
            Conditioner
          </button>
          <button
            onClick={() => fetchFilteredProducts("Shampoo", searchQuery)}
            className="shadow-md px-3 py-2 rounded-[10px] text-[12px] whitespace-nowrap border border-[#ebdd79] shop-hover"
          >
            Shampoo
          </button>
          <button
            onClick={() => fetchFilteredProducts("Shoes", searchQuery)}
            className="shadow-md px-3 py-2 rounded-[10px] text-[12px] whitespace-nowrap border border-[#ebdd79] shop-hover"
          >
            Shoes
          </button>
          <button
            onClick={() => fetchFilteredProducts("Hair Oil", searchQuery)}
            className="shadow-md px-3 py-2 rounded-[10px] text-[12px] whitespace-nowrap border border-[#ebdd79] shop-hover"
          >
            Hair Oil
          </button>
          <button
            onClick={() => fetchFilteredProducts("Wigs", searchQuery)}
            className="shadow-md px-3 py-2 rounded-[10px] text-[12px] whitespace-nowrap border border-[#ebdd79] shop-hover"
          >
            Wigs
          </button>
          <button
            onClick={() => fetchFilteredProducts("Hair Wax", searchQuery)}
            className="shadow-md px-3 py-2 rounded-[10px] text-[12px] whitespace-nowrap border border-[#ebdd79] shop-hover"
          >
            Hair Wax
          </button>
        </div>
        {/* PRODUCTS DISPLAY */}
        <div className="grid md:h-[72dvh] pb-10 h-[79dvh] overflow-auto grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-6 gap-4 px-4 sm:px-8 md:px-20">
          {loading && (
            <div className="absolute md:left-[46%] left-[36%] top-[50%]">
              <p className="text-white">
                <SpinningCircles />
              </p>
            </div>
          )}
          {message && (
            <p className="text-white absolute top-[50%] md:left-[46%] left-[34%]">
              {message}
            </p>
          )}
          {!loading &&
            filteredProducts.map((product) => (
              <div
                key={product?.id}
                onClick={() => openItemModal(product)}
                className="bg-white p-6 rounded-lg md:h-[42dvh] h-[32dvh] custom-shadow cursor-pointer border border-[#ebdd79] shop-hover"
              >
                <div className="mb-3 md:h-[25vh] h-[12vh] flex items-center justify-center">
                  <img
                    src={product?.image}
                    alt={product?.name}
                    className="rounded-t-lg md:h-full h-[90%] object-cover"
                  />
                </div>
                <h2 className="md:text-lg text-black text-[15px] md:h-[15%] h-[32%] font-semibold md:mb-2 mb-1">
                  {product?.name}
                </h2>
                <p className="md:text-xl text-black text-[13px] font-bold">
                  {formatCurrency(product?.price)}
                </p>
              </div>
            ))}
        </div>
        {/* PAGINATION */}
        {/* {totalPages > 1 && ( */}
          <div className="flex absolute bottom-1 left-[50%] right-[50%] justify-center mt-5">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 mr-2 bg-[#ebdd79] text-black rounded-[50px]"
            >
              Prev.
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 ml-2 bg-[#ebdd79] text-black rounded-[50px]"
            >
              Next
            </button>
          </div>
        {/* )} */}
      </div>
    </div>
  );
};

export default Shop;
