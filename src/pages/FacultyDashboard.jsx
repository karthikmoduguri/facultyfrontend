import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ViewTimeTable from "../components/TimeTableview.jsx";
import AllBookings from "../components/AllBookings.jsx";
import FacultyBookings from "../components/FacultyBookings.jsx";

const FacultyDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [faculty, setFaculty] = useState(null);
  const [showTimetable, setShowTimetable] = useState(false);
  const [showBookings, setShowBookings] = useState(false);
  const [showUpdateStatus, setShowUpdateStatus] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const userDataEncoded = queryParams.get("userme");

    if (userDataEncoded) {
      const userObj = JSON.parse(decodeURIComponent(userDataEncoded));
      setFaculty(userObj);
      localStorage.setItem("faculty", JSON.stringify(userObj));
    } else {
      const storedFaculty = localStorage.getItem("faculty");
      if (storedFaculty) {
        setFaculty(JSON.parse(storedFaculty));
      }
    }
  }, [location.search]);

  if (!faculty) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl font-semibold text-gray-700">
        Loading faculty details...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-400 p-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto space-y-8"
      >
        {/* Faculty Details */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-white/60 backdrop-blur-md rounded-2xl shadow-xl p-6 space-y-4 border border-gray-200"
        >
          <h1 className="text-3xl font-bold text-gray-800">👨‍🏫 Faculty Dashboard</h1>
          <div className="grid grid-cols-2 gap-4 text-lg text-gray-700">
            <div><strong>Faculty ID:</strong></div>
            <div>{faculty._id}</div>
            <div><strong>Email:</strong></div>
            <div>{faculty.email}</div>
            <div><strong>Role:</strong></div>
            <div>{faculty.role}</div>
            <div><strong>Google Authenticated:</strong></div>
            <div>{faculty.googleAuthenticated ? "✅ Yes" : "❌ No"}</div>
            <div><strong>Added By Admin:</strong></div>
            <div>{faculty.addedByAdmin ? "✅ Yes" : "❌ No"}</div>
            <div><strong>Google ID:</strong></div>
            <div>{faculty.googleId}</div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/60 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-gray-200"
        >
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">🛠️ Faculty Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              {
                label: showTimetable ? "Hide Time Table" : "View Time Table",
                icon: "📅",
                color: "bg-blue-500 hover:bg-blue-600",
                action: () => setShowTimetable((prev) => !prev),
              },
              {
                label: "Add Cabin Details",
                icon: "🏠",
                color: "bg-green-500 hover:bg-green-600",
                action: () => navigate(`/faculty/${faculty._id}/cabin`),
              },
              {
                label: "Add Time Table",
                icon: "🕒",
                color: "bg-purple-500 hover:bg-purple-600",
                action: () =>
                  navigate(`/add-timetable?userme=${encodeURIComponent(JSON.stringify(faculty))}`),
              },
              {
                label: "All My Bookings",
                icon: "📚",
                color: "bg-yellow-500 hover:bg-yellow-600",
                action: () => setShowBookings(!showBookings),
              },
              {
                label: showUpdateStatus ? "Hide Booking Status Update" : "Booking Status Update",
                icon: "✅",
                color: "bg-red-500 hover:bg-red-600",
                action: () => setShowUpdateStatus(!showUpdateStatus),
              },
            ].map((btn, idx) => (
              <motion.button
                key={idx}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                onClick={btn.action}
                className={`p-4 text-white rounded-xl shadow-md transition ${btn.color} flex items-center justify-center gap-2 text-lg font-medium`}
              >
                <span>{btn.icon}</span>
                {btn.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Sections */}
        {showTimetable && <ViewTimeTable facultyId={faculty._id} />}
        {showBookings && <AllBookings facultyId={faculty._id} />}
        {showUpdateStatus && (
          <div className="mt-10">
            <FacultyBookings facultyId={faculty._id} />
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default FacultyDashboard;
