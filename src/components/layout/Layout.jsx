import Navbar from "./Navbar";
import Footer from "./Footer";
import { useEffect, useState } from "react";

export default function Layout({ children }) {

  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // persist theme

  useEffect(() => {
    //localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };



  return (
    <div className="min-h-screen bg-gray-100  dark:bg-slate-950 text-gray-900 dark:text-gray-100 transition-colors duration-300  ">
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main className="min-h-[calc(100vh-160px)] px-4">{children}</main>
      <Footer />
    </div>
  );
}
