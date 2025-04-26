import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const FacultyDashboard = () => {
  const location = useLocation();
  const [faculty, setFaculty] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const userDataEncoded = queryParams.get("userme");
    if (userDataEncoded) {
      try {
        const userObj = JSON.parse(decodeURIComponent(userDataEncoded));
        setFaculty(userObj);
      } catch (error) {
        console.error("Error decoding user data", error);
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
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Faculty Details */}
        <div className="bg-white rounded-2xl shadow-xl p-6 space-y-4">
          <h1 className="text-3xl font-bold text-blue-700">👨‍🏫 Faculty Dashboard</h1>
          
          <div className="grid grid-cols-2 gap-4 text-lg">
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
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">🛠️ Faculty Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            
            <button className="p-4 bg-blue-500 text-white rounded-xl shadow hover:bg-blue-600 transition">📅 View Time Table</button>
            
            <button className="p-4 bg-green-500 text-white rounded-xl shadow hover:bg-green-600 transition">🏠 Add Cabin Details</button>
            
            <button className="p-4 bg-purple-500 text-white rounded-xl shadow hover:bg-purple-600 transition">🕒 Add Time Table</button>
            
            <button className="p-4 bg-yellow-500 text-white rounded-xl shadow hover:bg-yellow-600 transition">📚 All My Bookings</button>
            
            <button className="p-4 bg-red-500 text-white rounded-xl shadow hover:bg-red-600 transition">✅ Booking Status Update</button>

          </div>
        </div>

      </div>
    </div>
  );
};

export default FacultyDashboard;
