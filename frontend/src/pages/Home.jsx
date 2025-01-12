import React, { useEffect, useRef, useState, useContext } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import 'remixicon/fonts/remixicon.css'

// Components
import LiveTracking from '../components/LiveTracking'
import LocationSearchPanel from '../components/LocationSearchPanel'
import VehiclePanel from '../components/VehiclePanel'
import ConfirmRide from '../components/ConfirmRide'
import LookingForDriver from '../components/LookingForDriver'
import WaitingForDriver from '../components/WaitingForDriver'

// Context
import { SocketContext } from '../context/SocketContext'
import { UserDataContext } from '../context/UserContext'

const Home = () => {
    const [pickup, setPickup] = useState('')
    const [destination, setDestination] = useState('')
    const [panelOpen, setPanelOpen] = useState(false)
    const [vehiclePanel, setVehiclePanel] = useState(false)
    const [confirmRidePanel, setConfirmRidePanel] = useState(false)
    const [vehicleFound, setVehicleFound] = useState(false)
    const [waitingForDriver, setWaitingForDriver] = useState(false)
    const [pickupSuggestions, setPickupSuggestions] = useState([])
    const [destinationSuggestions, setDestinationSuggestions] = useState([])
    const [activeField, setActiveField] = useState(null)
    const [fare, setFare] = useState({})
    const [vehicleType, setVehicleType] = useState(null)
    const [ride, setRide] = useState(null)
    const [isLogoVisible, setIsLogoVisible] = useState(true)

    // Refs
    const vehiclePanelRef = useRef(null)
    const confirmRidePanelRef = useRef(null)
    const vehicleFoundRef = useRef(null)
    const waitingForDriverRef = useRef(null)
    const panelRef = useRef(null)
    const panelCloseRef = useRef(null)

    const navigate = useNavigate()
    const { socket } = useContext(SocketContext)
    const { user } = useContext(UserDataContext)

    // Socket Effects
    useEffect(() => {
        if (user?._id) {
            socket.emit("join", { userType: "user", userId: user._id })
        }
    }, [user, socket])

    useEffect(() => {
        socket.on('ride-confirmed', handleRideConfirmed)
        socket.on('ride-started', handleRideStarted)

        return () => {
            socket.off('ride-confirmed')
            socket.off('ride-started')
        }
    }, [socket, navigate])

    // Handlers
    const handleRideConfirmed = (confirmedRide) => {
        setVehicleFound(false)
        setWaitingForDriver(true)
        setRide(confirmedRide)
    }

    const handleRideStarted = (startedRide) => {
        setWaitingForDriver(false)
        navigate('/riding', { state: { ride: startedRide } })
    }

    const handlePickupChange = async (e) => {
        setPickup(e.target.value)
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: { input: e.target.value },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            setPickupSuggestions(response.data)
        } catch (error) {
            console.error('Error fetching pickup suggestions:', error)
        }
    }

    const handleDestinationChange = async (e) => {
        setDestination(e.target.value)
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: { input: e.target.value },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            setDestinationSuggestions(response.data)
        } catch (error) {
            console.error('Error fetching destination suggestions:', error)
        }
    }

    const findTrip = async () => {
        if (!pickup || !destination) return
        
        setVehiclePanel(true)
        setPanelOpen(false)
        setIsLogoVisible(false)

        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
                params: { pickup, destination },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            setFare(response.data)
        } catch (error) {
            console.error('Error finding trip:', error)
        }
    }

    const createRide = async () => {
        try {
            await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, 
                {
                    pickup,
                    destination,
                    vehicleType
                }, 
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )
        } catch (error) {
            console.error('Error creating ride:', error)
        }
    }

    // Animations
    useGSAP(() => {
        if (panelOpen) {
            gsap.to(panelRef.current, {
                height: '70%',
                padding: 24
            })
            gsap.to(panelCloseRef.current, {
                opacity: 1
            })
        } else {
            gsap.to(panelRef.current, {
                height: '0%',
                padding: 0
            })
            gsap.to(panelCloseRef.current, {
                opacity: 0
            })
        }
    }, [panelOpen])

    useGSAP(() => {
        gsap.to(vehiclePanelRef.current, {
            transform: vehiclePanel ? 'translateY(0)' : 'translateY(100%)'
        })
    }, [vehiclePanel])

    useGSAP(() => {
        gsap.to(confirmRidePanelRef.current, {
            transform: confirmRidePanel ? 'translateY(0)' : 'translateY(100%)'
        })
    }, [confirmRidePanel])

    useGSAP(() => {
        gsap.to(vehicleFoundRef.current, {
            transform: vehicleFound ? 'translateY(0)' : 'translateY(100%)'
        })
    }, [vehicleFound])

    useGSAP(() => {
        gsap.to(waitingForDriverRef.current, {
            transform: waitingForDriver ? 'translateY(0)' : 'translateY(100%)'
        })
    }, [waitingForDriver])

    return (
        <div className='h-screen relative overflow-hidden bg-white'>
            {/* Logo */}
            <div className={`absolute top-5 left-5 z-10 transition-opacity duration-300 ${
                isLogoVisible ? 'opacity-100' : 'opacity-0'
            }`}>
                <img 
                    className='w-20 md:w-32 rounded-full shadow-lg border-4 border-yellow-400 hover:scale-105 transition-transform duration-300' 
                    src="/images/RideMate.png" 
                    alt="RideMate Logo" 
                />
            </div>

            {/* Map */}
            <div className='h-screen w-screen'>
                <LiveTracking />
            </div>

            {/* Main Content */}
            <div className='flex flex-col justify-end h-screen absolute top-0 w-full'>
                {/* Search Panel */}
                <div className='min-h-[200px] p-6 bg-white relative shadow-lg rounded-t-3xl'>
                    <h5 
                        ref={panelCloseRef} 
                        onClick={() => {
                            setPanelOpen(false)
                            setIsLogoVisible(true)
                        }} 
                        className='absolute opacity-0 right-6 top-6 text-2xl cursor-pointer hover:text-yellow-400'
                    >
                        <i className="ri-arrow-down-wide-line"></i>
                    </h5>
                    
                    <h4 className='text-2xl font-bold mb-4 text-gray-800'>Find a trip</h4>
                    
                    <form className='relative py-3' onSubmit={(e) => e.preventDefault()}>
                        <div className="line absolute h-16 w-1 top-[50%] -translate-y-1/2 left-5 bg-yellow-400 rounded-full"></div>
                        
                        <input
                            onClick={() => {
                                setPanelOpen(true)
                                setActiveField('pickup')
                                setIsLogoVisible(false)
                            }}
                            value={pickup}
                            onChange={handlePickupChange}
                            className='bg-gray-100 px-12 py-3 text-lg rounded-xl w-full mb-3
                                     border-2 border-transparent focus:border-yellow-400 
                                     focus:bg-white transition-all duration-300 outline-none'
                            type="text"
                            placeholder='Add a pick-up location'
                        />
                        
                        <input
                            onClick={() => {
                                setPanelOpen(true)
                                setActiveField('destination')
                                setIsLogoVisible(false)
                            }}
                            value={destination}
                            onChange={handleDestinationChange}
                            className='bg-gray-100 px-12 py-3 text-lg rounded-xl w-full
                                     border-2 border-transparent focus:border-yellow-400 
                                     focus:bg-white transition-all duration-300 outline-none'
                            type="text"
                            placeholder='Enter your destination'
                        />
                    </form>

                    <button
                        onClick={findTrip}
                        className='bg-black text-white font-bold rounded-xl px-4 py-3 w-full text-lg
                                 hover:bg-yellow-400 hover:text-black transform hover:scale-[1.02] 
                                 transition-all duration-300 shadow-md mt-4 mb-2'
                    >
                        Find Trip
                    </button>
                </div>

                {/* Panels */}
                <div ref={panelRef} className='bg-white h-0 rounded-t-3xl shadow-lg overflow-hidden'>
                    <LocationSearchPanel
                        suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
                        setPanelOpen={setPanelOpen}
                        setVehiclePanel={setVehiclePanel}
                        setPickup={setPickup}
                        setDestination={setDestination}
                        activeField={activeField}
                        setIsLogoVisible={setIsLogoVisible}
                    />
                </div>
            </div>

            {/* Additional Panels */}
            <div ref={vehiclePanelRef} 
                 className='fixed w-full z-20 bottom-0 translate-y-full bg-white px-6 py-8 rounded-t-3xl shadow-lg'>
                <VehiclePanel
                    selectVehicle={setVehicleType}
                    fare={fare}
                    setConfirmRidePanel={setConfirmRidePanel}
                    setVehiclePanel={setVehiclePanel}
                />
            </div>

            <div ref={confirmRidePanelRef} 
                 className='fixed w-full z-20 bottom-0 translate-y-full bg-white px-6 py-8 rounded-t-3xl shadow-lg'>
                <ConfirmRide
                    createRide={createRide}
                    pickup={pickup}
                    destination={destination}
                    fare={fare}
                    vehicleType={vehicleType}
                    setConfirmRidePanel={setConfirmRidePanel}
                    setVehicleFound={setVehicleFound}
                />
            </div>

            <div ref={vehicleFoundRef} 
                 className='fixed w-full z-20 bottom-0 translate-y-full bg-white px-6 py-8 rounded-t-3xl shadow-lg'>
                <LookingForDriver
                    createRide={createRide}
                    pickup={pickup}
                    destination={destination}
                    fare={fare}
                    vehicleType={vehicleType}
                    setVehicleFound={setVehicleFound}
                />
            </div>

            <div ref={waitingForDriverRef} 
                 className='fixed w-full z-20 bottom-0 translate-y-full bg-white px-6 py-8 rounded-t-3xl shadow-lg'>
                <WaitingForDriver
                    ride={ride}
                    setVehicleFound={setVehicleFound}
                    setWaitingForDriver={setWaitingForDriver}
                    waitingForDriver={waitingForDriver}
                />
            </div>
        </div>
    )
}

export default Home