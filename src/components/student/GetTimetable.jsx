import React, { useState } from "react";
import ViewTimeTable from "../TimeTableview";

const GetTimetableButton = ({ facultyId }) => {
  const [showTable, setShowTable] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowTable(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
      >
        View Full Timetable
      </button>

      {showTable && <ViewTimeTable facultyId={facultyId} />}
    </>
  );
};

export default GetTimetableButton;
