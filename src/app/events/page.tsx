
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import {
    CalendarDays,
    MapPin,
    ArrowRight,
    Loader2,
} from "lucide-react";

import type { Event } from "@/services/event-api";

const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const categoryIcons: Record<string, string> = {
    "Social Work": "🍱",
    Community: "🤝",
    Environment: "🌳",
    Education: "📚",
    Healthcare: "🩸",
    Sports: "⚽",
    Charity: "❤️",
    Health: "🩺",
};

export default function EventsPage() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function getUpcomingEvents() {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(
                    `${API_URL}/events/upcoming`,
                    { cache: "no-store" }
                );

                const result = await response.json();

                if (!response.ok || !result.success) {
                    throw new Error(
                        result.message || "Failed to load events"
                    );
                }

                setEvents(result.data);
            } catch (err) {
                console.error("Upcoming events error:", err);

                setError(
                    err instanceof Error
                        ? err.message
                        : "Failed to load events"
                );
            } finally {
                setLoading(false);
            }
        }

        getUpcomingEvents();
    }, []);

    return (
        <>
            <Navbar />

            <main className="min-h-screen bg-gray-50 px-5 py-16 dark:bg-gray-950">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-12 text-center">
                        <p className="font-semibold text-indigo-600 dark:text-indigo-400">
                            MAKE A DIFFERENCE
                        </p>

                        <h1 className="mt-3 text-4xl font-bold text-gray-900 dark:text-white">
                            Explore Community Events
                        </h1>

                        <p className="mt-4 text-gray-500 dark:text-gray-400">
                            Find opportunities to connect, volunteer and help others.
                        </p>
                    </div>

                    {loading ? (
                        <div className="flex min-h-64 items-center justify-center gap-3">
                            <Loader2
                                className="animate-spin text-indigo-600 dark:text-indigo-400"
                                size={28}
                            />
                            <p className="text-gray-500 dark:text-gray-400">
                                Loading upcoming events...
                            </p>
                        </div>
                    ) : error ? (
                        <div className="rounded-xl bg-red-50 p-6 text-center text-red-600 dark:bg-red-950/40 dark:text-red-300">
                            Unable to load events. {error}
                        </div>
                    ) : events.length === 0 ? (
                        <div className="rounded-2xl bg-white p-12 text-center shadow-sm dark:bg-gray-900">
                            <CalendarDays
                                size={48}
                                className="mx-auto text-gray-400"
                            />
                            <h2 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">
                                No Upcoming Events
                            </h2>
                            <p className="mt-2 text-gray-500 dark:text-gray-400">
                                There are no upcoming events at the moment.
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
                            {events.map((event) => (
                                <article
                                    key={event._id}
                                    className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
                                >
                                    <div className="flex h-44 items-center justify-center bg-indigo-50 text-7xl dark:bg-indigo-950">
                                        {event.imageUrl ? (
                                            <img
                                                src={event.imageUrl}
                                                alt={event.title}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            categoryIcons[event.category] || "🎉"
                                        )}
                                    </div>

                                    <div className="p-6">
                                        <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300">
                                            {event.category}
                                        </span>

                                        <h2 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">
                                            {event.title}
                                        </h2>

                                        <div className="mt-5 space-y-3 text-sm text-gray-500 dark:text-gray-400">
                                            <p className="flex items-center gap-2">
                                                <CalendarDays size={17} />
                                                {new Date(event.date).toLocaleDateString(
                                                    "en-US",
                                                    {
                                                        year: "numeric",
                                                        month: "long",
                                                        day: "numeric",
                                                    }
                                                )}
                                            </p>

                                            <p className="flex items-center gap-2">
                                                <MapPin size={17} />
                                                {event.location}
                                            </p>
                                        </div>

                                        <Link
                                            href={`/events/${event._id}`}
                                            className="mt-6 flex items-center justify-center gap-2 rounded-lg bg-indigo-600 py-3 font-semibold text-white hover:bg-indigo-700"
                                        >
                                            View Details
                                            <ArrowRight size={18} />
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </>
    );
}
