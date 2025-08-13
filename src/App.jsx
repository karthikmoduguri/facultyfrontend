import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider, AuthContext } from './context/AuthContext.jsx';
import { SocketProvider } from './context/SocketContext.jsx';
import { Toaster } from "react-hot-toast";
import { useContext } from "react";

// Pages & Components
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import StudentLogin from './pages/StudentLogin';
import FacultyLogin from './pages/FacultLogin.jsx';
import AdminDashboard from './pages/AdminDashboard';
import FacultyDashboard from './pages/FacultyDashboard.jsx';
import StudentDashboard from './components/student/StudentDashboard.jsx';
import AddUser from './pages/AddUser';
import BulkUpload from './pages/BulkUpload';
import DeleteUser from './pages/DeleteUser';
import AddCabinPage from './components/AddCabinPage.jsx';
import AddTimetable from './components/AddTimetable.jsx';
import AddDepartment from "./pages/AddDepartment.jsx";
import FacultyList from './components/student/FacultyList.jsx';
import GetTimetable from './components/student/GetTimetable.jsx';
import BookCabinSlot from './components/student/BookCabinSlot.jsx';
import MyBookings from './components/student/MyBookings.jsx';

// Notification Handler
import NotificationHandler from './components/NotificationHandler.jsx';

function AppContent() {
  const { user } = useContext(AuthContext);

  return (
    <SocketProvider userId={user?.id}> 
      <Toaster position="top-right" />
      <NotificationHandler /> {/* Socket notifications listener */}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/faculty-login" element={<FacultyLogin />} />

        {/* Admin Routes */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/bulk-upload" element={<BulkUpload />} />
        <Route path="/delete-user" element={<DeleteUser />} />
        <Route path="/add-department" element={<AddDepartment />} />
        <Route path="/faculty/:facultyId/cabin" element={<AddCabinPage />} />
        <Route path="/add-timetable" element={<AddTimetable />} />  

        {/* Faculty Routes */}
        <Route path="/faculty-dashboard" element={<FacultyDashboard />} />

        {/* Student Nested Routes */}
        <Route path="/student-dashboard" element={<StudentDashboard />}>
          <Route path="faculties" element={<FacultyList />} />
          <Route path="timetable/:facultyId" element={<GetTimetable />} />
          <Route path="book-slot/:facultyId" element={<BookCabinSlot />} />
          <Route path="my-bookings" element={<MyBookings />} />
        </Route>
      </Routes>
    </SocketProvider>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}
