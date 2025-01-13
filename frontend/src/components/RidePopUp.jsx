import React from 'react'

const RidePopUp = (props) => {
    return (
        <div className="p-4">
            {/* Close Button */}
            <div 
                className='flex justify-center mb-6 cursor-pointer hover:opacity-75 transition-opacity'
                onClick={() => props.setRidePopupPanel(false)}
            >
                <i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i>
            </div>

            <h3 className='text-2xl font-bold mb-4 text-gray-800'>New Ride Available!</h3>

            {/* User Info Card */}
            <div className='flex items-center justify-between p-4 bg-yellow-50 border-2 border-yellow-400 rounded-xl mb-6'>
                <div className='flex items-center gap-4'>
                    <img 
                        className='h-12 w-12 rounded-full object-cover border-2 border-yellow-400 shadow-md' 
                        src="/images/user.png" 
                        alt="User" 
                    />
                    <h2 className='text-lg font-semibold text-gray-800'>
                        {props.ride?.user.fullname.firstname} {props.ride?.user.fullname.lastname}
                    </h2>
                </div>
                <h5 className='text-lg font-bold text-yellow-400'>2.2 KM</h5>
            </div>

            {/* Ride Details */}
            <div className='w-full rounded-xl border-2 border-gray-100 mb-6'>
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

            {/* Action Buttons */}
            <div className='space-y-3'>
                <button 
                    onClick={() => {
                        props.setConfirmRidePopupPanel(true)
                        props.confirmRide()
                    }} 
                    className='w-full bg-black text-white font-bold rounded-xl px-4 py-3 text-lg
                             hover:bg-yellow-400 hover:text-black transform hover:scale-[1.02] 
                             transition-all duration-300 shadow-md'
                >
                    Accept Ride
                </button>

                <button 
                    onClick={() => props.setRidePopupPanel(false)} 
                    className='w-full bg-gray-100 text-gray-800 font-bold rounded-xl px-4 py-3 text-lg
                             hover:bg-gray-200 transform hover:scale-[1.02] 
                             transition-all duration-300 shadow-md'
                >
                    Ignore
                </button>
            </div>
        </div>
    )
}

export default RidePopUp