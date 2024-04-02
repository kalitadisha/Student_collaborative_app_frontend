import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from "../Components/Loader";
import Error from "../Components/Error";

function StudentsData() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [studentsData, setStudentsData] = useState([]);

  useEffect(() => {
    fetchStudentsData();
  }, []);

  const fetchStudentsData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/students/getallstudents');
      
      setStudentsData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching students data:', error);
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div className='row'>
      <div className='col-md-12'>
        <h2>Students Data</h2>
        {loading && <Loader />}
        {studentsData.length > 0 && (
          <p style={{ fontSize: '20px' }}><b>Total: {studentsData.length} Student Data</b></p>
        )}
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
          {error && (<Error />)}
          <thead style={{ background: '#0d0d20', color: '#fff' }}>
            <tr>
              <th style={tableCellStyles}>Name</th>
              <th style={tableCellStyles}>College name</th>
              <th style={tableCellStyles}>Email</th>
            </tr>
          </thead>
          <tbody>
            {studentsData.map(user => (
              <tr key={user._id}>
                <td style={tableCellStyles}>{user.Name}</td>
                <td style={tableCellStyles}>{user.Collegename}</td>
                <td style={tableCellStyles}>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const tableCellStyles = {
  padding: '8px',
  border: '2px solid #0d0d20',
};

export default StudentsData;