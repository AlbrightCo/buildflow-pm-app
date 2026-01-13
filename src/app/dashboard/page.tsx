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
    AlertCircle
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

                // Get tasks count (this is expensive in NoSQL, so we might just count for one project or skip for now)
                // Optimally, we'd maintain a 'stats' doc. For now, let's just query all 'users' as a proxy for "Team Size".
                const usersSnap = await getDocs(collection(db, 'users'));

                setStats({
                    projects: projSnap.size,
                    activeProjects: activeCount,
                    tasks: usersSnap.size, // Using Users count for "Team Members" actually makes more sense on high level
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
                    <h1 className="text-3xl font-bold tracking-tight text-[var(--text-primary)]">
                        Dashboard
                    </h1>
                    <p className="text-[var(--text-muted)] mt-1">
                        Welcome back, {userData?.firstName || "Guest"}. Here's what's happening today.
                    </p>
                </div>
                <div className="flex gap-3">
                    {userData?.subscriptionStatus === 'trial' && (
                        <div className="flex items-center gap-2 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-900 px-4 py-2 rounded-full text-sm font-medium border border-amber-200 shadow-sm">
                            <Clock size={16} />
                            <span>Trial Ends: {userData?.trialExpiresAt?.toLocaleDateString()}</span>
                        </div>
                    )}
                    <Link href="/dashboard/projects">
                        <Button className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white shadow-lg shadow-blue-500/20">
                            <Briefcase className="mr-2 h-4 w-4" /> New Project
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Total Projects
                        </CardTitle>
                        <Briefcase className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-[var(--text-primary)]">{stats.projects}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            {stats.activeProjects} active now
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-green-500 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Contract Value
                        </CardTitle>
                        <DollarSign className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-[var(--text-primary)]">
                            ${stats.totalValue.toLocaleString()}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 text-green-600 flex items-center gap-1">
                            <TrendingUp size={12} />
                            +12% from last month
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-purple-500 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Team Members
                        </CardTitle>
                        <Users className="h-4 w-4 text-purple-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-[var(--text-primary)]">{stats.tasks}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Across all projects
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-orange-500 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Pending Items
                        </CardTitle>
                        <AlertCircle className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-[var(--text-primary)]">0</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Requires attention
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Projects Table */}
            <div className="grid md:grid-cols-7 gap-6">
                <Card className="md:col-span-5 shadow-sm">
                    <CardHeader>
                        <CardTitle>Active Projects</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {loading ? (
                                <div className="text-center py-4 text-sm text-muted-foreground">Loading projects...</div>
                            ) : recentProjects.length === 0 ? (
                                <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
                                    <Briefcase className="h-8 w-8 mx-auto mb-2 opacity-20" />
                                    <p>No projects yet. Create your first one!</p>
                                </div>
                            ) : (
                                recentProjects.map(project => (
                                    <div key={project.id} className="flex items-center justify-between p-4 bg-[var(--bg-tertiary)] rounded-lg border border-[var(--border-color)] hover:border-blue-300 transition-colors">
                                        <div className="space-y-1">
                                            <div className="font-semibold text-sm text-[var(--text-primary)]">{project.name}</div>
                                            <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider">{project.status}</div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                <div className="h-full bg-blue-500" style={{ width: `${project.completion}%` }}></div>
                                            </div>
                                            <span className="text-xs font-medium w-8 text-right">{project.completion}%</span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card className="md:col-span-2 shadow-sm bg-gradient-to-br from-blue-600 to-indigo-700 text-white border-0">
                    <CardHeader>
                        <CardTitle className="text-white">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <Button variant="secondary" className="w-full justify-start bg-white/10 hover:bg-white/20 text-white border-0">
                            <Users className="mr-2 h-4 w-4" /> Invite Team
                        </Button>
                        <Button variant="secondary" className="w-full justify-start bg-white/10 hover:bg-white/20 text-white border-0">
                            <CheckSquare className="mr-2 h-4 w-4" /> Add Task
                        </Button>
                        <Button variant="secondary" className="w-full justify-start bg-white/10 hover:bg-white/20 text-white border-0">
                            <DollarSign className="mr-2 h-4 w-4" /> Record Payment
                        </Button>

                        <div className="mt-8 pt-6 border-t border-white/10">
                            <p className="text-xs text-blue-100 mb-2">Have feedback?</p>
                            <Button size="sm" variant="outline" className="w-full border-blue-400 text-blue-100 hover:bg-blue-500 hover:text-white">
                                Contact Support
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
