import { Chat, Notifications, Person, Search } from "@mui/icons-material";
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import img from "../../assets/person/1.png";
import "./topbar.css";

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
        const response = await axios.get('/api/check-login');
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
      try {
        const response = await axios.get(`/api/search?q=${e.target.value}`);
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error fetching search results", error);
      }
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
      await axios.post('/api/logout');
      // Update authentication status
      setIsLoggedIn(false);
      // Redirect to the login page or homepage after logout
      navigate('/login');
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
        <span className="logo" href="/">Students' Social</span>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for projects or assignments"
            className="searchInput"
            value={searchQuery}
            onChange={handleSearch}
          />
          {searchResults.length > 0 && (
            <div className="searchResults">
              {searchResults.map((doc) => (
                <div key={doc.id} className="searchResultItem">
                  <a href={doc.url} target="_blank" rel="noopener noreferrer">
                    {doc.name} ({doc.type})
                  </a>
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
