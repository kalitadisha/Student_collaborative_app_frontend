import { PermMedia } from "@mui/icons-material";
import AddCommentIcon from '@mui/icons-material/AddComment';
import ShareIcon from '@mui/icons-material/Share';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import React from 'react';
import img from "../../assets/person/user.png";
import "./share.css";
export default function Share() {
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src={img} alt="" />
          <input
            placeholder="Share your imagination"
            className="shareInput"
          />
        </div>
        <hr className="shareHr" />
        <div className="shareBottom">
          <div className="shareOptions">
            <div className="shareOption">
              <input type="file" id="files" style={{ display: 'none' }} />
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <label className="shareOptionText" htmlFor="files">Add your work</label>
            </div>
            <div className="shareOption">
              <AddCommentIcon htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Comment</span>
            </div>
            <div className="shareOption">
              <StarBorderIcon htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Rate</span>
            </div>
            <div className="shareOption">
              <ShareIcon htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Share</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
