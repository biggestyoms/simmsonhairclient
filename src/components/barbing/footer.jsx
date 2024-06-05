import React from "react";
import Logo from "../../images/simms.jpg";
import Phone from "../../images/phone.png";
import Mail from "../../images/email.png";
import Location from "../../images/location.png";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className=" w-full h-full flex items-center justify-center text-white" id="contact">
      <div className="w-[80%] h-full flex flex-col justify-between items-center">
        <div className=" w-full h-full  text-white flex flex-col items-center justify-center z-20 ">
          <img src={Logo} alt="" className="md:w-[15%] w-[30%]" />
          <div className="flex  items-center justify-between md:gap-20 md:text-[18px] mt-5 font-extralight md:w-[full] text-[15px] gap-5   ">
            <a href="#services"  data-aos="fade-right">SERVICE</a>
           <Link to="/shop "  data-aos="fade-right">
           SHOP
           </Link>
            <a href="#about"  data-aos="fade-right">ABOUT</a>
            <a href="#contact"  data-aos="fade-right">CONTACT</a>
          </div>
        </div>

        <div className=" w-full h-full flex items-center justify-between mt-1 flex-col md:flex-row md:gap-6 gap-1 ">
          <div className="w-full h-full md:border-r-2 border-0 lg:border-b-0 border-[#ffffff] flex items-center flex-col gap-7 justify-center">
            <img src={Phone} alt="" />
            <a href="tel:+15197740927" className="text-white mb-4"  data-aos="fade-right">
              PHONE: 519-774-0927
            </a>
          </div>

          <div className="w-full h-full flex flex-col items-center justify-center gap-7">
            <img src={Mail} alt="" />
            <a href="mailto:SIMMSONHAIR@GMAIL.COM" className="text-white"  data-aos="fade-right">
              SIMMSONHAIR@GMAIL.COM
            </a>
          </div>

          <div className="w-full h-full md:border-l-2 border-[#ffffff] border-0 flex items-center flex-col gap-7 justify-center lg:border-t-0 ">
            <img src={Location} alt="" className="md:w-[11%] w-[15%] mt-4" />
            <a
              href="https://www.google.com/maps/search/?api=1&query=16-340+Henry+St,+N3S+7V9,+Brantford"
              className="text-white"
              target="_blank"
              rel="noopener noreferrer"
              data-aos="fade-right"
            >
              340 Henry St, N3S 7V9, Brantford
            </a>
          </div>
        </div>

        <div
          className=" w-full h-full flex items-center justify-center mt-10"
          data-aos="fade-up"
        >
          ©2024 Simmsonhair. All Rights Reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;
