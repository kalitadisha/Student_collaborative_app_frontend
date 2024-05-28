// FullImageModal.js
import React, { useRef, useEffect } from 'react';
//import './FullImageModal.css';

const FullImageModal = ({ imageUrl, onClose }) => {
  const modalRef = useRef(null);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="modal-overlay">
      <div className="modal-content" ref={modalRef}>
        <button className="close-button" onClick={onClose}>X</button>
        <img src={imageUrl} alt="Profile" className="full-image" />
      </div>
    </div>
  );
};

export default FullImageModal;
