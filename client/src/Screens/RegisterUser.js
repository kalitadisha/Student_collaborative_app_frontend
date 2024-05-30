import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Layout } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import Topbar from "../ccomponents/topbar/Topbar";
import Swal from 'sweetalert2';
import api from '../Services/api';
import '../css/UploadUserInfo.css';

const { Content } = Layout;

const RegisterUser = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegistration = async (values) => {
    setLoading(true);
    const { id, emailId, password, cpassword } = values;

    if (password !== cpassword) {
      Swal.fire('Error', 'Passwords do not match', 'error');
      setLoading(false);
      return;
    }

    try {
      const isIdUnique = await api.checkIdUnique(id);
      if (!isIdUnique) {
        Swal.fire('Error', 'ID already exists', 'error');
        setLoading(false);
        return;
      }

      const isEmailIdUnique = await api.checkEmailIdUnique(emailId);
      if (!isEmailIdUnique) {
        Swal.fire('Error', 'Email already exists', 'error');
        setLoading(false);
        return;
      }

      const userData = { id, emailId, password };
      const response = await api.registerUser(userData);
      if (response.status === 200) {
        Swal.fire('Success', 'Registration Successful!', 'success');
        form.resetFields();
        navigate('/loginuser');
      } else {
        Swal.fire('Error', 'Registration failed', 'error');
      }
    } catch (error) {
      Swal.fire('Error', 'An error occurred during registration. Please try again later.', 'error');
    }
    setLoading(false);
  };

  return (
    <Layout>
      <Topbar />
      <Content style={{ padding: '50px' }}>
        <div className="upload-form-container">
          <h1 className="upload-form-title">User Registration</h1>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleRegistration}
            className="upload-form"
          >
            <Form.Item
              name="id"
              label="ID (Institute/University Roll Number)"
              rules={[{ required: true, message: 'Please input your ID!' }]}
            >
              <Input placeholder="Enter your ID" />
            </Form.Item>

            <Form.Item
              name="emailId"
              label="Email"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please enter a valid email!' }
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="Enter your email" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: 'Please input your password!' },
                { min: 6, message: 'Password must be at least 6 characters!' }
              ]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Enter your password" />
            </Form.Item>

            <Form.Item
              name="cpassword"
              label="Confirm Password"
              rules={[
                { required: true, message: 'Please confirm your password!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords do not match!'));
                  }
                })
              ]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Confirm your password" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} className="upload-form-button">
                {loading ? 'Registering...' : 'Register'}
              </Button>
            </Form.Item>

            <p className="mt-2">
              Already a user? <Link to="/loginuser">Sign in</Link>
            </p>
          </Form>
        </div>
      </Content>
    </Layout>
  );
};

export default RegisterUser;
