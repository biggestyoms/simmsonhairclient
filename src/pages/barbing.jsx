import React from 'react'
import Home from '../components/barbing/home'
import Service from '../components/barbing/service'
import Price from '../components/barbing/price'
import Barber from '../components/barbing/barber'
import WorkingHours from '../components/barbing/workingHours'
import Footer from '../components/barbing/footer'

const Barbing = () => {
  return (
    <div className='w-full h-[100dvh] '>
        <Home />
        <Service />
        <Price />
        <Barber />
        <WorkingHours />
        <Footer />
    </div>
  )
}

export default Barbing