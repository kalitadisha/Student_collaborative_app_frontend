import React, { useState } from "react";
import axios from "axios";

import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from "../components/Success";
import { Link } from "react-router-dom";

function Userregistration() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);


  const [formData, setFormData] = useState({

    email: '',
    password: '',
  });

 

 
  return (
    <div>
      <h1>User Registration</h1>
      
    
        {loading && <Loader />}
        {error && <Error message={error} />}
        {success && <Success message='Registration Successful!' />}
        <div className="row justify-content-center mt-5">
          <div className="col-md-5 mt-5">
            < div className="bs">
              
              <div>
                <label>Email:</label>
                <input type="email" className="form-control" placeholder="email"
                  name="email" value={formData.email} onChange={handleChange} />  
              </div>
             
              <div>
                <label>Password:</label>
                <input type="password" className="form-control" placeholder="password"
                  name="password" value={formData.password} onChange={handleChange}/>
              </div>
              
              <div>
                <button type="submit" className="btn btn-primary mt-3">Register</button>
                <Link to='/loginuser'>
          <div className="user-buttons">
            <button className="btn landingbtn">Already Registered as User, Login here!</button>
          </div>
        </Link>
              </div>
              
      
            </div>
          </div>
        </div>
      </div>
    
  );
}

export default Userregistration;