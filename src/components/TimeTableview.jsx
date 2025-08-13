import React, { useEffect, useState } from 'react';
import api from '../utils/api';

const dayOrder = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

const statusClass = (status) => {
  if (!status || status.toLowerCase() === 'free') return 'bg-green-100 text-green-800';
  if (status.toLowerCase() === 'inclass') return 'bg-red-100 text-red-800';
  return 'bg-gray-100 text-gray-800';
};

const ViewTimeTable = ({ facultyId }) => {
  const [timetable, setTimetable] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
  if (!facultyId) return;
  setLoading(true);

  api.get(`/timetable/gettimetable/${facultyId}`)
    .then((res) => {
      // Set actual timetable object
      setTimetable(res.data.data);  // <-- Important fix
      setError(null);
    })
    .catch((err) => {
      console.error('Fetch timetable error:', err);
      setError('Failed to load timetable.');
    })
    .finally(() => setLoading(false));
}, [facultyId]);


  if (loading) {
    return (
      <div className="p-4 bg-white rounded shadow text-center">
        <div className="text-gray-600">Loading timetable...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 rounded shadow">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  if (!timetable || !timetable.week) {
    return (
      <div className="p-4 bg-yellow-50 rounded shadow">
        <div className="text-yellow-800">No timetable available.</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {dayOrder.map((day) => (
        <div key={day} className="bg-white rounded-lg shadow p-4">
          <h3 className="text-xl font-semibold capitalize mb-2">{day}</h3>
          {timetable.week[day] && timetable.week[day].length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {timetable.week[day].map((period) => (
                <div
                  key={period.period}
                  className={`border rounded p-3 flex flex-col gap-1 ${statusClass(period.status)}`}
                >
                  <div className="font-medium">Period {period.period}</div>
                  <div className="text-sm">{period.time}</div>
                  <div className="text-xs">
                    Status:{' '}
                    <span className="font-semibold">
                      {period.status && period.status !== '' ? period.status : 'Free'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm text-gray-500">No periods defined for this day.</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ViewTimeTable;
