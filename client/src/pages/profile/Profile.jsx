import React from 'react';
import img1 from "../../assets/background.jpg";
import img2 from "../../assets/person/user.png";
import Feed from "../../ccomponents/feed/Feed";
import Rightbar from "../../ccomponents/rightbar/Rightbar";
import Sidebar from "../../ccomponents/sidebar/Sidebar";
import Topbar from "../../ccomponents/topbar/Topbar";
import Animated from "./Animation";
import "./profile.css";

export default function Profile() {
  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
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
      </div>
    </>
  );
}
