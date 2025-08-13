import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white p-6">
      <h2 className="text-3xl font-bold mb-8 tracking-wide">Admin Dashboard</h2>
      
      <div className="grid grid-cols-1 gap-4 w-full max-w-md">
        <button
          onClick={() => navigate("/add-user")}
          className="p-4 bg-gray-700 hover:bg-gray-600 rounded-lg shadow-md transition duration-200"
        >
          Add User
        </button>

        <button
          onClick={() => navigate("/bulk-upload")}
          className="p-4 bg-gray-700 hover:bg-gray-600 rounded-lg shadow-md transition duration-200"
        >
          Bulk Upload Users
        </button>

        <button
          onClick={() => navigate("/delete-user")}
          className="p-4 bg-gray-700 hover:bg-gray-600 rounded-lg shadow-md transition duration-200"
        >
          Delete User
        </button>

        <button
          onClick={() => navigate("/add-department")}
          className="p-4 bg-gray-700 hover:bg-gray-600 rounded-lg shadow-md transition duration-200"
        >
          Add Department
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
