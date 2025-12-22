import React from "react";
import useTheme from "../../hooks/useTheme";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="
    w-10 h-10 flex items-center justify-center 
    rounded-full bg-(--btn-bg)
    hover:bg(--btn-bg-hover)
    transition-colors
    "
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun size={18} className="text-(--icon-sun)" />
      ) : (
        <Moon size={18} className="text(--icon-moon)" />
      )}
      
    </button>
  );
};

export default ThemeToggle;


