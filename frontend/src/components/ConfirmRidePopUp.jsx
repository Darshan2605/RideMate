import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const ConfirmRidePopUp = (props) => {
    const [ otp, setOtp ] = useState('')
    const navigate = useNavigate()

    const submitHander = async (e) => {
        e.preventDefault()

        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
            params: {
                rideId: props.ride._id,
                otp: otp
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        if (response.status === 200) {
            props.setConfirmRidePopupPanel(false)
            props.setRidePopupPanel(false)
            navigate('/captain-riding', { state: { ride: props.ride } })
        }
    }

    return (
        <div className="min-h-screen bg-white relative pb-40">
            {/* Header */}
            <div className='p-4 border-b border-gray-100'>
                <div className='flex justify-center mb-2 cursor-pointer hover:opacity-75 transition-opacity'
                    onClick={() => props.setConfirmRidePopupPanel(false)}>
                    <i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i>
                </div>
                <h3 className='text-2xl font-bold text-gray-800'>Confirm this ride to Start</h3>
            </div>

            <div className='p-4'>
                {/* User Info Card */}
                <div className='flex items-center justify-between p-4 bg-yellow-50 rounded-xl border-2 border-yellow-400'>
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
                <div className='w-full rounded-xl border-2 border-gray-100 mt-6'>
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

            {/* Fixed Bottom Form */}
            <div className='fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100'>
                <form onSubmit={submitHander} className='space-y-4'>
                    <input 
                        value={otp} 
                        onChange={(e) => setOtp(e.target.value)} 
                        type="text" 
                        className='w-full bg-gray-100 px-6 py-4 rounded-xl text-lg font-mono
                                 border-2 border-transparent focus:border-yellow-400 
                                 focus:bg-white transition-all duration-300 outline-none'
                        placeholder='Enter OTP'
                    />

                    <div className='flex gap-3'>
                        <button 
                            type="submit"
                            className='flex-1 bg-black text-white font-bold rounded-xl px-4 py-3 text-lg
                                     hover:bg-yellow-400 hover:text-black transform hover:scale-[1.02] 
                                     transition-all duration-300 shadow-md'
                        >
                            Confirm Ride
                        </button>

                        <button 
                            onClick={() => {
                                props.setConfirmRidePopupPanel(false)
                                props.setRidePopupPanel(false)
                            }}
                            className='flex-1 bg-gray-100 text-gray-800 font-bold rounded-xl px-4 py-3 text-lg
                                     hover:bg-gray-200 transform hover:scale-[1.02] 
                                     transition-all duration-300 shadow-md'
                            type="button"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ConfirmRidePopUp