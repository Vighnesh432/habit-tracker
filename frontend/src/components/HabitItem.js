import { motion } from "framer-motion";

export default function HabitItem({ habit, checked, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className={`flex items-center justify-between p-4 mb-3 rounded-xl shadow-sm
        ${
          checked
            ? "bg-green-50 dark:bg-green-900 border border-green-300"
            : "bg-white dark:bg-gray-800"
        }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 flex items-center justify-center rounded-full text-lg
            ${
              checked
                ? "bg-green-500 text-white"
                : "bg-indigo-100 dark:bg-indigo-700 text-indigo-600 dark:text-white"
            }`}
        >
          {checked ? "✔" : "📝"}
        </div>

        <span
          className={`text-lg transition-all
            ${
              checked
                ? "line-through text-gray-400"
                : "text-gray-800 dark:text-gray-100"
            }`}
        >
          {habit}
        </span>
      </div>

      <input
        type="checkbox"
        checked={checked}
        onChange={onToggle}
        className="w-6 h-6 accent-green-600 cursor-pointer"
      />
    </motion.div>
  );
}
