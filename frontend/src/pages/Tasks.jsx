import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import TaskForm from '../components/TaskForm';
import { useAuth } from '../context/AuthContext';

const Tasks = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axiosInstance.get('/api/projects', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setTasks(response.data);
      } catch (error) {
        alert('Failed to fetch tasks.');
      }
    };

    fetchTasks();
  }, [user]);

  return (
    <div className="container mx-auto p-6">
      <TaskForm
        tasks={tasks}
        setTasks={setTasks}
        editingTask={editingTask}
        setEditingTask={setEditingTask}
      />
    </div>
  );
};

export default Tasks;
