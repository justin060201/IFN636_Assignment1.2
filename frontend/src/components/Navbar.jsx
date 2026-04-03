import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth(); 
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); 
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
      <Link to="/" className="text-2xl font-bold">Freelancer Project System</Link>
      <div className="flex items-center">
        {user ? (
          <>
            
            <span className={`mr-4 px-2 py-1 rounded text-xs font-bold uppercase ${
              user.role === 'Admin' ? 'bg-purple-500 text-white' : 
              user.role === 'Client' ? 'bg-yellow-500 text-gray-900' : 
              'bg-green-400 text-white'
            }`}>
              {user.role} 
            </span>

            {user.role === 'Admin' && (
            <Link to="/admin/panel" className="mr-4 text-yellow-300 font-bold hover:text-yellow-100 transition">
              Admin Panel
            </Link>
            )}

            
            {user.role === 'Client' && (
              <Link to="/tasks" className="mr-4 hover:text-blue-200 transition">Create Project</Link>
            )}

            <Link to="/projects" className="mr-4 hover:text-blue-200 transition">Projects List</Link>
            <Link to="/profile" className="mr-4 hover:text-blue-200 transition">Profile</Link>
            
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-4 hover:text-blue-200 transition">Login</Link>
            <Link
              to="/register"
              className="bg-green-500 px-4 py-2 rounded hover:bg-green-700 transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;