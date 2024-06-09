import React from "react";
import Imagebarb1 from "../../images/img3.WEBP";
import Imagebarb2 from '../../images/img4.WEBP';
import Imagebarb3 from '../../images/img5.WEBP';

const Service = () => {
  return (
    <div className="w-full md:px-32 px-14 md:mt-20 mt-14">
      <div className="flex flex-wrap items-center md:flex-row flex-col-reverse w-full justify-between mb-14 md:mb-32">
        <div className="md:w-[40%] w-full">
          <p className="text-white w-full md:text-[36px] text-[30px] font-bold mb-5" data-aos="fade-in">
            Care products in the Shopping page
          </p>
          <div className="flex flex-col md:flex-row w-full h-full justify-between">
            <div className="bg-orange-600 md:w-[70px] w-[30%] mt-1 md:mt-3 mb-5 md:mb-0 h-[1px]"></div>
            <p className="text-white text-[20px] w-full" data-aos="fade-up">
              Discover premium care products for every hair type on our shopping page. Our selection caters to all your hair needs, from moisturizing to styling.
            </p>
          </div>
        </div>
        <div className="md:w-[45%] w-full mb-5 md:mb-0">
          <img src={Imagebarb3} alt="" className="w-full h-auto" data-aos="fade-in" />
        </div>
      </div>

      <div className="flex flex-wrap items-center md:flex-row flex-col w-full justify-between mb-10">
        <div className="md:w-[45%] w-full mb-5 md:mb-0">
          <img src={Imagebarb2} alt="" className="w-full h-auto" data-aos="fade-in" />
        </div>
        <div className="md:w-[40%] w-full">
          <p className="text-white w-full md:text-[36px] text-[30px] font-bold mb-5" data-aos="fade-in">
            Best Haircut and Customer Service
          </p>
          <div className="flex flex-col md:flex-row w-full h-full justify-between">
            <div className="bg-orange-600 md:w-[70px] w-[30%] mt-1 md:mt-3 mb-5 md:mb-0 h-[1px]"></div>
            <p className="text-white text-[20px] w-full" data-aos="fade-up">
              Experience top-tier haircuts and exceptional customer service. Our skilled stylists create styles that suit you perfectly. Enjoy a relaxing atmosphere and personalized care.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center md:flex-row flex-col-reverse w-full justify-between mb-14 md:mb-32">
        <div className="md:w-[40%] w-full">
          <p className="text-white w-full md:text-[36px] text-[30px] font-bold mb-5" data-aos="fade-in">
            Beard trimming and care services
          </p>
          <div className="flex flex-col md:flex-row w-full h-full justify-between">
            <div className="bg-orange-600 md:w-[70px] w-[30%] mt-1 md:mt-3 mb-5 md:mb-0 h-[1px]"></div>
            <p className="text-white text-[20px] w-full" data-aos="fade-up">
              Experience top-notch beard trimming and care services. Our skilled barbers ensure you look best. Enjoy precision grooming, tailored to your style. From classic trims to modern cuts, we have you covered. Step in for a relaxing session and leave with confidence.
            </p>
          </div>
        </div>
        <div className="md:w-[45%] w-full mb-5 md:mb-0">
          <img src={Imagebarb1} alt="" className="w-full h-auto" data-aos="fade-in" />
        </div>
      </div>
    </div>
  );
};

export default Service;