
"use client";

import Link from "next/link";
import { ArrowRight, Heart, Users, CalendarDays } from "lucide-react";
import { useSession } from "@/lib/auth-client";

const Hero = () => {
    const { data: session, isPending } = useSession();

    const isLoggedIn = !!session?.user;

    return (
        <section className="overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950">
            <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 md:grid-cols-2 md:py-28">
                <div>
                    <span className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300">
                        <Heart size={16} /> Together We Can Make a Difference
                    </span>

                    <h1 className="mt-6 text-4xl font-extrabold leading-tight text-gray-900 dark:text-white md:text-6xl">
                        Connect Through Kindness,
                        <span className="text-indigo-600 dark:text-indigo-400">
                            {" "}Change Lives.
                        </span>
                    </h1>

                    <p className="mt-6 max-w-lg text-lg leading-8 text-gray-600 dark:text-gray-300">
                        Discover meaningful community events, volunteer your time,
                        and build a better world together.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-4">
                        <Link
                            href="/events"
                            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-7 py-4 font-semibold text-white transition hover:bg-indigo-700"
                        >
                            Explore Events <ArrowRight size={20} />
                        </Link>

                        <Link
                            href={
                                isPending
                                    ? "/"
                                    : isLoggedIn
                                        ? "/events"
                                        : "/register"
                            }
                            aria-disabled={isPending}
                            className={`rounded-xl border border-gray-300 bg-white px-7 py-4 font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 ${isPending ? "pointer-events-none opacity-60" : ""
                                }`}
                        >
                            {isPending
                                ? "Loading..."
                                : isLoggedIn
                                    ? "Become a Volunteer"
                                    : "Join Community"}
                        </Link>
                    </div>

                    <div className="mt-12 flex gap-8">
                        <div>
                            <p className="text-3xl font-bold text-gray-900 dark:text-white">
                                500+
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Volunteers
                            </p>
                        </div>

                        <div>
                            <p className="text-3xl font-bold text-gray-900 dark:text-white">
                                120+
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Events
                            </p>
                        </div>

                        <div>
                            <p className="text-3xl font-bold text-gray-900 dark:text-white">
                                2K+
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Lives Impacted
                            </p>
                        </div>
                    </div>
                </div>

                <div className="relative flex min-h-[350px] items-center justify-center rounded-3xl bg-indigo-600 p-10 text-white shadow-2xl md:min-h-[450px]">
                    <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-purple-400/40 blur-2xl" />

                    <div className="relative text-center">
                        <Heart size={100} fill="white" className="mx-auto" />

                        <h2 className="mt-6 text-3xl font-bold">
                            Be the Reason
                        </h2>

                        <p className="mt-2 text-lg text-indigo-100">
                            Someone Smiles Today!
                        </p>

                        <div className="mt-10 flex justify-center gap-5">
                            <Users size={35} />
                            <CalendarDays size={35} />
                            <Heart size={35} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
