import React, { useEffect, useState } from 'react'
import {BsChevronCompactLeft, BsChevronCompactRight} from 'react-icons/bs'
import { RxDotFilled } from 'react-icons/rx';


const HeroSection = () => {

  const slides = [
    {
      url:"https://static.vecteezy.com/system/resources/previews/004/299/835/original/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-free-vector.jpg",
    },
    {
      url:"https://e0.pxfuel.com/wallpapers/606/84/desktop-wallpaper-ecommerce-website-design-company-noida-e-commerce-banner-design-e-commerce.jpg",
    },
    {
      url:"https://t4.ftcdn.net/jpg/07/77/69/49/240_F_777694934_LTljQLNLk2ao2SCgJLmHfSTfhAneYds4.jpg",
    },
    {
      url:"https://t3.ftcdn.net/jpg/02/41/43/18/360_F_241431868_8DFQpCcmpEPVG0UvopdztOAd4a6Rqsoo.jpg",
    },
    {
      url:"https://images.unsplash.com/photo-1634973357973-f2ed2657db3c?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    }
  ]
  const [currentIndex, setCurrentIndex] = useState(0)

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  }

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length-1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }


  // setInterval(() => {
  //   nextSlide()
  //  }, 4000);

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  }

  return (


    <div className='max-w-[1400px] h-[780px] w-full m-auto py-16 px-4 relative group'>
      <div style={{backgroundImage:`url(${slides[currentIndex].url})`}} className='w-full h-full rounded-2xl bg-cover'>
          {/* left arrow */}
          <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 -translate-y-[50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
            <BsChevronCompactLeft size={30} onClick={prevSlide} />
          </div>
          {/* right arrow */}
          <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 -translate-y-[50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
            <BsChevronCompactRight size={30} onClick={nextSlide}/>
          </div>
      </div>
      <div className='flex top-4 justify-center py-2'>
        {
          slides.map((slide, slideIndex) => (
            <div key={slideIndex} onClick={() => goToSlide(slideIndex)} className='text-2xl cursor-pointer'>
              {  
                slideIndex===currentIndex?<RxDotFilled color='#616160' /> : <RxDotFilled color='#bababa'/>
              }
              
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default HeroSection