import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';
import { useAuth } from '../context/AuthContext';
import TaskForm from '../components/TaskForm';

const EditProject = () => {
  const { projectId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axiosInstance.get(`/api/projects/${projectId}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setProject(response.data);
      } catch (error) {
        alert('Failed to fetch project data.');
        navigate('/projects');
      }
    };
    if (user) fetchProject();
  }, [projectId, user, navigate]);

  if (!project) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <TaskForm 
        editingTask={project} 
        setEditingTask={() => {}} 
        tasks={[]}  
        setTasks={() => navigate('/projects')} 
      />
    </div>
  );
};

export default EditProject;