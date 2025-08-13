import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api"; // axios instance

const AddCabinPage = () => {
  const { facultyId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    floorNo: "",
    cabinNo: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await api.post("/cabinnum/addcabin", {
        facultyId,
        floorNo: Number(formData.floorNo),
        cabinNo: formData.cabinNo
      });

      if (res.data.success) {
        setMessage("✅ Cabin details added successfully!");
        setTimeout(() => navigate(`/faculty-dashboard`), 1500);
      } else {
        setMessage("❌ Failed to add cabin.");
      }
    } catch (error) {
      console.error("Error adding cabin:", error);
      setMessage("❌ Error adding cabin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md space-y-6">

        <h1 className="text-2xl font-bold text-blue-600 text-center">
          🏠 Add Cabin Details
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Floor Number</label>
            <input
              type="number"
              name="floorNo"
              value={formData.floorNo}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Cabin Number</label>
            <input
              type="text"
              name="cabinNo"
              value={formData.cabinNo}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Cabin Details"}
          </button>
        </form>

        {message && <div className="text-center text-sm font-medium">{message}</div>}
      </div>
    </div>
  );
};

export default AddCabinPage;
