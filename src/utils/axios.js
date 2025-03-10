// src/utils/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api/', // Make sure this points to your backend
});

export default instance;
