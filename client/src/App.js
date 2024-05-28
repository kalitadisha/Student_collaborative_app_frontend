import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import Adminlogin from './Screens/Adminlogin';
import Adminregistration from './Screens/Adminregistration';
import Admindashboard from './Screens/Adminsdashboard';
import RegisterUser from './Screens/RegisterUser';
import Upload from './Screens/Upload';
import UserLogin from './Screens/UserLogin';
import Profile from "./pages/profile/Profile";
import Home from "./pages/Home/Home";
import Profilepage from "./Screens/Profilepage";


function App() {
  return (
    <div className="App">
      

      <Router>
        <Routes>
          <Route path='/registeruser' element={<RegisterUser />} />
          <Route path='/loginuser' element={<UserLogin />} />
          <Route path='/upload' element={<Upload />} />
          <Route path='/' element={<Profile />} />
          <Route path = "/loginadmin" element={<Adminlogin/>}/>
          <Route path = "/registeruseradmin" element = {<Adminregistration/>} />  
          <Route path= "/admin-dashboard" element={<Admindashboard/>}/> 
          
          <Route path='/profile' element={<Profilepage />} />
        
        

        </Routes>
      </Router>

    </div>
  );
}

export default App
