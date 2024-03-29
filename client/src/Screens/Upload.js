import React, { useState } from "react";
import axios from "axios";

import Loader from "../Components/Loader";
import Error from "../Components/Error";
import Success from "../Components/Success";
import { Link } from "react-router-dom";

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
  const branches = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];
  const semesters = ["CSE", "Mechanical", "Electrical", "Civil", "Instrumentation"];
  const visibilityOptions = ["Public", "Private"];
  const typeofdocOptions = ["PDF", "Notes", "Report", "Others"];

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
                  <option value="Others">Research Paper</option>
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