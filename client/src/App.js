import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import UserLogin from './Screens/UserLogin';


function App() {
  return (
    <div className="App">
      <Navbar />
      <Router>
        <Routes>
          <Route path="/login" element={<UserLogin />}> </Route>
        </Routes>
      </Router>


    </div>
  );
}

export default App;
