import React, { useState, useEffect } from "react";
import FacultyList from "./FacultyList";
import MyBookings from "./MyBookings.jsx";
import axios from "axios";
import { useLocation } from "react-router-dom";
import ChatbotWidget from "../ChatBotWidget.jsx";
import NotificationHandler from "../NotificationHandler.jsx";
const StudentDashboard = () => {
    const location = useLocation();
    const [departments, setDepartments] = useState([]);
    const [selectedDept, setSelectedDept] = useState(null);
    const [student, setStudent] = useState(null);

    // ✅ Get student details from query params
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const userDataEncoded = queryParams.get("userme");
        if (userDataEncoded) {
            try {
                const userObj = JSON.parse(decodeURIComponent(userDataEncoded));
                // console.log(userObj);
                setStudent(userObj);
            } catch (error) {
                console.error("Error decoding student data", error);
            }
        }
    }, [location.search]);

    // 🔹 Fetch departments
    useEffect(() => {
        console.log(student);
        const fetchDepartments = async () => {
            try {
                const res = await axios.get("http://localhost:7000/api/v1/department/all");
                setDepartments(res.data);
            } catch (err) {
                console.error("Error fetching departments:", err);
            }
        };
        fetchDepartments();
    }, []);

    return (
        <div className="min-h-screen bg-gray-400 p-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">🎓 Student Dashboard</h1>

                {/* 🔹 Student Info Card */}
                {student && (
                    <div className="bg-gray-300 shadow rounded-lg p-6 mb-8">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">My Profile</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            <div>
                                <p className="text-gray-500 text-sm">Name</p>
                                <p className="font-medium">{student.name}</p>
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm">Roll No</p>
                                <p className="font-medium">{student.rollNumber}</p>
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm">Email</p>
                                <p className="font-medium">{student.email}</p>
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm">Department</p>
                                <p className="font-medium">
                                    {student.department?.code || student.department}
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm">Year</p>
                                <p className="font-medium">{student.year}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* 🔹 Departments Section */}
                <div className="bg-gray-300 shadow rounded-lg p-6 mb-8">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">
                        Departments
                    </h2>
                    {departments.length === 0 ? (
                        <p className="text-gray-500">Loading departments...</p>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                            {departments.map((dept) => (
                                <div
                                    key={dept._id}
                                    onClick={() => setSelectedDept(dept)}
                                    className={`cursor-pointer border rounded-lg p-4 shadow-sm hover:shadow-md transition 
                                        ${selectedDept?._id === dept._id ? "bg-blue-100 border-blue-500" : "bg-white"}`}
                                >
                                    <p className="text-lg font-medium text-gray-800 text-center">
                                        {dept.code}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* 🔹 Faculties List */}
                {selectedDept && (
                    <div className="bg-gray-300 shadow rounded-lg p-6 mb-8">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">
                            Faculties in {selectedDept.code} Department
                        </h2>
                        <FacultyList departmentId={selectedDept._id} />
                    </div>
                )}

                {/* 🔹 My Bookings */}
                <div className="bg-gray-300 shadow rounded-lg p-6 mb-8">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">My Bookings</h2>
                    {console.log("hi")}
                    <MyBookings  studentId={student?._id}/>
                </div>
            </div>

             <div className="relative">
      {/* Your dashboard UI */}
      <ChatbotWidget />
       <NotificationHandler />
    </div>
        </div>
    );
};

export default StudentDashboard;
