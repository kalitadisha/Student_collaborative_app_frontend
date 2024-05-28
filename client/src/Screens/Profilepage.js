// ProfilePage.js
import React, { useState, useRef, useEffect } from 'react';
import Feed from "../ccomponents/feed/Feed";
import Rightbar from "../ccomponents/rightbar/Rightbar";
import Sidebar from "../ccomponents/sidebar/Sidebar";
import Topbar from "../ccomponents/topbar/Topbar";
import profilePhoto from '../samples/room3.jpg';
//import './ProfilePage.css';
import FullImageModal from '../Components/FullImageModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComment } from '@fortawesome/free-solid-svg-icons';
import '../css/ProfilepageCss.css';
import Navbar from '../Components/Navbar';


const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('posts');
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [showFullImage, setShowFullImage] = useState(false);

  const followersList = ['User1', 'User2', 'User3']; // Example followers
  const followingList = ['UserA', 'UserB', 'UserC']; // Example following

  const posts = [...Array(15).keys()]; // Example posts
  const collaborationPosts = [
    { id: 1, content: 'Collaboration Post 1', collaborators: ['Alice', 'Bob'] },
    { id: 2, content: 'Collaboration Post 2', collaborators: ['Charlie'] },
  ];

  const totalPosts = posts.length + collaborationPosts.length;

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
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [replyTo, setReplyTo] = useState({ commentIndex: null, replyIndex: null });

  const addComment = () => {
    setComments([...comments, { text: newComment, replies: [] }]);
    setNewComment('');
  };

  
  const getTotalCommentsCount = (comments) => {
    let totalCount = comments.length; // Add top-level comments
    comments.forEach(comment => {
      totalCount += comment.replies.length; // Add replies count for each comment
      comment.replies.forEach(reply => {
        totalCount += getTotalCommentsCount(reply.replies); // Recursively add replies count
      });
    });
    return totalCount;
  };

  const totalCount = getTotalCommentsCount(comments);

  const addReply = (commentIndex, replyText, replyIndex = null) => {
    const updatedComments = [...comments];
    if (replyIndex === null) {
      updatedComments[commentIndex].replies.push({ text: replyText, replies: [] });
    } else if (typeof replyIndex === 'number') {
      updatedComments[commentIndex].replies[replyIndex].replies.push({ text: replyText, replies: [] });
    } else {
      const indices = replyIndex.split('-').map(Number);
      let currentReply = updatedComments[commentIndex].replies[indices[0]];
      for (let i = 1; i < indices.length; i++) {
        currentReply = currentReply.replies[indices[i]];
      }
      currentReply.replies.push({ text: replyText, replies: [] });
    }
    setComments(updatedComments);
  };

  const handleLike = () => {
    setLikes(hasLiked ? likes - 1 : likes + 1);
    setHasLiked(!hasLiked);
  };

  const renderReplies = (replies, commentIndex, parentReplyIndex = null) => {
    return replies.map((reply, replyIndex) => (
      <div key={replyIndex} className="reply">
        <div className="reply-text">{reply.text}</div>
        <div className="reply-link" onClick={() => setReplyTo({ commentIndex, replyIndex: parentReplyIndex !== null ? `${parentReplyIndex}-${replyIndex}` : replyIndex })}>
          Reply
        </div>
        {replyTo.commentIndex === commentIndex && replyTo.replyIndex === (parentReplyIndex !== null ? `${parentReplyIndex}-${replyIndex}` : replyIndex) && (
          <div className="reply-input">
            <input
              type="text"
              placeholder="Write a reply..."
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  addReply(commentIndex, e.target.value, replyTo.replyIndex);
                  setReplyTo({ commentIndex: null, replyIndex: null });
                  e.target.value = '';
                }
              }}
            />
          </div>
        )}
        {renderReplies(reply.replies, commentIndex, parentReplyIndex !== null ? `${parentReplyIndex}-${replyIndex}` : replyIndex)}
      </div>
    ));
  };

  return (
    <div className="post">
      <div className="post-content">{content}</div>
      <div className="post-actions">
        <button onClick={handleLike} className={hasLiked ? 'liked' : 'unliked'}>
          <FontAwesomeIcon icon={faThumbsUp} /> {likes}
        </button>
        <button onClick={() => setShowComments(!showComments)}>
          <FontAwesomeIcon icon={faComment} />{totalCount}
        </button>
      </div>
      {showComments && (
        <div className="comments-section">
          {comments.map((comment, commentIndex) => (
            <div key={commentIndex} className="comment">
              <div className="comment-text">{comment.text}</div>
              <div className="reply-link" onClick={() => setReplyTo({ commentIndex, replyIndex: null })}>
                Reply
              </div>
              {replyTo.commentIndex === commentIndex && replyTo.replyIndex === null && (
                <div className="reply-input">
                  <input
                    type="text"
                    placeholder="Write a reply..."
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        addReply(commentIndex, e.target.value);
                        setReplyTo({ commentIndex: null, replyIndex: null });
                        e.target.value = '';
                      }
                    }}
                  />
                </div>
              )}
              {renderReplies(comment.replies, commentIndex)}
            </div>
          ))}
          <div className="new-comment">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment"
            />
            <button onClick={addComment}>Post</button>
          </div>
        </div>
      )}
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
