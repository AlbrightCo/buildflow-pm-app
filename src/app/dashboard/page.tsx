"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDistance } from "date-fns";

export default function DashboardPage() {
    const { userData } = useAuth();

    if (!userData) return null;

    const trialDaysLeft = userData.subscriptionStatus === 'trial'
        ? formatDistance(userData.trialExpiresAt, new Date(), { addSuffix: true })
        : null;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                    <p className="text-muted-foreground text-gray-500">
                        Welcome back, {userData.displayName || 'User'}
                    </p>
                </div>
            </div>

            {userData.subscriptionStatus === 'trial' && (
                <div className="bg-indigo-50 border border-indigo-100 text-indigo-800 px-4 py-3 rounded-lg flex justify-between items-center">
                    <span>
                        <strong>Free Trial Active:</strong> access expires {trialDaysLeft}.
                    </span>
                    <button className="bg-indigo-600 text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-indigo-700">
                        Upgrade Now
                    </button>
                </div>
            )}

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground text-green-500">+2 from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Tasks</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">48</div>
                        <p className="text-xs text-muted-foreground">12 due today</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Team Members</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">7</div>
                        <p className="text-xs text-muted-foreground">online now</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Budget Used</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$24,500</div>
                        <p className="text-xs text-muted-foreground text-gray-500">65% of monthly budget</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-gray-500">No recent activity to display.</p>
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Upcoming Deadlines</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-gray-500">No deadlines.</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
