import React, { useState, useEffect } from "react";
import { IoLogoTiktok } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa6";
import { FaFacebookF, FaLongArrowAltRight } from "react-icons/fa";
import Logo from "../../images/logo.webp";
import { Twirl as Hamburger } from "hamburger-react";
import Logo2 from "../../images/simms.jpg";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleMenuOpen = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  return (
    <>
      <div
        className={`absolute w-full h-full bg-black flex md:hidden z-20 text-white items-center justify-center flex-col gap-5 ${
          menuOpen ? "" : "ml-[-1000px]"
        } transition-all duration-1000`}
      >
        <a href="#services" className="border-b border-[#ffffff90] text-[27px]">
          SERVICES
        </a>
        <Link to="/shop" className="border-b border-[#ffffff90] text-[27px]">
          SHOP
        </Link>
        <a href="#about" className="border-b border-[#ffffff90] text-[27px]">
          ABOUT
        </a>
        <a href="#contact" className="border-b border-[#ffffff90] text-[27px]">
          CONTACT
        </a>
      </div>

      <div className="w-full md:h-screen h-[100dvh] flex items-center justify-center relative home-img flex-col">
        <div className="flex items-center  justify-between md:hidden w-full absolute top-0 p-6">
          <Link to="/shop">
            <h1 className="text-white text-[22px]" data-aos="fade-in">
              SHOP
            </h1>
          </Link>

          <Link to="/">
            <div className="flex items-center justify-center">
              <img
                src={Logo2}
                alt="Logo"
                className="h-12"
                data-aos="fade-in"
              />
            </div>
          </Link>

          <div
            className="z-30 flex items-center justify-end"
            data-aos="fade-in"
            onClick={handleMenuOpen}
          >
            <Hamburger color="white" />
          </div>
        </div>

        <div className="absolute md:flex hidden items-center justify-between w-full border-b border-[#ffffff90] h-[15vh] top-0 pl-[10%]">
          <div className="flex items-center justify-center h-full border-r border-[#ffffff90] w-[25%]">
            <a
              href="tel:+15197740927"
              className="text-white"
              data-aos="fade-in"
            >
              PHONE: 519-774-0927
            </a>
          </div>

          <div
            className="flex items-center justify-center text-white h-full w-[80%] z-20"
            data-aos="fade-in" 
          >
            <a
              href="#services"
              className="flex items-center gap-5 justify-center w-[20%] border-l border-[#ffffff90] h-full"
              data-aos="fade-in"
            >
              SERVICES
            </a>
            <Link
              to="/shop"
              className="flex items-center gap-5 justify-center w-[20%] border-l border-[#ffffff90] h-full cursor-pointer"
              data-aos="fade-in"
            >
              SHOP
            </Link>
            <a
              href="#about"
              className="flex items-center gap-5 justify-center w-[23%] border-l border-[#ffffff90] h-full"
              data-aos="fade-in"
            >
              ABOUT
            </a>
            <a
              href="#contact"
              className="flex items-center gap-5 justify-center w-[20%] border-l border-[#ffffff90] h-full"
              data-aos="fade-in"
            >
              CONTACT
            </a>
            <div
              className="flex items-center gap-5 justify-center w-[20%] h-full border-l border-[#ffffff90]"
              data-aos="fade-in"
            >
              <a href="https://www.tiktok.com/@simmsonhair?is_from_webapp=1&sender_device=pc">
                <IoLogoTiktok size={20} />
              </a>
              <a
                href="https://www.instagram.com/simms_on_hair?igsh=bHVmNXpsMWhzZjF4"
                data-aos="fade-in"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="https://www.facebook.com/share/2KVTZiHxMemJH1Fg/?mibextid=LQQJ4d"
                data-aos="fade-in"
              >
                <FaFacebookF size={20} />
              </a>
            </div>
          </div>
        </div>

        <div
          className="absolute w-[10vw] border-r border-[#ffffff90] h-full left-0 md:flex hidden items-center justify-center"
        >
           <Link to="/"
            className="rounded-full bg-black flex items-center justify-center w-[120px] h-[120px] z-20"
            data-aos="fade-right" 
          >
            <img src={Logo} alt="Logo" className="h-24 " />
          </Link>
        </div>
       
       
      
   
        <div className="flex flex-col items-center justify-center text-[#fff] z-10 gap-2 w-full md:h-full  ">
          <p
            data-aos="fade-right"
            className="md:text-[100px] text-[50px] text-[#fff]  "
          >
            SimmsOnHair
          </p>
          <p  data-aos="fade-right">UNISEX HAIR DESIGN & BEAUTY SUPPLIES</p>
          <p data-aos="fade-right" className="md:text-[37px] text-[34px]">
            ESTD. 2011
          </p>
         
          <a href="https://booksy.com/en-ca/7399_simms-on-hair_barbershop_713169_brantford?hl=en-CA&gei=rXFWZoVF862m1A-D_Z_IAw&rwg_token=AJKvS9UxsU1eRN-LEnJnlwe45GhYDXInq5LWSxgefxxSpWx2XU0gfwL6TvtlMDkrVy6kD87ym_wB5VzI5_-DROxFN2KVFaF1fg%3D%3D#ba_s=seo">
            <div className="flex items-center justify-center gap-5 cursor-pointer arrow-icon">
              <p
                data-aos="fade-right"
                className="md:text-[30px] text-[30px] font-light border-b border-[#ffffff90] w-[100%]"
              >
                Online appointment{" "}
              </p>
              <FaLongArrowAltRight className="mt-1" />
            </div>
          </a>
        </div>
      </div>
    </>
  );
};

export default Home;