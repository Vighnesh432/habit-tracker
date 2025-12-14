import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/habits/ai/feedback";

export default function AIFeedback() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(API).then(res => setData(res.data));
  }, []);

  if (!data) {
    return (
      <div className="text-gray-900 dark:text-gray-100">
        Loading AI feedback...
      </div>
    );
  }

  if (data.message) {
    return (
      <div className="text-gray-900 dark:text-gray-100">
        {data.message}
      </div>
    );
  }

  return (
    <div className="text-gray-900 dark:text-gray-100">
      <h1 className="text-2xl font-bold mb-6">
        AI Habit Feedback 🤖
      </h1>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow space-y-4">
        <p>
          <strong>Today:</strong> {data.todayScore} habits completed
        </p>

        <p>
          <strong>Yesterday:</strong> {data.yesterdayScore} habits completed
        </p>

        <p>
          <strong>Comparison:</strong>{" "}
          {data.comparison === "better" && "✅ Better than yesterday"}
          {data.comparison === "worse" && "⚠️ Worse than yesterday"}
          {data.comparison === "same" && "➖ Same as yesterday"}
        </p>

        <div className="bg-indigo-100 dark:bg-indigo-900 p-4 rounded-lg">
          <strong>Suggestion:</strong>
          <p className="mt-1">
            {data.suggestion}
          </p>
        </div>
      </div>
    </div>
  );
}
