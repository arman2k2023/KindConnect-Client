
import Link from "next/link";
import { Heart } from "lucide-react";

const Footer = () => {
    return (
        <footer className="mt-auto bg-gray-950 text-gray-300">
            <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:grid-cols-3">
                <div>
                    <Link href="/" className="flex items-center gap-2 text-xl font-bold text-white">
                        <Heart size={24} className="text-indigo-400" fill="currentColor" />
                        KindConnect
                    </Link>
                    <p className="mt-4 max-w-sm text-sm leading-7 text-gray-400">
                        Connecting people through kindness, volunteering, and meaningful
                        community events. Together, we can make a difference.
                    </p>
                </div>

                <div>
                    <h3 className="mb-4 font-semibold text-white">Quick Links</h3>
                    <div className="flex flex-col gap-3 text-sm">
                        <Link href="/" className="hover:text-indigo-400">Home</Link>
                        <Link href="/events" className="hover:text-indigo-400">Events</Link>
                        <Link href="/about" className="hover:text-indigo-400">About Us</Link>
                        <Link href="/contact" className="hover:text-indigo-400">Contact</Link>
                    </div>
                </div>

                <div>
                    <h3 className="mb-4 font-semibold text-white">Join Our Community</h3>
                    <p className="mb-4 text-sm text-gray-400">
                        Be part of something meaningful. Start making a difference today!
                    </p>
                    <Link
                        href="/register"
                        className="inline-block rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
                    >
                        Become a Volunteer
                    </Link>
                </div>
            </div>

            <div className="border-t border-gray-800 px-5 py-5 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} KindConnect. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
