import React from 'react'

const LookingForDriver = (props) => {
    return (
        <div className="p-4">
            {/* Close Button */}
            <div 
                className='flex justify-center mb-6 cursor-pointer hover:opacity-75 transition-opacity'
                onClick={() => props.setVehicleFound(false)}
            >
                <i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i>
            </div>

            {/* Title with Loading Animation */}
            <div className='flex items-center gap-3 mb-6'>
                <h3 className='text-2xl font-bold text-gray-800'>Looking for Driver</h3>
                <div className='animate-spin text-yellow-400'>
                    <i className="ri-loader-4-line text-2xl"></i>
                </div>
            </div>

            <div className='flex gap-4 justify-between flex-col items-center'>
                {/* Vehicle Image */}
                <img 
                    className='h-24 w-auto rounded-lg shadow-md' 
                    src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" 
                    alt="Vehicle" 
                />

                {/* Ride Details */}
                <div className='w-full mt-4 rounded-xl border-2 border-gray-100'>
                    {/* Pickup Location */}
                    <div className='flex items-center gap-4 p-4 border-b border-gray-100'>
                        <div className='w-10 h-10 flex items-center justify-center bg-yellow-50 rounded-full'>
                            <i className="text-xl text-yellow-400 ri-map-pin-user-fill"></i>
                        </div>
                        <div>
                            <h3 className='text-lg font-semibold text-gray-800'>Pickup Location</h3>
                            <p className='text-sm text-gray-600'>{props.pickup}</p>
                        </div>
                    </div>

                    {/* Destination */}
                    <div className='flex items-center gap-4 p-4 border-b border-gray-100'>
                        <div className='w-10 h-10 flex items-center justify-center bg-yellow-50 rounded-full'>
                            <i className="text-xl text-yellow-400 ri-map-pin-2-fill"></i>
                        </div>
                        <div>
                            <h3 className='text-lg font-semibold text-gray-800'>Destination</h3>
                            <p className='text-sm text-gray-600'>{props.destination}</p>
                        </div>
                    </div>

                    {/* Fare Details */}
                    <div className='flex items-center gap-4 p-4'>
                        <div className='w-10 h-10 flex items-center justify-center bg-yellow-50 rounded-full'>
                            <i className="text-xl text-yellow-400 ri-currency-line"></i>
                        </div>
                        <div>
                            <h3 className='text-lg font-semibold text-gray-800'>₹{props.fare[props.vehicleType]}</h3>
                            <p className='text-sm text-gray-600'>Cash Payment</p>
                        </div>
                    </div>
                </div>

                {/* Cancel Button */}
                <button 
                    onClick={() => props.setVehicleFound(false)}
                    className='w-full mt-6 bg-gray-100 text-gray-800 font-bold rounded-xl px-4 py-3 text-lg
                             hover:bg-gray-200 transform hover:scale-[1.02] 
                             transition-all duration-300 shadow-md'
                >
                    Cancel
                </button>
            </div>
        </div>
    )
}

export default LookingForDriver