import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/habits/ai/feedback";

export default function AIFeedback() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(API).then(res => setData(res.data));
  }, []);

  if (!data) return <p>Loading AI feedback...</p>;

  if (data.message) {
    return <p className="text-gray-600">{data.message}</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        AI Habit Feedback 🤖
      </h1>

      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <p>
          <strong>Today ({data.today}):</strong>{" "}
          {data.todayScore} habits completed
        </p>

        <p>
          <strong>Yesterday ({data.yesterday}):</strong>{" "}
          {data.yesterdayScore} habits completed
        </p>

        <p>
          <strong>Comparison:</strong>{" "}
          {data.comparison === "better" && "✅ Better than yesterday"}
          {data.comparison === "worse" && "⚠️ Worse than yesterday"}
          {data.comparison === "same" && "➖ Same as yesterday"}
        </p>

        <div className="bg-indigo-50 p-4 rounded-lg">
          <strong>Suggestion:</strong>
          <p className="mt-1">{data.suggestion}</p>
        </div>
      </div>
    </div>
  );
}
