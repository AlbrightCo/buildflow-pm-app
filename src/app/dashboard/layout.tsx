"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { user, userData, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.push("/login");
            } else if (userData) {
                // Check Trial
                if (userData.subscriptionStatus === 'trial' && new Date() > userData.trialExpiresAt) {
                    // Trial Expired
                    // For now we just alert, but ideally redirect to upgrade page.
                    // We can create a simple /upgrade page later
                    console.log("Trial expired");
                    // router.push("/upgrade"); // Enable this when upgrade page exists
                }
            }
        }
    }, [user, userData, loading, router]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!user) {
        return null; // Will redirect
    }

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-zinc-900">
            {/* Sidebar Placeholder */}
            <aside className="w-64 bg-white dark:bg-zinc-950 border-r border-gray-200 dark:border-zinc-800 hidden md:block">
                <div className="p-6">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        BuildFlow PM
                    </h1>
                </div>
                <nav className="mt-6 px-4 space-y-2">
                    <a href="#" className="block px-4 py-2 rounded-lg bg-blue-50 text-blue-700 font-medium">Dashboard</a>
                    <a href="#" className="block px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50 dark:text-zinc-400 dark:hover:bg-zinc-900">Projects</a>
                    <a href="#" className="block px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50 dark:text-zinc-400 dark:hover:bg-zinc-900">Tasks</a>
                    <a href="#" className="block px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50 dark:text-zinc-400 dark:hover:bg-zinc-900">Team</a>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-8">
                {children}
            </main>
        </div>
    );
}
