 "use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const KEY = "cinematic-flow-theme";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const saved = localStorage.getItem(KEY);
    const next = saved === "light" || saved === "dark"
      ? saved
      : (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    document.documentElement.dataset.theme = next;
    setTheme(next);
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem(KEY, next);
    setTheme(next);
    window.dispatchEvent(new CustomEvent("cinematic-toast", {
      detail: { message: `${next === "dark" ? "Dark" : "Light"} mode enabled` }
    }));
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <span className="theme-toggle-track">
        {theme === "dark" ? <Moon size={15} /> : <Sun size={15} />}
      </span>
    </button>
  );
}
