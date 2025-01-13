import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'
import axios from 'axios'

const UserSignup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [userData, setUserData] = useState({})
  const navigate = useNavigate()
  const { user, setUser } = useContext(UserDataContext)

  const submitHandler = async (e) => {
    e.preventDefault();

    const userData = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/signup`, userData)

    if (response.status === 200) {
      const data = response.data
      setUser(data.user)
      localStorage.setItem('token', data.token)
      navigate('/home')
    }
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
      <div className='p-7 pt-32 md:pt-40 min-h-screen flex flex-col justify-between'>
        <div>
          <form onSubmit={submitHandler} className="space-y-6">
            <div>
              <h3 className='text-xl font-bold mb-4 text-gray-800'>Create Account</h3>
              <div className='flex gap-4 mb-4'>
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
            </div>

            <input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='bg-gray-100 rounded-xl px-4 py-3 border-2 border-transparent w-full text-lg
                       focus:border-yellow-400 focus:bg-white transition-all duration-300 outline-none'
              type="email"
              placeholder='Email address'
            />

            <input
              className='bg-gray-100 rounded-xl px-4 py-3 border-2 border-transparent w-full text-lg
                       focus:border-yellow-400 focus:bg-white transition-all duration-300 outline-none'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              type="password"
              placeholder='Password'
            />

            <button
              className='bg-black text-white font-bold rounded-xl px-4 py-3 w-full text-lg
                       hover:bg-yellow-400 hover:text-black transform hover:scale-[1.02] 
                       transition-all duration-300 shadow-md'
            >
              Create Account
            </button>
          </form>

          <p className='text-center mt-6'>
            Already have an account? 
            <Link to='/login' className='text-yellow-500 hover:text-yellow-600 ml-2 font-semibold'>
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default UserSignup