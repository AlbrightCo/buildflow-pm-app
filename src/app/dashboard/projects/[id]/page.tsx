"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CloudRain, AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProjectOverviewPage({ params }: { params: { id: string } }) {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Top Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="bg-[#0F172A]/60 backdrop-blur-xl border-white/5">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-400">Weather (Tampa, FL)</CardTitle>
                        <CloudRain className="h-4 w-4 text-blue-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">72°F</div>
                        <p className="text-xs text-slate-500">Partly Cloudy • 12% Rain</p>
                        <div className="mt-2 text-xs text-blue-400">Next Log: 5:00 PM</div>
                    </CardContent>
                </Card>

                <Card className="bg-[#0F172A]/60 backdrop-blur-xl border-white/5">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-400">Schedule Status</CardTitle>
                        <Clock className="h-4 w-4 text-emerald-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-emerald-400">On Track</div>
                        <p className="text-xs text-slate-500">2 Days Ahead</p>
                    </CardContent>
                </Card>

                <Card className="bg-[#0F172A]/60 backdrop-blur-xl border-white/5">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-400">Open RFI's</CardTitle>
                        <AlertTriangle className="h-4 w-4 text-amber-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">3</div>
                        <p className="text-xs text-slate-500">1 Overdue</p>
                    </CardContent>
                </Card>

                <Card className="bg-[#0F172A]/60 backdrop-blur-xl border-white/5">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-400">Budget</CardTitle>
                        <CheckCircle2 className="h-4 w-4 text-blue-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">$45,200</div>
                        <p className="text-xs text-slate-500">Remaining of $120k</p>
                    </CardContent>
                </Card>
            </div>

            {/* Draggable Widgets Area (Mockup for now) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Main Activity / Feed */}
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Project Activity</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex gap-4 border-b border-white/5 pb-4 last:border-0 last:pb-0">
                                        <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-xs">
                                            DA
                                        </div>
                                        <div>
                                            <p className="text-sm text-slate-300"><span className="font-semibold text-white">Dylan Albright</span> uploaded 3 new photos to <span className="text-blue-400 cursor-pointer">Daily Log</span>.</p>
                                            <p className="text-xs text-slate-500 mt-1">2 hours ago</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Photos</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-4 gap-2">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="aspect-square bg-slate-800 rounded-lg border border-white/5 relative overflow-hidden group cursor-pointer">
                                        <div className="absolute inset-0 flex items-center justify-center text-slate-600 text-xs">Photo {i}</div>
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs text-white">View</div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar Widgets */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Team</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {['John Smith (PM)', 'Sarah Jones (Super)', 'Mike Wilson (Electric)'].map((p, i) => (
                                    <div key={i} className="flex items-center gap-2 text-sm text-slate-300">
                                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                        {p}
                                    </div>
                                ))}
                                <Button variant="ghost" size="sm" className="w-full mt-2 text-blue-400 hover:text-blue-300">View Full Directory</Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Links</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-2">
                                <Button variant="outline" className="h-20 flex flex-col gap-2 border-white/10 hover:bg-white/5 hover:text-blue-400">
                                    <CloudRain size={20} />
                                    Log Weather
                                </Button>
                                <Button variant="outline" className="h-20 flex flex-col gap-2 border-white/10 hover:bg-white/5 hover:text-blue-400">
                                    <AlertTriangle size={20} />
                                    Delay Notice
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
