"use client";

import { useState } from "react";
import {
    FileSignature,
    FileText,
    Plus,
    Download,
    Search,
    MoreVertical,
    CheckCircle2,
    Clock,
    DollarSign,
    Briefcase
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function ContractsPage() {
    const [activeTab, setActiveTab] = useState("subcontracts");

    // Mock Data
    const primeContract = {
        id: "PC-2024-001",
        client: "Life Surge LLC",
        title: "Warehouse Construction Main Agreement",
        originalValue: 3500000,
        changeOrders: 70400,
        revisedTotal: 3570400,
        status: "Active",
        signedDate: "2024-01-15",
        completionDate: "2024-11-30"
    };

    const subcontracts = [
        { id: "SC-001", vendor: "ABC Concrete", trade: "Concrete", value: 850000, status: "Active", signed: "2024-02-01" },
        { id: "SC-002", vendor: "Steel Masters Inc", trade: "Structural Steel", value: 1200000, status: "Active", signed: "2024-02-10" },
        { id: "SC-003", vendor: "Sparky's Electric", trade: "Electrical", value: 450000, status: "Draft", signed: "-" },
        { id: "SC-004", vendor: "Flow Plumbing", trade: "Plumbing", value: 380000, status: "Negotiating", signed: "-" },
        { id: "SC-005", vendor: "Top Notch Drywall", trade: "Drywall", value: 220000, status: "Pending Sig", signed: "-" },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white">Contracts</h1>
                    <p className="text-slate-400 mt-1">Manage Prime Contract and Subcontractor agreements.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="border-white/10 hover:bg-white/5 text-slate-300">
                        <Download className="w-4 h-4 mr-2" /> Export Report
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/20">
                        <Plus className="w-4 h-4 mr-2" /> Create Contract
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="subcontracts" className="w-full">
                <TabsList className="bg-[#0F172A]/60 border border-white/5 backdrop-blur-sm p-1">
                    <TabsTrigger value="prime" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg text-slate-400">
                        Prime Contract
                    </TabsTrigger>
                    <TabsTrigger value="subcontracts" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg text-slate-400">
                        Subcontracts ({subcontracts.length})
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="prime" className="mt-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Summary Card */}
                        <Card className="md:col-span-2 bg-[#0F172A]/60 border-white/5">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="text-xl text-white">{primeContract.title}</CardTitle>
                                        <CardDescription className="text-slate-400 mt-1">Contract #{primeContract.id} • Client: {primeContract.client}</CardDescription>
                                    </div>
                                    <Badge className="bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border-0">
                                        {primeContract.status}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-4">
                                    <div>
                                        <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Signed Date</div>
                                        <div className="font-medium text-slate-200">{primeContract.signedDate}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Est. Completion</div>
                                        <div className="font-medium text-slate-200">{primeContract.completionDate}</div>
                                    </div>
                                    <div className="col-span-2">
                                        <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Scope of Work</div>
                                        <div className="text-sm text-slate-300 line-clamp-2">
                                            Turnkey construction of a 50,000 sqft warehouse facility including all site work, structural steel, MEP, and finishes.
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Financial Snapshot */}
                        <Card className="bg-gradient-to-br from-blue-900/20 to-indigo-900/20 border-white/10">
                            <CardHeader>
                                <CardTitle className="text-sm text-blue-200">Contract Value</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <div className="text-sm text-slate-400 flex justify-between">Original Value</div>
                                    <div className="text-xl font-mono text-slate-200">${primeContract.originalValue.toLocaleString()}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-slate-400 flex justify-between">
                                        Change Orders
                                        <span className="text-emerald-400 text-xs">+2.1%</span>
                                    </div>
                                    <div className="text-xl font-mono text-white">${primeContract.changeOrders.toLocaleString()}</div>
                                </div>
                                <div className="pt-4 border-t border-white/10">
                                    <div className="text-sm text-blue-300 font-bold mb-1">Revised Total</div>
                                    <div className="text-3xl font-bold font-mono text-white">${primeContract.revisedTotal.toLocaleString()}</div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="subcontracts" className="mt-6">
                    <Card className="bg-[#0F172A]/60 border-white/5">
                        <div className="p-4 border-b border-white/5 flex items-center justify-between gap-4">
                            <div className="relative flex-1 max-w-sm">
                                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                                <Input
                                    placeholder="Search vendor or trade..."
                                    className="pl-9 bg-black/20 border-white/10 text-white placeholder:text-slate-600 focus-visible:ring-blue-500/50"
                                />
                            </div>
                            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                                Filter
                            </Button>
                        </div>
                        <Table>
                            <TableHeader className="bg-white/5">
                                <TableRow className="border-white/5 hover:bg-transparent">
                                    <TableHead className="text-slate-400">Contract #</TableHead>
                                    <TableHead className="text-slate-400">Vendor</TableHead>
                                    <TableHead className="text-slate-400">Trade</TableHead>
                                    <TableHead className="text-right text-slate-400">Value</TableHead>
                                    <TableHead className="text-center text-slate-400">Status</TableHead>
                                    <TableHead className="text-right text-slate-400">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {subcontracts.map((sub) => (
                                    <TableRow key={sub.id} className="border-white/5 hover:bg-white/5 transition-colors group">
                                        <TableCell className="font-mono text-slate-400 text-xs">{sub.id}</TableCell>
                                        <TableCell className="font-medium text-slate-200">
                                            <div className="flex items-center gap-2">
                                                <Briefcase size={14} className="text-blue-500" />
                                                {sub.vendor}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-slate-400">{sub.trade}</TableCell>
                                        <TableCell className="text-right font-mono text-slate-200">${sub.value.toLocaleString()}</TableCell>
                                        <TableCell className="text-center">
                                            <Badge className={`
                                                border-0 text-[10px] w-24 justify-center
                                                ${sub.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' :
                                                    sub.status === 'Draft' ? 'bg-slate-500/10 text-slate-400' :
                                                        'bg-yellow-500/10 text-yellow-400'}
                                              `}>
                                                {sub.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-white">
                                                <MoreVertical size={14} />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
