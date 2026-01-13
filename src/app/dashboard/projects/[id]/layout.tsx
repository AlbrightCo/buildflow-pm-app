"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useParams, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    FileText,
    Calendar,
    DollarSign,
    Image as ImageIcon,
    Users,
    ClipboardCheck,
    Settings,
    ChevronRight,
    FileSignature,
    ClipboardList,
    ChevronLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
    const params = useParams();
    const pathname = usePathname();
    const projectId = params.id as string;
    const [userRole, setUserRole] = useState<'admin' | 'sub'>('admin');

    // We'll fetch project name here later
    const projectName = "Highland Medical Center"; // Placeholder

    const navItems = [
        { name: "Overview", href: `/dashboard/projects/${projectId}`, icon: LayoutDashboard, roles: ['admin', 'sub'] },
        { name: "Drawings", href: `/dashboard/projects/${projectId}/drawings`, icon: FileText, roles: ['admin', 'sub'] },
        { name: "Schedule", href: `/dashboard/projects/${projectId}/schedule`, icon: Calendar, roles: ['admin', 'sub'] },
        { name: "Financials", href: `/dashboard/projects/${projectId}/financials`, icon: DollarSign, roles: ['admin'] },
        { name: "Contracts", href: `/dashboard/projects/${projectId}/contracts`, icon: FileSignature, roles: ['admin'] },
        { name: "Photos", href: `/dashboard/projects/${projectId}/photos`, icon: ImageIcon, roles: ['admin', 'sub'] },
        { name: "Inspections", href: `/dashboard/projects/${projectId}/inspections`, icon: ClipboardCheck, roles: ['admin', 'sub'] },
        { name: "Team", href: `/dashboard/projects/${projectId}/team`, icon: Users, roles: ['admin', 'sub'] },
        { name: "Daily Reports", href: `/dashboard/projects/${projectId}/daily-reports`, icon: ClipboardList, roles: ['admin', 'sub'] },
    ];

    const filteredNavItems = navItems.filter(item => item.roles.includes(userRole));

    return (
        <div className="flex flex-col h-full space-y-6">
            {/* Project Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
                        <Link href="/dashboard/projects" className="hover:text-blue-400 transition-colors">Projects</Link>
                        <ChevronRight size={14} />
                        <span className="text-slate-300">{projectName}</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">{projectName}</h1>
                </div>

                <div className="flex items-center gap-3">
                    {/* Role Toggle for Demo */}
                    <div className="bg-white/5 border border-white/10 p-1 rounded-lg flex mr-4">
                        <button
                            onClick={() => setUserRole('admin')}
                            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${userRole === 'admin' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
                        >
                            Admin View
                        </button>
                        <button
                            onClick={() => setUserRole('sub')}
                            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${userRole === 'sub' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
                        >
                            Sub View
                        </button>
                    </div>

                    <Button variant="outline" className="border-white/10 hover:bg-white/5">Settings</Button>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="border-b border-white/5 overflow-x-auto">
                <nav className="flex items-center gap-1 min-w-max">
                    {filteredNavItems.map((tab) => {
                        const Icon = tab.icon;
                        // Exact match for root, startsWith for others to handle sub-routes if needed
                        const isActive = tab.href === `/dashboard/projects/${projectId}`
                            ? pathname === tab.href
                            : pathname?.startsWith(tab.href);

                        return (
                            <Link
                                key={tab.name}
                                href={tab.href}
                                className={`
                                    flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors duration-200
                                    ${isActive
                                        ? "border-blue-500 text-blue-400 bg-blue-500/5"
                                        : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-white/5"
                                    }
                                `}
                            >
                                <Icon size={16} />
                                {tab.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Tab Content */}
            <div className="flex-1 min-h-0 overflow-y-auto">
                {children}
            </div>
        </div>
    );
}
