import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axiosConfig'; 

const CreateProject = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    
    const formData = new FormData();
    formData.append('message', message);
    if (file) formData.append('file', file);

    try {
      
      await axios.post('/api/projects', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      setIsSuccess(true);
    } catch (error) {
      console.error("Publish Failed", error);
      alert("Publish Failed");
    }
  };

  
  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <div className="w-64 h-64 bg-red-200 rounded-full flex items-center justify-center mb-10 shadow-lg">
          <h2 className="text-3xl font-bold text-black">Success!</h2>
        </div>
        <button 
          onClick={() => navigate('/')}
          className="w-3/4 py-3 bg-[#8b8058] text-white rounded-lg font-semibold"
        >
          Go Back to Homepage
        </button>
      </div>
    );
  }

  
  return (
    <div className="p-6 h-screen bg-gray-50 flex flex-col">
      <div className="flex items-center mb-6">
        <button onClick={() => navigate(-1)} className="mr-4 text-xl">←</button>
        <h1 className="text-xl font-bold text-center flex-1">Create</h1>
      </div>

      <div className="flex items-center mb-6">
        
        <div className="w-10 h-10 bg-purple-600 rounded-full mr-3"></div>
        <h2 className="text-lg font-bold">Tony Jones</h2>
      </div>

      <h3 className="text-xl font-bold mb-4">Create your project</h3>

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
        <textarea
          className="w-full p-4 rounded-xl border border-gray-200 mb-4 h-40 resize-none shadow-sm"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        
        <div className="relative mb-auto">
          <input 
            type="file" 
            className="w-full p-3 rounded-xl border border-gray-200 shadow-sm text-gray-500"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        <button 
          type="submit" 
          className="w-full py-4 bg-[#8b8058] text-white rounded-lg font-bold mt-8"
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default CreateProject;