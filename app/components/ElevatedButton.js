// components/ElevatedButton.js
import { FaGithub } from "react-icons/fa";

export default function ElevatedButton({ text, onClick, Icon }) {
  return (
    <button
      className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 active:shadow-lg transition-all"
      onClick={onClick}
    >
      {Icon && <Icon className="text-lg" />} {/* Render the icon if provided */}
      {text}
    </button>
  );
}
