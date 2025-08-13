import React from "react";
import axios from "axios";

const CancelBookingButton = ({ bookingId }) => {
    const handleCancel = async () => {
        try {
            await axios.delete(`http://localhost:7000/api/v1/bookings/${bookingId}`);
            alert("Booking Cancelled");
            window.location.reload();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <button
            onClick={handleCancel}
            className="px-3 py-1 bg-red-500 text-white rounded"
        >
            Cancel
        </button>
    );
};

export default CancelBookingButton;
