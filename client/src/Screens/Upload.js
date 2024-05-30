import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../Services/api';
import Topbar from "../ccomponents/topbar/Topbar";
import '../css/Upload.css';

const Upload = () => {
  const [uploaderId, setUploaderId] = useState('');
  const [topic, setTopic] = useState('');
  const [branch, setBranch] = useState('COMPUTER_SCIENCE');
  const [semester, setSemester] = useState('SEMESTER_1');
  const [documentType, setDocumentType] = useState('NOTES');
  const [tags, setTags] = useState('');
  const [files, setFiles] = useState(null);
  const [downloadEnable, setDownloadEnable] = useState(false);
  const [commentEnable, setCommentEnable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    const formData = new FormData();
    formData.append('uploaderId', uploaderId);
    formData.append('topic', topic);
    formData.append('branch', branch);
    formData.append('semester', semester);
    formData.append('documentType', documentType);
    formData.append('tags', tags);
    formData.append('files', files);
    formData.append('downloadEnable', downloadEnable);
    formData.append('commentEnable', commentEnable);

    try {
      const response = await api.createUpload(formData);
      if (response.status === 200) {
        setSuccessMessage('Upload successful!');
        setLoading(false);
        navigate('/profile');
        setUploaderId('');
        setTopic('');
        setBranch('COMPUTER_SCIENCE');
        setSemester('SEMESTER_1');
        setDocumentType('NOTES');
        setTags('');
        setFiles(null);
        setDownloadEnable(false);
        setCommentEnable(false);
      }
    } catch (error) {
      setErrorMessage('An error occurred while uploading.');
      console.error('Upload error:', error);
      setLoading(false);
    }
  };

  return (
    <div>
      <Topbar/>
    <div className="upload-container">
      
      <div>
        <h2 className="upload-title">DocDrop: Upload Page</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <form className="upload-form" onSubmit={handleSubmit}>
          <label htmlFor="uploaderId">Uploader ID:</label>
          <input type="number" id="uploaderId" value={uploaderId} onChange={(e) => setUploaderId(e.target.value)} required />

          <label htmlFor="topic">Topic:</label>
          <input type="text" id="topic" value={topic} onChange={(e) => setTopic(e.target.value)} required />

          <label htmlFor="branch" >Branch:</label>
          <select id="branch" value={branch} onChange={(e) => setBranch(e.target.value)} required>
            <option value="COMPUTER_SCIENCE">Computer Science</option>
            <option value="CIVIL">Civil</option>
            <option value="MECHANICAL">Mechanical</option>
            <option value="ELECTRICAL">Electrical</option>
            <option value="INSTRUMENTATION">Instrumentation</option>
          </select>

          <label htmlFor="semester">Semester:</label>
          <select id="semester" value={semester} onChange={(e) => setSemester(e.target.value)} required>
            <option value="SEMESTER_1">1st Semester</option>
            <option value="SEMESTER_2">2nd Semester</option>
            <option value="SEMESTER_3">3rd Semester</option>
            <option value="SEMESTER_4">4th Semester</option>
            <option value="SEMESTER_5">5th Semester</option>
            <option value="SEMESTER_6">6th Semester</option>
            <option value="SEMESTER_7">7th Semester</option>
            <option value="SEMESTER_8">8th Semester</option>
          </select>

          <label htmlFor="documentType">Document Type:</label>
          <select id="documentType" value={documentType} onChange={(e) => setDocumentType(e.target.value)} required>
            <option value="NOTES">Notes</option>
            <option value="ASSIGNMENTS">Assignments</option>
            <option value="LECTURES">Lectures</option>
            <option value="RESEARCH_PAPER">Research Paper</option>
            <option value="PROJECT_FILES">Project Files</option>
            <option value="OTHERS">Others</option>
          </select>

          <label htmlFor="tags">Tags:</label>
          <input type="text" id="tags" value={tags} onChange={(e) => setTags(e.target.value)} />

          <label for="file-upload" class="custom-file-upload">Choose File</label>
<input id="file-upload" type="file" className="file-input" onChange={(e) => setFiles(e.target.files[0])} required/>

          <label htmlFor="downloadEnable">Download Enable:</label>
          <select id="downloadEnable" value={downloadEnable} onChange={(e) => setDownloadEnable(e.target.value)}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>

          <label htmlFor="commentEnable">Comment Enable:</label>
          <select id="commentEnable" value={commentEnable} onChange={(e) => setCommentEnable(e.target.value)}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>

          <button type="submit">Upload</button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Upload;
