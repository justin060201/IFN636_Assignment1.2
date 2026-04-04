import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const TaskForm = ({ tasks, setTasks, editingTask, setEditingTask }) => {
  const { user } = useAuth();
  

  const [formData, setFormData] = useState({ title: '', description: '', deadline: '', budget: '' });

  const [file, setFile] = useState(null); 

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title,
        description: editingTask.description,
        deadline: editingTask.deadline ? editingTask.deadline.split('T')[0] : '',
        budget: editingTask.budget ? editingTask.budget.toString() : '',
      });
      setFile(null); 
    } else {
      setFormData({ title: '', description: '', deadline: '', budget: '' });
      setFile(null);
    }
  }, [editingTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    const dataToSubmit = new FormData();
    dataToSubmit.append('title', formData.title);
    dataToSubmit.append('description', formData.description);
    dataToSubmit.append('deadline', formData.deadline);
    dataToSubmit.append('budget', formData.budget);

    if (file) {
      dataToSubmit.append('file', file);
    }


    const config = {
      headers: { 
        Authorization: `Bearer ${user.token}`,        
      },
    };

    try {
      if (editingTask) {

        const response = await axiosInstance.put(
          `/api/projects/${editingTask._id}`, 
          dataToSubmit, 
          config
        );
        setTasks(tasks.map((task) => (task._id === response.data._id ? response.data : task)));
      } else {

        const response = await axiosInstance.post(
          '/api/projects', 
          dataToSubmit, 
          config
        );
        setTasks([...tasks, response.data]);
      }
      

      setEditingTask(null);
      setFormData({ title: '', description: '', deadline: '', budget: '' });
      setFile(null); 
      alert(editingTask ? 'Project updated!' : 'Project created!');
      
    } catch (error) {
      console.error(error);
      alert('Failed to save task.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded mb-6">
      <h1 className="text-2xl font-bold mb-4">
        {editingTask ? 'Edit Project' : 'Publish Project: Create Project'}
      </h1>
      
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Project Name
        </label>
      <input
        type="text"
        placeholder="Please enter your project name"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
        required
      />
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Description
        </label>
      <input
        type="text"
        placeholder="Please enter your description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
        required
      />
      </div>

      
      
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Set Deadline
        </label>
      <input
        type="date"
        value={formData.deadline}
        onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
        className="w-full mb-4 p-2 border rounded text-gray-500"
        required
      />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Budget ($)
        </label>
        <input
          type="number"
          min="0"
          placeholder="e.g. 3500"
          value={formData.budget}
          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
      </div>


      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Upload File (Optional)
        </label>
        <input
          type="file"
          
          onChange={(e) => setFile(e.target.files[0])} 
          className="w-full p-2 border rounded text-gray-500"
        />
      </div>

      <button type="submit" className="w-full bg-[#8b8058] text-white p-2 rounded font-bold hover:opacity-90">
        {editingTask ? 'Save Changes' : 'Create Project'}
      </button>
    </form>
  );
};

export default TaskForm;