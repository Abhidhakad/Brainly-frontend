import { Moon, Sun } from "lucide-react";
import { useTheme } from "../theme/ThemeProvider";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  // decide next theme on click
  const toggleTheme = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("light");
    else setTheme("dark"); // system → dark (industry default)
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="flex items-center justify-center w-10 h-10 rounded-md
        bg-bg text-text hover:opacity-80 border border-transparent hover:border-gray-400
        transition-all">
      {/* Icons */}
      {theme === "dark" ? <Sun/> : <Moon className="text-gray-800" /> }
    </button>
  );
}
