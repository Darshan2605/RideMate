import React, { useEffect, useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { SocketContext } from '../context/SocketContext'
import LiveTracking from '../components/LiveTracking'

const Riding = () => {
    const location = useLocation()
    const { ride } = location.state || {}
    const { socket } = useContext(SocketContext)
    const navigate = useNavigate()

    useEffect(() => {
        socket.on("ride-ended", () => {
            navigate('/home')
        })

        return () => {
            socket.off("ride-ended")
        }
    }, [socket, navigate])

    return (
        <div className='h-screen relative overflow-hidden bg-white'>
            <Link to='/home' className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full shadow-md'>
                <i className="text-lg font-medium ri-home-5-line"></i>
            </Link>

            {/* Map Section */}
            <div className='h-1/2'>
                <LiveTracking />
            </div>

            {/* Ride Details Section */}
            <div className='h-1/2 p-4 bg-white rounded-t-3xl shadow-lg'>
                {/* Driver Info */}
                <div className='flex items-center justify-between mb-6'>
                    <img className='h-12 w-12 rounded-full object-cover border-2 border-yellow-400 shadow-md' 
                         src="/images/user.png" 
                         alt="Driver" />
                    <div className='text-right'>
                        <h2 className='text-lg font-semibold text-gray-800 capitalize'>{ride?.captain.fullname.firstname}</h2>
                        <h4 className='text-xl font-bold text-gray-800'>{ride?.captain.vehicle.plate}</h4>
                        <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
                    </div>
                </div>

                {/* Ride Details */}
                <div className='w-full rounded-xl border-2 border-gray-100 mb-6'>
                    {/* Destination */}
                    <div className='flex items-center gap-4 p-4 border-b border-gray-100'>
                        <div className='w-10 h-10 flex items-center justify-center bg-yellow-50 rounded-full'>
                            <i className="text-xl text-yellow-400 ri-map-pin-2-fill"></i>
                        </div>
                        <div>
                            <h3 className='text-lg font-semibold text-gray-800'>Destination</h3>
                            <p className='text-sm text-gray-600'>{ride?.destination}</p>
                        </div>
                    </div>

                    {/* Fare */}
                    <div className='flex items-center gap-4 p-4'>
                        <div className='w-10 h-10 flex items-center justify-center bg-yellow-50 rounded-full'>
                            <i className="text-xl text-yellow-400 ri-currency-line"></i>
                        </div>
                        <div>
                            <h3 className='text-lg font-semibold text-gray-800'>₹{ride?.fare}</h3>
                            <p className='text-sm text-gray-600'>Cash Payment</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Fixed Bottom Payment Button */}
            <div className='fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100'>
                <button className='w-full bg-black text-white font-bold rounded-xl px-4 py-3 text-lg
                                 hover:bg-yellow-400 hover:text-black transform hover:scale-[1.02] 
                                 transition-all duration-300 shadow-md'>
                    Make a Payment
                </button>
            </div>
        </div>
    )
}

export default Riding