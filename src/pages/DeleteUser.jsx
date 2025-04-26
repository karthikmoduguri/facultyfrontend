import { useState } from "react";
import axios from "axios";

const DeleteUser = () => {
  const [input, setInput] = useState("");
  const [option, setOption] = useState("id"); // Default: delete by ID

  const handleDeleteUser = async (e) => {
    e.preventDefault();

    if (!input.trim()) {
      alert("Please enter a User ID or Email.");
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");
      let url = `http://localhost:7000/api/v1/admin/delete-user`;
      let config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      if (option === "id") {
        // Delete by ID
        await axios.delete(`${url}/${input}`, config);
      } else {
        // Delete by Email (Body)
        console.log(config);
        await axios.post(url,  { email: input },  // Pass request body separately
          {
              headers: {
                  Authorization: `Bearer ${token}`, // Correct way to send token
              },
          });
      }

      alert("User deleted successfully!");
      setInput("");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to delete user");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-xl font-bold mb-4">Delete User</h2>
      <form onSubmit={handleDeleteUser} className="flex flex-col gap-4">
        <select
          className="p-2 border rounded"
          value={option}
          onChange={(e) => setOption(e.target.value)}
        >
          <option value="id">Delete by ID</option>
          <option value="email">Delete by Email</option>
        </select>

        <input
          type="email"
          placeholder={option === "id" ? "Enter User ID" : "Enter Email"}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="p-2 border rounded"
          required
        />

        <button type="submit" className="p-2 bg-red-500 text-white rounded">
          Delete User
        </button>
      </form>
    </div>
  );
};

export default DeleteUser;
