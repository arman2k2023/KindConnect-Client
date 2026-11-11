
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    PlusCircle,
    CalendarCheck,
    CalendarDays,
} from "lucide-react";

const dashboardLinks = [
    {
        name: "Create Events",
        href: "/dashboard/create-events",
        description: "Create a new community event",
        icon: PlusCircle,
        color: "indigo",
    },
    {
        name: "Joined Events",
        href: "/dashboard/joined-events",
        description: "View events you have joined",
        icon: CalendarCheck,
        color: "emerald",
    },
    {
        name: "Manage Events",
        href: "/dashboard/manage-events",
        description: "Edit and manage your events",
        icon: CalendarDays,
        color: "purple",
    },
];

const DashboardNavigation = () => {
    const pathname = usePathname();

    return (
        <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {dashboardLinks.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                const colors = {
                    indigo: {
                        icon: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400",
                        active: "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40",
                    },
                    emerald: {
                        icon: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400",
                        active: "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40",
                    },
                    purple: {
                        icon: "bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400",
                        active: "border-purple-500 bg-purple-50 dark:bg-purple-950/40",
                    },
                };

                const color = colors[item.color as keyof typeof colors];

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        aria-current={isActive ? "page" : undefined}
                        className={`flex items-center gap-4 rounded-xl border p-4 transition duration-200 hover:-translate-y-1 hover:shadow-md ${isActive
                                ? color.active
                                : "border-gray-200 bg-white hover:border-gray-300 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700"
                            }`}
                    >
                        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${color.icon}`}>
                            <Icon size={24} />
                        </div>

                        <div className="min-w-0">
                            <h3 className="font-bold text-gray-900 dark:text-white">
                                {item.name}
                            </h3>

                            <p className="mt-1 text-xs leading-5 text-gray-500 dark:text-gray-400">
                                {item.description}
                            </p>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};

export default DashboardNavigation;
