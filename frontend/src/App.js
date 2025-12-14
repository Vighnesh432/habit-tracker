import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Analytics from "./pages/Analytics";
import AIFeedback from "./pages/AIFeedback";

function App() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);

  const toggleTheme = () => {
    if (dark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setDark(!dark);
  };

  return (
    <Router>
      <Layout dark={dark} toggleTheme={toggleTheme}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/history" element={<History />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/ai" element={<AIFeedback />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
