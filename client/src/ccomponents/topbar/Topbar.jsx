import { Chat, Notifications, Person, Search } from "@mui/icons-material";
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import img from "../../assets/person/1.png";
import "./topbar.css";


// Define dummy user profiles
const dummyUsers = [
  { id: 1, username: "JohnDoe", profilePicture: "path/to/profilePicture1.jpg" },
  { id: 2, username: "JaneSmith", profilePicture: "path/to/profilePicture2.jpg" },
  { id: 3, username: "AliceJohnson", profilePicture: "path/to/profilePicture3.jpg" },
  // Add more dummy users as needed
];

export default function Topbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Add state for authentication status
  const dropdownRef = useRef(null);
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    // Check login status when component mounts
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get('/api/users/check-login');
        setIsLoggedIn(response.data.isLoggedIn);
      } catch (error) {
        console.error("Error checking login status", error);
      }
    };

    checkLoginStatus();
  }, []);

  const handleSearch = async (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value.length > 2) {
      // Filter dummy users based on search query
      const filteredUsers = dummyUsers.filter(user =>
        user.username.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setSearchResults(filteredUsers);
    } else {
      setSearchResults([]);
    }
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleProfileClick = () => {
    // Navigate to profile page
    navigate('/profile');
  };

  const handleLogoutClick = async () => {
    try {
      // Call the logout API
      await axios.post('/api/users/logout');
      // Update authentication status
      setIsLoggedIn(false);
      // Redirect to the login page or homepage after logout
      navigate('/loginuser');
    } catch (error) {
      console.error("Error during logout", error);
    }
  };

  const handleLoginClick = () => {
    navigate('/loginuser');
  };

  const handleRegisterClick = () => {
    navigate('/registeruser');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/home">
          <span className="logo">Students' Social</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for users"
            className="searchInput"
            value={searchQuery}
            onChange={handleSearch}
          />
          {searchResults.length > 0 && (
            <div className="searchResults">
              {searchResults.map((user) => (
                <div key={user.id} className="searchResultItem">
                  <Link to={`/profile/${user.id}`} className="searchResultLink">
                    <img src={user.profilePicture} alt={user.username} className="searchResultImage" />
                    <span className="searchResultUsername">{user.username}</span>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <div className="topbarProfile" ref={dropdownRef}>
          <img src={img} alt="" className="topbarImg" onClick={toggleDropdown} />
          {dropdownVisible && (
            <div className="profileDropdown">
              {isLoggedIn ? (
                <>
                  <div className="dropdownItem" onClick={handleProfileClick}>
                    Profile
                  </div>
                  <div className="dropdownItem" onClick={handleLogoutClick}>
                    Logout
                  </div>
                </>
              ) : (
                <>
                  <div className="dropdownItem" onClick={handleLoginClick}>
                    Login
                  </div>
                  <div className="dropdownItem" onClick={handleRegisterClick}>
                    Register
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
