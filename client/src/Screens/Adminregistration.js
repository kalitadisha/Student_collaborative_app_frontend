import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Loader from "../Components/Loader";
import Error from "../Components/Error";
import Success from "../Components/Success";
import { Link } from "react-router-dom";
import Topbar from "../ccomponents/topbar/Topbar";
//import "./Adminregistration.css"; // Import the CSS file

function Adminregistration() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);


  const [formData, setFormData] = useState({
    username: '',
    email: '',
    role: '',
    password: '',
    adminCode: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post('/api/admins/registeruseradmin', formData);
      if (response.status === 201) {
        setSuccess('Registration Successful!');
        setLoading(false);
        navigate('/loginadmin'); // Redirect to the login page after successful registration
      
    } 
  }catch (error) {
      setLoading(false);
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('An error occurred during admin registration. Please try again later.');
      }
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <Topbar/>
      <h1 className="registration-title">Admin Registration</h1>
      <form onSubmit={handleSubmit} className="registration-container" style={{ maxWidth: '500px', margin: '0 auto', padding: '20px', border: '1px solid #c3cad5', borderRadius: '5px', backgroundColor: '#c3cad5' }}>
        {loading && <Loader />}
        {error && <Error message={error} />}
        {success && <Success message='Registration Successful!' />}
        <div>
          <label style={{ marginBottom: '5px' }}>UserName:</label>
          <input
            type="text"
            className="form-control"
            placeholder="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '3px', marginBottom: '15px' }}
          />
        </div>
        <div>
          <label style={{ marginBottom: '5px' }}>Email:</label>
          <input
            type="email"
            className="form-control"
            placeholder="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '3px', marginBottom: '15px' }}
          />
        </div>
        <div>
          <label style={{ marginBottom: '5px' }}>Role:</label>
          <input
            type="text"
            className="form-control"
            placeholder="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '3px', marginBottom: '15px' }}
          />
        </div>
        <div>
          <label style={{ marginBottom: '5px' }}>Password:</label>
          <input
            type="password"
            className="form-control"
            placeholder="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '3px', marginBottom: '15px' }}
          />
        </div>
        <div>
          <label style={{ marginBottom: '5px' }}>Admin Code:</label>
          <input
            type="password"
            className="form-control"
            placeholder="admincode"
            name="adminCode"
            value={formData.adminCode}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '3px', marginBottom: '15px' }}
          />
        </div>
        <div>
          <button type="submit" className="btn btn-primary mt-3" style={{ width: '100%' }}>Register</button>
          <Link to='/loginadmin'>
            <div className="admins-buttons">
              <button className="btn landingbtn" style={{ backgroundColor: 'transparent', border: 'none', color: '#1890ff', cursor: 'pointer', marginTop: '20px' }}>Already Registered as Admin, Login here!</button>
            </div>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Adminregistration;
