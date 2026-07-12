"use client";

import { useEffect, useState } from "react";
import { Sun, Moon, Menu, X, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { paperConfig } from "../config/paper";

const NAV_ITEMS = [
  { label: "Abstract", href: "#abstract" },
  { label: "Method", href: "#method" },
  { label: "Architecture", href: "#architecture" },
  { label: "Results", href: "#results" },
  { label: "Benchmark", href: "#benchmark" },
  { label: "Deployment", href: "#deployment" },
  { label: "Cite", href: "#bibtex" },
];

export default function Navbar() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Sync theme with document class
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll spy implementation
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.href.replace("#", ""));
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl rounded-full transition-all duration-300 ${
          isScrolled
            ? "glassmorphism shadow-lg py-3 px-6"
            : "bg-transparent py-4 px-6 border-b border-transparent"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo / Title */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 font-semibold text-sm md:text-base tracking-tight text-foreground transition-opacity hover:opacity-80"
          >
            <Award className="w-5 h-5 text-indigo-500" />
            <span className="hidden sm:inline">Lightweight Mamba KD</span>
            <span className="sm:hidden">L-Mamba KD</span>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeSection === item.href.replace("#", "")
                    ? "text-indigo-600 dark:text-indigo-400 font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {activeSection === item.href.replace("#", "") && (
                  <motion.span
                    layoutId="activeNavBackground"
                    className="absolute inset-0 bg-indigo-50 dark:bg-indigo-950/40 rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {item.label}
              </button>
            ))}
          </nav>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-border bg-card/50 text-foreground hover:bg-muted transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === "light" ? (
                <Moon className="w-4 h-4 text-indigo-600" />
              ) : (
                <Sun className="w-4 h-4 text-amber-400" />
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-full border border-border bg-card/50 text-foreground hover:bg-muted transition-colors md:hidden"
              aria-label="Toggle Mobile Menu"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-20 z-40 p-6 glassmorphism rounded-3xl shadow-xl flex flex-col gap-4 md:hidden"
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className={`py-2 text-left text-base font-medium transition-colors border-b border-border/40 last:border-0 ${
                  activeSection === item.href.replace("#", "")
                    ? "text-indigo-600 dark:text-indigo-400 font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
