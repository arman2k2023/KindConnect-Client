
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
    CalendarDays,
    MapPin,
    ArrowRight,
    Loader2,
} from "lucide-react";

import {
    getRecentEvents,
    type Event,
} from "@/services/event-api";

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

const UpcomingEvents = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadEvents() {
            try {
                setLoading(true);
                setError("");

                const data = await getRecentEvents();

                setEvents(data);
            } catch (err) {
                console.error("Upcoming events error:", err);

                setError(
                    err instanceof Error
                        ? err.message
                        : "Failed to load upcoming events"
                );
            } finally {
                setLoading(false);
            }
        }

        loadEvents();
    }, []);

    return (
        <section className="bg-gray-50 px-5 py-20 dark:bg-gray-950">
            <div className="mx-auto max-w-7xl">
                <div className="mb-12 flex flex-wrap items-end justify-between gap-5">
                    <div>
                        <p className="font-semibold text-indigo-600 dark:text-indigo-400">
                            GET INVOLVED
                        </p>

                        <h2 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
                            Upcoming Events
                        </h2>

                        <p className="mt-3 text-gray-500 dark:text-gray-400">
                            Find an event and start making a difference.
                        </p>
                    </div>

                    <Link
                        href="/events"
                        className="flex items-center gap-2 font-semibold text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
                    >
                        View All Events <ArrowRight size={18} />
                    </Link>
                </div>

                {loading ? (
                    <div className="flex min-h-64 items-center justify-center gap-3">
                        <Loader2
                            size={28}
                            className="animate-spin text-indigo-600 dark:text-indigo-400"
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

                        <h3 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">
                            No Upcoming Events
                        </h3>

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
                                <div className="flex h-48 items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100 text-7xl dark:from-indigo-950 dark:to-purple-950">
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

                                    <h3 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">
                                        {event.title}
                                    </h3>

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
                                        className="mt-6 flex items-center justify-center gap-2 rounded-lg bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700"
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
        </section>
    );
};

export default UpcomingEvents;
