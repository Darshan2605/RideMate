import React from 'react'

const WaitingForDriver = (props) => {
  return (
    <div className="p-4">
      {/* Close Button */}
      <div className='flex justify-center mb-6 cursor-pointer hover:opacity-75 transition-opacity'
        onClick={() => props.setWaitingForDriver(false)}>
        <i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i>
      </div>

      {/* Driver Info */}
      <div className='flex items-center justify-between p-4 bg-yellow-50 rounded-xl border-2 border-yellow-400 mb-6'>
        <img className='h-12 w-12 rounded-full object-cover border-2 border-yellow-400 shadow-md' 
             src="/images/user.png" 
             alt="Driver" />
        <div className='text-right'>
          <h2 className='text-lg font-semibold text-gray-800 capitalize'>{props.ride?.captain.fullname.firstname}</h2>
          <h4 className='text-xl font-bold text-gray-800'>{props.ride?.captain.vehicle.plate}</h4>
          <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
          <h1 className='text-lg font-bold text-yellow-400'>{props.ride?.otp}</h1>
        </div>
      </div>

      {/* Ride Details */}
      <div className='w-full rounded-xl border-2 border-gray-100'>
        {/* Pickup */}
        <div className='flex items-center gap-4 p-4 border-b border-gray-100'>
          <div className='w-10 h-10 flex items-center justify-center bg-yellow-50 rounded-full'>
            <i className="text-xl text-yellow-400 ri-map-pin-user-fill"></i>
          </div>
          <div>
            <h3 className='text-lg font-semibold text-gray-800'>Pickup Location</h3>
            <p className='text-sm text-gray-600'>{props.ride?.pickup}</p>
          </div>
        </div>

        {/* Destination */}
        <div className='flex items-center gap-4 p-4 border-b border-gray-100'>
          <div className='w-10 h-10 flex items-center justify-center bg-yellow-50 rounded-full'>
            <i className="text-xl text-yellow-400 ri-map-pin-2-fill"></i>
          </div>
          <div>
            <h3 className='text-lg font-semibold text-gray-800'>Destination</h3>
            <p className='text-sm text-gray-600'>{props.ride?.destination}</p>
          </div>
        </div>

        {/* Fare */}
        <div className='flex items-center gap-4 p-4'>
          <div className='w-10 h-10 flex items-center justify-center bg-yellow-50 rounded-full'>
            <i className="text-xl text-yellow-400 ri-currency-line"></i>
          </div>
          <div>
            <h3 className='text-lg font-semibold text-gray-800'>₹{props.ride?.fare}</h3>
            <p className='text-sm text-gray-600'>Cash Payment</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WaitingForDriver