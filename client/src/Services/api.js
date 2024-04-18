const BASE_URL = 'http://localhost:8080'; 

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
