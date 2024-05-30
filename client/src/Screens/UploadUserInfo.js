import React, { useState } from 'react';
import { Form, Input, Button, Select, Layout } from 'antd';
import { GithubOutlined, LinkedinOutlined } from '@ant-design/icons';
import Topbar from '../ccomponents/topbar/Topbar';
import Swal from 'sweetalert2';
import '../css/UploadUserInfo.css';

const { Content } = Layout;
const { Option } = Select;

function UploadUserInfo() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        setLoading(true);
        // Here you would normally make an API call to submit the form data
        // Simulating an API call with a timeout
        setTimeout(() => {
            setLoading(false);
            Swal.fire('Success', 'Your information has been submitted!', 'success');
            form.resetFields();
        }, 2000);
    };

    return (
        <Layout>
            <Topbar />
            <Content style={{ padding: '50px' }}>
                <div className="upload-form-container">
                    <h1 className="upload-form-title">Upload Your Information</h1>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                        className="upload-form"
                    >
                        <Form.Item
                            name="name"
                            label="Name"
                            rules={[{ required: true, message: 'Please input your name!' }]}
                        >
                            <Input placeholder="Enter your name" />
                        </Form.Item>

                        <Form.Item
                            name="collegeId"
                            label="College ID"
                            rules={[{ required: true, message: 'Please input your college ID!' }]}
                        >
                            <Input placeholder="Enter your college ID" />
                        </Form.Item>

                        <Form.Item
                            name="branch"
                            label="Branch"
                            rules={[{ required: true, message: 'Please select your branch!' }]}
                        >
                            <Select placeholder="Select your branch">
                                <Option value="CSE">Computer Science and Engineering</Option>
                                <Option value="ECE">Electronics and Communication Engineering</Option>
                                <Option value="ME">Mechanical Engineering</Option>
                                <Option value="CE">Civil Engineering</Option>
                                <Option value="EE">Electrical Engineering</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="semester"
                            label="Semester"
                            rules={[{ required: true, message: 'Please input your semester!' }]}
                        >
                            <Input placeholder="Enter your semester" />
                        </Form.Item>

                        <Form.Item
                            name="github"
                            label="GitHub Link"
                            rules={[{ message: 'Please input your GitHub link!' }]}
                        >
                            <Input prefix={<GithubOutlined />} placeholder="Enter your GitHub link" />
                        </Form.Item>

                        <Form.Item
                            name="linkedin"
                            label="LinkedIn Link"
                            rules={[{ message: 'Please input your LinkedIn link!' }]}
                        >
                            <Input prefix={<LinkedinOutlined />} placeholder="Enter your LinkedIn link" />
                        </Form.Item>

                        

                        <Form.Item
                            name="phone"
                            label="Phone Number"
                            rules={[{ message: 'Please input your phone number!' }]}
                        >
                            <Input placeholder="Enter your phone number" />
                        </Form.Item>

                        <Form.Item
                            name="about"
                            label="About"
                            rules={[{ message: 'Please input some information about yourself!' }]}
                        >
                            <Input.TextArea placeholder="Enter some information about yourself" />
                        </Form.Item>

                        <Form.Item
                            name="hobbies"
                            label="Hobbies"
                            rules={[{ message: 'Please input your hobbies!' }]}
                        >
                            <Input placeholder="Enter your hobbies" />
                        </Form.Item>

                        <Form.Item
                            name="interests"
                            label="Interests"
                            rules={[{ message: 'Please input your interests!' }]}
                        >
                            <Input placeholder="Enter your interests" />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={loading} className="upload-form-button">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Content>
        </Layout>
    );
}

export default UploadUserInfo;
