import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Loader from "../Components/Loader";
import Error from "../Components/Error";
import Success from "../Components/Success";



function UserLogin() {

    const [Name, setname] = useState('');
    const [password, setpassword] = useState('');

    const [loading, setloading] = useState(false);
    const [error, seterror] = useState(false);
    const [success, setsuccess] = useState();

    async function Login() {

        const user = {

            Name,
            password,

        }
        
        try {

            setloading(true);
            const result = await axios.post('/api/farmers/loginfarmer', user);
            setloading(false);
            setsuccess(true);

            const delay = 2000;
            setTimeout(() => {
                localStorage.setItem('currentUser', JSON.stringify(result));
                window.location.href = '/farmer-profile/:farmerid';
            },delay);
            
            console.log(result)

 
        } catch (error) {
            console.log(error);
            setloading(false);
            seterror(true); 
        }
        console.log(user)
    }


    return (
        <div>
            {loading && (<Loader />)}
            <div className="row justify-content-center mt-5">
                <div className="col-md-5 mt-5">
                    {error && (<Error message='Invalid Credentials!' />)}
                    {success && (<Success message='Login Successful! .....redirecting' />)}
                    <div className="bs">
                        <h2 className="H2-style">Login</h2>

                        <input type="text" className="form-control" placeholder="Username"
                            value={Name} onChange={(e) => { setname(e.target.value) }} />
                        <input type="password" className="form-control" placeholder="password"
                            value={password} onChange={(e) => { setpassword(e.target.value) }} />
                           <p  className="pclass" style={{ textAlign: 'right' }}>Forgot Password?</p>
                       <div className=" btnstyle"> 
                       
                       <button className="btn btn-primary mt-3" onClick={Login}>Login</button>
                       </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default UserLogin;