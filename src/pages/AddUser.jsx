import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const AddUser = () => {
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    role: "faculty",
    name: "",
    department: "",
    regno: "",
    batch: "",
    semester: "",
    section: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let payload =
      formData.role === "faculty"
        ? {
            email: formData.email,
            role: formData.role,
            department: formData.department,
            name: formData.name
          }
        : {
            email: formData.email,
            role: formData.role,
            name: formData.name,
            regno: formData.regno,
            batch: formData.batch,
            department: formData.department,
            semester: formData.semester,
            section: formData.section
          };

    try {
      const res = await fetch("http://localhost:7000/api/v1/admin/add-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error("Failed to add user");

      alert("User added successfully!");
      setFormData({
        email: "",
        role: "faculty",
        name: "",
        department: "",
        regno: "",
        batch: "",
        semester: "",
        section: ""
      });
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Add User</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-2 border rounded text-gray-900"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <select
            name="role"
            className="w-full p-2 border rounded text-gray-900"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="faculty">Faculty</option>
            <option value="student">Student</option>
          </select>

          <input
            type="text"
            name="name"
            placeholder="Name"
            className="w-full p-2 border rounded text-gray-900"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="department"
            placeholder="Department"
            className="w-full p-2 border rounded text-gray-900"
            value={formData.department}
            onChange={handleChange}
            required
          />

          {formData.role === "student" && (
            <>
              <input
                type="text"
                name="regno"
                placeholder="Reg No"
                className="w-full p-2 border rounded text-gray-900"
                value={formData.regno}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="batch"
                placeholder="Batch"
                className="w-full p-2 border rounded text-gray-900"
                value={formData.batch}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="semester"
                placeholder="Semester"
                className="w-full p-2 border rounded text-gray-900"
                value={formData.semester}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="section"
                placeholder="Section"
                className="w-full p-2 border rounded text-gray-900"
                value={formData.section}
                onChange={handleChange}
                required
              />
            </>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-800 text-white p-2 rounded font-bold transition"
          >
            Add User
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
