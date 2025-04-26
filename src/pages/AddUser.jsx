import { useState } from "react";
import axios from "axios";

const AddUser = () => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("adminToken");
      const { data } = await axios.post(
        "http://localhost:7000/api/v1/admin/add-user",
        { email, role }, // Pass request body separately
        {
          headers: {
            Authorization: `Bearer ${token}`, // Correct way to send token
          },
        }
      );
      if (data.success) {
        alert("User added successfully!");
        setEmail("");
        setRole("");
      } else {
        alert("Error adding user!");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to add user");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 to-gray-700 px-4">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md text-center">
        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Add New User</h2>

        {/* Form */}
        <form onSubmit={handleAddUser} className="flex flex-col gap-4">
          {/* Email Input */}
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 text-lg border border-gray-300 rounded-lg focus:ring-4 focus:ring-green-500 outline-none transition-all"
            required
          />

          {/* Role Selection */}
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-3 text-lg border border-gray-300 rounded-lg focus:ring-4 focus:ring-green-500 outline-none transition-all"
            required
          >
            <option value="">Select Role</option>
            <option value="faculty">Faculty</option>
            <option value="student">Student</option>
          </select>

          {/* Add User Button */}
          <button
            type="submit"
            className="mt-4 w-full p-3 rounded-lg text-lg font-semibold text-white bg-green-600 hover:bg-green-700 transition-all shadow-md"
          >
            Add User
          </button>
        </form>

        {/* Footer */}
        <p className="mt-4 text-gray-500 text-sm">
          Ensure correct details before submitting.
        </p>
      </div>
    </div>
  );
};

export default AddUser;
