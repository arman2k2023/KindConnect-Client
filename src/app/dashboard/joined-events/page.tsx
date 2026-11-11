
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import DashboardNavigation from "@/components/dashboard/DashboardNavigation";
import Link from "next/link";
import {
    CalendarDays,
    MapPin,
    Loader2,
} from "lucide-react";

import { useSession, authClient } from "@/lib/auth-client";
import type { Event } from "@/services/event-api";

const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function JoinedEventsPage() {
    const router = useRouter();
    const { data: session, isPending } = useSession();

    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!isPending && !session?.user) {
            router.replace("/login");
        }
    }, [isPending, session, router]);

    useEffect(() => {
        if (isPending || !session?.user) return;

        async function fetchJoinedEvents() {
            try {
                setLoading(true);
                setError("");

                const { data, error } = await authClient.token();

                if (error || !data?.token) {
                    throw new Error("Please login again.");
                }

                const response = await fetch(
                    `${API_URL}/events/joined`,
                    {
                        headers: {
                            Authorization: `Bearer ${data.token}`,
                        },
                        cache: "no-store",
                    }
                );

                const result = await response.json();

                if (!response.ok || !result.success) {
                    throw new Error(
                        result.message || "Failed to load joined events"
                    );
                }

                setEvents(result.data || []);
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Something went wrong"
                );
            } finally {
                setLoading(false);
            }
        }

        fetchJoinedEvents();
    }, [isPending, session]);

    if (isPending || !session?.user) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
                <p className="text-lg font-semibold text-gray-500 dark:text-gray-400">
                    Checking authentication...
                </p>
            </main>
        );
    }

    return (
        <>
            <Navbar />

            <main className="min-h-screen bg-gray-50 px-5 py-16 dark:bg-gray-950">
                <div className="mx-auto max-w-7xl">
                    <DashboardNavigation />

                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        My Joined Events
                    </h1>

                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                        Events you have registered to participate in.
                    </p>

                    {loading ? (
                        <div className="flex min-h-64 items-center justify-center gap-3">
                            <Loader2 className="animate-spin text-indigo-600 dark:text-indigo-400" />
                            <p className="text-gray-500 dark:text-gray-400">
                                Loading joined events...
                            </p>
                        </div>
                    ) : error ? (
                        <div className="mt-10 rounded-xl bg-red-50 p-8 text-center text-red-600 dark:bg-red-950/40 dark:text-red-300">
                            <h2 className="text-xl font-bold">
                                Unable to Load Joined Events
                            </h2>
                            <p className="mt-2">{error}</p>
                        </div>
                    ) : events.length === 0 ? (
                        <div className="mt-10 rounded-xl bg-white p-10 text-center shadow-sm dark:bg-gray-900 dark:shadow-gray-950/30">
                            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                                No Joined Events Yet
                            </h2>

                            <p className="mt-2 text-gray-500 dark:text-gray-400">
                                You haven't joined any events yet.
                            </p>

                            <Link
                                href="/events"
                                className="mt-6 inline-block rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
                            >
                                Explore Events
                            </Link>
                        </div>
                    ) : (
                        <div className="mt-10 grid gap-6 md:grid-cols-2">
                            {events.map((event) => (
                                <div
                                    key={event._id}
                                    className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 dark:shadow-gray-950/30"
                                >
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                        {event.title}
                                    </h2>

                                    <div className="mt-4 space-y-3 text-sm text-gray-500 dark:text-gray-400">
                                        <p className="flex items-center gap-2">
                                            <CalendarDays size={18} />
                                            {new Date(
                                                event.date
                                            ).toLocaleDateString(
                                                "en-US",
                                                {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                }
                                            )}
                                        </p>

                                        <p className="flex items-center gap-2">
                                            <MapPin size={18} />
                                            {event.location}
                                        </p>
                                    </div>

                                    <Link
                                        href={`/events/${event._id}`}
                                        className="mt-6 block rounded-lg bg-indigo-50 py-3 text-center font-semibold text-indigo-600 transition hover:bg-indigo-600 hover:text-white dark:bg-indigo-950/50 dark:text-indigo-300 dark:hover:bg-indigo-600 dark:hover:text-white"
                                    >
                                        View Event
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </>
    );
}
