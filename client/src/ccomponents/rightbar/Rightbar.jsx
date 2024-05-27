import React from 'react';
import img1 from "../../assets/person/1.png";
import img2 from "../../assets/person/2.png";
import img3 from "../../assets/person/3.png";
import img4 from "../../assets/person/4.png";
import img5 from "../../assets/person/5.png";
import img6 from "../../assets/person/6.png";
import AnimatedTooltip from "./custom/animated-tooltip";
import "./rightbar.css";

export default function Rightbar({ profile }) {
  const friends = [
    { id: 1, name: "Rahul", img: img1 },
    { id: 2, name: "Kushnasin", img: img2 },
    { id: 3, name: "Anurag", img: img3 },
    { id: 4, name: "Sudarshan", img: img4 },
    { id: 5, name: "Arpita", img: img5 },
    { id: 6, name: "Disha", img: img6 },
  ];

  const userInfo = [
    { key: "City", value: "Guwahati" },
    { key: "From", value: "Assam" },
    { key: "Relationship", value: "Single" },
  ];

  const ProfileRightbar = () => {
    return (
      <>
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          {userInfo.map((info) => (
            <div className="rightbarInfoItem" key={info.key}>
              <span className="rightbarInfoKey">{info.key}:</span>
              <span className="rightbarInfoValue">{info.value}</span>
            </div>
          ))}
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          <AnimatedTooltip items={friends} />
        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        <ProfileRightbar />
      </div>
    </div>
  );
}
