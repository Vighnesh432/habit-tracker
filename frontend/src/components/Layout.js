import Sidebar from "./Sidebar";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

export default function Layout({ children, dark, toggleTheme }) {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900
                    text-gray-900 dark:text-gray-100">
      <Sidebar dark={dark} toggleTheme={toggleTheme} />

      <motion.main
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="flex-1 p-6"
      >
        {children}
      </motion.main>
    </div>
  );
}
