"use client";

import { useState } from "react";
import {
    Folder,
    FileText,
    MoreVertical,
    Search,
    Filter,
    Plus,
    Download,
    Share2,
    Clock,
    Grid,
    List as ListIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function DrawingsPage() {
    const [viewMode, setViewMode] = useState<"list" | "grid">("list");

    // Mock Data
    const folders = [
        { id: 1, name: "A - Architectural", count: 12 },
        { id: 2, name: "S - Structural", count: 8 },
        { id: 3, name: "M - Mechanical", count: 5 },
        { id: 4, name: "E - Electrical", count: 7 },
        { id: 5, name: "P - Plumbing", count: 4 },
    ];

    const recentFiles = [
        { id: 101, name: "A-101 First Floor Plan.pdf", rev: "2", date: "Oct 24, 2024", size: "4.2 MB", status: "Current" },
        { id: 102, name: "A-102 Second Floor Plan.pdf", rev: "1", date: "Oct 22, 2024", size: "3.8 MB", status: "Superseded" },
        { id: 103, name: "S-201 Foundation Details.pdf", rev: "0", date: "Oct 20, 2024", size: "2.1 MB", status: "Current" },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Toolbar */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#0F172A]/60 p-4 rounded-xl border border-white/5 backdrop-blur-xl">
                <div className="relative flex-1 max-w-md w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                        placeholder="Search drawings..."
                        className="pl-10 bg-black/20 border-white/10 text-white placeholder:text-slate-500 focus:ring-blue-500/50"
                    />
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                    <div className="flex bg-black/20 rounded-lg p-1 border border-white/5">
                        <Button
                            variant="ghost"
                            size="icon"
                            className={`h-8 w-8 rounded-md ${viewMode === 'list' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'}`}
                            onClick={() => setViewMode("list")}
                        >
                            <ListIcon size={16} />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className={`h-8 w-8 rounded-md ${viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'}`}
                            onClick={() => setViewMode("grid")}
                        >
                            <Grid size={16} />
                        </Button>
                    </div>

                    <Button variant="outline" className="border-white/10 hover:bg-white/5 text-slate-300">
                        <Filter className="w-4 h-4 mr-2" /> Filter
                    </Button>

                    <Button className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20">
                        <Plus className="w-4 h-4 mr-2" /> Upload Drawings
                    </Button>
                </div>
            </div>

            {/* Folders Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {folders.map((folder) => (
                    <div
                        key={folder.id}
                        className="group p-4 bg-[#0F172A]/40 hover:bg-[#0F172A]/80 border border-white/5 hover:border-blue-500/30 rounded-xl transition-all cursor-pointer flex flex-col items-center text-center gap-3"
                    >
                        <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <Folder className="w-8 h-8 text-blue-400 fill-blue-400/20" />
                        </div>
                        <div>
                            <h3 className="font-medium text-slate-200 group-hover:text-white">{folder.name}</h3>
                            <p className="text-xs text-slate-500">{folder.count} files</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Files List */}
            <div className="space-y-4">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-400" /> Recent Uploads
                </h2>

                <div className="bg-[#0F172A]/60 border border-white/5 rounded-xl overflow-hidden backdrop-blur-sm">
                    {/* Header */}
                    <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        <div className="col-span-6 md:col-span-5">Name</div>
                        <div className="col-span-2 hidden md:block">Revision</div>
                        <div className="col-span-2 hidden md:block">Date</div>
                        <div className="col-span-2 hidden md:block">Status</div>
                        <div className="col-span-1 text-right">Actions</div>
                    </div>

                    {/* Rows */}
                    {recentFiles.map((file) => (
                        <div
                            key={file.id}
                            className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-white/5 border-b border-white/5 last:border-0 transition-colors group"
                        >
                            <div className="col-span-6 md:col-span-5 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center border border-red-500/20">
                                    <FileText className="w-5 h-5 text-red-500" />
                                </div>
                                <div className="overflow-hidden">
                                    <div className="font-medium text-slate-200 truncate group-hover:text-white">{file.name}</div>
                                    <div className="text-xs text-slate-500 md:hidden">{file.date} • Rev {file.rev}</div>
                                </div>
                            </div>

                            <div className="col-span-2 hidden md:block text-sm text-slate-400">
                                <span className="px-2 py-1 bg-white/5 rounded text-xs border border-white/5">{file.rev}</span>
                            </div>

                            <div className="col-span-2 hidden md:block text-sm text-slate-400">{file.date}</div>

                            <div className="col-span-2 hidden md:block">
                                <span className={`text-xs px-2 py-1 rounded-full border ${file.status === 'Current'
                                        ? 'bg-green-500/10 text-green-400 border-green-500/20'
                                        : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                                    }`}>
                                    {file.status}
                                </span>
                            </div>

                            <div className="col-span-6 md:col-span-1 flex justify-end">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10">
                                            <MoreVertical className="w-4 h-4 text-slate-400" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-48 bg-[#020617] border-white/10">
                                        <DropdownMenuItem className="text-white focus:bg-white/10 cursor-pointer">
                                            <Download className="w-4 h-4 mr-2" /> Download
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="text-white focus:bg-white/10 cursor-pointer">
                                            <Share2 className="w-4 h-4 mr-2" /> Share
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="text-white focus:bg-white/10 cursor-pointer">
                                            <Clock className="w-4 h-4 mr-2" /> View History
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
