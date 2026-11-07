
import { HeartHandshake, Users, CalendarCheck, Globe } from "lucide-react";

const features = [
    {
        icon: HeartHandshake,
        title: "Make an Impact",
        description: "Participate in meaningful activities and help people in need.",
    },
    {
        icon: Users,
        title: "Build Community",
        description: "Connect with people who share your passion for helping others.",
    },
    {
        icon: CalendarCheck,
        title: "Join Events",
        description: "Discover and participate in exciting community events.",
    },
    {
        icon: Globe,
        title: "Change the World",
        description: "Small acts of kindness can create a big difference.",
    },
];

const Features = () => {
    return (
        <section className="bg-white px-5 py-20">
            <div className="mx-auto max-w-7xl">
                <div className="mb-12 text-center">
                    <p className="font-semibold text-indigo-600">OUR FEATURES</p>
                    <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
                        Why Choose KindConnect?
                    </h2>
                    <p className="mt-4 text-gray-500">
                        Everything you need to make a positive impact.
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature) => {
                        const Icon = feature.icon;

                        return (
                            <div key={feature.title}
                                className="rounded-2xl border border-gray-100 p-7 transition hover:-translate-y-2 hover:shadow-xl">
                                <div className="mb-5 inline-flex rounded-xl bg-indigo-100 p-4 text-indigo-600">
                                    <Icon size={30} />
                                </div>
                                <h3 className="mb-3 text-xl font-bold text-gray-900">
                                    {feature.title}
                                </h3>
                                <p className="leading-7 text-gray-500">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Features;
