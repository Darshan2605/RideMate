import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UserLogin = () => {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ userData, setUserData ] = useState({})
  const { user, setUser } = useContext(UserDataContext)
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault();
    const userData = {
      email: email,
      password: password
    }
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData)
    if (response.status === 200) {
      const data = response.data
      setUser(data.user)
      localStorage.setItem('token', data.token)
      navigate('/home')
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
            <div>
              <h3 className='text-xl font-bold mb-4 text-gray-800'>Welcome Back</h3>
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
              Login
            </button>
          </form>

          <p className='text-center mt-6'>
            New here? 
            <Link to='/signup' className='text-yellow-500 hover:text-yellow-600 ml-2 font-semibold'>
              Create new Account
            </Link>
          </p>
        </div>

        <Link
          to='/captain-login'
          className='bg-black text-white font-bold rounded-xl px-4 py-3 w-full text-lg text-center
                   hover:bg-yellow-400 hover:text-black transform hover:scale-[1.02] 
                   transition-all duration-300 shadow-md'
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  )
}

export default UserLogin