import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const FinishRide = (props) => {
    const navigate = useNavigate()

    async function endRide() {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, {
            rideId: props.ride._id
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        if (response.status === 200) {
            navigate('/captain-home')
        }
    }

    return (
        <div className="p-4">
            {/* Close Button */}
            <div className='flex justify-center mb-6 cursor-pointer hover:opacity-75 transition-opacity'
                onClick={() => props.setFinishRidePanel(false)}>
                <i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i>
            </div>

            <h3 className='text-2xl font-bold mb-6 text-gray-800'>Finish this Ride</h3>

            {/* User Info Card */}
            <div className='flex items-center justify-between p-4 bg-yellow-50 rounded-xl border-2 border-yellow-400 mb-6'>
                <div className='flex items-center gap-4'>
                    <img 
                        className='h-12 w-12 rounded-full object-cover border-2 border-yellow-400 shadow-md' 
                        src="/images/user.png" 
                        alt="User" 
                    />
                    <h2 className='text-lg font-semibold text-gray-800 capitalize'>
                        {props.ride?.user.fullname.firstname}
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

            {/* Finish Ride Button */}
            <button
                onClick={endRide}
                className='w-full bg-black text-white font-bold rounded-xl px-4 py-3 text-lg
                         hover:bg-yellow-400 hover:text-black transform hover:scale-[1.02] 
                         transition-all duration-300 shadow-md'
            >
                Finish Ride
            </button>
        </div>
    )
}

export default FinishRide