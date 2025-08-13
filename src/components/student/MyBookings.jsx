import React, { useEffect, useState } from "react";
import axios from "axios";

const MyBookings = ({ studentId }) => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:7000/api/v1/cabinbook/student/${studentId}`
                );
                setBookings(res.data.data || []);
            } catch (err) {
                console.error("Error fetching bookings:", err);
            }
        };

        if (studentId) {
            fetchBookings();
        }
    }, [studentId]);

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case "approved":
                return "bg-green-100 text-green-700 border-green-300";
            case "pending":
                return "bg-yellow-100 text-yellow-700 border-yellow-300";
            case "rejected":
                return "bg-red-100 text-red-700 border-red-300";
            default:
                return "bg-gray-100 text-gray-700 border-gray-300";
        }
    };

    return (
        <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
                My Bookings
            </h2>
            {bookings.length > 0 ? (
                <div className="space-y-3">
                    {bookings.map((b, index) => (
                        <div
                            key={b._id || index}
                            className={`border p-4 rounded-lg shadow-sm hover:shadow-md transition duration-300 ease-in-out flex justify-between items-center ${getStatusColor(
                                b.status
                            )}`}
                        >
                            <div>
                                <p className="font-semibold">
                                    {new Date(b.date).toLocaleDateString()}
                                </p>
                                <p className="text-sm">{b.timeSlot}</p>
                            </div>
                            <span className="font-bold capitalize">
                                {b.status}
                            </span>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 italic">No bookings found</p>
            )}
        </div>
    );
};

export default MyBookings;
