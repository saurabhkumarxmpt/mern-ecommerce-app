import axios from 'axios';

const API=axios.create({
    baseURL: "https://mern-ecommerce-app-loau.onrender.com/api/admin"
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("adminToken");

  if (token) {
    req.headers.Authorization = token;
  }

  return req;
});

export default API;