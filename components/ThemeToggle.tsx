"use client";

import { useState, useEffect } from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { Button } from "@/components/ui/Button";

type Theme = "neon" | "cyber" | "space";

export function ThemeToggle() {
    const [theme, setTheme] = useState<Theme>("neon");

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") as Theme;
        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.setAttribute("data-theme", savedTheme);
        }
    }, []);

    const changeTheme = (newTheme: Theme) => {
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
    };

    return (
        <div className="flex items-center gap-2 bg-white/5 rounded-full p-1 border border-white/10">
            <button
                onClick={() => changeTheme("neon")}
                className={`p-1.5 rounded-full transition-all ${theme === "neon" ? "bg-neon-cyan text-black" : "text-gray-400 hover:text-white"}`}
                title="Neon Theme"
            >
                <Moon className="w-4 h-4" />
            </button>
            <button
                onClick={() => changeTheme("cyber")}
                className={`p-1.5 rounded-full transition-all ${theme === "cyber" ? "bg-[#00ff41] text-black" : "text-gray-400 hover:text-white"}`}
                title="Cyber Theme"
            >
                <Monitor className="w-4 h-4" />
            </button>
            <button
                onClick={() => changeTheme("space")}
                className={`p-1.5 rounded-full transition-all ${theme === "space" ? "bg-[#38b6ff] text-black" : "text-gray-400 hover:text-white"}`}
                title="Space Theme"
            >
                <Sun className="w-4 h-4" />
            </button>
        </div>
    );
}
