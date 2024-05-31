import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";
import Error from "../Components/Error";
import { Link } from "react-router-dom";
import Topbar from "../ccomponents/topbar/Topbar";
import "./LoginAdmin.css"; // Import the CSS file

function LoginAdmin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    adminCode: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/admins/loginadmin", formData);
      if (response.status === 200) {
        setLoading(false);
        const isAdmin = formData.adminCode === "your-secret-admin-code"; // Replace "your-admin-code" with the actual admin code
        const currentUser = {
          email: formData.email,
          password: formData.password,
          isAdmin,
        };
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        localStorage.setItem("token", response.data.token); // Save the token in local storage
        navigate("/admin-screen"); // Redirect to the admin-screen after successful login
      }
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred during login. Please try again later.");
      }
    }
  };

  return (
    <div>
      <Topbar/>
      <h1 style={{ textAlign: 'center' }}>Admin Login</h1>
      <form onSubmit={handleSubmit} className="upload-container" style={{ padding: '50px' }}>
        {loading && <Loader />}
        {error && <Error message={error} />}
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            className="form-control"
            placeholder="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{ marginBottom: '20px' }}
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            className="form-control"
            placeholder="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={{ marginBottom: '20px' }}
          />
        </div>

        <div className="form-group">
          <label>Admin Code:</label>
          <input
            type="password"
            className="form-control"
            placeholder="admincode"
            name="adminCode"
            value={formData.adminCode}
            onChange={handleChange}
            style={{ marginBottom: '20px' }}
          />
        </div>

        <div className="form-group">
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginBottom: '20px' }}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>

        <div className="form-group">
          <Link to="/registeruseradmin">
            <div className="admins-buttons">
              <button className="btn landingbtn">
                Don't have an account? Register as Admin first
              </button>
            </div>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LoginAdmin;
