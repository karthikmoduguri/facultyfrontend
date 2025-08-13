import React, { useEffect, useState } from "react";
import axios from "axios";

const FacultyBookings = ({ facultyId }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(
        `http://localhost:7000/api/v1/cabinbook/faculty/${facultyId}`
      );
      if (res.data.success) {
        setBookings(res.data.bookings);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (bookingId, status) => {
    try {
      const res = await axios.patch(
        `http://localhost:7000/api/v1/cabinbook/update/${bookingId}`,
        { status }
      );
      if (res.data.success) {
        alert(`Booking ${status} successfully!`);
        fetchBookings(); // refresh list
      }
    } catch (error) {
      console.error("Error updating booking:", error);
      alert("Failed to update booking");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [facultyId]);

  if (loading) {
    return <p className="text-center mt-5">Loading bookings...</p>;
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        📚 All My Bookings (With Status Update)
      </h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300 text-center">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Student RegNo</th>
              <th className="border p-2">Batch</th>
              <th className="border p-2">Section</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Time Slot</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id}>
                <td className="border p-2">{b.studentId?.regno || "N/A"}</td>
                <td className="border p-2">{b.studentId?.batch || "N/A"}</td>
                <td className="border p-2">{b.studentId?.section || "N/A"}</td>
                <td className="border p-2">
                  {new Date(b.date).toLocaleDateString()}
                </td>
                <td className="border p-2">{b.timeSlot}</td>
                <td className="border p-2">{b.status}</td>
                <td className="border p-2 space-x-2">
                  <button
                    onClick={() => updateStatus(b._id, "Approved")}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateStatus(b._id, "Rejected")}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FacultyBookings;
