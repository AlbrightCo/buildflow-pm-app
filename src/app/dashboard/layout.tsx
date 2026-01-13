"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    LayoutDashboard,
    Briefcase,
    CheckSquare,
    Users,
    LogOut,
    Settings,
    Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { user, userData, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.push("/login");
            } else if (userData) {
                // Check Trial
                if (userData.subscriptionStatus === 'trial' && new Date() > userData.trialExpiresAt) {
                    console.log("Trial expired");
                    // In a real app, redirect or show banner
                }
            }
        }
    }, [user, userData, loading, router]);

    const handleLogout = async () => {
        try {
            await auth.signOut();
            router.push("/login");
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[var(--bg-secondary)]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)]"></div>
            </div>
        );
    }

    if (!user) return null;

    const navItems = [
        { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Projects', href: '/dashboard/projects', icon: Briefcase },
        { name: 'Tasks', href: '/dashboard/tasks', icon: CheckSquare },
        { name: 'Team', href: '/dashboard/team', icon: Users },
    ];

    return (
        <div className="flex h-screen bg-[var(--bg-secondary)]">
            {/* Sidebar (V-7 Style) */}
            <aside className="w-[var(--sidebar-width)] bg-[var(--sidebar-bg)] text-white hidden md:flex flex-col shadow-2xl z-50 transition-all">
                <div className="p-5 border-b border-white/10 bg-black/10">
                    <div className="flex items-center justify-center bg-white rounded-xl py-3 px-4 shadow-sm mb-2">
                        {/* Logo */}
                        <div className="relative h-10 w-full max-w-[150px]">
                            <Image src="/logo.png" alt="BuildFlow PM" fill className="object-contain" />
                        </div>
                    </div>
                </div>

                <nav className="flex-1 overflow-y-auto py-4 sidebar-scroll">
                    <div className="px-5 mb-2 text-[0.65rem] uppercase tracking-widest text-white/50 font-bold">Main</div>
                    <div className="space-y-1 px-3">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-[0.9rem] font-medium transition-all duration-200 border-l-[3px]
                                        ${isActive
                                            ? 'bg-white/20 border-white font-semibold'
                                            : 'border-transparent hover:bg-white/15 text-white/90'
                                        }`}
                                >
                                    <Icon size={18} className={isActive ? 'opacity-100' : 'opacity-80'} />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </div>
                </nav>

                <div className="p-5 border-t border-white/10 bg-black/15">
                    <div className="flex items-center gap-3 text-white">
                        <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center font-bold text-sm">
                            {userData?.firstName?.[0] || user.email?.[0]?.toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="font-semibold text-sm truncate">
                                {userData?.firstName ? `${userData.firstName} ${userData.lastName || ''}` : 'User'}
                            </div>
                            <div className="text-[0.65rem] opacity-70 truncate capitalize">{userData?.role || 'Member'}</div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/15 hover:bg-white/25 transition-colors"
                            title="Log out"
                        >
                            <LogOut size={14} />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Mobile Header (Visible only on small screens) */}
            <div className="fixed top-0 left-0 right-0 h-16 bg-[var(--sidebar-bg)] flex md:hidden items-center justify-between px-4 z-40">
                <div className="font-bold text-white text-lg">BuildFlow PM</div>
                <button className="text-white p-2">
                    <Menu size={24} />
                </button>
            </div>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-6 md:p-8 pt-20 md:pt-8 scroll-smooth">
                {children}
            </main>
        </div>
    );
}
