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

  const exportExcel = () => {
    window.open(`${API}/export/excel/${selectedDay}`);
  };

  const exportPDF = () => {
    window.open(`${API}/export/pdf/${selectedDay}`);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">History</h1>

      <div className="flex gap-6">
        <div className="w-48">
          {days.map(d => (
            <button
              key={d}
              onClick={() => setSelectedDay(d)}
              className="block w-full text-left px-3 py-2 mb-1 rounded hover:bg-gray-200"
            >
              {d}
            </button>
          ))}
        </div>

        <div className="flex-1 bg-white p-4 rounded-xl shadow">
          {!selectedDay && <p>Select a day</p>}

          {selectedDay && (
            <>
              <h2 className="font-semibold mb-3">
                Habits on {selectedDay}
              </h2>

              {habits.map((h, i) => (
                <div key={i} className="flex justify-between border-b py-1">
                  <span>{h.name}</span>
                  <span>{h.completed ? "✅" : "❌"}</span>
                </div>
              ))}

              <div className="mt-4 flex gap-3">
                <button
                  onClick={exportExcel}
                  className="px-4 py-2 bg-green-600 text-white rounded"
                >
                  Export Excel
                </button>

                <button
                  onClick={exportPDF}
                  className="px-4 py-2 bg-red-600 text-white rounded"
                >
                  Export PDF
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
