import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import axios from 'axios';



function StatisticalTab() {
  const [userStats, setUserStats] = useState([]);

  const fetchUserStats = async () => {
    try {
      const response = await axios.get('/api/userStats');
      setUserStats(response.data);
    } catch (error) {
      console.error('Error fetching user stats:', error);
    }
  };

  useEffect(() => {
    fetchUserStats();
  }, []);

  const columns = [
    { title: 'User', dataIndex: 'user', key: 'user' },
    { title: 'Uploads', dataIndex: 'uploads', key: 'uploads' },
    { title: 'File Format', dataIndex: 'fileFormat', key: 'fileFormat' },
    { title: 'Likes', dataIndex: 'likes', key: 'likes' },
    { title: 'Comments', dataIndex: 'comments', key: 'comments' },
    { title: 'Shares', dataIndex: 'shares', key: 'shares' },
  ];

  return (
    <div>
      <h2>User File Statistics</h2>
      <Table dataSource={userStats} columns={columns} />
    </div>
  );
}

export default StatisticalTab;