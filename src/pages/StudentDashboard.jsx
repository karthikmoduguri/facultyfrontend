import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../components/Sidebar.jsx';
import ChatBotWidget from '../components/ChatBotWidget.jsx';
import { bookSlot, cancelBooking, getCabinNumber} from '../components/StudentAction.jsx';
const StudentDashboard = () => {
  const location = useLocation();                                                        
  const [student, setStudent] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [selectedDept, setSelectedDept] = useState(null);
  const [faculties, setFaculties] = useState([]);
                                                                                          
  // Decode student from query params
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const userDataEncoded = queryParams.get("userme");
    if (userDataEncoded) {
      try {                                                                                           
        const userObj = JSON.parse(decodeURIComponent(userDataEncoded));
        setStudent(userObj);                                                                    
      } catch (error) {
        console.error("Error decoding student data", error);
      }
    }
  }, [location.search]);

  // Fetch department list
  useEffect(() => {
    axios.get("http://localhost:7000/api/v1/department/all")
      .then(res => {
        setDepartments(res.data);
      })
      .catch(err => console.error("Error fetching departments:", err));
  }, []);

  // Fetch faculties when dept selected
  const handleDeptClick = (dept) => {
    setSelectedDept(dept);
    axios.get(`http://localhost:7000/api/v1/department/faculties/${dept._id}`)
      .then(res => {
        setFaculties(res.data);
      })
      .catch(err => console.error("Error fetching faculties:", err));
  };
  
  const handleBookSlot = (facultyId) => {
    const today = new Date().toISOString().split("T")[0]; // format: YYYY-MM-DD
    const timeSlot = "9:00 AM - 10:00 AM"; // Static for now
  
    bookSlot({
      studentId: student._id,
      facultyId,
      date: today,
      timeSlot
    });
  };
  
  const handleCancelBooking = () => {
    const bookingId = prompt("Enter your booking ID to cancel:");
    if (bookingId) {
      cancelBooking(bookingId);
    }
  };
  
  const handleCabinNumber = (facultyId) => {
    getCabinNumber(facultyId);
  };
  
  if (!student) {
    return <div>Loading student dashboard...</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100 relative">
      <Sidebar student={student} />

      <div className="flex-1 p-8 overflow-auto">
        <h1 className="text-3xl font-bold mb-6 text-blue-700">
          {selectedDept ? `👨‍🏫 Faculties in ${selectedDept.code}` : '📚 Select Department'}
        </h1>

        {!selectedDept ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {departments.map((dept) => (
              <button
                key={dept._id}
                onClick={() => handleDeptClick(dept)}
                className="bg-white shadow-lg rounded-xl p-6 text-xl font-semibold text-center text-gray-800 hover:bg-blue-100 transition"
              >
                {dept.code}
              </button>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {faculties.map((fac) => (
                <div key={fac._id} className="bg-white shadow-md p-4 rounded-xl">
                  <h2 className="text-xl font-semibold text-gray-800 capitalize">{fac.name}</h2>
                  <p className="text-gray-500">{fac.email}</p>
                  <div className="flex flex-wrap gap-3 mt-4">
                  <button
  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
  onClick={() => handleBookSlot(fac._id)}
>
  Book Slot
</button>

<button
  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
  onClick={handleCancelBooking}
>
  Cancel Request
</button>

<button
  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
  onClick={() => handleCabinNumber(fac._id)}
>
  Cabin No
</button>

                  </div>
                </div>
              ))}
            </div>

            <button
              className="mt-8 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              onClick={() => {
                setSelectedDept(null);
                setFaculties([]);
              }}
            >
              🔙 Back to Departments
            </button>
          </>
        )}
      </div>

      <ChatBotWidget />
    </div>
  );
};

export default StudentDashboard;
