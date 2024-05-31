import { PermMedia } from "@mui/icons-material";
import AddCommentIcon from '@mui/icons-material/AddComment';
import SendIcon from '@mui/icons-material/Send';
import ShareIcon from '@mui/icons-material/Share';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import img from "../../assets/person/user.png";
import "./share.css";

export default function Share() {
  const [commentVisible, setCommentVisible] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState('');
  const [rating, setRating] = useState(0);
  const [workAdded, setWorkAdded] = useState(false);
  const [postContent, setPostContent] = useState('');

  const navigate = useNavigate(); // Initialize useNavigate

  const handleCommentInputChange = (e) => {
    setCommentInput(e.target.value);
  };

  const handleRatingChange = (newRating) => {
    setRating(prevRating => prevRating === newRating ? 0 : newRating);
  };

  const handleShare = () => {
    const link = 'http://yourwebsite.com/post/123'; // Example link
    navigator.clipboard.writeText(link).then(() => {
      alert('Link copied to clipboard!');
    }).catch(() => {
      alert('Failed to copy the link');
    });
  };

  const handlePostContentChange = (e) => {
    setPostContent(e.target.value);
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setWorkAdded(true);
    }
  };

  const getStarColor = (value) => {
    if (rating === 0) return "gray";
    if (rating === 1) return "red";
    if (rating === 2) return "orange";
    if (rating === 3) return "yellow";
    if (rating >= 4) return "green";
    return "gray";
  };

  const toggleCommentVisibility = () => {
    setCommentVisible(!commentVisible);
  };

  const handleCommentSubmit = () => {
    if (commentInput.trim()) {
      setComments([...comments, { text: commentInput, replies: [] }]);
      setCommentInput('');
    }
  };

  const handleReplySubmit = (index, replyText) => {
    const newComments = [...comments];
    newComments[index].replies.push({ text: replyText, replies: [] });
    setComments(newComments);
  };

  const redirectToUpload = () => {
    window.location.href = '/upload';
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src={img} alt="" />
          <input
            placeholder="Share your imagination"
            className="shareInput"
            value={postContent}
            onChange={handlePostContentChange}
          />
        </div>
        <hr className="shareHr" />
        <div className="shareBottom">
          <div className="shareOptions">
            <div className="shareOption" onClick={redirectToUpload}>
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Add your work</span>
            </div>
            <div
              className={`shareOption ${!workAdded ? 'disabled' : ''}`}
              onClick={toggleCommentVisibility}
            >
              <AddCommentIcon htmlColor={!workAdded ? "gray" : "blue"} className="shareIcon" />
              <span className="shareOptionText">Comment</span>
            </div>
            <div className={`shareOption ${!workAdded ? 'disabled' : ''}`}>
              <StarBorderIcon htmlColor={!workAdded ? "gray" : getStarColor(1)} className="shareIcon" />
              <span className="shareOptionText">Rate</span>
              <div className="rating">
                {[1, 2, 3, 4, 5].map((value) => (
                  <StarBorderIcon
                    key={value}
                    htmlColor={rating >= value ? (!workAdded ? "gray" : getStarColor(value)) : "gray"}
                    className="ratingStar"
                    onClick={() => workAdded && handleRatingChange(value)}
                  />
                ))}
              </div>
            </div>
            <div
              className={`shareOption ${!workAdded ? 'disabled' : ''}`}
              onClick={() => workAdded && handleShare()}
            >
              <ShareIcon htmlColor={!workAdded ? "gray" : "goldenrod"} className="shareIcon" />
              <span className="shareOptionText">Share</span>
            </div>
          </div>
          {commentVisible && (
            <>
              <div className="commentInputContainer">
                <input
                  type="text"
                  value={commentInput}
                  onChange={handleCommentInputChange}
                  placeholder="Add a comment"
                  className="commentInput"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleCommentSubmit();
                  }}
                />
                <SendIcon
                  className="sendIcon"
                  onClick={handleCommentSubmit}
                />
              </div>
              <div className="commentsSection">
                {comments.map((comment, index) => (
                  <Comment
                    key={index}
                    comment={comment}
                    onReply={(replyText) => handleReplySubmit(index, replyText)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const Comment = ({ comment, onReply }) => {
  const [replyVisible, setReplyVisible] = useState(false);
  const [replyInput, setReplyInput] = useState('');

  const handleReplyInputChange = (e) => {
    setReplyInput(e.target.value);
  };

  const handleReplySubmit = () => {
    if (replyInput.trim()) {
      onReply(replyInput);
      setReplyInput('');
      setReplyVisible(false);
    }
  };

  return (
    <div className="comment">
      <div className="commentText">{comment.text}</div>
      <div className="commentActions">
        <span className="replyLink" onClick={() => setReplyVisible(!replyVisible)}>Reply</span>
      </div>
      {replyVisible && (
        <div className="replyInputContainer">
          <input
            type="text"
            value={replyInput}
            onChange={handleReplyInputChange}
            placeholder="Reply"
            className="replyInput"
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleReplySubmit();
            }}
          />
          <SendIcon
            className="sendIcon"
            onClick={handleReplySubmit}
          />
        </div>
      )}
      <div className="replies">
        {comment.replies.map((reply, index) => (
          <Comment
            key={index}
            comment={reply}
            onReply={(replyText) => onReply(replyText)}
          />
        ))}
      </div>
    </div>
  );
}
