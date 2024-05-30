import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from "../Components/Loader";
import Swal from 'sweetalert2';
import { Tabs } from 'antd';
import Topbar from '../ccomponents/topbar/Topbar';

function Adminscreen() {
    const [contentComponent, setContentComponent] = useState(null);

    useEffect(() => {
        const current_user = JSON.parse(localStorage.getItem('currentUser'));
        console.log(current_user);
        // Uncomment and update the below code as necessary for actual user role check
        /*
        if (current_user.data.isAdmin) {
            // Dynamically import the content component when the condition is satisfied
            import('./').then(module => {
                setContentComponent(module.default);
            });
        } else {
            <h1>You cannot access this page!</h1>
        }
        */
    }, []);

    return (
        <div>
            <Topbar />
            <div className='mt-3 ml-3 mr-3 bs'>
                <h1 style={{ fontSize: '30px' }}><b>Admin Panel</b></h1>
            </div>
            <div style={{ margin: '20px' }}>
                <Tabs defaultActiveKey='1'>
                    <Tabs.TabPane tab='Users' key='1'>
                        <Users />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab='Documents' key='2'>
                        <Documents />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab='Add User' key='3'>
                        <Adduser />
                    </Tabs.TabPane>
                </Tabs>
            </div>
        </div>
    );
}

export default Adminscreen;

// Users list components
export function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    const fetchUsers = async () => {
        try {
            // const response = await axios.get('/api/bookings/getallbookings');
            // const data = response.data;
            // setUsers(data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
            setError(error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className='row' style={{ margin: '20px' }}>
            <div className='col-md-12'>
                <h1 style={{ textAlign: 'left' }}>Users</h1>
                {loading && <Loader />}
                <div style={{ textAlign: 'left' }}>
                    <p style={{ fontSize: '20px' }}><b>Total: {users.length}</b></p>
                </div>
                <table className='table table-bordered table-dark'>
                    <thead className='bs'>
                        <tr>
                            <th>User Id</th>
                            <th>User Name</th>
                            <th>Branch</th>
                            <th>Semester</th>
                            <th>Email</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length ? (
                            users.map(user => (
                                <tr key={user._id}>
                                    <td>200710007028</td>
                                    <td>Khushnasin Sultana</td>
                                    <td>CSE</td>
                                    <td>8th</td>
                                    <td>khusnasinsultana@gmail.com</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" style={{ textAlign: 'center' }}>No users found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// Documents list components
export function Documents() {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    const fetchDocuments = async () => {
        try {
            const response = await axios.get('/api/rooms/getallrooms');
            const data = response.data;
            // setDocuments(data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
            setError(error);
        }
    };

    useEffect(() => {
        fetchDocuments();
    }, []);

    return (
        <div className='row' style={{ margin: '20px' }}>
            <div className='col-md-12'>
                <h1 style={{ textAlign: 'left' }}>Documents</h1>
                {loading && <Loader />}
                {documents.length && <p style={{ fontSize: '20px' }}><b>Total: {documents.length} Documents</b></p>}
                <table className='table table-bordered table-dark'>
                    <thead className='bs'>
                        <tr>
                            <th>Document Id</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>User</th>
                            <th>Average rating</th>
                            <th>Comments</th>
                        </tr>
                    </thead>
                    <tbody>
                        {documents.length ? (
                            documents.map(document => (
                                <tr key={document._id}>
                                    <td>{document._id}</td>
                                    <td>{document.name}</td>
                                    <td>{document.type}</td>
                                    <td>{document.user}</td>
                                    <td>{document.averageRating}</td>
                                    <td>{document.comments}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" style={{ textAlign: 'center' }}>No documents found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// Add User component
export function Adduser() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    const [name, setName] = useState('');
    const [rentPerDay, setRentPerDay] = useState();
    const [maxCount, setMaxCount] = useState();
    const [description, setDescription] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [Type, setType] = useState();
    const [imageurl1, setImageurl1] = useState();
    const [imageurl2, setImageurl2] = useState();
    const [imageurl3, setImageurl3] = useState();

    async function addRoom() {
        const newuser = {
            name,
            rentPerDay,
            maxCount,
            description,
            phoneNumber,
            Type,
            imageurls: [imageurl1, imageurl2, imageurl3]
        };

        try {
            setLoading(true);
            //const response = await axios.post('/api/rooms/addroom' , newroom)
            //const result = response.data;
            //console.log(result);
            setLoading(false);
            Swal.fire('Congrats', "Your new room is added successfully!", 'success').then(result => {
                window.location.href = '/home';
            });
        } catch (error) {
            console.log(error);
            setLoading(false);
            Swal.fire('Oops', "Something went wrong!", 'error');
        }
    }

    return (
        <div className='row'>
            <div className='col-md-5'>
                {loading && <Loader />}
                <input type='text' className='form-control' placeholder='user Id'
                    value={name} onChange={(e) => { setName(e.target.value) }}
                />
                <input type='text' className='form-control' placeholder='user name'
                    value={rentPerDay} onChange={(e) => { setRentPerDay(e.target.value) }}
                />
                <input type='text' className='form-control' placeholder='branch'
                    value={maxCount} onChange={(e) => { setMaxCount(e.target.value) }}
                />
                <input type='text' className='form-control' placeholder='semester'
                    value={description} onChange={(e) => { setDescription(e.target.value) }}
                />
                <input type='text' className='form-control' placeholder='email'
                    value={phoneNumber} onChange={(e) => { setPhoneNumber(e.target.value) }}
                />
            </div>

            <div className='col-md-5'>
                <input type='text' className='form-control' placeholder='image URL 1'
                    value={imageurl1} onChange={(e) => { setImageurl1(e.target.value) }}
                />
                <input type='text' className='form-control' placeholder='image URL 2'
                    value={imageurl2} onChange={(e) => { setImageurl2(e.target.value) }}
                />
                <input type='text' className='form-control' placeholder='image URL 3'
                    value={imageurl3} onChange={(e) => { setImageurl3(e.target.value) }}
                />
                <div className='text-right'>
                    <button className='btn btn-primary mt-2' onClick={addRoom}>Add User</button>
                </div>
            </div>
        </div>
    );
}
