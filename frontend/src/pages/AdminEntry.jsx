// src/pages/AdminSecretEntry.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';

const AdminSecretEntry = () => {
  const [email, setEmail] = useState('');
  const [passkey, setPasskey] = useState('');
  const navigate = useNavigate();

  const handlePromote = async (e) => {
    e.preventDefault();
    try {

      const response = await axiosInstance.post('/api/auth/promote-admin', { 
        email, 
        passkey 
      });

      alert(response.data.message);

      navigate('/login');
    } catch (error) {
      alert(error.response?.data?.message || 'Passkey Invalid');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form 
        onSubmit={handlePromote} 
        className="bg-white p-8 rounded-xl shadow-2xl w-96 border-t-4 border-red-500"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Admin Identity Claim</h2>
        <p className="text-sm text-gray-500 mb-6 text-center">

        </p>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Registered Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:border-red-500"
            placeholder="example@test.com"
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Secret Passkey</label>
          <input
            type="password"
            value={passkey}
            onChange={(e) => setPasskey(e.target.value)}
            className="w-full p-3 border rounded-lg text-center tracking-widest focus:outline-none focus:border-red-500"
            placeholder="••••••"
            required
          />
        </div>
        
        <button 
          type="submit" 
          className="w-full bg-red-600 text-white p-3 rounded-lg font-bold hover:bg-red-700 transition duration-300"
        >
          Change to Admin
        </button>
        
        <button 
          type="button"
          onClick={() => navigate('/login')}
          className="w-full mt-4 text-gray-400 text-sm hover:underline"
        >
          Back to Login
        </button>
      </form>
    </div>
  );
};

export default AdminSecretEntry;