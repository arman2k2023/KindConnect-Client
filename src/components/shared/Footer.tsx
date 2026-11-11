
"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useSession } from "@/lib/auth-client";

const Footer = () => {
    const { data: session, isPending } = useSession();

    const isLoggedIn = !!session?.user;

    const volunteerLink = isPending
        ? "/"
        : isLoggedIn
            ? "/events"
            : "/register";

    const volunteerText = isPending
        ? "Loading..."
        : isLoggedIn
            ? "Explore Events"
            : "Become a Volunteer";

    return (
        <footer className="mt-auto border-t border-gray-200 bg-gray-100 text-gray-700 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-300">
            <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:grid-cols-3">
                <div>
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white"
                    >
                        <Heart
                            size={24}
                            className="text-indigo-600 dark:text-indigo-400"
                            fill="currentColor"
                        />
                        KindConnect
                    </Link>

                    <p className="mt-4 max-w-sm text-sm leading-7 text-gray-600 dark:text-gray-400">
                        Connecting people through kindness, volunteering, and meaningful
                        community events. Together, we can make a difference.
                    </p>
                </div>

                <div>
                    <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
                        Quick Links
                    </h3>

                    <div className="flex flex-col gap-3 text-sm">
                        <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                            Home
                        </Link>
                        <Link href="/events" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                            Events
                        </Link>
                        <Link href="/about" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                            About Us
                        </Link>
                        <Link href="/contact" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                            Contact
                        </Link>
                    </div>
                </div>

                <div>
                    <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
                        Join Our Community
                    </h3>

                    <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                        Be part of something meaningful. Start making a difference today!
                    </p>

                    <Link
                        href={volunteerLink}
                        aria-disabled={isPending}
                        className={`inline-block rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 ${isPending ? "pointer-events-none opacity-60" : ""
                            }`}
                    >
                        {volunteerText}
                    </Link>
                </div>
            </div>

            <div className="border-t border-gray-200 px-5 py-5 text-center text-sm text-gray-500 dark:border-gray-800 dark:text-gray-500">
                © 2026 KindConnect. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
