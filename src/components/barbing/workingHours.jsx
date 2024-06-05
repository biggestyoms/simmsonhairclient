import React, { useEffect }from "react";
import Tradingimg from "../../images/tradingimg.png";
import Location from '../../images/location.png'
import AOS from "aos";
import "aos/dist/aos.css";

const WorkingHours = () => {

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);


  return (
    <div className="w-full md:h-[65dvh] h-full md:mt-32 mt-16 hours-img flex md:flex-row flex-col items-center justify-center gap-[9%]  ">
      <div className="md:w-[30%] w-[80%] bg-black h-[40dvh] flex flex-col items-center justify-center text-white">
        <img src={Tradingimg} alt="" className="w-[30%]" data-aos="fade-up" />
        <h1 className="text-[30px] mt-3" data-aos="fade-up"  >Trading Hours</h1>
        <p className="w-full  flex items-center justify-center text-center font-bold" data-aos="fade-up" >
          Sunday & Monday | Closed <br /> Tuesday – Friday 9am – 6pm <br /> Saturday 9am – 5pm
        </p>
      </div>

      <div className="md:w-[30%] w-[80%] bg-black h-[40dvh] flex flex-col items-center justify-center text-white" data-aos="fade-up" >
        <img src={Location} alt="" className="w-[30%]" data-aos="fade-up"  />
        <h1 className="text-[30px] mt-3" data-aos="fade-up" >Location</h1>
        <p className="w-full  flex items-center justify-center text-center font-bold" data-aos="fade-up" >
        340 Henry St #16, Brantford, ON N3S 7V9
        </p>
      </div>
    </div>

    
  );
};

export default WorkingHours;
