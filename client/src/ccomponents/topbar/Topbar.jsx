import { Chat, Notifications, Person, Search } from "@mui/icons-material";
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import img from "../../assets/person/1.png";
import "./topbar.css";
 

export default function Topbar() {

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  const handleSearch = async (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value.length > 2) {
      try {
        const response = await axios.get(`/search?q=${e.target.value}`);
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
    // Add navigation or action for profile
    console.log("Profile clicked");
  };

  const handleLogoutClick = () => {
    // Add logout functionality
    console.log("Logout clicked");
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
              <div className="dropdownItem" onClick={handleProfileClick}>
                Profile
              </div>
              <div className="dropdownItem" onClick={handleLogoutClick}>
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
