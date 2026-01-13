"use client";

import {
    DollarSign,
    TrendingUp,
    TrendingDown,
    AlertCircle,
    FileText,
    Download,
    Filter,
    Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function FinancialsPage() {
    // Mock Financial Data
    const budgetSummary = [
        { label: "Original Budget", value: "$4,250,000", color: "text-slate-400" },
        { label: "Approved COs", value: "$125,400", color: "text-yellow-400" },
        { label: "Revised Budget", value: "$4,375,400", color: "text-white" },
        { label: "Pending COs", value: "$45,200", color: "text-orange-400" },
    ];

    const budgetLines = [
        { code: "03-3000", desc: "Concrete", original: 850000, revised: 865000, committed: 840000, jtd: 650000, balance: 190000, percent: 77 },
        { code: "04-2000", desc: "Masonry", original: 420000, revised: 420000, committed: 415000, jtd: 415000, balance: 0, percent: 100 },
        { code: "05-1200", desc: "Structural Steel", original: 1200000, revised: 1250000, committed: 1250000, jtd: 900000, balance: 350000, percent: 72 },
        { code: "09-2900", desc: "Gypsum Board", original: 350000, revised: 350000, committed: 340000, jtd: 120000, balance: 220000, percent: 35 },
        { code: "23-0000", desc: "HVAC", original: 680000, revised: 680000, committed: 675000, jtd: 300000, balance: 375000, percent: 45 },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Top Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="bg-[#0F172A]/60 border-white/5 backdrop-blur-xl">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-400">Projected Profit</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-emerald-400">$348,200</div>
                        <div className="text-xs text-slate-500 mt-1">8.2% Margin</div>
                        <Progress value={65} className="h-1 mt-2 bg-slate-800" indicatorClassName="bg-emerald-500" />
                    </CardContent>
                </Card>
                <Card className="bg-[#0F172A]/60 border-white/5 backdrop-blur-xl">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-400">Cost to Complete</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">$1,135,000</div>
                        <div className="text-xs text-slate-500 mt-1">Based on committed costs</div>
                    </CardContent>
                </Card>
                <Card className="bg-[#0F172A]/60 border-white/5 backdrop-blur-xl">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-400">Total Billed</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-400">$2,850,000</div>
                        <div className="text-xs text-slate-500 mt-1">65% of Contract</div>
                    </CardContent>
                </Card>
                <Card className="bg-[#0F172A]/60 border-white/5 backdrop-blur-xl">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-400">Risk Exposure</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-amber-400">$45,200</div>
                        <div className="text-xs text-slate-500 mt-1">Pending Change Orders</div>
                    </CardContent>
                </Card>
            </div>

            {/* Main Budget Table Section */}
            <div className="bg-[#0F172A]/60 border border-white/5 rounded-xl overflow-hidden backdrop-blur-xl">
                <div className="p-4 border-b border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h2 className="text-xl font-bold text-white">Budget Overview</h2>
                        <p className="text-sm text-slate-500">Track costs against your original estimate.</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" className="border-white/10 hover:bg-white/5 text-slate-300">
                            <Download className="w-4 h-4 mr-2" /> Export
                        </Button>
                        <Button className="bg-blue-600 hover:bg-blue-500">
                            <Plus className="w-4 h-4 mr-2" /> Budget Mod
                        </Button>
                    </div>
                </div>

                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/5 bg-white/5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    <div className="col-span-3">Cost Code</div>
                    <div className="col-span-2 text-right">Original</div>
                    <div className="col-span-2 text-right">Revised</div>
                    <div className="col-span-2 text-right">Committed</div>
                    <div className="col-span-2 text-right">Balance</div>
                    <div className="col-span-1 text-center">%</div>
                </div>

                {/* Table Body */}
                <div className="max-h-[600px] overflow-y-auto">
                    {budgetLines.map((line) => (
                        <div key={line.code} className="grid grid-cols-12 gap-4 p-4 border-b border-white/5 hover:bg-white/5 transition-colors group text-sm">
                            <div className="col-span-3">
                                <div className="font-semibold text-white">{line.code}</div>
                                <div className="text-slate-500 text-xs">{line.desc}</div>
                            </div>
                            <div className="col-span-2 text-right text-slate-300 font-mono">
                                {line.original.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                            </div>
                            <div className="col-span-2 text-right text-white font-mono">
                                {line.revised.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                            </div>
                            <div className="col-span-2 text-right text-blue-400 font-mono">
                                {line.committed.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                            </div>
                            <div className="col-span-2 text-right font-mono text-emerald-400 font-semibold">
                                {line.balance.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                            </div>
                            <div className="col-span-1 flex items-center justify-center">
                                <div className={`px-2 py-1 rounded text-xs font-bold ${line.percent > 90 ? 'bg-red-500/20 text-red-400' :
                                        line.percent > 75 ? 'bg-yellow-500/20 text-yellow-400' :
                                            'bg-green-500/20 text-green-400'
                                    }`}>
                                    {line.percent}%
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-4 bg-white/5 border-t border-white/5 grid grid-cols-12 gap-4 text-sm font-bold text-white">
                    <div className="col-span-3">TOTALS</div>
                    <div className="col-span-2 text-right">$3,500,000</div>
                    <div className="col-span-2 text-right">$3,570,400</div>
                    <div className="col-span-2 text-right text-blue-400">$3,510,000</div>
                    <div className="col-span-2 text-right text-emerald-400 font-bold">$60,400</div>
                    <div className="col-span-1"></div>
                </div>
            </div>
        </div>
    );
}
