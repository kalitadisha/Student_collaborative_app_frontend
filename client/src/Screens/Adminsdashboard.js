import React, { useState, useEffect } from 'react';
import { Layout, Menu, notification } from 'antd';
import axios from 'axios';
import { UserOutlined, BarChartOutlined, FileAddOutlined, PlusOutlined } from '@ant-design/icons';
import StudentsData from "../Components/StudentsData";
import AddStudents from "../Components/AddStudents";
import AdminDetails from "../Components/AdminDetails";
import StatisticsTab from "../Components/StatisticsTab";
import { Link } from "react-router-dom";
import Topbar from '../ccomponents/topbar/Topbar';

const { Header, Content, Sider } = Layout;

function Admindashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [studentsData, setStudentsData] = useState([]);
  const [selectedTab, setSelectedTab] = useState('students-data');

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
      notification.error({
        message: 'Error',
        description: 'Failed to fetch students data. Please try again later.',
      });
    }
  };

  useEffect(() => {
    fetchStudentsData();
  }, []);

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'admin-details':
        return <AdminDetails />;
      case 'statistics':
        return <StatisticsTab studentsData={studentsData} />;
      case 'students-data':
        return <StudentsData studentsData={studentsData} />;
      case 'add-students':
        return <AddStudents />;
      default:
        return null;
    }
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Topbar/>
      <Sider theme="dark" width={150}>
        {loading && <div>Loading...</div>}
        {error && <div>Error fetching data.</div>}

        <Menu mode="inline" selectedKeys={[selectedTab]}>
          <Menu.Item key="statistics" icon={<BarChartOutlined />} onClick={() => handleTabChange('statistics')}>
            Statistical Data
          </Menu.Item>
          <Menu.Item key="students-data" icon={<FileAddOutlined />} onClick={() => handleTabChange('students-data')}>
            Students Data
          </Menu.Item>
          <Menu.Item key="add-students" icon={<PlusOutlined />} onClick={() => handleTabChange('add-students')}>
            Add User
          </Menu.Item>
          <Menu.Item key="admin-details" icon={<UserOutlined />} onClick={() => handleTabChange('admin-details')}>
            Admin Details
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header className="site-layout-sub-header-background" style={{ fontSize: '35px', color: 'white', padding: 0 }}>
          Admin Dashboard
        </Header>
        <Content style={{ margin: '20px' }}>
          <div>
            <h4>Welcome to the Admin Dashboard!</h4>
          </div>
          {renderTabContent()}
          <div className="col-md-12 text-center" style={{ padding: '15px' }}>
            <Link to='/admin-screen'>
              <h5 style={{ fontWeight: "bold", fontSize: '16px' }}>Visit Admin Panel.</h5>
            </Link>
            <Link to='/home'>
              <h5 style={{ fontWeight: "lighter", fontSize: '12px' }}>(Return to Home Page.)</h5>
            </Link>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Admindashboard;