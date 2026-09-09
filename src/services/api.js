import axios from 'axios';
const api = axios.create({ baseURL: 'http://localhost:5000/api' });
api.interceptors.request.use(
  (config) => {
    // Send JWT Token
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Send Selected Server
    const selectedServer = localStorage.getItem("selectedServer");

    if (selectedServer) {
      config.headers["x-server"] = selectedServer;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;