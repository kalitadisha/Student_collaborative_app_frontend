import React from "react";
import { Link } from "react-router-dom";
import '../css/Landingscreen.css'; // Ensure you have a CSS file for custom styles
import Topbar from "../ccomponents/topbar/Topbar";

function Landingscreen() {
  return (
    <div>
      <Topbar/>
    <div className="row landing justify-content-center align-items-center">
      
      <div className="col-md-9 my-auto text-center" style={{ borderRight: '8px solid white' }}>
        <h2 className="landing-title">Student Collaborative Hub</h2>
        <h1 className="landing-subtitle">"Empowering Students to Connect, Collaborate, and Succeed"</h1>

        <Link to='/registeruser'>
          <button className="btn landingbtn" style={{ color: 'white' }}>Get Started</button>
        </Link>
      </div>
    </div>
    </div>
  );
}

export default Landingscreen;
