import { useEffect, useState } from "react";
import axios from "axios";
import {
  Line,
  Pie,
  Bar
} from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Tooltip,
  Legend
);

const API = "http://localhost:5000/api/habits/analytics/summary";

export default function Analytics() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(API).then(res => setData(res.data));
  }, []);

  if (!data) return <p>Loading analytics...</p>;

  // Line chart
  const lineData = {
    labels: data.dailyProgress.map(d => d.date),
    datasets: [{
      label: "Daily Completion %",
      data: data.dailyProgress.map(d => d.percent),
      fill: false
    }]
  };

  // Pie chart
  const pieData = {
    labels: ["Completed", "Missed"],
    datasets: [{
      data: [data.overall.completed, data.overall.missed]
    }]
  };

  // Bar chart
  const barData = {
    labels: data.habitStats.map(h => h.name),
    datasets: [{
      label: "Completion %",
      data: data.habitStats.map(h =>
        Math.round((h.done / h.total) * 100)
      )
    }]
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Analytics
      </h1>

      <div className="grid gap-8">
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-semibold mb-2">
            Daily Progress
          </h2>
          <Line data={lineData} />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="font-semibold mb-2">
              Overall Completion
            </h2>
            <Pie data={pieData} />
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="font-semibold mb-2">
              Habit-wise Performance
            </h2>
            <Bar data={barData} />
          </div>
        </div>
      </div>
    </div>
  );
}
