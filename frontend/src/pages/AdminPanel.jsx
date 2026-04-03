import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';
import { useAuth } from '../context/AuthContext';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const { user: currentUser } = useAuth(); //


  const fetchUsers = async () => {
    try {
      const res = await axiosInstance.get('/api/admin/users', {
        headers: { Authorization: `Bearer ${currentUser.token}` }
      });
      setUsers(res.data);
    } catch (error) {
      console.error('Cannot get User List', error);
    }
  };


  const handleToggleBan = async (userId) => {
    try {
      const res = await axiosInstance.put(`/api/admin/ban/${userId}`, {}, {
        headers: { Authorization: `Bearer ${currentUser.token}` }
      });
      alert(res.data.message);
      fetchUsers(); 
    } catch (error) {
      alert(error.response?.data?.message || 'Action failed');
    }
  };

  useEffect(() => {
    if (currentUser) fetchUsers();
  }, [currentUser]);

  return (
    <div className="max-w-6xl mx-auto p-6 mt-10">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 border-b-2 border-red-500 pb-2 inline-block">
        Admin Control Panel
      </h1>
      
      <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-100">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="p-4 font-bold text-gray-600">User Name</th>
              <th className="p-4 font-bold text-gray-600">Email</th>
              <th className="p-4 font-bold text-gray-600">Role</th>
              <th className="p-4 font-bold text-gray-600">Status</th>
              <th className="p-4 font-bold text-gray-600 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                <td className="p-4 font-medium">{u.name}</td>
                <td className="p-4 text-gray-600">{u.email}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    u.role === 'Admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {u.role}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`font-bold ${u.isBanned ? 'text-red-500' : 'text-green-500'}`}>
                    {u.isBanned ? 'Banned' : 'Active'}
                  </span>
                </td>
                <td className="p-4 text-center">
                  {u.role !== 'Admin' ? (
                    <button
                      onClick={() => handleToggleBan(u._id)}
                      className={`px-4 py-2 rounded-lg font-bold text-white transition ${
                        u.isBanned ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
                      }`}
                    >
                      {u.isBanned ? 'Unban' : 'Ban User'}
                    </button>
                  ) : (
                    <span className="text-gray-400 italic text-sm">System Protected</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;