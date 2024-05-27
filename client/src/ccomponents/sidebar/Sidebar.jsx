import Button from '@mui/material/Button';
import React from 'react';
import NestedList from './listanime';
import "./sidebar.css";
export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <NestedList/>
        <Button variant="outlined">Show more</Button>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
        </ul>
      </div>
    </div>
  );
}
