"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Users,
    Briefcase,
    CheckSquare,
    DollarSign,
    Clock,
    TrendingUp,
    AlertCircle,
    Plus
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where, orderBy, limit } from "firebase/firestore";

export default function DashboardPage() {
    const { userData, user } = useAuth();

    const [stats, setStats] = useState({
        projects: 0,
        activeProjects: 0,
        tasks: 0,
        totalValue: 0
    });

    interface Project {
        id: string;
        name: string;
        status: string;
        completion: number;
    }

    const [recentProjects, setRecentProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            try {
                // ... fetching logic remains same ...
                const projRef = collection(db, 'projects');
                const projSnap = await getDocs(projRef);

                let totalVal = 0;
                let activeCount = 0;
                const projectsList: Project[] = [];

                projSnap.forEach(doc => {
                    const data = doc.data();
                    totalVal += Number(data.contractValue) || 0;
                    if (data.status === 'active') activeCount++;
                    projectsList.push({ id: doc.id, name: data.name, status: data.status, completion: data.completion });
                });

                const usersSnap = await getDocs(collection(db, 'users'));

                setStats({
                    projects: projSnap.size,
                    activeProjects: activeCount,
                    tasks: usersSnap.size,
                    totalValue: totalVal
                });

                projectsList.sort((a, b) => (a.status === 'active' ? -1 : 1));
                setRecentProjects(projectsList.slice(0, 5));

            } catch (error) {
                console.error("Error fetching dashboard stats:", error);
            } finally {
                setLoading(false);
            }
        }
        if (user) fetchStats();
    }, [user]);

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white">
                        Dashboard
                    </h1>
                    <p className="text-slate-400 mt-1">
                        Overview of your active projects and team performance.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Link href="/dashboard/projects">
                        <Button className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20 border border-blue-400/20">
                            <Plus className="mr-2 h-4 w-4" /> New Project
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="p-6 rounded-2xl bg-[#0F172A]/40 border border-white/5 backdrop-blur-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Briefcase size={64} />
                    </div>
                    <div className="relative">
                        <p className="text-sm font-medium text-slate-400">Total Projects</p>
                        <div className="mt-2 text-3xl font-bold text-white">{stats.projects}</div>
                        <div className="mt-1 text-xs text-emerald-400 flex items-center gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                            {stats.activeProjects} Active
                        </div>
                    </div>
                </div>

                <div className="p-6 rounded-2xl bg-[#0F172A]/40 border border-white/5 backdrop-blur-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <DollarSign size={64} />
                    </div>
                    <div className="relative">
                        <p className="text-sm font-medium text-slate-400">Contract Value</p>
                        <div className="mt-2 text-3xl font-bold text-white">${stats.totalValue.toLocaleString()}</div>
                        <div className="mt-1 text-xs text-blue-400 flex items-center gap-1">
                            <TrendingUp size={12} />
                            +12% vs last month
                        </div>
                    </div>
                </div>

                <div className="p-6 rounded-2xl bg-[#0F172A]/40 border border-white/5 backdrop-blur-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Users size={64} />
                    </div>
                    <div className="relative">
                        <p className="text-sm font-medium text-slate-400">Team Size</p>
                        <div className="mt-2 text-3xl font-bold text-white">{stats.tasks}</div>
                        <div className="mt-1 text-xs text-slate-500">
                            Directory members
                        </div>
                    </div>
                </div>

                <div className="p-6 rounded-2xl bg-[#0F172A]/40 border border-white/5 backdrop-blur-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <AlertCircle size={64} />
                    </div>
                    <div className="relative">
                        <p className="text-sm font-medium text-slate-400">Pending Actions</p>
                        <div className="mt-2 text-3xl font-bold text-white">0</div>
                        <div className="mt-1 text-xs text-slate-500">
                            You're all caught up
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Projects Table */}
            <div className="grid md:grid-cols-7 gap-6">
                <div className="md:col-span-5 rounded-2xl bg-[#0F172A]/60 border border-white/5 backdrop-blur-sm overflow-hidden flex flex-col">
                    <div className="p-6 border-b border-white/5 flex justify-between items-center">
                        <h3 className="font-semibold text-lg text-white">Active Projects</h3>
                        <Link href="/dashboard/projects" className="text-xs text-blue-400 hover:text-blue-300">View All</Link>
                    </div>
                    <div className="p-6 pt-2">
                        <div className="space-y-2">
                            {loading ? (
                                <div className="text-center py-8 text-sm text-slate-500">Loading...</div>
                            ) : recentProjects.length === 0 ? (
                                <div className="text-center py-12 text-slate-500 border border-dashed border-slate-800 rounded-lg bg-white/5 m-4">
                                    <p>No projects yet.</p>
                                </div>
                            ) : (
                                recentProjects.map(project => (
                                    <div key={project.id} className="flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5 group">
                                        <div className="space-y-1">
                                            <div className="font-medium text-sm text-slate-200 group-hover:text-white">{project.name}</div>
                                            <div className="flex items-center gap-2">
                                                <div className={`w-1.5 h-1.5 rounded-full ${project.status === 'active' ? 'bg-green-500' : 'bg-slate-500'}`}></div>
                                                <div className="text-xs text-slate-500 uppercase tracking-wider">{project.status}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="w-32 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                                <div className="h-full bg-blue-500" style={{ width: `${project.completion}%` }}></div>
                                            </div>
                                            <span className="text-xs font-mono text-slate-400 w-8 text-right">{project.completion}%</span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                <div className="md:col-span-2 rounded-2xl p-6 bg-gradient-to-br from-blue-600 via-indigo-600 to-indigo-700 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

                    <h3 className="font-semibold text-lg text-white mb-6 relative z-10">Quick Actions</h3>
                    <div className="space-y-3 relative z-10">
                        <Button variant="ghost" className="w-full justify-start bg-white/10 hover:bg-white/20 text-white border-none h-12">
                            <Users className="mr-3 h-5 w-5 opacity-70" /> Invite Team
                        </Button>
                        <Button variant="ghost" className="w-full justify-start bg-white/10 hover:bg-white/20 text-white border-none h-12">
                            <CheckSquare className="mr-3 h-5 w-5 opacity-70" /> Add Task
                        </Button>
                        <Button variant="ghost" className="w-full justify-start bg-white/10 hover:bg-white/20 text-white border-none h-12">
                            <DollarSign className="mr-3 h-5 w-5 opacity-70" /> New Expense
                        </Button>
                    </div>

                    <div className="mt-12 pt-6 border-t border-white/20 relative z-10">
                        <p className="text-xs text-blue-100 mb-3 opacity-80">Need help with specific features?</p>
                        <Link href="mailto:support@buildflow.com">
                            <Button size="sm" className="w-full bg-white text-blue-600 hover:bg-blue-50 font-semibold border-none">
                                Contact Support
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
