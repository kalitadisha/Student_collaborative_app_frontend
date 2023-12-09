import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import { BrowserRouter , Route, Routes} from 'react-router-dom';
import Userregistration from './Screens/register_user';

function App() {
  return (
    <div className="App">
      <Navbar/>
       
       <Routes>
       <Route path = "/registeruser" element = {<register_user/>} />
       </Routes>
      
    </div>
  );
}

export default App;
