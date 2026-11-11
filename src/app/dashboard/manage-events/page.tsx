
"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import DashboardNavigation from "@/components/dashboard/DashboardNavigation";
import {
    CalendarDays,
    MapPin,
    Pencil,
    Trash2,
    X,
} from "lucide-react";
import { useSession } from "@/lib/auth-client";
import {
    getMyEvents,
    updateEvent,
    deleteEvent,
    type Event,
} from "@/services/event-api";

// Get local date in YYYY-MM-DD format
const getLocalDateString = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
};

// Get tomorrow's date
const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    return getLocalDateString(tomorrow);
};

export default function ManageEventsPage() {
    const router = useRouter();
    const { data: session, isPending } = useSession();

    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [editingEvent, setEditingEvent] = useState<Event | null>(null);
    const [saving, setSaving] = useState(false);
    const [deletingEventId, setDeletingEventId] = useState<string | null>(null);

    const [success, setSuccess] = useState("");
    const [formError, setFormError] = useState("");

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [location, setLocation] = useState("");

    const [minDate, setMinDate] = useState("");

    useEffect(() => {
        setMinDate(getTomorrowDate());
    }, []);

    // Authentication
    useEffect(() => {
        if (!isPending && !session?.user) {
            router.replace("/login");
        }
    }, [isPending, session, router]);

    // Fetch user's events
    useEffect(() => {
        if (isPending || !session?.user) return;

        const fetchEvents = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await getMyEvents();
                setEvents(data);
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Failed to load your events"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, [isPending, session]);

    // Open Edit Form
    const handleEdit = (event: Event) => {
        setEditingEvent(event);
        setTitle(event.title);
        setCategory(event.category);
        setDescription(event.description);
        setDate(event.date.slice(0, 10));
        setLocation(event.location);
        setFormError("");
        setSuccess("");
    };

    // Update Event
    const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!editingEvent) return;

        setFormError("");
        setSuccess("");

        if (!date || date < getTomorrowDate()) {
            setFormError("Please select a future date for your event.");
            return;
        }

        setSaving(true);

        try {
            await updateEvent(editingEvent._id, {
                title,
                category,
                description,
                date,
                location,
            });

            const updatedEvents = await getMyEvents();
            setEvents(updatedEvents);

            setEditingEvent(null);
            setSuccess("Event updated successfully!");
        } catch (err) {
            setFormError(
                err instanceof Error
                    ? err.message
                    : "Failed to update event"
            );
        } finally {
            setSaving(false);
        }
    };

    // Delete Event
    const handleDelete = async (event: Event) => {
        const confirmed = window.confirm(
            `Are you sure you want to delete "${event.title}"?`
        );

        if (!confirmed) return;

        setDeletingEventId(event._id);
        setError("");
        setSuccess("");

        try {
            await deleteEvent(event._id);

            setEvents((previousEvents) =>
                previousEvents.filter((item) => item._id !== event._id)
            );

            setSuccess("Event deleted successfully!");
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to delete event"
            );
        } finally {
            setDeletingEventId(null);
        }
    };

    if (isPending || !session?.user) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
                <p className="text-lg font-semibold text-gray-500 dark:text-gray-400">
                    Checking authentication...
                </p>
            </main>
        );
    }

    const inputClass =
        "w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-900";

    const labelClass =
        "mb-2 block font-semibold text-gray-800 dark:text-gray-200";

    return (
        <>
            <Navbar />

            <main className="min-h-screen bg-gray-50 px-5 py-16 dark:bg-gray-950">
                <div className="mx-auto max-w-7xl">
                    <DashboardNavigation />
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                Manage My Events
                            </h1>

                            <p className="mt-2 text-gray-500 dark:text-gray-400">
                                Manage your created events.
                            </p>
                        </div>

                        <Link
                            href="/dashboard/create-events"
                            className="rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700"
                        >
                            + Create Event
                        </Link>
                    </div>

                    {success && (
                        <p className="mt-6 rounded-lg bg-green-50 p-4 text-green-700 dark:bg-green-950/40 dark:text-green-400">
                            {success}
                        </p>
                    )}

                    {error && (
                        <div className="mt-6 rounded-lg bg-red-50 p-4 text-red-600 dark:bg-red-950/40 dark:text-red-400">
                            {error}
                        </div>
                    )}

                    {loading && (
                        <div className="py-16 text-center">
                            <p className="text-lg font-semibold text-gray-500 dark:text-gray-400">
                                Loading your events...
                            </p>
                        </div>
                    )}

                    {!loading && !error && events.length === 0 && (
                        <div className="mt-10 rounded-2xl bg-white p-12 text-center shadow-sm dark:bg-gray-900">
                            <CalendarDays
                                size={48}
                                className="mx-auto text-gray-400"
                            />

                            <h2 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">
                                No Events Found
                            </h2>

                            <p className="mt-2 text-gray-500 dark:text-gray-400">
                                You haven't created any events yet.
                            </p>

                            <Link
                                href="/dashboard/create-events"
                                className="mt-6 inline-block rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700"
                            >
                                Create Your First Event
                            </Link>
                        </div>
                    )}

                    {!loading && events.length > 0 && (
                        <div className="mt-10 grid gap-6 md:grid-cols-2">
                            {events.map((event) => (
                                <div
                                    key={event._id}
                                    className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
                                >
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                        {event.title}
                                    </h2>

                                    <div className="mt-4 space-y-3 text-sm text-gray-500 dark:text-gray-400">
                                        <p className="flex items-center gap-2">
                                            <CalendarDays size={18} />
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
                                            <MapPin size={18} />
                                            {event.location}
                                        </p>
                                    </div>

                                    <div className="mt-6 flex gap-3">
                                        <button
                                            onClick={() => handleEdit(event)}
                                            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-indigo-50 py-3 font-semibold text-indigo-600 transition hover:bg-indigo-100 dark:bg-indigo-950/60 dark:text-indigo-300 dark:hover:bg-indigo-900"
                                        >
                                            <Pencil size={17} />
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => handleDelete(event)}
                                            disabled={deletingEventId === event._id}
                                            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-50 py-3 font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-red-950/50 dark:text-red-400 dark:hover:bg-red-900/60"
                                        >
                                            <Trash2 size={17} />

                                            {deletingEventId === event._id
                                                ? "Deleting..."
                                                : "Delete"}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            {/* Edit Event Modal */}
            {editingEvent && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4">
                    <div className="my-auto w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-900 sm:p-8">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Edit Event
                            </h2>

                            <button
                                type="button"
                                onClick={() => setEditingEvent(null)}
                                className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                            >
                                <X size={22} />
                            </button>
                        </div>

                        <form
                            onSubmit={handleUpdate}
                            className="mt-6 space-y-5"
                        >
                            <div>
                                <label className={labelClass}>
                                    Event Title
                                </label>

                                <input
                                    required
                                    minLength={5}
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <label className={labelClass}>
                                    Category
                                </label>

                                <select
                                    required
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className={inputClass}
                                >
                                    <option value="">Select category</option>
                                    <option value="Social Work">Social Work</option>
                                    <option value="Environment">Environment</option>
                                    <option value="Education">Education</option>
                                    <option value="Healthcare">Healthcare</option>
                                </select>
                            </div>

                            <div>
                                <label className={labelClass}>
                                    Description
                                </label>

                                <textarea
                                    required
                                    minLength={20}
                                    rows={4}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <label className={labelClass}>
                                    Event Date
                                </label>

                                <input
                                    required
                                    type="date"
                                    min={minDate}
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    onClick={(e) => {
                                        if (
                                            typeof e.currentTarget.showPicker === "function"
                                        ) {
                                            e.currentTarget.showPicker();
                                        }
                                    }}
                                    className={inputClass}
                                />

                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                    Please select a date starting from tomorrow.
                                </p>
                            </div>

                            <div>
                                <label className={labelClass}>
                                    Location
                                </label>

                                <input
                                    required
                                    minLength={3}
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    className={inputClass}
                                />
                            </div>

                            {formError && (
                                <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950/40 dark:text-red-400">
                                    {formError}
                                </p>
                            )}

                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setEditingEvent(null)}
                                    className="flex-1 rounded-lg border border-gray-300 py-3 font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="flex-1 rounded-lg bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-60"
                                >
                                    {saving ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <Footer />
        </>
    );
}
