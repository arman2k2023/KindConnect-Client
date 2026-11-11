
"use client";

import { useState, type FormEvent } from "react";
import {
    Mail,
    MapPin,
    MessageCircle,
    Send,
    Heart,
} from "lucide-react";

import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const CONTACT_EMAIL = "aaarfan955@gmail.com";

const ContactPage = () => {
    const [isSending, setIsSending] = useState(false);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.currentTarget;
        const formData = new FormData(form);

        const name = String(formData.get("name") || "");
        const email = String(formData.get("email") || "");
        const subject = String(formData.get("subject") || "");
        const message = String(formData.get("message") || "");

        const emailSubject = encodeURIComponent(
            subject || "Message from KindConnect"
        );

        const emailBody = encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        );

        const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=${emailSubject}&body=${emailBody}`;

        setIsSending(true);
        window.location.href = mailtoLink;

        setTimeout(() => {
            setIsSending(false);
        }, 1500);
    };

    return (
        <>
            <Navbar />

            <main className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-white">
                {/* Hero Section */}
                <section className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-5 py-16 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950 md:py-20">
                    <div className="mx-auto max-w-3xl text-center">
                        <span className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300">
                            <MessageCircle size={16} />
                            Get in Touch
                        </span>

                        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
                            Let's Start a
                            <span className="block text-indigo-600 dark:text-indigo-400">
                                Conversation.
                            </span>
                        </h1>

                        <p className="mx-auto mt-5 max-w-2xl leading-8 text-gray-600 dark:text-gray-300">
                            Have a question, suggestion, or want to collaborate?
                            We'd love to hear from you. Get in touch with our
                            KindConnect community.
                        </p>
                    </div>
                </section>

                {/* Contact Content */}
                <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-5">
                    {/* Contact Information */}
                    <div className="lg:col-span-2">
                        <h2 className="text-2xl font-bold">
                            Contact Information
                        </h2>

                        <p className="mt-4 leading-7 text-gray-600 dark:text-gray-400">
                            Feel free to contact us. We are always happy to
                            connect with people who want to make a difference.
                        </p>

                        <div className="mt-8 space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400">
                                    <Mail size={22} />
                                </div>

                                <div>
                                    <h3 className="font-semibold">
                                        Email Address
                                    </h3>

                                    <a
                                        href={`mailto:${CONTACT_EMAIL}`}
                                        className="mt-1 break-all text-sm text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
                                    >
                                        {CONTACT_EMAIL}
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400">
                                    <MapPin size={22} />
                                </div>

                                <div>
                                    <h3 className="font-semibold">
                                        Our Community
                                    </h3>

                                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                        Connecting people everywhere through kindness.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400">
                                    <Heart size={22} />
                                </div>

                                <div>
                                    <h3 className="font-semibold">
                                        Our Purpose
                                    </h3>

                                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                        Making a positive difference, one act of kindness at a time.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900 md:p-8 lg:col-span-3">
                        <h2 className="text-2xl font-bold">
                            Send Us a Message
                        </h2>

                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            Fill out the form below to get in touch.
                        </p>

                        <form
                            onSubmit={handleSubmit}
                            className="mt-8 space-y-5"
                        >
                            <div>
                                <label
                                    htmlFor="name"
                                    className="mb-2 block text-sm font-medium"
                                >
                                    Your Name
                                </label>

                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    minLength={2}
                                    placeholder="Enter your name"
                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-gray-700 dark:bg-gray-950 dark:focus:ring-indigo-900"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-sm font-medium"
                                >
                                    Your Email
                                </label>

                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="Enter your email"
                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-gray-700 dark:bg-gray-950 dark:focus:ring-indigo-900"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="subject"
                                    className="mb-2 block text-sm font-medium"
                                >
                                    Subject
                                </label>

                                <input
                                    id="subject"
                                    name="subject"
                                    type="text"
                                    required
                                    placeholder="Enter message subject"
                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-gray-700 dark:bg-gray-950 dark:focus:ring-indigo-900"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="message"
                                    className="mb-2 block text-sm font-medium"
                                >
                                    Your Message
                                </label>

                                <textarea
                                    id="message"
                                    name="message"
                                    rows={5}
                                    required
                                    minLength={10}
                                    placeholder="Write your message here..."
                                    className="w-full resize-y rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-gray-700 dark:bg-gray-950 dark:focus:ring-indigo-900"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSending}
                                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                            >
                                <Send size={18} />
                                {isSending ? "Opening Email..." : "Send Message"}
                            </button>

                            <p className="text-xs leading-6 text-gray-500 dark:text-gray-400">
                                Your default email application will open with
                                your message prepared. You must send the email
                                from that application.
                            </p>
                        </form>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
};

export default ContactPage;
