
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <button
                type="button"
                aria-label="Change theme"
                className="rounded-lg border border-gray-300 p-2"
            >
                <Monitor size={20} />
            </button>
        );
    }

    return (
        <div className="flex items-center gap-1 rounded-lg border border-gray-300 p-1">
            <button
                type="button"
                onClick={() => setTheme("light")}
                aria-label="Light theme"
                title="Light theme"
                className={`rounded-md p-2 transition ${theme === "light"
                        ? "bg-indigo-600 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
            >
                <Sun size={18} />
            </button>

            <button
                type="button"
                onClick={() => setTheme("dark")}
                aria-label="Dark theme"
                title="Dark theme"
                className={`rounded-md p-2 transition ${theme === "dark"
                        ? "bg-indigo-600 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
            >
                <Moon size={18} />
            </button>

            <button
                type="button"
                onClick={() => setTheme("system")}
                aria-label="System theme"
                title="System theme"
                className={`rounded-md p-2 transition ${theme === "system"
                        ? "bg-indigo-600 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
            >
                <Monitor size={18} />
            </button>
        </div>
    );
}
