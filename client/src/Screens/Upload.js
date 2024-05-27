//import axios from 'axios'; // For making HTTP requests
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../Services/api';

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

    // Create FormData object to handle file upload
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
      if (response.status === 200){
        setSuccessMessage('Upload successful!');
        setLoading(false);
        navigate('/profile');

       
        // Clear form fields after Upload successful 
        setUploaderId('')
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
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
      <h2 style={{ fontSize: '24px', textAlign: 'center', marginBottom: '20px' }}>DocDrop: Upload Page</h2>
      {errorMessage && <p style={{ marginTop: '10px', padding: '10px', borderRadius: '3px', backgroundColor: '#ffcccc' }}>{errorMessage}</p>}
      {successMessage && <p style={{ marginTop: '10px', padding: '10px', borderRadius: '3px', backgroundColor: '#ccffcc' }}>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="uploaderId" style={{ display: 'block', marginBottom: '5px' }}>Uploader ID:</label>
          <input type="number" id="uploaderId" style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '3px' }} value={uploaderId} onChange={(e) => setUploaderId(e.target.value)} required />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="topic" style={{ display: 'block', marginBottom: '5px' }}>Topic:</label>
          <input type="text" id="topic" style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '3px' }} value={topic} onChange={(e) => setTopic(e.target.value)} required />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="branch" style={{ display: 'block', marginBottom: '5px' }}>Branch:</label>
          <select id="branch" style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '3px' }} value={branch} onChange={(e) => setBranch(e.target.value)} required>
            
              <option value="COMPUTER_SCIENCE">Computer Science</option>
              <option value="CIVIL">Civil</option>
              <option value="MECHANICAL">Mechanical</option>
              <option value="ELECTRICAL">Electrical</option>
              <option value="INSTRUMENTATION">Instrumentation</option>
            
          </select>
        </div>
        <div style={{ marginBottom: '15px' }}>
        <label htmlFor="semester" style={{ display: 'block', marginBottom: '5px' }}>Semester:</label>
        <select id="semester" style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '3px' }} value={semester} onChange={(e) => setSemester(e.target.value)} required>

              <option value="SEMESTER_1">1st Semester</option>
              <option value="SEMESTER_2">2nd Semester</option>
              <option value="SEMESTER_3">3rd Semester</option>
              <option value="SEMESTER_4">4th Semester</option>
              <option value="SEMESTER_5">5th Semester</option>
              <option value="SEMESTER_6">6th Semester</option>
              <option value="SEMESTER_7">7th Semester</option>
              <option value="SEMESTER_8">8th Semester</option>
        </select>

        </div>
        <div style={{ marginBottom: '15px' }}>
        <label htmlFor="documentType" style={{ display: 'block', marginBottom: '5px' }}>Document Type:</label>
        <select id="documentType" style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '3px' }} value={documentType} onChange={(e) => setDocumentType(e.target.value)} required>
          <option value="NOTES">Notes</option>
          <option value="ASSIGNMENTS">Assignments</option>
          <option value="LECTURES">Lectures</option>
          <option value="RESEARCH_PAPER">Research Paper</option>
          <option value="PROJECT_FILES">Project Files</option>         
          <option value="OTHERS">Others</option>
        </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="tags" style={{ display: 'block', marginBottom: '5px' }}>Tags:</label>
          <input type="text" id="tags" style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '3px' }} value={tags} onChange={(e) => setTags(e.target.value)} />

        </div>


        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="files" style={{ display: 'block', marginBottom: '5px' }}>Files:</label>
          <input type="file" id="files" style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '3px' }} onChange={(e) => setFiles(e.target.files[0])} required/>
        </div>


        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="downloadEnable" style={{ display: 'block', marginBottom: '5px' }}>Download Enable:</label>
          <select id="downloadEnable" style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '3px' }} value={downloadEnable} onChange={(e) => setDownloadEnable(e.target.value)}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>


        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="commentEnable" style={{ display: 'block', marginBottom: '5px' }}>Comment Enable:</label>
          <select id="commentEnable" style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '3px' }} value={commentEnable} onChange={(e) => setCommentEnable(e.target.value)}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        
        <div style={{ marginBottom: '15px' }}>
          <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Upload</button>
        </div>
      </form>
    </div>
  );
};
export default Upload;
    /*<div>
      <h2>DocDrop:Upload Page</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Uploader ID:
          <input type="number" value={uploaderId} onChange={(e) => setUploaderId(e.target.value)} />
        </label>
        <br />
        <label>
          Topic:
          <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} />
        </label>
        <br />
        <label>
          Branch:
          <select value={branch} onChange={(e) => setBranch(e.target.value)}>
            <option value="COMPUTER_SCIENCE">Computer Science</option>
            <option value="CIVIL">Civil</option>
            <option value="MECHANICAL">Mechanical</option>
            <option value="ELECTRICAL">Electrical</option>
            <option value="INSTRUMENTATION">Instrumentation</option>
          </select>
        </label>
        <br />
        <label>
          Semester:
          <select value={semester} onChange={(e) => setSemester(e.target.value)}>
            <option value="SEMESTER_1">Semester 1</option>
            <option value="SEMESTER_2">Semester 2</option>
            <option value="SEMESTER_3">Semester 3</option>
            <option value="SEMESTER_4">Semester 4</option>
            <option value="SEMESTER_5">Semester 5</option>
            <option value="SEMESTER_6">Semester 6</option>
            <option value="SEMESTER_7">Semester 7</option>
            <option value="SEMESTER_8">Semester 8</option>
          </select>
        </label>
        <br />
        <label>
          Document Type:
          <select value={documentType} onChange={(e) => setDocumentType(e.target.value)}>
            <option value="NOTES">Notes</option>
            <option value="RESEARCH_PAPER">Research Paper</option>
            <option value="PROJECT_FILES">Project Files</option>
            <option value="PYQs">PYQs</option>
          </select>
        </label>
        <br />
        <label>
          Tags:
          <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} />
        </label>
        <br />
        <label>
          Files:
          <input type="file" value={files} onChange={(e) => setFiles(e.target.files[0])} />
        </label>
        <br />
        <label>
          Download Enable:
          <input type="checkbox" checked={downloadEnable} onChange={(e) => setDownloadEnable(e.target.checked)} />
        </label>
        <br />
        <label>
          Comment Enable:
          <input type="checkbox" checked={commentEnable} onChange={(e) => setCommentEnable(e.target.checked)} />
        </label>
        <br />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};



/*import React, { useState } from "react";

import Error from "../Components/Error";
import Loader from "../Components/Loader";
import Success from "../Components/Success";

const Upload = () => {
  const [files, setFiles] = useState(null);
  const [upload, setUpload] = useState("");
  const [topic, setTopic] = useState("");
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");
  const [typeofdoc, setTypeofdoc] = useState("");
  const [otherTypeofdoc, setOtherTypeofdoc] = useState("");
  const [tags, setTags] = useState("");
  const [visibility, setVisibility] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const branches = ["CSE", "Mechanical", "Electrical", "Civil", "Instrumentation"];
  const semesters = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];
  const visibilityOptions = ["Public", "Private"];
  const typeofdocOptions = ["PDF", "Notes", "Report", "Research Paper"];

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleRegistration = (e) => {
    e.preventDefault();

    if (!files || files.length === 0) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append(`file${i + 1}`, files[i]);
    }

    formData.append("upload", upload);
    formData.append("topic", topic);
    formData.append("branch", branch);
    formData.append("semester", semester);
    formData.append("typeofdoc", typeofdoc === "Others" ? otherTypeofdoc : typeofdoc);
    formData.append("tags", tags);
    formData.append("visibility", visibility);

    console.log("FormData:", formData);

    setFiles(null);
    setUpload("");
    setTopic("");
    setBranch("");
    setSemester("");
    setTypeofdoc("");
    setTags("");
    setVisibility("");
    setOtherTypeofdoc("");
  };

  return (
    <div>
      {loading && <Loader />}

      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5">
          {success && <Success message="Registration Successful!" />}
          <form onSubmit={handleRegistration}>
            <div className="bs">
              {error && <Error />}
              <div className="form-group">
                <h2 className="mb-4" align="center">
                  DocDrop
                </h2>
                <input
                  type="file"
                  className="form-control"
                  onChange={handleFileChange}
                  multiple
                />
                {files && (
                  <div>
                    <p>Chosen Files:</p>
                    <ul>
                      {Array.from(files).map((file, index) => (
                        <li key={index}>{file.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <input
                  type="topic"
                  className="form-control"
                  placeholder="topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  required
                />
                <select
                  type="branch"
                  className="form-control"
                  placeholder="branch"
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Select Branch
                  </option>
                  {branches.map((branchOption) => (
                    <option key={branchOption} value={branchOption}>
                      {branchOption}
                    </option>
                  ))}
                </select>
                <select
                  type="semester"
                  className="form-control"
                  placeholder="semester"
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Select Semester
                  </option>
                  {semesters.map((semesterOption) => (
                    <option key={semesterOption} value={semesterOption}>
                      {semesterOption}
                    </option>
                  ))}
                </select>
                <select
                  type="typeofdoc"
                  className="form-control"
                  placeholder="typeofdoc"
                  value={typeofdoc}
                  onChange={(e) => setTypeofdoc(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Select Type of Document
                  </option>
                  {typeofdocOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                  <option value="Others">Others</option>
                </select>
                {typeofdoc === "Others" && (
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Specify Other Type of Document"
                    value={otherTypeofdoc}
                    onChange={(e) => setOtherTypeofdoc(e.target.value)}
                    required
                  />
                )}
                <input
                  type="tags"
                  className="form-control"
                  placeholder="tags"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  required
                />
                <select
                  type="visibility"
                  className="form-control"
                  placeholder="visibility"
                  value={visibility}
                  onChange={(e) => setVisibility(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Select Visibility
                  </option>
                  {visibilityOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <button className="btn btn-primary mt-3" type="submit">
                  Upload
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Upload;
*/