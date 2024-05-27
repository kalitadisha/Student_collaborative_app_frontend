// api.js
import axios from "axios";
const BASE_URL = 'http://localhost:8080'; 

const api = {
  checkIdUnique: async (id) => {
    
      try {
        const response = await axios.get(`${BASE_URL}/api/users/checkIdUnique/${id}`);
        return response.status === 200;
      } catch (error) {
        return false;
      }
      
  },
  checkEmailIdUnique: async (emailId) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/users/checkEmailIdUnique/${emailId}`);
      return response.status === 200;
    } catch (error) {
      return false;
    }
  },

  registerUser: async (userData) => {
      try {
        const response = await axios.post(`${BASE_URL}/api/users/registeruser`, userData);
        return response;
      } catch (error) {
        return error.response;
      }
    
      
  },

  loginUser: async (userData) => {
    try {
      const response = await fetch(`${BASE_URL}/api/users/loginuser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      return response;
    } catch (error) {
      throw error;
      //throw new Error('An error occurred while logging in');
    }
  },
  // Method to upload a file
  createUpload: async (formData) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/uploads/createupload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set content type to multipart/form-data for file upload
        },
      });
      return response.data; // Return the data from the upload API endpoint
    } catch (error) {
      return error.response;
    }
  },

  // Method to retrieve all uploads
  getAllUploads: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/uploads/getalluploads`);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },

  // Method to retrieve upload by ID
  getUploadById: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/uploads/${id}`);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  // Method to retrieve upload by uploaderID
  getUploadByUploaderId: async (uploaderId) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/uploads/by-uploader/${uploaderId}`);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },

  // Method to delete an existing upload
  deleteUpload: async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/uploads/delete/${id}`);
    } catch (error) {
      return error.response;
    }
  },
};



export default api;

/*const BASE_URL = 'http://localhost:8080'; 

const api = {
    registerUser: async (userData) => {
      const response = await fetch(`${BASE_URL}/api/users/registeruser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error('Failed to register user');
      }
      return response.json();
    },
  
    loginUser: async (userData) => {
      const response = await fetch(`${BASE_URL}/api/users/loginuser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error('Failed to login');
      }
      return response.json();
    },
  
    // Add more functions for other API endpoints as needed
  };
  
  export default api;
/*const api = {
  getUsers: async () => {
    const response = await fetch(`${BASE_URL}/api/users`);
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return response.json();
  },

  createUser: async (userData) => {
    const response = await fetch(`${BASE_URL}/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error('Failed to create user');
    }
    return response.json();
  },

  // Add more functions for other API endpoints as needed
};

export default api;
*/
