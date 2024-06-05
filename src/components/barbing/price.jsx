import React, { useEffect} from 'react'
import { FaLongArrowAltRight } from 'react-icons/fa'
import Png1 from '../../images/png1.png'
import Png2 from '../../images/png2.png'
import Png3 from '../../images/png3.png'
import Png4 from '../../images/png4.png'
import Png5 from '../../images/png5.png'
import Png6 from '../../images/png6.png'
import Png7 from '../../images/png7.png'
import Png8 from '../../images/png8.png'
import AOS from "aos";
import "aos/dist/aos.css";

const Price = () => {

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  const services = [
    { title: 'Basic haircut', price: '$35', image: Png1 },
    { title: 'HairCut and Basic Shave', price: '$40', image: Png2 },
    { title: 'HairCut and Design Shave', price: '$45', image: Png3 },
    { title: 'Spciality Cut (Mohawk, Fohawk, Box Cut)', price: 'Short - $38\nLong - $50', image: Png4 },
    { title: 'Beard Styling', price: '$10 - $20', image: Png5 },
    { title: 'Outline and Shave', price: '$25', image: Png6 },
    { title: 'Eyebrows', price: '$15', image: Png7 },
    { title: 'Kids Basic Hair Cut With Design', price: '$30', image: Png8 },
  ];

  return (
<div className="bg-black min-h-screen text-white flex items-center justify-center md:mt-32 mt-16 " id="services">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold" data-aos="fade-up">Our services</h1>
          <a href="https://booksy.com/en-ca/7399_simms-on-hair_barbershop_713169_brantford?hl=en-CA&gei=rXFWZoVF862m1A-D_Z_IAw&rwg_token=AJKvS9UxsU1eRN-LEnJnlwe45GhYDXInq5LWSxgefxxSpWx2XU0gfwL6TvtlMDkrVy6kD87ym_wB5VzI5_-DROxFN2KVFaF1fg%3D%3D#ba_s=seo" className="text-orange-500 mt-4 block" data-aos="fade-up">Online appointments</a>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8"  data-aos="fade-up">
          {services.map((service, index) => (
            <div key={index} className=" border border-[#fff] p-8 rounded-md text-center" data-aos="fade-up">
              <div className="mb-4" data-aos="fade-up">
                <img src={service.image} alt={service.title} className="w-16 h-16 mx-auto" data-aos="fade-up" />
              </div>
              <h2 className="text-xl font-semibold" data-aos="fade-up">{service.title}</h2>
              <p className="text-orange-500 mt-2 whitespace-pre-line" data-aos="fade-up">{service.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Price