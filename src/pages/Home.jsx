import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleProceed = () => {
    if (role === "admin") navigate("/admin-login");
    if (role === "faculty") navigate("/faculty-login");
    if (role === "student") navigate("/student-login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-700 to-purple-700 px-4 bg-yellow-300">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md text-center">
        {/* Title */}
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
          Select Your Role
        </h1>

        {/* Dropdown Selection */}
        <div className="relative">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-3 text-lg rounded-lg border border-gray-300 focus:ring-4 focus:ring-blue-500 outline-none transition-all"
          >
            <option value="" disabled>Choose a Role...</option>
            <option value="admin">Admin</option>
            <option value="faculty">Faculty</option>
            <option value="student">Student</option>
          </select>
        </div>

        {/* Proceed Button */}
        <button
          onClick={handleProceed}
          disabled={!role}
          className={`mt-6 w-full p-3 rounded-lg text-lg font-semibold text-white transition-all 
            ${role ? "bg-blue-600 hover:bg-blue-700 shadow-md" : "bg-gray-400 cursor-not-allowed"}`}
        >
          Proceed
        </button>

        {/* Footer Text */}
        <p className="mt-4 text-gray-500 text-sm">
          Only authorized users can proceed.
        </p>
      </div>
    </div>
  );
};

export default Home;
