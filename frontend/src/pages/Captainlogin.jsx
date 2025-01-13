import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CapatainContext'

const Captainlogin = () => {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const { captain, setCaptain } = React.useContext(CaptainDataContext)
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault();
    const captain = {
      email: email,
      password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain)

    if (response.status === 200) {
      const data = response.data
      setCaptain(data.captain)
      localStorage.setItem('token', data.token)
      navigate('/captain-home')
    }

    setEmail('')
    setPassword('')
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
            <h3 className='text-xl font-bold mb-4 text-gray-800'>Captain Login</h3>

            <div>
              <input
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='bg-gray-100 rounded-xl px-4 py-3 border-2 border-transparent w-full text-lg
                         focus:border-yellow-400 focus:bg-white transition-all duration-300 outline-none'
                type="email"
                placeholder='Email address'
              />
            </div>

            <div>
              <input
                className='bg-gray-100 rounded-xl px-4 py-3 border-2 border-transparent w-full text-lg
                         focus:border-yellow-400 focus:bg-white transition-all duration-300 outline-none'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
                type="password"
                placeholder='Password'
              />
            </div>

            <button
              className='bg-black text-white font-bold rounded-xl px-4 py-3 w-full text-lg
                       hover:bg-yellow-400 hover:text-black transform hover:scale-[1.02] 
                       transition-all duration-300 shadow-md'
            >
              Login as Captain
            </button>
          </form>

          <p className='text-center mt-6'>
            New Captain? 
            <Link to='/captain-signup' className='text-yellow-500 hover:text-yellow-600 ml-2 font-semibold'>
              Register here
            </Link>
          </p>
        </div>

        <Link
          to='/login'
          className='bg-black text-white font-bold rounded-xl px-4 py-3 w-full text-lg text-center
                   hover:bg-yellow-400 hover:text-black transform hover:scale-[1.02] 
                   transition-all duration-300 shadow-md'
        >
          Sign in as User
        </Link>
      </div>
    </div>
  )
}

export default Captainlogin