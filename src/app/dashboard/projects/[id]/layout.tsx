"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import {
    LayoutDashboard,
    FileText,
    Calendar,
    DollarSign,
    Image as ImageIcon,
    Users,
    ClipboardCheck,
    Settings,
    ChevronRight
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"; // We might need to install/create this if not standard shadcn import setup yet, but usually it is.
import { Button } from "@/components/ui/button";

// If shadcn Tabs aren't installed, I'll use a custom implementation for now or stick to Link-based tabs for cleaner routing.
// Actually, Link-based tabs are better for deep linking (e.g. sending a link to the Financials tab).

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
    const params = useParams();
    const pathname = usePathname();
    const projectId = params.id as string;

    // We'll fetch project name here later
    const projectName = "Highland Medical Center"; // Placeholder

    const tabs = [
        { name: "Overview", href: `/dashboard/projects/${projectId}`, icon: LayoutDashboard },
        { name: "Drawings", href: `/dashboard/projects/${projectId}/drawings`, icon: FileText },
        { name: "Schedule", href: `/dashboard/projects/${projectId}/schedule`, icon: Calendar },
        { name: "Financials", href: `/dashboard/projects/${projectId}/financials`, icon: DollarSign },
        { name: "Photos", href: `/dashboard/projects/${projectId}/photos`, icon: ImageIcon },
        { name: "Inspections", href: `/dashboard/projects/${projectId}/inspections`, icon: ClipboardCheck },
        { name: "Team", href: `/dashboard/projects/${projectId}/team`, icon: Users },
    ];

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
                    <Button variant="outline" className="border-white/10 hover:bg-white/5">Example Action</Button>
                    <Button className="bg-blue-600 hover:bg-blue-500">Edit Project</Button>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="border-b border-white/5 overflow-x-auto">
                <nav className="flex items-center gap-1 min-w-max">
                    {tabs.map((tab) => {
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
