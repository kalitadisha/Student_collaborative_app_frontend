import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Error from "../Components/Error";
import Loader from "../Components/Loader";
import Success from "../Components/Success";
//import { BACKEND_URL } from '../Config/constants';
import api from '../Services/api';

const UserLogin = () => {
    // State variables for email and password
    const [emailId, setEmailId] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState();
    const navigate = useNavigate();

    //const history = useHistory();
    //console.log("Backend URL:", BACKEND_URL);
    

    
    // Function to handle form submission
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {

            const userData = {
                emailId: emailId,
                password: password
              };

            const response = await api.loginUser(userData);
            // Assuming your backend sends a success message or user details upon successful login
            if (response.status === 200) {
                setSuccess('Login Successful!');
                setLoading(false);

                setEmailId('');
                setPassword('');
                navigate('/upload');
                // Redirect to the desired page after successful login
                
            } else {
                setError('Login failed');
                setLoading(false);
            }
        } catch (error) {
            //setError(true);
            setLoading(false);
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
              } else {
                setError('An error occurred during user login. Please try again later.');
              }
        }
    };
    return (
        <div>
            {loading && <Loader />}
            <div className="row justify-content-center mt-5">
                <div className="col-md-5 mt-5">
                    {error && <Error message={error} />}
                    {success && <Success message="Login successful. Redirecting..." />}
                    <div className="bs">
                        <div className="form-group">
                            <h2 className="mb-4" align="center">Login</h2>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                value={emailId}
                                onChange={(e) => setEmailId(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <p className="mt-2" style={{ textAlign: 'right' }}>
                                <Link to="/forgotpassword">Forgot password?</Link>
                            </p>
                            <button className="btn btn-primary mt-3" type="submit" onClick={handleLogin} disabled={loading}>
                                {loading ? 'Logging in...' : 'Login'}
                            </button>
                            <p className="mt-2">
                                Don't have an account? <Link to="/registeruser">Sign up</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default UserLogin;

/*import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Error from "../Components/Error";
import Loader from "../Components/Loader";
import Success from "../Components/Success";
import { BACKEND_URL } from '../Config/constants';

const UserLogin = () => {
    // State variables for email and password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState();

    //const history = useHistory();
    console.log("Backend URL:", BACKEND_URL);
    const navigate = useNavigate();


    
    // Function to handle form submission
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post("/api/users/loginuser", {
                email: email,  // Assuming your backend expects 'name' for email
                password: password
            });
            // Assuming your backend sends a success message or user details upon successful login
            if (response.status === 200) {
                setSuccess('Login Successful!');
                setLoading(false);

                setEmail('');
                setPassword('');
                navigate('/upload');
                // Redirect to the desired page after successful login
                
            } else {
                setError(true);
                setLoading(false);
            }
        } catch (error) {
            setError(true);
            setLoading(false);
            console.error("Login error:", error);
        }
    };

    return (
        <div>
            {loading && (<Loader />)}

            <div className="row justify-content-center mt-5">
                <div className="col-md-5 mt-5">
                    {error && (<Error message='Invalid Credentials!' />)}
                    {success && (<Success message='Login Successful! .....redirecting' />)}
                    

                        <div className="bs" >

                            

                            <div className="form-group" >
                        <h2 className="mb-4" align="center">Login</h2>
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
                                <p className="mt-2" style={{textAlign:'right'}} >
                                    <Link to="/loginuser">Forgot password? </Link>
                                </p>
                                <button className="btn btn-primary mt-3" type="submit" onClick={handleLogin}>Login</button>

                                <p className="mt-2">
                                    Don't have an account? <Link to="/registeruser">Sign up</Link>
                                </p>
                            </div>




                    </div>

                    
                </div>

            </div>
        </div>
    );
};

export default UserLogin;
*/