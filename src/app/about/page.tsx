
import Link from "next/link";
import {
    Heart,
    Users,
    CalendarDays,
    HandHeart,
    ArrowRight,
    Target,
    Eye,
} from "lucide-react";

import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const values = [
    {
        icon: Heart,
        title: "Kindness First",
        description:
            "We believe every small act of kindness can create a meaningful impact in someone's life.",
    },
    {
        icon: Users,
        title: "Community Together",
        description:
            "We bring people together to build stronger, more connected, and supportive communities.",
    },
    {
        icon: HandHeart,
        title: "Making an Impact",
        description:
            "We make it easier for people to discover volunteering opportunities and help others.",
    },
];

const AboutPage = () => {
    return (
        <>
            <Navbar />

            <main className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-white">
                {/* Hero Section */}
                <section className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-5 py-20 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950">
                    <div className="mx-auto max-w-4xl text-center">
                        <span className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300">
                            <Heart size={16} />
                            About KindConnect
                        </span>

                        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                            Connecting Hearts,
                            <span className="block text-indigo-600 dark:text-indigo-400">
                                Creating Change.
                            </span>
                        </h1>

                        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-gray-600 dark:text-gray-300 md:text-lg">
                            KindConnect is a community platform that connects people
                            through kindness, volunteering, and meaningful community
                            events. Together, we can make a difference.
                        </p>

                        <Link
                            href="/events"
                            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
                        >
                            Explore Events
                            <ArrowRight size={18} />
                        </Link>
                    </div>
                </section>

                {/* Mission & Vision */}
                <section className="mx-auto grid max-w-7xl gap-8 px-5 py-16 md:grid-cols-2">
                    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 dark:border-gray-800 dark:bg-gray-900">
                        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400">
                            <Target size={25} />
                        </div>

                        <h2 className="text-2xl font-bold">Our Mission</h2>

                        <p className="mt-4 leading-8 text-gray-600 dark:text-gray-400">
                            Our mission is to make volunteering accessible to everyone
                            by connecting individuals with meaningful events and
                            opportunities to serve their communities.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 dark:border-gray-800 dark:bg-gray-900">
                        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400">
                            <Eye size={25} />
                        </div>

                        <h2 className="text-2xl font-bold">Our Vision</h2>

                        <p className="mt-4 leading-8 text-gray-600 dark:text-gray-400">
                            We envision a world where people come together, support
                            one another, and create positive change through small
                            but powerful acts of kindness.
                        </p>
                    </div>
                </section>

                {/* Our Values */}
                <section className="bg-gray-50 px-5 py-16 dark:bg-gray-900/50">
                    <div className="mx-auto max-w-7xl">
                        <div className="mb-12 text-center">
                            <h2 className="text-3xl font-bold md:text-4xl">
                                What We Believe In
                            </h2>

                            <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600 dark:text-gray-400">
                                Our values guide everything we do and inspire us to
                                build a better community.
                            </p>
                        </div>

                        <div className="grid gap-8 md:grid-cols-3">
                            {values.map((value) => {
                                const Icon = value.icon;

                                return (
                                    <div
                                        key={value.title}
                                        className="rounded-2xl border border-gray-200 bg-white p-8 transition hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
                                    >
                                        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400">
                                            <Icon size={25} />
                                        </div>

                                        <h3 className="text-xl font-bold">
                                            {value.title}
                                        </h3>

                                        <p className="mt-4 leading-7 text-gray-600 dark:text-gray-400">
                                            {value.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="px-5 py-20">
                    <div className="mx-auto max-w-4xl rounded-3xl bg-indigo-600 px-6 py-12 text-center text-white md:px-12">
                        <Heart
                            size={36}
                            className="mx-auto mb-5"
                            fill="currentColor"
                        />

                        <h2 className="text-3xl font-bold md:text-4xl">
                            Be Part of Something Meaningful
                        </h2>

                        <p className="mx-auto mt-5 max-w-2xl leading-7 text-indigo-100">
                            Discover community events, meet inspiring people, and
                            start making a difference today.
                        </p>

                        <Link
                            href="/events"
                            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-indigo-700 transition hover:bg-indigo-50"
                        >
                            Find Events
                            <ArrowRight size={18} />
                        </Link>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
};

export default AboutPage;
