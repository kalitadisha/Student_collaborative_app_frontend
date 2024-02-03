import React, { useState } from "react";
import axios from "axios";

import Loader from "../Components/Loader";
import Error from "../Components/Error";
import Success from "../Components/Success";
import { Link, useHistory } from "react-router-dom";

const UserLogin = () => {
    // State variables for email and password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState();

    //const history = useHistory();




    // Function to handle form submission
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post("/api/users/loginuser", {
                name: email,  // Assuming your backend expects 'name' for email
                password: password
            });
            // Assuming your backend sends a success message or user details upon successful login
            if (response.data) {
                setSuccess(true);
                setLoading(false);
                // Redirect to the desired page after successful login
                //history.push("/dashboard");  // Change '/dashboard' to the desired path
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
