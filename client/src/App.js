import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import RegisterUser from './Screens/RegisterUser';
import UserLogin from './Screens/UserLogin';
import Upload from './Screens/Upload';
import Adminlogin from './Screens/Adminlogin';
import Adminregistration from './Screens/Adminregistration';
//import Adminscreen from './Screens/Adminscreen';


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
        
        
        

        </Routes>
      </Router>

    </div>
  );
}

export default App
