import React, { useEffect, useState, useCallback } from "react";
import FacultyActions from "./FacultyActions";
import axios from "axios";

const FacultyList = ({ departmentId }) => {
    const [faculties, setFaculties] = useState([]);

    const fetchFaculties = useCallback(async () => {
    if (!departmentId) {
        setFaculties([]); // clear list if no department
        return;
    }
    try {
        const res = await axios.get(
            `http://localhost:7000/api/v1/department/faculties/${departmentId}`
        );
        setFaculties(res.data || []); // ensures UI updates to empty if no data
    } catch (err) {
        console.error("Error fetching faculties:", err);
        setFaculties([]); // clear list on error
    }
}, [departmentId]);

    useEffect(() => {
        fetchFaculties();
    }, [fetchFaculties]);

    return (
        <div>
            <h3 className="text-xl font-bold mb-2">Faculties</h3>
            <div className="grid grid-cols-3 gap-4">
                {faculties.map((faculty) => (
                    <div key={faculty._id} className="p-4 border rounded shadow">
                        <p className="font-semibold">{faculty.name}</p>
                        {/* Pass the refetch function to FacultyActions */}
                        <FacultyActions
                            facultyId={faculty._id}
                            onUpdate={fetchFaculties}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FacultyList;
