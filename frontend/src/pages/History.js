import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/habits";

export default function History() {
  const [days, setDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    axios.get(API).then(res => setDays(res.data));
  }, []);

  useEffect(() => {
    if (!selectedDay) return;
    axios.get(`${API}/${selectedDay}`).then(res => setHabits(res.data));
  }, [selectedDay]);

  return (
    <div className="text-gray-900 dark:text-gray-100">
      <h1 className="text-2xl font-bold mb-6">
        History
      </h1>

      <div className="flex gap-6">
        {/* Days list */}
        <div className="w-48">
          {days.map(d => (
            <button
              key={d}
              onClick={() => setSelectedDay(d)}
              className="block w-full text-left px-3 py-2 mb-1 rounded
                         bg-gray-100 dark:bg-gray-800
                         hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {d}
            </button>
          ))}
        </div>

        {/* Details */}
        <div className="flex-1 bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
          {!selectedDay && (
            <p className="text-gray-600 dark:text-gray-400">
              Select a day to view habits
            </p>
          )}

          {selectedDay && (
            <>
              <h2 className="font-semibold mb-3">
                Habits on {selectedDay}
              </h2>

              {habits.map((h, i) => (
                <div
                  key={i}
                  className="flex justify-between border-b
                             border-gray-200 dark:border-gray-700
                             py-2"
                >
                  <span>{h.name}</span>
                  <span>{h.completed ? "✅" : "❌"}</span>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
