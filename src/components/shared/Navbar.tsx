
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Heart,
    Menu,
    X,
    User,
    LogOut,
} from "lucide-react";

import { useSession, signOut } from "@/lib/auth-client";
import ThemeToggle from "@/components/shared/ThemeToggle";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const router = useRouter();
    const { data: session, isPending } = useSession();

    const links = [
        { name: "Home", href: "/" },
        { name: "Events", href: "/events" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
    ];

    const handleLogout = async () => {
        try {
            setIsLoggingOut(true);

            await signOut();

            setIsOpen(false);
            router.push("/");
            router.refresh();
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            setIsLoggingOut(false);
        }
    };

    return (
        <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur dark:border-gray-800 dark:bg-gray-950/95">
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-5">
                {/* Logo */}
                <Link
                    href="/"
                    className="flex shrink-0 items-center gap-2"
                >
                    <Heart
                        size={24}
                        className="text-indigo-600"
                        fill="currentColor"
                    />

                    <span className="text-lg font-bold text-gray-900 dark:text-white sm:text-xl">
                        Kind<span className="text-indigo-600">Connect</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-5 lg:flex xl:gap-8">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="whitespace-nowrap text-sm font-medium text-gray-600 transition hover:text-indigo-600 dark:text-gray-300"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Desktop Authentication */}
                <div className="hidden shrink-0 items-center gap-3 lg:flex">
                    <ThemeToggle />

                    {isPending ? (
                        <span className="text-sm text-gray-500">
                            Loading...
                        </span>
                    ) : session?.user ? (
                        <>
                            <Link
                                href="/dashboard/manage-events"
                                className="flex max-w-40 items-center gap-2 truncate font-semibold text-gray-700 hover:text-indigo-600 dark:text-gray-200"
                            >
                                <User size={18} className="shrink-0" />
                                <span className="truncate">
                                    {session.user.name || "My Account"}
                                </span>
                            </Link>

                            <button
                                onClick={handleLogout}
                                disabled={isLoggingOut}
                                className="flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg bg-red-50 px-3 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:opacity-60 dark:bg-red-950/40 dark:text-red-400 dark:hover:bg-red-950"
                            >
                                <LogOut size={17} />
                                {isLoggingOut ? "Logging out..." : "Logout"}
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="whitespace-nowrap px-3 py-2 font-semibold text-gray-700 dark:text-gray-200"
                            >
                                Login
                            </Link>

                            <Link
                                href="/register"
                                className="whitespace-nowrap rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                            >
                                Join Us
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile and Tablet Controls */}
                <div className="flex shrink-0 items-center gap-2 lg:hidden">
                    <ThemeToggle />

                    <button
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        className="rounded-lg p-2 text-gray-700 transition hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                        aria-label="Toggle navigation menu"
                        aria-expanded={isOpen}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            {/* Mobile and Tablet Navigation */}
            {isOpen && (
                <div className="border-t border-gray-200 bg-white px-5 py-4 dark:border-gray-800 dark:bg-gray-950 lg:hidden">
                    <div className="flex flex-col gap-4">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="font-medium text-gray-700 transition hover:text-indigo-600 dark:text-gray-200"
                            >
                                {link.name}
                            </Link>
                        ))}

                        <div className="border-t border-gray-200 pt-4 dark:border-gray-800">
                            {isPending ? (
                                <p className="text-sm text-gray-500">
                                    Loading...
                                </p>
                            ) : session?.user ? (
                                <div className="flex flex-col gap-4">
                                    <Link
                                        href="/dashboard/manage-events"
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-200"
                                    >
                                        <User size={18} />
                                        {session.user.name || "My Account"}
                                    </Link>

                                    <button
                                        onClick={handleLogout}
                                        disabled={isLoggingOut}
                                        className="flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 font-semibold text-red-600 transition hover:bg-red-100 disabled:opacity-60 dark:bg-red-950/40 dark:text-red-400 dark:hover:bg-red-950"
                                    >
                                        <LogOut size={18} />
                                        {isLoggingOut ? "Logging out..." : "Logout"}
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-4">
                                    <Link
                                        href="/login"
                                        onClick={() => setIsOpen(false)}
                                        className="font-medium text-gray-700 dark:text-gray-200"
                                    >
                                        Login
                                    </Link>

                                    <Link
                                        href="/register"
                                        onClick={() => setIsOpen(false)}
                                        className="rounded-lg bg-indigo-600 px-4 py-3 text-center font-semibold text-white transition hover:bg-indigo-700"
                                    >
                                        Join Us
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
