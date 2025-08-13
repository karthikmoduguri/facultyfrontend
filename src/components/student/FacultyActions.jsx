import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import GetTimetable from "./GetTimetable";
import BookCabinSlot from "./BookCabinSlot";
import GetTimetableButton from "./GetTimetable";
const FacultyActions = ({ facultyId }) => {
    const [cabinInfo, setCabinInfo] = useState(null);
    const [showLetter, setShowLetter] = useState(false);

    const handleGetCabin = async () => {
        try {
            const res = await axios.post(
                `http://localhost:7000/api/v1/cabinnum/getcabinnum/${facultyId}`
            );
            setCabinInfo(res.data.data);
            setShowLetter(true);

            // Hide after a delay (optional)
            setTimeout(() => setShowLetter(false), 5000);
        } catch (err) {
            console.error("Error fetching cabin number:", err);
            setCabinInfo(null);
            setShowLetter(false);
        }
    };

    return (
        <div className="mt-2 flex flex-col gap-3 relative">
            <button
                className="px-3 py-1 bg-green-500 text-white rounded shadow hover:bg-green-600 transition"
                onClick={handleGetCabin}
            >
                Get Cabin No
            </button>

            <AnimatePresence>
                {showLetter && cabinInfo && (
                    <motion.div
                        initial={{ x: -200, y: -50, opacity: 0, rotate: -15 }}
                        animate={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 1 }}
                        className="flex items-center gap-3 bg-yellow-100 p-3 rounded-lg shadow-lg"
                    >
                        {/* Bird Icon */}
                        <motion.span
                            initial={{ rotate: -20 }}
                            animate={{ rotate: 0 }}
                            transition={{ yoyo: Infinity, duration: 0.4 }}
                            className="text-3xl"
                        >
                            🐦
                        </motion.span>

                        {/* Letter Content */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                            className="bg-white px-4 py-2 rounded-lg shadow-md border border-gray-300"
                        >
                            <p className="text-lg font-bold text-center animate-pulse text-yellow-600">
                                Cabin No: {cabinInfo.cabinNo}
                            </p>
                            <p className="text-sm text-gray-600 text-center">
                                Floor: {cabinInfo.floorNo}
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <GetTimetableButton facultyId={facultyId} />
            <BookCabinSlot facultyId={facultyId} />
        </div>
    );
};

export default FacultyActions;
