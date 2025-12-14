import { useEffect, useState } from "react";
import HabitItem from "../components/HabitItem";
import { getTodayDate } from "../services/dateService";
import axios from "axios";

const API_BASE = "http://localhost:5000/api/habits";

export default function Dashboard() {
  const today = getTodayDate();
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHabits = async () => {
      try {
        const res = await axios.get(`${API_BASE}/${today}`);
        setHabits(res.data);
      } catch (error) {
        console.error("Failed to load habits", error);
      } finally {
        setLoading(false);
      }
    };

    loadHabits();
  }, [today]);

  const toggleHabit = async (index) => {
    const updated = [...habits];
    updated[index].completed = updated[index].completed ? 0 : 1;
    setHabits(updated);

    await axios.post(`${API_BASE}/toggle`, {
      date: today,
      name: updated[index].name,
      completed: updated[index].completed,
    });
  };

  const completedCount = habits.filter((h) => h.completed).length;
  const progress =
    habits.length > 0
      ? Math.round((completedCount / habits.length) * 100)
      : 0;

  if (loading) {
    return <p className="text-gray-500">Loading today’s habits...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Today – {today}
      </h1>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="bg-gray-300 rounded-full h-4 overflow-hidden">
          <div
            className="bg-indigo-600 h-4 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 mt-1">
          {progress}% completed
        </p>
      </div>

      {/* Habits */}
      {habits.map((habit, index) => (
        <HabitItem
          key={index}
          habit={habit.name}
          checked={!!habit.completed}
          onToggle={() => toggleHabit(index)}
        />
      ))}
    </div>
  );
}
