
import Link from "next/link";
import { CalendarDays, MapPin, ArrowRight } from "lucide-react";

const events = [
    {
        id: 1,
        title: "Community Food Distribution",
        category: "Social Work",
        date: "December 15, 2026",
        location: "Dhaka, Bangladesh",
        color: "bg-orange-100 text-orange-600",
        icon: "🍱",
    },
    {
        id: 2,
        title: "Tree Plantation Campaign",
        category: "Environment",
        date: "December 20, 2026",
        location: "Chittagong, Bangladesh",
        color: "bg-green-100 text-green-600",
        icon: "🌳",
    },
    {
        id: 3,
        title: "Free Education Program",
        category: "Education",
        date: "December 25, 2026",
        location: "Sylhet, Bangladesh",
        color: "bg-blue-100 text-blue-600",
        icon: "📚",
    },
];

const UpcomingEvents = () => {
    return (
        <section className="bg-gray-50 px-5 py-20">
            <div className="mx-auto max-w-7xl">
                <div className="mb-12 flex flex-wrap items-end justify-between gap-5">
                    <div>
                        <p className="font-semibold text-indigo-600">GET INVOLVED</p>
                        <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
                            Upcoming Events
                        </h2>
                        <p className="mt-3 text-gray-500">
                            Find an event and start making a difference.
                        </p>
                    </div>

                    <Link href="/events"
                        className="flex items-center gap-2 font-semibold text-indigo-600 hover:text-indigo-800">
                        View All Events <ArrowRight size={18} />
                    </Link>
                </div>

                <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
                    {events.map((event) => (
                        <article key={event.id}
                            className="overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                            <div className="flex h-48 items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100 text-7xl">
                                {event.icon}
                            </div>

                            <div className="p-6">
                                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${event.color}`}>
                                    {event.category}
                                </span>

                                <h3 className="mt-4 text-xl font-bold text-gray-900">
                                    {event.title}
                                </h3>

                                <div className="mt-5 space-y-3 text-sm text-gray-500">
                                    <p className="flex items-center gap-2">
                                        <CalendarDays size={17} /> {event.date}
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <MapPin size={17} /> {event.location}
                                    </p>
                                </div>

                                <Link href={`/events/${event.id}`}
                                    className="mt-6 block rounded-lg bg-indigo-50 py-3 text-center font-semibold text-indigo-600 hover:bg-indigo-600 hover:text-white">
                                    View Details
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default UpcomingEvents;
