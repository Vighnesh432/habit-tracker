import { Link, useLocation } from "react-router-dom";
import {
  CalendarDays,
  History,
  BarChart3,
  Brain,
  Moon,
  Sun,
} from "lucide-react";

export default function Sidebar({ dark, toggleTheme }) {
  const location = useLocation();

  const link = (path) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg mb-2 transition ${
      location.pathname === path
        ? "bg-indigo-600 text-white"
        : "hover:bg-gray-200 dark:hover:bg-gray-700"
    }`;

  return (
    <div className="w-60 bg-white dark:bg-gray-800 border-r dark:border-gray-700 p-4">
      <h1 className="text-xl font-bold text-indigo-600 mb-6">
        Habit Tracker
      </h1>

      <Link to="/" className={link("/")}>
        <CalendarDays size={18} /> Today
      </Link>

      <Link to="/history" className={link("/history")}>
        <History size={18} /> History
      </Link>

      <Link to="/analytics" className={link("/analytics")}>
        <BarChart3 size={18} /> Analytics
      </Link>

      <Link to="/ai" className={link("/ai")}>
        <Brain size={18} /> AI Feedback
      </Link>

      <div className="mt-8">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700"
        >
          {dark ? <Sun size={18} /> : <Moon size={18} />}
          {dark ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </div>
  );
}
