import React from "react";
import Imagebarb1 from "../../images/img3.WEBP";
import Imagebarb2 from '../../images/img4.WEBP';
import Imagebarb3 from '../../images/img5.WEBP';

const Service = () => {
  return (
    <div className="w-full md:pr-32 md:pl-32 pl-14 pr-14 md:mt-20 mt-14  " >
      <div className="flex items-center md:flex-row flex-col w-full justify-between mb-14 md:mb-32   ">
        <div className="md:w-[45%] mb-5 md:mb-0 md:h-[50dvh] w-full ">
          <img src={Imagebarb1} alt="" className="w-full md:h-full h-[30dvh]" data-aos="fade-up" />
        </div>

        <div className="md:w-[40%] md:h-[50dvh] w-full">
          <p className="text-white md:text-[56px] text-[41px] font-800 mb-5" data-aos="fade-up">
            Beard trimming and care services
          </p>
          <div className=" flex flex-col md:flex-row w-full h-full justify-between ">
            <div className="bg-orange-600 md:w-[70px] w-[30%] mt-1 md:mt-3 mb-5 md:mb-0  h-[1px] b  "></div>
            <p className="text-white text-[20px] w-[80%]" data-aos="fade-up">
              Experience top-notch beard trimming and care services. Our skilled
              barbers ensure you look best. Enjoy precision grooming, tailored
              to your style. From classic trims to modern cuts, we have you
              covered. Step in for a relaxing session and leave with confidence.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center md:flex-row flex-col-reverse w-full justify-between mb-14 md:mb-32   ">
        <div className="md:w-[40%] md:h-[50dvh] w-full">
          <p className="text-white md:text-[56px] text-[41px] font-800 mb-5" data-aos="fade-up">
          Care products in the Shopping page
          </p>
          <div className=" flex flex-col md:flex-row w-full h-full justify-between ">
            <div className="bg-orange-600 md:w-[70px] w-[30%] mt-1 md:mt-3 mb-5 md:mb-0  h-[1px] b  "></div>
            <p className="text-white text-[20px] w-[80%]" data-aos="fade-up" >
            Discover premium care products for every hair type on our shopping page. Our selection caters to all your hair needs, from moisturizing to styling. Each product is crafted to enhance your hair’s natural beauty. Enjoy quality ingredients and effective results.
            </p>
          </div>
        </div>

        <div className="md:w-[45%] mb-5 md:mb-0 md:h-[50dvh] w-full ">
          <img src={Imagebarb3} alt="" className="w-full md:h-full h-[30dvh]" data-aos="fade-up" />
        </div>
      </div>

      <div className="flex items-center md:flex-row flex-col w-full justify-between mb-10   ">
        <div className="md:w-[45%] mb-5 md:mb-0 md:h-[50dvh] w-full ">
          <img src={Imagebarb2} alt="" className="w-full md:h-full h-[30dvh]" data-aos="fade-up" />
        </div>

        <div className="md:w-[40%] md:h-[50dvh] w-full">
          <p className="text-white md:text-[56px] text-[41px] font-800 mb-5" data-aos="fade-up">
          Best Haircut and Customer Service
          </p>
          <div className=" flex flex-col md:flex-row w-full h-full justify-between ">
            <div className="bg-orange-600 md:w-[70px] w-[30%] mt-1 md:mt-3 mb-5 md:mb-0  h-[1px] b  "></div>
            <p className="text-white text-[20px] w-[80%]" data-aos="fade-up">
            Experience top-tier haircuts and exceptional customer service. Our skilled stylists create styles that suit you perfectly. Enjoy a relaxing atmosphere and personalized care. We prioritize your satisfaction with every visit. 
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
