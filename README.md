# RideMate

Demo-https://drive.google.com/file/d/1Er_L3ShAr8mTd1MccA2z1aAgm5i61tNE/view?usp=sharing

## Description of Project

RideMate is a ride-hailing application that connects users with drivers (captains) for transportation services. Users can book rides, track their rides in real-time, and make payments. Captains can register, log in, and accept ride requests. The application includes features such as live tracking, fare estimation, and ride management.







![image](https://github.com/user-attachments/assets/525eb595-da68-45c4-a7db-f1ac6f8cc16a)![image](https://github.com/user-attachments/assets/39ef6f72-78bf-4117-9356-e00f1bbcf9c4)![image](https://github.com/user-attachments/assets/fb3fc928-269d-4852-b4a0-b922b8207ebf)![image](https://github.com/user-attachments/assets/fefba780-e80f-4997-a662-239758ce1a4c)![image](https://github.com/user-attachments/assets/070e1292-4aec-4e79-b181-2a3194e83974)![image](https://github.com/user-attachments/assets/54d7ba1c-68a9-4697-96c0-a12e68db7acd)







## Tools and Technologies Used

### Frontend
- **React**: JavaScript library for building user interfaces
- **React Router**: For routing and navigation
- **Tailwind CSS**: Utility-first CSS framework for styling
- **GSAP**: Animation library for creating animations
- **Axios**: HTTP client for making API requests
- **Socket.io Client**: For real-time communication
- **Google Maps API**: For live tracking and map functionalities

### Backend
- **Node.js**: JavaScript runtime for building the server
- **Express**: Web framework for Node.js
- **MongoDB**: NoSQL database for storing data
- **Mongoose**: ODM for MongoDB
- **JWT**: For authentication and authorization
- **Socket.io**: For real-time communication
- **Google Maps API**: For geocoding and distance calculations

## How to Setup

### Prerequisites
- Node.js and npm installed
- MongoDB installed and running
- Google Maps API key

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/RideMate.git
   cd RideMate/Backend
   ```

2.Install dependencies:
   ```bash
   npm install
   ```

3.Create a .env file in the Backend directory and add the following environment variables:
   ```bash
   PORT=4000
   DB_CONNECT=mongodb://127.0.0.1:27017/uber-app
   JWT_SECRET=This-is-Uber-App
   GOOGLE_MAPS_API=your-google-maps-api-key
   ```

4.Start the backend server:
   ```bash
   npm start
   ```

5.Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```

6.Install dependencies:
   ```bash
   npm install
   ```

7.Create a .env file in the frontend directory and add the following environment variables:
   ```bash
   VITE_BASE_URL=http://localhost:4000
   VITE_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
   ```

8.Start the frontend development server:
   ```bash
   npm run dev
   ```

9.Running the Application
Open your browser and navigate to http://localhost:5173 to access the RideMate application.











