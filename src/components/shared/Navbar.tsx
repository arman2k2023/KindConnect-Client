
"use client";

import Link from "next/link";
import { useState } from "react";
import { Heart, Menu, X } from "lucide-react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const links = [
        { name: "Home", href: "/" },
        { name: "Events", href: "/events" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
                <Link href="/" className="flex items-center gap-2">
                    <Heart size={24} className="text-indigo-600" fill="currentColor" />
                    <span className="text-xl font-bold">
                        Kind<span className="text-indigo-600">Connect</span>
                    </span>
                </Link>

                <div className="hidden items-center gap-8 md:flex">
                    {links.map((link) => (
                        <Link key={link.href} href={link.href}
                            className="text-sm font-medium text-gray-600 hover:text-indigo-600">
                            {link.name}
                        </Link>
                    ))}
                </div>

                <div className="hidden items-center gap-3 md:flex">
                    <Link href="/login" className="px-4 py-2 font-semibold text-gray-700">
                        Login
                    </Link>
                    <Link href="/register"
                        className="rounded-lg bg-indigo-600 px-5 py-2.5 font-semibold text-white hover:bg-indigo-700">
                        Join Us
                    </Link>
                </div>

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="rounded-lg p-2 md:hidden"
                    aria-label="Toggle navigation menu"
                    aria-expanded={isOpen}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </nav>

            {isOpen && (
                <div className="border-t bg-white px-5 py-4 md:hidden">
                    <div className="flex flex-col gap-4">
                        {links.map((link) => (
                            <Link key={link.href} href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="font-medium text-gray-700">
                                {link.name}
                            </Link>
                        ))}
                        <Link href="/login" onClick={() => setIsOpen(false)}>
                            Login
                        </Link>
                        <Link href="/register"
                            onClick={() => setIsOpen(false)}
                            className="rounded-lg bg-indigo-600 px-4 py-3 text-center text-white">
                            Join Us
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
