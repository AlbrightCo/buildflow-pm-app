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
    Menu,
    ChevronRight
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
            <div className="flex items-center justify-center min-h-screen bg-[#020617]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
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
        <div className="flex h-screen bg-[#020617] text-slate-200 font-sans selection:bg-blue-500/30 overflow-hidden">

            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[0%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[128px]" />
                <div className="absolute bottom-[-20%] right-[0%] w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[128px]" />
            </div>

            {/* Sidebar (Premium Dark Glass) */}
            <aside className="w-64 bg-[#0F172A]/60 backdrop-blur-xl border-r border-white/5 hidden md:flex flex-col z-20 transition-all">
                <div className="p-6 h-24 flex items-center justify-center border-b border-white/5">
                    <div className="relative w-full h-12 max-w-[180px]">
                        <Image src="/logo.png" alt="BuildFlow" fill className="object-contain" />
                    </div>
                </div>

                <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
                    <div className="px-3 mb-2 text-[0.65rem] uppercase tracking-widest text-slate-500 font-bold">Menu</div>
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 relative overflow-hidden
                                    ${isActive
                                        ? 'bg-blue-600/10 text-blue-400'
                                        : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
                                    }`}
                            >
                                {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-r-full"></div>}
                                <Icon size={18} className={isActive ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300'} />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-white/5 bg-black/20">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20">
                            {userData?.firstName?.[0] || user.email?.[0]?.toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="font-semibold text-sm text-slate-200 truncate">
                                {userData?.firstName ? `${userData.firstName} ${userData.lastName || ''}` : 'User'}
                            </div>
                            <div className="text-xs text-slate-500 truncate capitalize">{userData?.role || 'Member'}</div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                            title="Log out"
                        >
                            <LogOut size={16} />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Mobile Header */}
            <div className="fixed top-0 left-0 right-0 h-16 bg-[#0F172A]/80 backdrop-blur-xl border-b border-white/5 flex md:hidden items-center justify-between px-4 z-40">
                <span className="font-bold text-lg bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">BuildFlow</span>
                <button className="text-slate-300 p-2">
                    <Menu size={24} />
                </button>
            </div>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto z-10 p-6 md:p-8 pt-24 md:pt-8">
                {children}
            </main>
        </div>
    );
}
