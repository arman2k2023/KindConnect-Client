
"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import DashboardNavigation from "@/components/dashboard/DashboardNavigation";
import { useSession } from "@/lib/auth-client";
import { createEvent } from "@/services/event-api";

const getLocalDateString = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
};

const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return getLocalDateString(tomorrow);
};

export default function CreateEventPage() {
    const router = useRouter();
    const { data: session, isPending } = useSession();

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [location, setLocation] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [minDate, setMinDate] = useState("");

    useEffect(() => {
        setMinDate(getTomorrowDate());
    }, []);

    useEffect(() => {
        if (!isPending && !session?.user) {
            router.replace("/login");
        }
    }, [isPending, session, router]);

    if (isPending || !session?.user) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
                <p className="text-lg font-semibold text-gray-500 dark:text-gray-400">
                    Checking authentication...
                </p>
            </main>
        );
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!date || date < getTomorrowDate()) {
            setError("Please select a future date for your event.");
            return;
        }

        setLoading(true);

        try {
            await createEvent({
                title,
                category,
                description,
                date,
                location,
            });

            setSuccess("Event created successfully!");

            setTitle("");
            setCategory("");
            setDescription("");
            setDate("");
            setLocation("");
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to create event"
            );
        } finally {
            setLoading(false);
        }
    };

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

                    <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-sm dark:bg-gray-900 dark:shadow-gray-950/30">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            Create New Event
                        </h1>

                        <p className="mt-2 text-gray-500 dark:text-gray-400">
                            Share an opportunity with your community.
                        </p>

                        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                            <div>
                                <label className={labelClass}>
                                    Event Title
                                </label>
                                <input
                                    required
                                    minLength={5}
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    type="text"
                                    placeholder="Enter event title"
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
                                    rows={5}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Describe your event"
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <label className={labelClass}>
                                    Event Date
                                </label>
                                <input
                                    required
                                    min={minDate}
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    type="date"
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
                                    type="text"
                                    placeholder="Event location"
                                    className={inputClass}
                                />
                            </div>

                            {error && (
                                <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950/40 dark:text-red-400">
                                    {error}
                                </p>
                            )}

                            {success && (
                                <p className="rounded-lg bg-green-50 p-3 text-sm text-green-700 dark:bg-green-950/40 dark:text-green-400">
                                    {success}
                                </p>
                            )}

                            <button
                                disabled={loading}
                                type="submit"
                                className="w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading ? "Creating Event..." : "Create Event"}
                            </button>
                        </form>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}
