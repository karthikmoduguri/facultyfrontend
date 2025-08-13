// components/StudentActions.js
import axios from 'axios';

// Book a cabin slot
export const bookSlot = async ({ studentId, facultyId, date, timeSlot }) => {
  try {
    const res = await axios.post('http://localhost:7000/api/v1/cabinbook/bookcabin', {
      studentId,
      facultyId,
      date,
      timeSlot
    });
    alert('Booking successful!');
    return res.data;
  } catch (err) {
    console.error('Booking failed:', err);
    alert('Failed to book slot.');
  }
};

// Get faculty cabin number
export const getCabinNumber = async (facultyId) => {
  try {
    const res = await axios.post(`http://localhost:7000/api/v1/cabinnum/getcabinnum/${facultyId}`);
    alert(`Cabin Number: ${res.data.data.cabinNo}`);
    return res.data.data;
  } catch (err) {
    console.log(facultyId);
    console.error('Error fetching cabin number:', err);
    alert('Could not fetch cabin number.');
  }
};


// Cancel a request
export const cancelBooking = async (bookingId) => {
  try {
    const res = await axios.delete(`http://localhost:7000/api/v1/cabinbook/cancel/${bookingId}`);
    alert('Booking cancelled.');
    return res.data;
  } catch (err) {
    console.error('Error cancelling booking:', err);
    alert('Failed to cancel booking.');
  }
};
