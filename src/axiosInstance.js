// src/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.example.com', // Replace with your API's base URL
  timeout: 5000, // Set a timeout if needed
});

// You can also set default headers or authorization tokens here
axiosInstance.defaults.headers.common['Authorization'] = 'Bearer your-token';

export default axiosInstance;
// src/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.example.com', // Replace with your API's base URL
  timeout: 5000, // Set a timeout if needed
});

// You can also set default headers or authorization tokens here
axiosInstance.defaults.headers.common['Authorization'] = 'Bearer your-token';

export default axiosInstance;
