import React, { useEffect, useState } from "react";
import api from "../utils/api";

const statusColor = (status) => {
  switch (status?.toLowerCase()) {
    case "approved":
      return "text-green-600 bg-green-100";
    case "rejected":
      return "text-red-600 bg-red-100";
    default:
      return "text-yellow-600 bg-yellow-100";
  }
};

const AllBookings = ({ facultyId }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!facultyId) return;
    setLoading(true);

    api
      .get(`/cabinbook/faculty/${facultyId}`)
      .then((res) => {
        console.log(res.data.bookings);
        setBookings(res.data.bookings || []);
        setError(null);
      })
      .catch(() => setError("Failed to fetch bookings"))
      .finally(() => setLoading(false));
  }, [facultyId]);

  if (loading) {
    return (
      <div className="text-center py-6 text-gray-600">Loading bookings...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-6 text-red-500 font-medium">{error}</div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500">
        No bookings found for this faculty.
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-xl p-6 overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-4">📚 All My Bookings</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="p-3 border">Student RegNo</th>
            <th className="p-3 border">Batch</th>
            <th className="p-3 border">Section</th>
            <th className="p-3 border">Date</th>
            <th className="p-3 border">Time Slot</th>
            <th className="p-3 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id} className="hover:bg-gray-50">
              <td className="p-3 border text-center">{booking.studentId?.regno}</td>
              <td className="p-3 border text-center">{booking.studentId?.batch}</td>
              <td className="p-3 border text-center">{booking.studentId?.section}</td>
              <td className="p-3 border text-center">
                {new Date(booking.date).toLocaleDateString()}
              </td>
              <td className="p-3 border text-center">{booking.timeSlot}</td>
              <td className={`p-3 border text-center font-medium rounded ${statusColor(booking.status)}`}>
                {booking.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllBookings;
