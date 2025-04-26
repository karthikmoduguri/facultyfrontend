import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Login } from './pages/Login'
import Home from './pages/Home'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import AddUser from './pages/AddUser'
import BulkUpload from './pages/BulkUpload'
import DeleteUser from './pages/DeleteUser'
import StudentLogin from './pages/StudentLogin'
import FacultyLogin from './pages/FacultLogin.jsx'
import FacultyDashboard from './pages/FacultyDashboard.jsx'
import StudentDashboard from './pages/StudentDashboard.jsx'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from './context/AuthContext.jsx'
function App() {
  const [count, setCount] = useState(0)


  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/admin-login"
            element={
              <AuthProvider>
                <AdminLogin />
              </AuthProvider>
            }
          />
          <Route
            path="/student-login"
            element={
              <AuthProvider>
                <StudentLogin />
              </AuthProvider>
            }
          />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/faculty-login" element={<FacultyLogin />} />
          <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/bulk-upload" element={<BulkUpload />} />
          <Route path="/delete-user" element={<DeleteUser />} />
        </Routes>
      </Router>
    </>
  );
}

export default App
