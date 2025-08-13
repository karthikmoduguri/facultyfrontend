import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const DeleteUser = () => {
  const [input, setInput] = useState("");
  const [option, setOption] = useState("id"); // Default: delete by ID
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const handleDeleteUser = async (e) => {
    e.preventDefault();

    if (!input.trim()) {
      alert("Please enter a User ID or Email.");
      return;
    }

    try {
      setLoading(true);
      const baseUrl = `http://localhost:7000/api/v1/admin/delete-user`;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`, // Make sure token is from admin login
        },
      };

      if (option === "id") {
        await axios.delete(`${baseUrl}/${input}`, config);
      } else {
        await axios.post(baseUrl, { email: input }, config);
      }

      alert("✅ User deleted successfully!");
      setInput("");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "❌ Failed to delete user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-6">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-red-400">
          Delete User
        </h2>
        <form onSubmit={handleDeleteUser} className="flex flex-col gap-4">
          <select
            className="p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
            value={option}
            onChange={(e) => setOption(e.target.value)}
          >
            <option value="id">Delete by ID</option>
            <option value="email">Delete by Email</option>
          </select>

          <input
            type={option === "email" ? "email" : "text"}
            placeholder={option === "id" ? "Enter User ID" : "Enter Email"}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
            required
          />

          <button
            type="submit"
            className={`p-3 rounded-lg font-semibold transition ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600"
            }`}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete User"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeleteUser;
