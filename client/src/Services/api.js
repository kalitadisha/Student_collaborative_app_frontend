// api.js
import axios from "axios";
const BASE_URL = 'http://localhost:8080'; 

const api = {
  registerUser: async (userData) => {
    try {
      const response = await fetch(`${BASE_URL}/api/users/registeruser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      /*if (!response.ok) {
        let errorMessage = 'Failed to register user';
        if (response.status === 400) {
          // Extract error message from response body if available
          const errorData = await response.json();
          if (errorData && errorData.message) {
            errorMessage = errorData.message;
          }
        }
        throw new Error(errorMessage);
      }

      return response.json();
      */
      return response; // Return the response from the registration API endpoint
    } catch (error) {
      throw error; // Throw an error if registration fails
      //throw new Error('An error occurred while registering user');
    }
  },

  checkIdUnique: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/users/checkIdUnique/${id}`);
      if (response.ok) {
        return true; // ID is unique
    } else {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }
      //return response.data;
    } catch (error) {
      throw error;
    }
  },
  checkEmailIdUnique: async (emailId) => {
    try {
        const response = await fetch(`/api/users/checkEmailIdUnique/${emailId}`);
        if (response.ok) {
            return true; // Email is unique
        } else {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }
    } catch (error) {
        throw error;
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

      /*if (!response.ok) {
        let errorMessage = 'Failed to login user';
        if (response.status === 401) {
          // Unauthorized - invalid credentials
          errorMessage = 'Invalid email or password';
        } else if (response.status === 403) {
          // Forbidden - user not allowed to access resource
          errorMessage = 'Access forbidden';
        }
        throw new Error(errorMessage);
      }

      return response.json();
      */
      return response;
    } catch (error) {
      throw error;
      //throw new Error('An error occurred while logging in');
    }
  }

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
