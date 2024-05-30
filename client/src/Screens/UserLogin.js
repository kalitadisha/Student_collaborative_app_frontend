import React, { useState } from "react";
import { Form, Input, Button, Layout } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Topbar from "../ccomponents/topbar/Topbar";
import Loader from "../Components/Loader";
import Error from "../Components/Error";
import Success from "../Components/Success";
import api from '../Services/api';
import Swal from 'sweetalert2';
import "../css/UploadUserInfo.css"; // Assuming you want to keep the styles consistent

const { Content } = Layout;

const UserLogin = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (values) => {
        setLoading(true);
        setError('');
        setSuccess('');
        try {
            const response = await api.loginUser(values);
            if (response.status === 200) {
                setSuccess('Login Successful!');
                setLoading(false);
                form.resetFields();
                Swal.fire('Success', 'Login Successful! Redirecting...', 'success');
                navigate('/upload');
            } else {
                setError('Login failed');
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError('An error occurred during login. Please try again later.');
            }
        }
    };

    return (
        <Layout>
            <Topbar />
            <Content style={{ padding: '50px' }}>
                <div className="upload-form-container">
                    <h1 className="upload-form-title">Login</h1>
                    {loading && <Loader />}
                    {error && <Error message={error} />}
                    {success && <Success message={success} />}
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleLogin}
                        className="upload-form"
                    >
                        <Form.Item
                            name="emailId"
                            label="Email"
                            rules={[{ required: true, message: 'Please input your email!' }]}
                        >
                            <Input type="email" placeholder="Enter your email" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password placeholder="Enter your password" />
                        </Form.Item>
                        <p style={{ textAlign: 'right' }}>
                            <Link to="/forgotpassword">Forgot password?</Link>
                        </p>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={loading} className="upload-form-button">
                                {loading ? 'Logging in...' : 'Login'}
                            </Button>
                        </Form.Item>
                        <p>
                            Don't have an account? <Link to="/registeruser">Sign up</Link>
                        </p>
                    </Form>
                </div>
            </Content>
        </Layout>
    );
};

export default UserLogin;
