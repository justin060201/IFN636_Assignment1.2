import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Tasks from './pages/Tasks';
import CreateProject from './pages/CreateProject';
import ProjectDetails from './pages/ProjectDetails';
import EditProject from './pages/EditProject';
import ProjectList from './pages/ProjectList';
import AdminEntry from './pages/AdminEntry';
import AdminPanel from './pages/AdminPanel';
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/create-project" element={<CreateProject />} />
        <Route path="/project/:projectId" element={<ProjectDetails />} />
        <Route path="/edit-project/:projectId" element={<EditProject />} />
        <Route path="/projects" element={<ProjectList />} />
        <Route path="/admin-secret-gate" element={<AdminEntry />} />
        <Route path="/admin/panel" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;
