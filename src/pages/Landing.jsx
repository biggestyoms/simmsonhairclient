import React from 'react'
import Logo from "../../src/images/logo.webp"
import { IoLogoTiktok } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from 'react-router-dom';




const Landing = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
        <Link to="/" className='w-full  flex items-center justify-center md:border-b md:border-[#ffffff90] md:pb-2 md:pt-2 pb-3 pt-3'>
            <img src={Logo} alt="simms" className='h-20 ' />
        </Link>

        <div className=' flex flex-col md:flex-row items-center md:border-l md:border-r md:border-[#ffffff90] md:w-[80%] w-full md:h-[77dvh] h-[60dvh]'>
           <Link to="/barbing" className='bg-[#ffffff50] md:w-[50%] w-full md:h-full h-[50%] flex items-center justify-center barbing-img'>
                <p className='text-white md:text-[50px] text-[40px] absolute'>Barbershop</p>
           </Link>
            <Link to="/braiding" className='bg-[#ffffff20] md:w-[50%] w-full md:h-full h-[50%] flex items-center justify-center salon-img '>
                <p className='text-white md:text-[50px] text-[40px] absolute'>Hairsalon</p>
            </Link>
        </div>

        <div className='md:border-t  md:border-[#ffffff90] w-full flex items-center justify-between  md:flex-row flex-col text-white md:h-[10dvh] ' >
            <div className='md:w-1/4 w-full md:h-full md:border-l md:border-r flex items-center justify-center  md:border-[#ffffff90] h-16'>
                <a href="tel:+15197740927">PHONE: 519-774-0927</a>
            </div>

            <a href="https://booksy.com/en-ca/7399_simms-on-hair_barbershop_713169_brantford" className='w-full'>
            <div className=' w-full  gap-1 h-16 flex items-center justify-center md:border-none border-b border-t border-[#ffffff90]'>
                <p>BOOK AN APPOINTMENT </p><FaLongArrowAltRight />
            </div>
            </a>

            <div className='h-16 gap-5 w-full md:h-full md:w-1/4 md:border-l md:border-r flex items-center justify-center md:border-[#ffffff90]'>
            <a href="https://www.tiktok.com/@simmsonhair?is_from_webapp=1&sender_device=pc"><IoLogoTiktok size={20} /></a>
           <a href="https://www.instagram.com/simms_on_hair?igsh=bHVmNXpsMWhzZjF4"> <FaInstagram size={20}/></a>
            <a href="https://www.facebook.com/share/2KVTZiHxMemJH1Fg/?mibextid=LQQJ4d"><FaFacebookF size={20} /></a>
            </div>
        </div>
    </div>
  )
}

export default Landing