import React, { useState, useEffect } from "react";
import axios from "axios";

const BookCabinSlot = ({ facultyId }) => {
    const [date, setDate] = useState("");
    const [timeSlot, setTimeSlot] = useState("");
    const [studentId, setStudentId] = useState("");

    const periods = [
        { period: 1, time: "9:00 AM - 10:00 AM" },
        { period: 2, time: "10:00 AM - 11:00 AM" },
        { period: 3, time: "11:00 AM - 12:00 PM" },
        { period: 4, time: "1:00 PM - 2:00 PM" },
        { period: 5, time: "2:00 PM - 3:00 PM" },
        { period: 6, time: "3:00 PM - 4:00 PM" },
        { period: 7, time: "4:00 PM - 5:00 PM" },
        { period: 8, time: "5:00 PM - 6:00 PM" }
    ];

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const studentDataEncoded = queryParams.get("userme");
        if (studentDataEncoded) {
            try {
                const studentObj = JSON.parse(decodeURIComponent(studentDataEncoded));
                setStudentId(studentObj._id);
            } catch (error) {
                console.error("Error decoding student data", error);
            }
        }
    }, []);

    const handleBooking = async () => {
        if (!date || !timeSlot) {
            alert("Please select date and time slot");
            return;
        }

        try {
            await axios.post("http://localhost:7000/api/v1/cabinbook/bookcabin", {
                studentId,
                facultyId,
                date,
                timeSlot
            });
            alert("Booking Successful");
        } catch (err) {
            console.error("Booking failed:", err);
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md space-y-3">
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="border rounded p-2 w-full"
            />

            <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="border rounded p-2 w-full"
            >
                <option value="">Select a Time Slot</option>
                {periods.map((p) => (
                    <option key={p.period} value={p.time}>
                        Period {p.period}: {p.time}
                    </option>
                ))}
            </select>

            <button
                onClick={handleBooking}
                className="w-full px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded transition"
            >
                Book Slot
            </button>
        </div>
    );
};

export default BookCabinSlot;
