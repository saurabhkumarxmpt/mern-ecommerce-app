import axios from 'axios';

const API=axios.create({
    baseURL:"https://mern-ecommerce-app-loau.onrender.com/api"
});

export default API;