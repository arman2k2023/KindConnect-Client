
"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import {
    CalendarDays,
    MapPin,
    ArrowLeft,
    Users,
    Loader2,
} from "lucide-react";

import { useSession } from "@/lib/auth-client";

import {
    joinEvent,
    type Event,
} from "@/services/event-api";

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

function EventDetailsContent() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const { data: session, isPending: sessionPending } = useSession();

    const [event, setEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [joining, setJoining] = useState(false);
    const [joined, setJoined] = useState(false);
    const [joinMessage, setJoinMessage] = useState("");

    // Fetch Event
    useEffect(() => {
        async function fetchEvent() {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(`${API_URL}/events/${id}`, {
                    cache: "no-store",
                });

                const result = await response.json();

                if (!response.ok || !result.success) {
                    throw new Error(
                        result.message || "Failed to load event"
                    );
                }

                setEvent(result.data);
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

        if (id) fetchEvent();
    }, [id]);

    // Check whether the logged-in user has already joined
    useEffect(() => {
        if (sessionPending || !event) return;

        const userId = session?.user?.id;

        const hasJoined = Boolean(
            userId && event.participants?.includes(userId)
        );

        setJoined(hasJoined);

        if (hasJoined) {
            setJoinMessage("You have already joined this event.");
        } else {
            setJoinMessage("");
        }
    }, [event, session, sessionPending]);

    // Join Event
    async function handleJoinEvent() {
        if (!session?.user) {
            router.push("/login");
            return;
        }

        if (joined || joining) return;

        try {
            setJoining(true);
            setJoinMessage("");

            await joinEvent(id);

            const userId = session.user.id;

            setEvent((currentEvent) => {
                if (!currentEvent) return currentEvent;

                const participants = currentEvent.participants || [];

                if (participants.includes(userId)) {
                    return currentEvent;
                }

                return {
                    ...currentEvent,
                    participants: [...participants, userId],
                };
            });

            setJoined(true);
            setJoinMessage("Successfully joined this event!");
        } catch (err) {
            const message =
                err instanceof Error
                    ? err.message
                    : "Failed to join event";

            setJoinMessage(message);
        } finally {
            setJoining(false);
        }
    }

    return (
        <main className="min-h-screen bg-gray-50 px-5 py-12 dark:bg-gray-950">
            <div className="mx-auto max-w-4xl">
                <Link
                    href="/events"
                    className="mb-8 inline-flex items-center gap-2 font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                    <ArrowLeft size={18} />
                    Back to Events
                </Link>

                {loading ? (
                    <div className="flex min-h-64 items-center justify-center gap-3">
                        <Loader2 className="animate-spin text-indigo-600 dark:text-indigo-400" />
                        <p className="text-gray-600 dark:text-gray-400">
                            Loading event details...
                        </p>
                    </div>
                ) : error ? (
                    <div className="rounded-xl bg-red-50 p-8 text-center text-red-600 dark:bg-red-950/40 dark:text-red-300">
                        <h2 className="text-xl font-bold">
                            Unable to Load Event
                        </h2>
                        <p className="mt-2">{error}</p>
                    </div>
                ) : event ? (
                    <article className="overflow-hidden rounded-2xl bg-white shadow-sm dark:bg-gray-900">
                        <div className="flex min-h-64 items-center justify-center bg-indigo-50 dark:bg-indigo-950">
                            {event.imageUrl ? (
                                <img
                                    src={event.imageUrl}
                                    alt={event.title}
                                    className="h-72 w-full object-cover"
                                />
                            ) : (
                                <span className="text-8xl">
                                    {categoryIcons[event.category] || "🎉"}
                                </span>
                            )}
                        </div>

                        <div className="p-6 sm:p-10">
                            <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300">
                                {event.category}
                            </span>

                            <h1 className="mt-5 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
                                {event.title}
                            </h1>

                            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                                <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-4 dark:bg-gray-800">
                                    <CalendarDays className="text-indigo-600 dark:text-indigo-400" />
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Event Date
                                        </p>
                                        <p className="font-semibold text-gray-900 dark:text-white">
                                            {new Date(event.date).toLocaleDateString(
                                                "en-US",
                                                {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                }
                                            )}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-4 dark:bg-gray-800">
                                    <MapPin className="text-indigo-600 dark:text-indigo-400" />
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Location
                                        </p>
                                        <p className="font-semibold text-gray-900 dark:text-white">
                                            {event.location}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-4 sm:col-span-2 dark:bg-gray-800">
                                    <Users className="text-indigo-600 dark:text-indigo-400" />
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Participants
                                        </p>
                                        <p className="font-semibold text-gray-900 dark:text-white">
                                            {event.participants?.length || 0} people joined
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                    About This Event
                                </h2>

                                <p className="mt-3 whitespace-pre-line leading-7 text-gray-600 dark:text-gray-300">
                                    {event.description}
                                </p>
                            </div>

                            <div className="mt-8">
                                <button
                                    onClick={handleJoinEvent}
                                    disabled={joining || joined || sessionPending}
                                    className="w-full rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-gray-400 sm:w-auto"
                                >
                                    {sessionPending
                                        ? "Checking..."
                                        : joining
                                            ? "Joining..."
                                            : joined
                                                ? "Already Joined"
                                                : "Join This Event"}
                                </button>

                                {joinMessage && (
                                    <p className="mt-3 text-sm text-indigo-600 dark:text-indigo-400">
                                        {joinMessage}
                                    </p>
                                )}
                            </div>
                        </div>
                    </article>
                ) : null}
            </div>
        </main>
    );
}

export default function EventDetailsPage() {
    return (
        <>
            <Navbar />

            <Suspense
                fallback={
                    <main className="flex min-h-screen items-center justify-center bg-gray-50 text-gray-600 dark:bg-gray-950 dark:text-gray-300">
                        Loading event...
                    </main>
                }
            >
                <EventDetailsContent />
            </Suspense>

            <Footer />
        </>
    );
}
