"use client";

import { useState } from "react";
import { Camera, Calendar, MapPin, User, Search, Filter, Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";

// Mock Data
const photos = [
    { id: 1, url: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=600&auto=format&fit=crop", date: "2024-03-12", time: "14:30", uploader: "Mike R.", location: "Zone B - Foundation", category: "Progress" },
    { id: 2, url: "https://images.unsplash.com/photo-1590644363165-c3620b788870?q=80&w=600&auto=format&fit=crop", date: "2024-03-12", time: "10:15", uploader: "Sarah M.", location: "Site Entrance", category: "Safety" },
    { id: 3, url: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=600&auto=format&fit=crop", date: "2024-03-11", time: "16:45", uploader: "Mike R.", location: "Level 1", category: "Issue" },
    { id: 4, url: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=600&auto=format&fit=crop", date: "2024-03-10", time: "09:00", uploader: "Dave K.", location: "Zone A", category: "Progress" },
    { id: 5, url: "https://images.unsplash.com/photo-1535732820275-9e990e97e3f5?q=80&w=600&auto=format&fit=crop", date: "2024-03-10", time: "08:30", uploader: "Dave K.", location: "Zone A", category: "Material Delivery" },
];

export default function PhotosPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedPhoto, setSelectedPhoto] = useState<typeof photos[0] | null>(null);

    return (
        <div className="space-y-6 h-[calc(100vh-140px)] flex flex-col">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white">Photos</h1>
                    <p className="text-slate-400 mt-1">Field reports and progress documentation.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="border-white/10 hover:bg-white/5 text-slate-300">
                        <Filter className="w-4 h-4 mr-2" /> Filter
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/20">
                        <Camera className="w-4 h-4 mr-2" /> Upload Photo
                    </Button>
                </div>
            </div>

            {/* Toolbar */}
            <div className="flex items-center gap-4 bg-[#0F172A]/60 p-2 rounded-xl border border-white/5 backdrop-blur-sm">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                    <Input
                        placeholder="Search by location, user, or date..."
                        className="pl-9 bg-black/20 border-white/10 text-white placeholder:text-slate-600 focus-visible:ring-blue-500/50"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="h-6 w-px bg-white/10 mx-2"></div>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                    <span className="text-white font-bold">{photos.length}</span> Photos
                </div>
            </div>

            {/* Photo Grid */}
            <div className="flex-1 overflow-y-auto min-h-0 pr-2">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {photos.map((photo) => (
                        <Dialog key={photo.id}>
                            <DialogTrigger asChild>
                                <div
                                    className="group relative aspect-square bg-slate-800 rounded-xl overflow-hidden border border-white/10 cursor-pointer hover:border-blue-500/50 transition-all"
                                    onClick={() => setSelectedPhoto(photo)}
                                >
                                    <img
                                        src={photo.url}
                                        alt={photo.location}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                                        <div className="flex items-center gap-1.5 text-xs font-medium text-white mb-0.5">
                                            <MapPin size={12} className="text-blue-400" />
                                            <span className="truncate">{photo.location}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-[10px] text-slate-300">
                                            <span>{photo.date}</span>
                                            <span>{photo.time}</span>
                                        </div>
                                    </div>
                                    {/* Timestamp Badge (Always Visible) */}
                                    <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[10px] text-white font-mono border border-white/10">
                                        {photo.date}
                                    </div>
                                </div>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl bg-[#0F172A] border-white/10 p-0 overflow-hidden text-white">
                                <div className="flex flex-col md:flex-row h-[80vh]">
                                    {/* Image Side */}
                                    <div className="flex-1 bg-black relative flex items-center justify-center">
                                        <img
                                            src={photo.url}
                                            alt={photo.location}
                                            className="max-w-full max-h-full object-contain"
                                        />
                                    </div>
                                    {/* Metadata Side */}
                                    <div className="w-full md:w-80 bg-[#0F172A] border-l border-white/10 p-6 flex flex-col">
                                        <h3 className="text-xl font-bold mb-1">{photo.category}</h3>
                                        <div className="flex items-center gap-2 text-slate-400 text-sm mb-6">
                                            <MapPin size={14} />
                                            {photo.location}
                                        </div>

                                        <div className="space-y-4">
                                            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                                                <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Uploaded By</div>
                                                <div className="flex items-center gap-2 font-medium">
                                                    <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-xs">{photo.uploader.charAt(0)}</div>
                                                    {photo.uploader}
                                                </div>
                                            </div>

                                            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                                                <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Timestamp</div>
                                                <div className="flex items-center gap-2 font-mono text-emerald-400">
                                                    <Calendar size={14} />
                                                    {photo.date} • {photo.time}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-auto pt-6">
                                            <Button className="w-full bg-blue-600 hover:bg-blue-500 mb-2">
                                                <Download className="w-4 h-4 mr-2" /> Download Original
                                            </Button>
                                            <Button variant="ghost" className="w-full text-slate-400 hover:text-white hover:bg-white/5">
                                                View on Map
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                    ))}
                </div>
            </div>
        </div>
    );
}
