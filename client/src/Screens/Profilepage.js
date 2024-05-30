// ProfilePage.js
import axios from 'axios';

import AddCommentIcon from '@mui/icons-material/AddComment';
import SendIcon from '@mui/icons-material/Send';
import ShareIcon from '@mui/icons-material/Share';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import React, { useEffect, useRef, useState } from 'react';
import Topbar from "../ccomponents/topbar/Topbar";
import profilePhoto from '../samples/room3.jpg';
//import './ProfilePage.css';
import FullImageModal from '../Components/FullImageModal';
import '../css/ProfilepageCss.css';


const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('posts');
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [showFullImage, setShowFullImage] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);


  const followersList = ['User1', 'User2', 'User3']; 
  const followingList = ['UserA', 'UserB', 'UserC']; 

  const posts = [...Array(15).keys()]; // Example posts

  const collaborationPosts = [
    { id: 1, content: 'Collaboration Post 1', collaborators: ['Alice', 'Bob'] },
    { id: 2, content: 'Collaboration Post 2', collaborators: ['Charlie'] },
  ];

  const totalPosts = posts.length + collaborationPosts.length;

  const handleFollow = (userId, setTotalFollowers) => {
    const loggedInUserId = 789; // Replace with the actual logged-in user's ID
    const followEndpoint = isFollowing ? 'unfollow' : 'follow';
    axios.post(`/api/users/${userId}/${followEndpoint}/${loggedInUserId}`)
      .then(() => {
        setIsFollowing(!isFollowing);
        // Assuming setTotalFollowers is defined elsewhere
        setTotalFollowers(prev => isFollowing ? prev - 1 : prev + 1);
      })
      .catch(error => {
        console.error('Error following/unfollowing user:', error);
      });
  };
  

  return (
    <div>
        <Topbar />
    <div className="profile-page">
        
      <ProfileHeader setShowFullImage={setShowFullImage} />
      <ProfileStats 
        followersList={followersList}
        followingList={followingList}
        totalPosts={totalPosts}
        setShowFollowers={setShowFollowers}
        setShowFollowing={setShowFollowing}
      />
      <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'posts' ? <Posts posts={posts} /> : <Collaborations collaborationPosts={collaborationPosts} />}
      {showFollowers && (
        <FollowersModal followers={followersList} onClose={() => setShowFollowers(false)} />
      )}
      {showFollowing && (
        <FollowingModal following={followingList} onClose={() => setShowFollowing(false)} />
      )}
      {showFullImage && (
        <FullImageModal imageUrl={profilePhoto} onClose={() => setShowFullImage(false)} />
      )}
    </div></div>
  );
};

const ProfileHeader = ({ setShowFullImage }) => {
  const [followers, setFollowers] = useState(123);
  const [isFollowing, setIsFollowing] = useState(false);
  const userName = "John Doe"; // Example user name
  const userDetails = "Bio: Web Developer | Location: New York, USA"; // Example user details

  const handleFollow = () => {
    if (isFollowing) {
      setFollowers(followers - 1);
    } else {
      setFollowers(followers + 1);
    }
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="profile-header-container">
      <div className="profile-header-left">
        <img 
          src={profilePhoto} 
          alt="Profile" 
          className="profile-photo" 
          onClick={() => setShowFullImage(true)}
        />
        <div className="profile-info">
          <h2 className="profile-name">{userName}</h2>
          <button onClick={handleFollow} className="follow-button">
            {isFollowing ? 'Unfollow' : 'Follow'}
          </button>
        </div>
      </div>
      <div className="profile-header-right">
        <p>{userDetails}</p>
      </div>
    </div>
  );
};

const ProfileStats = ({ followersList, followingList, totalPosts, setShowFollowers, setShowFollowing }) => {
  return (
    <div className="profile-stats">
      <div className="stat" onClick={() => setShowFollowers(true)}>
        <strong>{followersList.length}</strong>
        <br />
        <span>Followers</span>
      </div>
      <div className="stat" onClick={() => setShowFollowing(true)}>
        <strong>{followingList.length}</strong>
        <br />
        <span>Following</span>
      </div>
      <div className="stat">
        <strong>{totalPosts}</strong>
        <br />
        <span>Posts</span>
      </div>
    </div>
  );
};

const ProfileTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="profile-tabs">
      <nav>
        <button onClick={() => setActiveTab('posts')} className={activeTab === 'posts' ? 'active' : ''}>
          My Posts
        </button>
        <button onClick={() => setActiveTab('collaborations')} className={activeTab === 'collaborations' ? 'active' : ''}>
          Collaborations
        </button>
      </nav>
    </div>
  );
};

const Posts = ({ posts }) => {
  const [visiblePosts, setVisiblePosts] = useState(5);

  const loadMore = () => {
    setVisiblePosts((prev) => prev + 5);
  };

  return (
    <div className="posts">
      {posts.slice(0, visiblePosts).map((post, index) => (
        <Post key={index} post={{ content: `Post ${index + 1}` }} />
      ))}
      {visiblePosts < posts.length && <button onClick={loadMore}>Load More</button>}
    </div>
  );
};

const Collaborations = ({ collaborationPosts }) => {
  const [visiblePosts, setVisiblePosts] = useState(5);

  const loadMore = () => {
    setVisiblePosts((prev) => prev + 5);
  };

  return (
    <div className="posts">
      {collaborationPosts.slice(0, visiblePosts).map((post) => (
        <Post key={post.id} post={post} />
      ))}
      {visiblePosts < collaborationPosts.length && <button onClick={loadMore}>Load More</button>}
    </div>
  );
};

const Post = ({ post }) => {
  const { content, collaborators } = post;
  
  const [commentVisible, setCommentVisible] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState('');
  const [rating, setRating] = useState(0);
  const [workAdded, setWorkAdded] = useState(false);
  const [postContent, setPostContent] = useState('');

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
    if (1) {
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

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          
        </div>
        <hr className="shareHr" />
        <div className="shareBottom">
          <div className="shareOptions">
            <div className="shareOption">
              <input type="file" id="files" style={{ display: 'none' }} onChange={handleFileChange} />
              
              
            </div>
            <div
              
              onClick={toggleCommentVisibility}
            >
              <AddCommentIcon htmlColor={"blue"} className="shareIcon" />
              <span className="shareOptionText">Comment</span>
            </div>
            <div className="shareOption ">
              <StarBorderIcon htmlColor={getStarColor(1)} className="shareIcon" />
              <span className="shareOptionText">Rate</span>
              <div className="rating">
                {[1, 2, 3, 4, 5].map((value) => (
                  <StarBorderIcon 
                    key={value}
                    htmlColor={rating >= value ? getStarColor(value) : "gray"}
                    className="ratingStar"
                    onClick={() => handleRatingChange(value)}
                  />
                ))}
              </div>
            </div>
            <div
              
              onClick={() => handleShare()}
            >
              <ShareIcon htmlColor={"goldenrod"} className="shareIcon" />
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
    
      {collaborators && (
        <div className="collaborators">
          Collaborated with:{' '}
          {collaborators.map((collaborator, index) => (
            <a href={`/profile/${collaborator}`} key={index} className="collaborator-link">
              {collaborator}
              {index < collaborators.length - 1 ? ', ' : ''}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

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
};



const useOutsideClick = (ref, onClose) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, onClose]);
};

const FollowersModal = ({ followers, onClose }) => {
  const modalRef = useRef(null);
  useOutsideClick(modalRef, onClose);

  return (
    <div className="modal">
      <div className="modal-content" ref={modalRef}>
        <button onClick={onClose} className="close-button">X</button>
        <h3>Followers</h3>
        <ul>
          {followers.map((follower, index) => (
            <li key={index}>{follower}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const FollowingModal = ({ following, onClose }) => {
  const modalRef = useRef(null);
  useOutsideClick(modalRef, onClose);

  return (
    <div className="modal">
      <div className="modal-content" ref={modalRef}>
        <button onClick={onClose} className="close-button">X</button>
        <h3>Following</h3>
        <ul>
          {following.map((follow, index) => (
            <li key={index}>
              <a href={`/profile/${follow}`}>{follow}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfilePage;
