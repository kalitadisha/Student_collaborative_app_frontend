// Profile.js

import React, { useState } from 'react';
import img1 from "../../assets/background.jpg";
import img2 from "../../assets/person/user.png";
import Feed from "../../ccomponents/feed/Feed";
import Rightbar from "../../ccomponents/rightbar/Rightbar";
import Sidebar from "../../ccomponents/sidebar/Sidebar";
import Topbar from "../../ccomponents/topbar/Topbar";
import Animated from "./Animation";
import "./profile.css";

export default function Profile() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  return (
    <>
      <Topbar />
      <div className={`profile ${sidebarExpanded ? 'expanded' : ''}`}>
        <div className={`sidebar ${sidebarExpanded ? 'expanded' : ''}`}>
          <Sidebar />
        </div>
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={img1}
                alt=""
              />
              <img
                className="profileUserImg"
                src={img2}
                alt=""
              />
            </div>
            <div className="profileInfo">
              <div className="profileInfoWrapper">
                <Animated />
                {/* <h4 className="profileInfoName">Akash</h4> */}
              </div>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed />
            <Rightbar profile />
          </div>
        </div>
        <div className={`expandSidebarButton ${sidebarExpanded ? 'expanded' : ''}`} onClick={toggleSidebar}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="none" d="M0 0h24v24H0z"/>
            <path d="M10 17l5-5-5-5v10z"/>
          </svg>
        </div>
      </div>
    </>
  );
}
