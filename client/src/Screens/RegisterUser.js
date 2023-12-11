import React, { useState } from "react";
import axios from "axios";

import Loader from "../Components/Loader";
import Error from "../Components/Error";
import Success from "../Components/Success";
import { Link } from "react-router-dom";

const RegisterUser = () => {
  // State variables for email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setcpassword] = useState('');

  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  const [success, setsuccess] = useState();



  // Function to handle form submission
  const handleRegistration = (e) => {
    e.preventDefault();
    // Perform registration logic here (e.g., API call)
    console.log('Email:', email);
    console.log('Password:', password);
    // Reset the form fields after submission
    setEmail('');
    setPassword('');
  };

  return (
    <div>
      {loading && (<Loader />)}

      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5">
          {success && (<Success message='Registration Successful!' />)}
          <form onSubmit={handleRegistration}>

            <div className="bs" >

              {error && (<Error />)}

              <div className="form-group" >
                <h2 className="mb-4" align="center">Registration</h2>
                <input
                  type="email"
                  className="form-control"
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />


                <input
                  type="password"
                  className="form-control"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <input
                  type="password"
                  className="form-control"
                  placeholder="confirm password"
                  value={cpassword}
                  onChange={(e) => { setcpassword(e.target.value) }}
                />
                <button className="btn btn-primary mt-3" type="submit">Register</button>

                <p className="mt-2">
                  Already a user? <Link to="/loginuser">Sign in</Link>
                </p>
              </div>




            </div>

          </form>
        </div>

      </div>
    </div>
  );
};

export default RegisterUser;