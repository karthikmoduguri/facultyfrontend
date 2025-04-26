import React from 'react';

const Sidebar = ({ student }) => {
  return (
    <div className="w-64 bg-white shadow-xl p-6">
      <h2 className="text-xl font-bold text-blue-600 mb-4">👤 Student Profile</h2>
      <p><strong>ID:</strong> {student._id}</p>
      <p><strong>Email:</strong> {student.email}</p>
      <p><strong>Role:</strong> {student.role}</p>
      <p><strong>Google Auth:</strong> {student.googleAuthenticated ? "✅" : "❌"}</p>
    </div>
  );
};

export default Sidebar;
