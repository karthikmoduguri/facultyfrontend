import { useEffect } from "react";
import { useSocket } from "../context/SocketContext";
import toast from "react-hot-toast";

export default function NotificationHandler({ role }) {
  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) return;

    // NEW BOOKING — For faculty only
    if (role === "faculty") {
      socket.on("newBooking", (data) => {
        toast.success(
          `New booking request from student ${data.studentId} at ${data.timeSlot}`
        );
      });
    }

    // BOOKING STATUS UPDATE — For students only
    if (role === "student") {
      socket.on("updateBookingStatus", (data) => {
        toast.success(`Your booking is now ${data.status}`);
      });
    }

    // BOOKING CANCELLED — For both
    socket.on("facultyBookingCancelled", (data) => {
      toast.error(`Booking cancelled: ${data.reason || "No reason provided"}`);
    });

    return () => {
      socket.off("newBooking");
      socket.off("updateBookingStatus");
      socket.off("facultyBookingCancelled");
    };
  }, [socket, role]);

  return null; // UI ki emi render avvadu, just listen chestundi
}
