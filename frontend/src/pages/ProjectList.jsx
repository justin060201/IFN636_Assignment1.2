import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';
import { useAuth } from '../context/AuthContext';

const ProjectList = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]); //


  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axiosInstance.get('/api/projects', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setProjects(response.data);
      } catch (error) {
        console.error(error);
        alert('Failed to load projects.');
      }
    };

    if (user) fetchProjects();
  }, [user]);


  const handleDelete = async (projectId) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axiosInstance.delete(`/api/projects/${projectId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setProjects(projects.filter((p) => p._id !== projectId));
    } catch (error) {
      alert('Delete failed.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 mt-10">
      <h1 className="text-3xl font-bold mb-8">Project Board</h1>
      
      {projects.length === 0 ? (
        <p className="text-gray-500 text-center py-10 bg-white rounded shadow">No projects found.</p>
      ) : (
        <div className="grid gap-6">
          {projects.map((project) => (
            <div key={project._id} className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <h2 className="text-2xl font-bold mb-2">{project.title}</h2>
              <p className="text-gray-600 mb-4">{project.description}</p>
              
              <div className="flex justify-between items-center border-t pt-4">
                <span className="text-gray-500 text-sm">
                  Deadline: {new Date(project.deadline).toLocaleDateString()}
                </span>
                {project.filePath && (
                  <a 
                    href={`http://localhost:5001${project.filePath}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline font-bold"
                  >
                    View File
                  </a>
                )}
              </div>

              <div className="mt-6 flex gap-4">
                <button 
                  onClick={() => navigate(`/edit-project/${project._id}`)}
                  className="bg-[#8b8058] text-white px-6 py-2 rounded-lg font-bold"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(project._id)}
                  className="bg-red-400 text-white px-6 py-2 rounded-lg font-bold"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectList;