import { Form, Layout } from "antd";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import api from '../Services/api';
import Topbar from "../ccomponents/topbar/Topbar";
import '../css/Upload.css';

const { Content } = Layout;

const Upload = () => {
  const [form] = Form.useForm();
  const [uploaderId, setUploaderId] = useState('');
  const [topic, setTopic] = useState('');
  const [branch, setBranch] = useState('COMPUTER_SCIENCE');
  const [semester, setSemester] = useState('SEMESTER_1');
  const [documentType, setDocumentType] = useState('NOTES');
  const [tags, setTags] = useState('');
  const [files, setFiles] = useState(null);
  const [fileName, setFileName] = useState('No file chosen'); // State for file name
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
      //const response = await api.createUpload(formData);
      if (1) {
        setSuccessMessage('Upload successful!');
        setLoading(false);
        form.resetFields();
        Swal.fire('Success', 'Upload Successful!', 'success').then(() => {
          navigate('/home');
        });
        // Save the filename to local storage
<<<<<<< HEAD
        //localStorage.setItem('uploadedFileName', fileName);
        navigate(`/home?filename=${encodeURIComponent(fileName)}`);
=======
        localStorage.setItem('uploadedFileName', fileName);
        navigate(`/home?fileName=${encodeURIComponent(fileName)}`);

>>>>>>> b117981d304c3b7cda6200079442522ba81fbed8
        setUploaderId('');
        setTopic('');
        setBranch('COMPUTER_SCIENCE');
        setSemester('SEMESTER_1');
        setDocumentType('NOTES');
        setTags('');
        setFiles(null);
        setFileName('No file chosen'); // Reset file name after form submission
        setDownloadEnable(false);
        setCommentEnable(false);
      }
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('An error occurred during upload. Please try again later.');
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFiles(file);
      setFileName(file.name);
    } else {
      setFiles(null);
      setFileName('No file chosen');
    }
  };

  return (
    <div>
      <Topbar />
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

            <label htmlFor="branch">Branch:</label>
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

            <div className="file-input-container">
              <label htmlFor="file-upload">File:</label>
              <input id="file-upload" type="file" className="file-input custom-file-upload" onChange={handleFileChange} required />

              <div className="file-name-container" style={{ display: 'flex', alignItems: 'center' }}>
                <button type="button" className="file-input-button" onClick={() => document.getElementById('file-upload').click()}>Choose File</button>
                <span className="file-name" style={{ marginLeft: '10px' }}>{fileName}</span>
              </div>
            </div>

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

            <button type="submit" disabled={loading}>
              {loading ? 'Uploading...' : 'Upload'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Upload;
