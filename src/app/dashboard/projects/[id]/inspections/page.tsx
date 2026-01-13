"use client";

import { useState } from "react";
import {
    ClipboardCheck,
    AlertTriangle,
    CheckCircle2,
    Plus,
    Search,
    FileText,
    Camera,
    XCircle,
    ChevronRight,
    Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

// Mock Inspection Data
const logs = [
    { id: "INS-104", type: "Safety", title: "Weekly Site Safety Walk", inspector: "Mike Ross", date: "2024-03-12", status: "Passed", issues: 0 },
    { id: "INS-103", type: "QC", title: "Pre-Pour Inspection: Zone B", inspector: "Sarah Miller", date: "2024-03-10", status: "Failed", issues: 3 },
    { id: "INS-102", type: "Environment", title: "Stormwater Runoff Check", inspector: "Dave K.", date: "2024-03-08", status: "Passed", issues: 0 },
    { id: "INS-101", type: "Safety", title: "Scaffolding Safety Check", inspector: "Mike Ross", date: "2024-03-05", status: "Passed", issues: 0 },
];

export default function InspectionsPage() {
    const [selectedInspection, setSelectedInspection] = useState<typeof logs[0] | null>(null);

    return (
        <div className="space-y-6 animate-in fade-in duration-500 h-[calc(100vh-140px)] flex flex-col">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white">Inspections</h1>
                    <p className="text-slate-400 mt-1">Safety audits, quality control, and compliance logs.</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/20">
                    <Plus className="w-4 h-4 mr-2" /> New Inspection
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
                {/* Left Column: Inspection Log */}
                <Card className="lg:col-span-1 bg-[#0F172A]/60 border-white/5 flex flex-col overflow-hidden">
                    <CardHeader className="pb-3 border-b border-white/5">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                            <Input placeholder="Search logs..." className="pl-9 bg-black/20 border-white/10 text-white" />
                        </div>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-y-auto p-0">
                        {logs.map((log) => (
                            <div
                                key={log.id}
                                className={`p-4 border-b border-white/5 cursor-pointer transition-colors hover:bg-white/5 ${selectedInspection?.id === log.id ? 'bg-white/5 border-l-2 border-l-blue-500' : ''}`}
                                onClick={() => setSelectedInspection(log)}
                            >
                                <div className="flex justify-between items-start mb-1">
                                    <div className="font-semibold text-slate-200">{log.type}</div>
                                    <Badge
                                        variant="outline"
                                        className={`border-0 ${log.status === 'Passed' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                                            }`}
                                    >
                                        {log.status === 'Passed' ? <CheckCircle2 size={12} className="mr-1" /> : <XCircle size={12} className="mr-1" />}
                                        {log.status}
                                    </Badge>
                                </div>
                                <h4 className="text-sm text-white font-medium mb-2">{log.title}</h4>
                                <div className="flex justify-between items-center text-xs text-slate-500">
                                    <span>{log.id} • {log.date}</span>
                                    <span>{log.inspector}</span>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Right Column: Inspection Details */}
                <Card className="lg:col-span-2 bg-[#0F172A]/60 border-white/5 flex flex-col overflow-hidden">
                    {selectedInspection ? (
                        <>
                            <CardHeader className="border-b border-white/5 bg-black/20">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <Badge variant="outline" className="border-blue-500/30 text-blue-400">{selectedInspection.type} Inspection</Badge>
                                            <span className="text-slate-500 text-sm">#{selectedInspection.id}</span>
                                        </div>
                                        <CardTitle className="text-xl text-white">{selectedInspection.title}</CardTitle>
                                        <CardDescription className="flex items-center gap-4 mt-2 text-slate-400">
                                            <span className="flex items-center gap-1"><Shield size={14} /> Inspector: {selectedInspection.inspector}</span>
                                            <span className="flex items-center gap-1"><FileText size={14} /> Date: {selectedInspection.date}</span>
                                        </CardDescription>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button variant="outline" size="sm" className="border-white/10 hover:bg-white/5 text-slate-300">
                                            Export PDF
                                        </Button>
                                        <Button size="sm" className="bg-blue-600 hover:bg-blue-500">
                                            Edit
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                            <ScrollArea className="flex-1">
                                <CardContent className="p-6 space-y-8">
                                    {/* Checklist Section */}
                                    <div>
                                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-white/10 pb-2">Checklist Items</h3>
                                        <div className="space-y-4">
                                            {[1, 2, 3, 4].map((item) => (
                                                <div key={item} className="flex items-start gap-4 p-3 rounded-lg bg-white/5 border border-white/5">
                                                    <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center ${item === 3 && selectedInspection.status === 'Failed' ? 'bg-red-500/20 text-red-500' : 'bg-emerald-500/20 text-emerald-500'}`}>
                                                        {item === 3 && selectedInspection.status === 'Failed' ? <XCircle size={14} /> : <CheckCircle2 size={14} />}
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="text-sm font-medium text-white mb-1">
                                                            {item === 1 ? "Proper PPE worn by all personnel" :
                                                                item === 2 ? "Scaffolding grounded/secured" :
                                                                    item === 3 ? "Guardrails installed on all open edges" :
                                                                        "Fire extinguishers present and charged"}
                                                        </div>
                                                        {item === 3 && selectedInspection.status === 'Failed' && (
                                                            <div className="mt-2 bg-red-500/10 border border-red-500/20 rounded-md p-3">
                                                                <div className="flex items-start gap-2 text-red-400 text-xs">
                                                                    <AlertTriangle size={14} className="mt-0.5 shrink-0" />
                                                                    <div>
                                                                        <span className="font-bold block mb-1">Critical Failure</span>
                                                                        Guardrail missing on North elevation, level 3. Immediate correction required.
                                                                    </div>
                                                                </div>
                                                                <div className="mt-2 flex gap-2">
                                                                    <div className="h-16 w-16 bg-black rounded border border-white/10 flex items-center justify-center text-slate-600">
                                                                        <Camera size={20} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Signatures */}
                                    <div>
                                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-white/10 pb-2">Sign-off</h3>
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                                                <div className="text-xs text-slate-500 mb-2">Inspector Signature</div>
                                                <div className="font-script text-2xl text-white opacity-80 italic">Mike Ross</div>
                                                <div className="mt-2 text-xs text-slate-400 border-t border-white/10 pt-2">Signed 03/12/2024 14:30</div>
                                            </div>
                                            <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                                                <div className="text-xs text-slate-500 mb-2">Superintendent Signature</div>
                                                <div className="font-script text-2xl text-white opacity-80 italic">Dylan Albright</div>
                                                <div className="mt-2 text-xs text-slate-400 border-t border-white/10 pt-2">Signed 03/12/2024 15:00</div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </ScrollArea>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-slate-500">
                            <ClipboardCheck size={48} className="mb-4 opacity-50" />
                            <p>Select an inspection log to view details</p>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
}
