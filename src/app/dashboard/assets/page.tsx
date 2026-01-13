"use client";

import { useState } from "react";
import { Map, MapPin, Truck, Battery, Search, Plus, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function AssetsPage() {
    const assets = [
        { id: "A-001", name: "CAT 320 Excavator", status: "In Use", location: "North Gate Setup", battery: 85, type: "Heavy Equipment", tracker: "GPS-X1" },
        { id: "A-002", name: "Ford F-150 (Truck 04)", status: "Transit", location: "Hwy 101 South", battery: 92, type: "Vehicle", tracker: "AirTag" },
        { id: "A-003", name: "Hilti Total Station", status: "Available", location: "Tool Crib", battery: 45, type: "Tool", tracker: "Tile Pro" },
        { id: "A-004", name: "Job Box #12", status: "On Site", location: "Level 2 Podium", battery: 100, type: "Storage", tracker: "AirTag" },
    ];

    return (
        <div className="space-y-6 h-[calc(100vh-140px)] flex flex-col">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white">Asset & Fleet Tracking</h1>
                    <p className="text-slate-400 mt-1">Real-time location of your equipment and tools.</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/20">
                    <Plus className="mr-2 h-4 w-4" /> Add Asset
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
                {/* Left: Asset List */}
                <Card className="lg:col-span-1 bg-[#0F172A]/60 border-white/5 backdrop-blur-xl flex flex-col overflow-hidden">
                    <CardHeader className="pb-3 border-b border-white/5">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                            <Input placeholder="Search assets..." className="pl-9 bg-black/20 border-white/10 text-white" />
                        </div>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-y-auto p-0">
                        {assets.map(asset => (
                            <div key={asset.id} className="flex items-center gap-4 p-4 border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${asset.type === 'Vehicle' ? 'bg-blue-500/10 text-blue-400' :
                                        asset.type === 'Heavy Equipment' ? 'bg-orange-500/10 text-orange-400' :
                                            'bg-slate-500/10 text-slate-400'
                                    }`}>
                                    {asset.type === 'Vehicle' ? <Truck size={20} /> : <MapPin size={20} />}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className="font-semibold text-slate-200 truncate">{asset.name}</h4>
                                        <Badge variant={asset.status === 'In Use' ? "default" : "secondary"} className="text-[10px] h-5">
                                            {asset.status}
                                        </Badge>
                                    </div>
                                    <div className="flex justify-between items-center text-xs text-slate-500">
                                        <span className="truncate max-w-[120px]">{asset.location}</span>
                                        <span className="flex items-center gap-1">
                                            <Battery size={12} className={asset.battery < 30 ? "text-red-400" : "text-green-400"} />
                                            {asset.battery}%
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Right: Map View (Placeholder) */}
                <Card className="lg:col-span-2 bg-[#0F172A]/60 border-white/5 backdrop-blur-xl flex flex-col overflow-hidden relative group">
                    <div className="absolute inset-0 bg-[#020617] flex items-center justify-center">
                        {/* Fake Map Grid */}
                        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

                        {/* Pins */}
                        <div className="absolute top-1/4 left-1/3 flex flex-col items-center gap-2 animate-bounce">
                            <div className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-bold shadow-lg whitespace-nowrap">Truck 04</div>
                            <MapPin className="text-blue-500 fill-blue-500/20 w-8 h-8 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                        </div>

                        <div className="absolute bottom-1/3 right-1/4 flex flex-col items-center gap-2">
                            <div className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-bold shadow-lg whitespace-nowrap">Excavator</div>
                            <MapPin className="text-orange-500 fill-orange-500/20 w-8 h-8 drop-shadow-[0_0_15px_rgba(249,115,22,0.5)]" />
                        </div>

                        <div className="text-center z-10 bg-black/60 p-6 rounded-2xl backdrop-blur-md border border-white/10">
                            <Map className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">Interactive Geofence Map</h3>
                            <p className="text-slate-400 max-w-sm mb-6">
                                Connect your Apple AirTags, Tile, or GPS APIs to see real-time locations on this map.
                            </p>
                            <Button variant="outline" className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10">
                                Configure API Keys
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
