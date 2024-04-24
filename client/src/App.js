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


function App() {
  return (
    <div className="App">
      <Navbar />

      <Router>
        <Routes>
          <Route path='/registeruser' element={<RegisterUser />} />
          <Route path='/loginuser' element={<UserLogin />} />
          <Route path='/upload' element={<Upload />} />
          <Route path = "/loginadmin" element={<Adminlogin/>}/>
          <Route path = "/registeruseradmin" element = {<Adminregistration/>} />  
          <Route path= "/admin-dashboard" element={<Admindashboard/>}/> 
        
        
        

        </Routes>
      </Router>

    </div>
  );
}

export default App
