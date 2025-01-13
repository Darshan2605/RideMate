import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div className="min-h-screen w-full">
      <div className='relative bg-cover bg-no-repeat bg-center min-h-screen w-full'
           style={{ backgroundImage: 'url("/images/home.jpg")' }}>
        <div className='absolute top-5 left-5'>
          <img 
            className='w-20 md:w-32 lg:w-32 rounded-full shadow-lg border-4 border-white hover:scale-105 transition-transform duration-300' 
            src="/images/RideMate.png" 
            alt="RideMate Logo" 
          />
        </div>
        <div className='absolute bottom-0 left-0 right-0 bg-black/90 backdrop-blur-sm pb-8 py-6 px-6 shadow-lg'>
          <h2 className='text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight'>
            Get Started with <span className="text-yellow-400">RideMate</span>
          </h2>
          <Link 
            to='/login' 
            className='flex items-center justify-center w-full bg-yellow-400 text-black py-4 rounded-xl mt-6
                     text-lg font-bold tracking-wide shadow-md
                     hover:bg-yellow-500 transform hover:scale-[1.02] 
                     transition-all duration-300 ease-in-out
                     border-2 border-transparent hover:border-yellow-300'
          >
            Continue Your Journey
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Start