import React, { useState, useEffect } from 'react';
import Logo from "../../src/images/simms.jpg";
import { IoLogoTiktok } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa6";
import { FaFacebookF, FaLongArrowAltRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import AdvertPopup from '../components/AdvertPopup';

const Landing = () => {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='flex flex-col items-center justify-center'>
      <AdvertPopup
        show={showModal}
        handleClose={handleCloseModal}
        message="You can now place order for products on our shopping page on this website"
        messages="And check for our summer sales."
      />
      <Link to="/" className='w-full flex items-center justify-center md:border-b md:border-[#ffffff90] md:pb-4 md:pt-4 pb-6 pt-6'>
        <img src={Logo} alt="simms" className='h-16' />
      </Link>

      <div className='flex flex-col md:flex-row items-center md:border-l md:border-r md:border-[#ffffff90] md:w-[80%] w-full md:h-[77dvh] h-[60dvh]'>
        <Link to="/barbing" className='bg-[#ffffff50] md:w-[50%] w-full md:h-full h-[50%] flex items-center justify-center barbing-img'>
          <p className='text-white md:text-[50px] text-[45px] absolute'>Barbershop</p>
        </Link>
        <Link to="/shop" className='bg-[#ffffff20] md:w-[50%] w-full md:h-full h-[50%] flex items-center justify-center salon-img '>
          <p className='text-white md:text-[50px] text-[45px] absolute'>Shop</p>
        </Link>
      </div>

      <div className='md:border-t md:border-[#ffffff90] w-full flex items-center justify-between md:flex-row flex-col text-white md:h-[10dvh]'>
        <div className='md:w-1/4 w-full md:h-full md:border-l md:border-r flex items-center justify-center md:border-[#ffffff90] h-16'>
          <a href="tel:+15197740927">PHONE: 519-774-0927</a>
        </div>

        <a href="https://booksy.com/en-ca/7399_simms-on-hair_barbershop_713169_brantford" className='w-full'>
          <div className='w-full gap-1 h-16 flex items-center justify-center md:border-none border-b border-t border-[#ffffff90]'>
            <p>BOOK AN APPOINTMENT</p><FaLongArrowAltRight />
          </div>
        </a>

        <div className='h-16 gap-5 w-full md:h-full md:w-1/4 md:border-l md:border-r flex items-center justify-center md:border-[#ffffff90]'>
          <a href="https://www.tiktok.com/@simmsonhair?is_from_webapp=1&sender_device=pc"><IoLogoTiktok size={20} /></a>
          <a href="https://www.instagram.com/simms_on_hair?igsh=bHVmNXpsMWhzZjF4"><FaInstagram size={20} color='#bb2864' /></a>
          <a href="https://www.facebook.com/share/2KVTZiHxMemJH1Fg/?mibextid=LQQJ4d"><FaFacebookF size={20} color='#0765ff' /></a>
        </div>
      </div>
    </div>
  );
}

export default Landing;
