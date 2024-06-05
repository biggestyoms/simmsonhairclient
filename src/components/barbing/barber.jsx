import React, { useEffect } from 'react'
import profile from '../../images/evan.jpg'
import { FaInstagram } from "react-icons/fa6";
import AOS from "aos";
import "aos/dist/aos.css";


const Barber = () => {

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  return (
    <div className='text-white flex items-center justify-center flex-col w-full relative md:mt-32 mt-16  ' id='about'>
        <div className='md:text-[40px]  text-[30px] md:w-[50%] flex items-center justify-center' data-aos="fade-in"> 
        MASTER BARBER
        </div>

        <div className='md:w-[50%] w-80 flex items-center justify-center relative'>
            <div className='md:w-1/2 flex items-center justify-center relative' data-aos="fade-in">
            <img src={profile} alt="" />
            </div>

            <div className='md:w-1/2 absolute bottom-0 flex p-5 items-center justify-center flex-col '>
                <h1 className='border-b-4 border-orange-500  w-28 md:mb-3 text-center font-bold'  data-aos="fade-in"> EVAN SIMMS</h1>
                <h2 className=' md:mb-1 w-full font-bold'  data-aos="fade-in">MASTER BARBER</h2>
                <p className=' w-full  '  data-aos="fade-in"> Expert in classic haircuts, attentive to details and with results close to perfection.
                <a href="https://www.instagram.com/simms_on_hair?igsh=bHVmNXpsMWhzZjF4"  ><FaInstagram className='text-[20px] '  /></a>
                </p>
            </div>
        </div>
    </div>
  )
}

export default Barber