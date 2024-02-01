import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Loader from "../Components/Loader";
import Error from "../Components/Error";
import Success from "../Components/Success";
import Swal from 'sweetalert2';

function AddStudents(props) {
  const formRef = useRef(null);
  const [Name, setname] = useState('');
  const [college, setcollege] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [email, setEmail] = useState('');
  const [option, setOption] = useState('');

  const [file1, setFile1] = useState();
  const [file2, setFile2] = useState();
  const [file3, setFile3] = useState();

  const [password, setpassword] = useState('');
  const [cpassword, setcpassword] = useState('');

  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();
  const [success, setsuccess] = useState();

  const dropdownOptions = ['Jorhat Enginnering College', 'Assam Engineering College', 'Borak Velly Engineering College', 'Dhemaji Engineering College', 'Golaghat Engineering College'];

  useEffect(() => {
    console.log("Props.farmer data: ", props.farmer);
    if (props.farmer) {
      const {
        Name,
        college,
        email,
      } = props.farmer;

      setname(props.user.Name);
      setcollege(college);
      setEmail(email);
    }
  }, [props.farmer]);

  useEffect(() => {
    if (success) {
      resetForm();
    }
  }, [success]);

  const resetForm = () => {
    setname('');
    setcollege('');
    setEmail('');
    setFile1('');
    setFile2('');
    setFile3('');
    setpassword('');
    setcpassword('');
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Handle latitude and longitude if needed
        },
        (error) => {
          console.error('Error getting user location:', error.message);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== cpassword) {
      alert('Passwords do not match!');
      return;
    }

    const farmer = {
      Name,
      email,
      college,
      fileUrls: [file1, file2, file3],
      password,
      cpassword,
    };

    try {
      setloading(true);
      const response = await axios.post('/api/farmers/addfarmers', farmer, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setloading(false);

      if (response.status === 200) {
        Swal.fire('Congrats', 'Your new user is added successfully!', 'success').then((result) => {
          window.location.href = '/admin-screen';
        });
        resetForm();
      } else {
        console.log('Unexpected server response:', response);
      }
    } catch (error) {
      console.log('Error adding user:', error);
      setloading(false);
      seterror(true);
    }
  };

  const handleReset = () => {
    resetForm();
  };

  const handleInputChange = (e) => {
    setcollege(e.target.value);
    setIsDropdownOpen(true);
  };

  const handleOptionSelect = (selectedOption) => {
    setcollege(selectedOption);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='row justify-content-center mt-2'>
      <div className='col-md-10'>
        {loading && (<Loader />)}
        {success && (<Success message='Registration Successful!' />)}
        {error && (<Error />)}
        <form onSubmit={handleSubmit}>
          <div className="bs">
            <div className="col-md-12 justify-content-center" style={{ marginRight: '100px', marginTop: '10px' }}>
              <input type="text" className="form-control" placeholder="Name"
                value={Name} onChange={(e) => { setname(e.target.value) }} />
              <input type="text" className="form-control" placeholder="College"
                value={college} onChange={handleInputChange} onClick={() => setIsDropdownOpen(true)} />
              {isDropdownOpen && (
                <ul ref={dropdownRef}>
                  {dropdownOptions.map((option) => (
                    <li key={option} onClick={() => handleOptionSelect(option)}>
                      {option}
                    </li>
                  ))}
                </ul>
              )}
              <input type="text" className="form-control" placeholder="Email"
                value={email} onChange={(e) => { setEmail(e.target.value) }} />
            </div>
          </div>
          <div className='text-center'>
            <button className="btn btn-primary mt-3" type='submit' style={{ marginRight: '10px' }}>Add Users</button>
            <button className="btn btn-primary mt-3" type="button" onClick={handleReset}>Reset</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddStudents;