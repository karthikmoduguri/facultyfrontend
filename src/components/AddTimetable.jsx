import React, { useState } from "react";
import api from "../utils/api";
import { useNavigate, useLocation } from "react-router-dom";

const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
const defaultPeriods = [
  { period: 1, time: "9:00 AM - 10:00 AM", status: "" },
  { period: 2, time: "10:00 AM - 11:00 AM", status: "" },
  { period: 3, time: "11:00 AM - 12:00 PM", status: "" },
  { period: 4, time: "1:00 PM - 2:00 PM", status: "" },
  { period: 5, time: "2:00 PM - 3:00 PM", status: "" },
  { period: 6, time: "3:00 PM - 4:00 PM", status: "" },
  { period: 7, time: "4:00 PM - 5:00 PM", status: "" },
  { period: 8, time: "5:00 PM - 6:00 PM", status: "" },
];

export default function AddTimetable() {
  const location = useLocation();
  const navigate = useNavigate();

  // faculty info from query param
  const queryParams = new URLSearchParams(location.search);
  const userDataEncoded = queryParams.get("userme");
  const faculty = userDataEncoded ? JSON.parse(decodeURIComponent(userDataEncoded)) : null;

  const [week, setWeek] = useState(() => {
    const initial = {};
    days.forEach(day => {
      initial[day] = defaultPeriods.map(p => ({ ...p }));
    });
    return initial;
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleStatusChange = (day, periodIndex, value) => {
    setWeek(prev => {
      const newWeek = { ...prev };
      newWeek[day] = newWeek[day].map((p, idx) =>
        idx === periodIndex ? { ...p, status: value } : p
      );
      return newWeek;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!faculty?._id) return alert("Faculty ID missing!");

    try {
      setLoading(true);
      setMessage(null);

      await api.post("/timetable/addtimetable", {
        facultyId: faculty._id,
        weektimetable: week,
      });

      setMessage("✅ Timetable saved successfully!");
      setTimeout(() => navigate(`/faculty-dashboard?userme=${encodeURIComponent(userDataEncoded)}`), 1500);

    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to save timetable.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-6">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">🕒 Add Timetable</h1>
        {message && <div className="mb-4 text-center text-lg">{message}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">

          {days.map(day => (
            <div key={day} className="overflow-x-auto">
              <h2 className="text-xl font-semibold capitalize mb-2">{day}</h2>
              <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-200 text-gray-800">
                    <th className="px-4 py-2">Period</th>
                    <th className="px-4 py-2">Time</th>
                    <th className="px-4 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {week[day].map((p, idx) => (
                    <tr key={idx} className="border-t">
                      <td className="px-4 py-2 text-center">{p.period}</td>
                      <td className="px-4 py-2 text-center">{p.time}</td>
                      <td className="px-4 py-2 text-center">
                        <select
                          value={p.status}
                          onChange={(e) => handleStatusChange(day, idx, e.target.value)}
                          className="border rounded px-2 py-1"
                        >
                          <option value="">-- Select --</option>
                          <option value="Free">Free</option>
                          <option value="INCLASS">INCLASS</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className="mt-4 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700"
          >
            {loading ? "Saving..." : "Save Timetable"}
          </button>
        </form>
      </div>
    </div>
  );
}
