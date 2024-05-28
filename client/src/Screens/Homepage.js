import React from 'react';
import Feed from "../../ccomponents/feed/Feed";
import Rightbar from "../../ccomponents/rightbar/Rightbar";
import Sidebar from "../../ccomponents/sidebar/Sidebar";
import Topbar from "../../ccomponents/topbar/Topbar";
import "./Home.css";

export default function Home() {
  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <Feed/>
        <Rightbar/>
      </div>
    </>
  );
}
