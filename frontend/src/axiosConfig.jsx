import axios from 'axios';

const axiosInstance = axios.create({
  //baseURL: 'http://localhost:5001', // local
  baseURL: 'http://3.27.173.18:5001', // live
  headers: { 'Content-Type': 'application/json' },
});

axiosInstance.interceptors.request.use((req) => {
  const profile = localStorage.getItem('profile'); 
  if (profile) {

    req.headers.Authorization = `Bearer ${JSON.parse(profile).token}`;
  }
  return req;
});

export default axiosInstance;
