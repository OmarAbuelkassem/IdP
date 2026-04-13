import { useEffect, useState } from "react";

export function useTheme() {
  // 1. Get initial state safely
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    const root = window.document.documentElement;

    // 2. The critical step: remove BOTH classes before adding the new one
    root.classList.remove("light", "dark");
    root.classList.add(theme);

    // 3. Keep storage in sync
    localStorage.setItem("theme", theme);

    // Debugging: Watch this in your F12 console
    console.log("Active Theme in DOM:", theme);
  }, [theme]);

  const toggleTheme = () => {
    // Use the function version of setState to ensure we have the latest value
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return { theme, toggleTheme };
}
