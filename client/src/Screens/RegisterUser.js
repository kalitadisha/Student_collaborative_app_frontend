import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Error from "../Components/Error";
import Loader from "../Components/Loader";
import Success from "../Components/Success";
//import { BACKEND_URL } from '../Config/constants';
import api from '../Services/api';

const RegisterUser = () => {
  // State variables for email and password
  //const [username, setUsername] = useState('');
  const [id, setId] = useState('');
  const [emailId, setEmailId] = useState('');
  const [emailIdError, setEmailIdError] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setcpassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [idError, setIdError] = useState(); // State for ID uniqueness error
  const [success, setSuccess] = useState();
  const navigate = useNavigate();

  //console.log("Backend URL:", BACKEND_URL);

  // Function to handle form submission
  const handleRegistration = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Password confirmation check
    if (password !== cpassword) {
      setPasswordError('Passwords do not match');
      setLoading(false);
      return; // Exit function if passwords don't match
    }

    try {
                  const userData = {
                    id: id,
                    emailId: emailId,
                    password: password
                  };

                  // Check if the ID is unique
                  const isIdUnique = await api.checkIdUnique(id);
                  if (!isIdUnique) {
                    setIdError('ID already exists');
                    setLoading(false);
                    return;
                  }

                  const isEmailIdUnique = await api.checkEmailIdUnique(emailId);
                    if (!isEmailIdUnique) {
                        setEmailIdError('Email already exists');
                        setLoading(false);
                        return;
                    }

                
                  if (!id || !emailId || !password || !cpassword) {
                    setError('All fields are required');
                    setLoading(false);
                    return;
                  }

                
                    const response = await api.registerUser(userData);
                    //if (response.status === 200)
                    if (response.ok) {
                      setSuccess('Registration Successful!');
                      setLoading(false);
                      navigate('/loginuser'); 
                      // Redirect to the login page after successful registration
                      // Clear error state
                    //setError('');
                    
                      // Clear form fields after successful registration
                    setId('')
                    setEmailId('');
                    setPassword('');
                    setcpassword('');
                      
                  } else {
                      setError('Registration failed');
                      setLoading(false);
                  }
                  

                } catch (error) {
                  // Handle error
                  setError('An error occurred during registration. Please try again later.');
                  setLoading(false);
                  //throw error;
                  // Handle error
                  /*setLoading(false);
                  if (error.response && error.response.data && error.response.data.message) {
                    setError(error.response.data.message);
                  } else {
                    setError('An error occurred during user registration. Please try again later.');
                  }*/
                  
  }
};
return (
  <div>
      {loading && <Loader />}
      <h1>User Registration</h1>
      {error && <Error message={error} />}
      {success && <Success message="Registration successful. Redirecting to login..." />}
      <form onSubmit={handleRegistration}>
          <div className="row justify-content-center mt-5">
              <div className="col-md-5 mt-5">
                  <div className="bs">
                      <div className="form-group">
                          <h2 className="mb-4" align="center">Registration</h2>
                          
                          <div>
                          <label htmlFor="id">ID (Institute/University Roll Number):</label>
                          <input
                              type="text"
                              className="form-control"
                              placeholder="Id"
                              value={id}
                              onChange={(e) => {setId(e.target.value)
                              }}
                              required
                          />
                          {/* Display ID uniqueness error message */}
                          {idError && <div style={{ color: 'red' }} className="text-danger">{idError}</div>} 
                          </div>
                          
                          
                          <div>
                          <label htmlFor="emailId">Email:</label>

                          <input
                              type="email"
                              className="form-control"
                              placeholder="Email"
                              value={emailId}
                              onChange={(e) => setEmailId(e.target.value)}
                              required
                          />
                          {/* Error message for email */}
                          {emailIdError && <div style={{ color: 'red' }}>{emailIdError}</div>}
                          </div>
                          <div>
                          <label htmlFor="password">Password:</label>

                          <input
                              type="password"
                              className="form-control"
                              placeholder="Password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                          />
                          </div>
                          <div>
                          <label htmlFor="cpassword">Confirm Password:</label>
                          <input
                              type="password"
                              className="form-control"
                              placeholder="Confirm Password"
                              value={cpassword}
                              onChange={(e) => {setcpassword(e.target.value);
                                setPasswordError('');}}
                              required
                          />
                          {/* Display error message */}
                          {passwordError && <div style={{ color: 'red' }}>{passwordError}</div>}
                          </div>
                           

                          
                          <button className="btn btn-primary mt-3" type="submit" disabled={loading}>
                              {loading ? 'Registering...' : 'Register'}
                          </button>
                          <p className="mt-2">
                              Already a user? <Link to="/loginuser">Sign in</Link>
                          </p>
                      </div>
                  </div>
              </div>
          </div>
      </form>
  </div>
);
};

export default RegisterUser;

/*import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Error from "../Components/Error";
import Loader from "../Components/Loader";
import Success from "../Components/Success";
import { BACKEND_URL } from '../Config/constants';

const RegisterUser = () => {
  // State variables for email and password
  //const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setcpassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState();
 /* const [formData, setFormData] = useState({    
    email: '',
    password: '',
    cpassword: '',
  }); 

        // Log the BACKEND_URL to the console
        console.log("Backend URL:", BACKEND_URL);

        const navigate = useNavigate();

       /* const handleChange = (e) => {
          setFormData({ ...formData, [e.target.name]: e.target.value });
        };

  // Function to handle form submission
  const handleRegistration = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Password confirmation check
    if (password !== cpassword) {
      setError(true);
      setLoading(false);
      return; // Exit function if passwords don't match
    }

    try {
      // Validation logic (e.g., check email format, password length)
      // You can add more validation rules as needed
      if (!email || !password) {
        setError(true);
        setLoading(false);
        return;
      }

     
        const response = await axios.post("/api/users/registeruser", {
          // Pass user registration details to the backend
          email: email,
          password: password,  
          cpassword: cpassword
        });
        if (response.status === 201) {
          setSuccess('Registration Successful!');
          setLoading(false);
          navigate('/loginuser'); // Redirect to the login page after successful registration
          // Clear form fields after successful registration
        setEmail('');
        setPassword('');
        setcpassword('');
          
      } else {
          setError(true);
          setLoading(false);
      }

    } catch (error) {
      // Handle error
      setLoading(false);
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('An error occurred during admin registration. Please try again later.');
      }
      
  }
};
return (
  <div>
    <h1>User Registration</h1>
    <form onSubmit={handleRegistration}>
      {loading && <Loader />}
      {error && <Error />}
      {success && <Success message='Registration Successful!' />}
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5">
          <div className="bs">
            <div className="form-group">
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
        </div>
      </div>
    </form>
  </div>
);
}

export default RegisterUser;
/*

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
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <input
                type="password"
                className="form-control"
                placeholder="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                className="form-control"
                placeholder="confirm password"
                name="cpassword"
                value={formData.cpassword}
                onChange={handleChange}
                required
              />
                
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
*/

