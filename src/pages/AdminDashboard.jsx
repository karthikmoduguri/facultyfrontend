import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-sky-300">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
      <div className="grid grid-cols-1 gap-4">
        <button
          onClick={() => navigate("/add-user")}
          className="p-4 bg-blue-500 text-white rounded"
        >
          Add User
        </button>
        <button
          onClick={() => navigate("/bulk-upload")}
          className="p-4 bg-green-500 text-white rounded"
        >
          Bulk Upload Users
        </button>
        <button
          onClick={() => navigate("/delete-user")}
          className="p-4 bg-red-500 text-white rounded"
        >
          Delete User
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
