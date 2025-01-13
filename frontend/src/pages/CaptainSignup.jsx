import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { CaptainDataContext } from '../context/CapatainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CaptainSignup = () => {
  const navigate = useNavigate()
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ firstName, setFirstName ] = useState('')
  const [ lastName, setLastName ] = useState('')
  const [ vehicleColor, setVehicleColor ] = useState('')
  const [ vehiclePlate, setVehiclePlate ] = useState('')
  const [ vehicleCapacity, setVehicleCapacity ] = useState('')
  const [ vehicleType, setVehicleType ] = useState('')
  const { captain, setCaptain } = React.useContext(CaptainDataContext)

  const submitHandler = async (e) => {
    e.preventDefault()
    const captainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType
      }
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData)

    if (response.status === 201) {
      const data = response.data
      setCaptain(data.captain)
      localStorage.setItem('token', data.token)
      navigate('/captain-home')
    }

    setEmail('')
    setFirstName('')
    setLastName('')
    setPassword('')
    setVehicleColor('')
    setVehiclePlate('')
    setVehicleCapacity('')
    setVehicleType('')
  }

  return (
    <div className="min-h-screen bg-white relative">
      {/* Logo Section */}
      <div className='absolute top-5 left-5'>
        <img 
          className='w-20 md:w-32 lg:w-32 rounded-full shadow-lg border-4 border-yellow-400 hover:scale-105 transition-transform duration-300' 
          src="/images/RideMate.png" 
          alt="RideMate Logo" 
        />
      </div>

      {/* Form Section */}
      <div className='p-7 pt-28 md:pt-40 min-h-screen flex flex-col justify-between'>
        <div>
          <form onSubmit={submitHandler} className="space-y-6">
            <h3 className='text-xl font-bold mb-4 text-gray-800'>Captain Registration</h3>
            
            <div className='flex gap-4'>
              <input
                required
                className='bg-gray-100 rounded-xl px-4 py-3 border-2 border-transparent w-1/2 text-lg
                         focus:border-yellow-400 focus:bg-white transition-all duration-300 outline-none'
                type="text"
                placeholder='First name'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                required
                className='bg-gray-100 rounded-xl px-4 py-3 border-2 border-transparent w-1/2 text-lg
                         focus:border-yellow-400 focus:bg-white transition-all duration-300 outline-none'
                type="text"
                placeholder='Last name'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <input
              required
              className='bg-gray-100 rounded-xl px-4 py-3 border-2 border-transparent w-full text-lg
                       focus:border-yellow-400 focus:bg-white transition-all duration-300 outline-none'
              type="email"
              placeholder='Email address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              required
              className='bg-gray-100 rounded-xl px-4 py-3 border-2 border-transparent w-full text-lg
                       focus:border-yellow-400 focus:bg-white transition-all duration-300 outline-none'
              type="password"
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div>
              <h3 className='text-lg font-semibold mb-3 text-gray-800'>Vehicle Information</h3>
              <div className='flex gap-4 mb-4'>
                <input
                  required
                  className='bg-gray-100 rounded-xl px-4 py-3 border-2 border-transparent w-1/2 text-lg
                           focus:border-yellow-400 focus:bg-white transition-all duration-300 outline-none'
                  type="text"
                  placeholder='Vehicle Color'
                  value={vehicleColor}
                  onChange={(e) => setVehicleColor(e.target.value)}
                />
                <input
                  required
                  className='bg-gray-100 rounded-xl px-4 py-3 border-2 border-transparent w-1/2 text-lg
                           focus:border-yellow-400 focus:bg-white transition-all duration-300 outline-none'
                  type="text"
                  placeholder='Vehicle Plate'
                  value={vehiclePlate}
                  onChange={(e) => setVehiclePlate(e.target.value)}
                />
              </div>

              <div className='flex gap-4'>
                <input
                  required
                  className='bg-gray-100 rounded-xl px-4 py-3 border-2 border-transparent w-1/2 text-lg
                           focus:border-yellow-400 focus:bg-white transition-all duration-300 outline-none'
                  type="number"
                  placeholder='Vehicle Capacity'
                  value={vehicleCapacity}
                  onChange={(e) => setVehicleCapacity(e.target.value)}
                />
                <select
                  required
                  className='bg-gray-100 rounded-xl px-4 py-3 border-2 border-transparent w-1/2 text-lg
                           focus:border-yellow-400 focus:bg-white transition-all duration-300 outline-none'
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                >
                  <option value="" disabled>Select Vehicle Type</option>
                  <option value="car">Car</option>
                  <option value="auto">Auto</option>
                  <option value="moto">Moto</option>
                </select>
              </div>
            </div>

            <button
              className='bg-black text-white font-bold rounded-xl px-4 py-3 w-full text-lg
                       hover:bg-yellow-400 hover:text-black transform hover:scale-[1.02] 
                       transition-all duration-300 shadow-md mt-6'
            >
              Create Captain Account
            </button>
          </form>

          <p className='text-center mt-6'>
            Already have an account? 
            <Link to='/captain-login' className='text-yellow-500 hover:text-yellow-600 ml-2 font-semibold'>
              Login here
            </Link>
          </p>
        </div>

        <p className='text-xs text-gray-500 mt-6'>
          This site is protected by reCAPTCHA and the 
          <span className='text-yellow-500 hover:text-yellow-600 ml-1 cursor-pointer'>Google Privacy Policy</span> and
          <span className='text-yellow-500 hover:text-yellow-600 ml-1 cursor-pointer'>Terms of Service</span> apply.
        </p>
      </div>
    </div>
  )
}

export default CaptainSignup