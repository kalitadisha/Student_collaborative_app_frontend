import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import RegisterUser from './Screens/RegisterUser';
import UserLogin from './Screens/UserLogin';

function App() {
  return (
    <div className="App">
      <Navbar />

      <Router>
        <Routes>
          <Route path='/registeruser' element={<RegisterUser />} />
          <Route path='/loginuser' element={<UserLogin />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
