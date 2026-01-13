"use client";

import { useState, useEffect } from "react";
import {
    Cloud,
    Sun,
    Wind,
    Droplets,
    Calendar,
    Send,
    Save,
    Plus,
    Users,
    AlertTriangle,
    CheckCircle2,
    FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { toast } from "sonner";

// Type for simplified weather data
interface WeatherData {
    temp: number;
    condition: string;
    wind: number;
    humidity: number;
}

export default function DailyReportsPage() {
    const [date, setDate] = useState(new Date());
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [isEmailOpen, setIsEmailOpen] = useState(false);
    const [emailType, setEmailType] = useState<"client" | "sub" | "admin">("admin");

    // Mock Manpower Data
    const [manpower, setManpower] = useState([
        { id: 1, trade: "Carpentry", company: "Albright Co", workers: 4, hours: 32 },
        { id: 2, trade: "Electrical", company: "Sparky's", workers: 2, hours: 16 },
        { id: 3, trade: "Plumbing", company: "Flow Plumbing", workers: 0, hours: 0 },
    ]);

    // Fetch Mock Weather (Simulating API call)
    useEffect(() => {
        // In a real app, fetch from Open-Meteo API based on lat/long
        // const fetchWeather = async () => { ... }

        // Simulating data fetch
        setWeather({
            temp: 72,
            condition: "Partly Cloudy",
            wind: 12,
            humidity: 45
        });
    }, []);

    const handleSendEmail = () => {
        toast.success(`Report sent to ${emailType === 'client' ? 'Client' : emailType === 'sub' ? 'Subcontractors' : 'Admin List'}`);
        setIsEmailOpen(false);
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white">Daily Reports</h1>
                    <p className="text-slate-400 mt-1">Log progress, track manpower, and automate reporting.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="border-white/10 hover:bg-white/5 text-slate-300">
                        <Calendar className="w-4 h-4 mr-2" /> {format(date, "MMM dd, yyyy")}
                    </Button>
                    <Dialog open={isEmailOpen} onOpenChange={setIsEmailOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/20">
                                <Send className="w-4 h-4 mr-2" /> Send Report
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-[#0F172A] border-white/10 text-white sm:max-w-[500px]">
                            <DialogHeader>
                                <DialogTitle>Send Daily Report</DialogTitle>
                                <DialogDescription className="text-slate-400">
                                    Choose the report format and recipients. Content is automatically tailored.
                                </DialogDescription>
                            </DialogHeader>

                            <div className="grid gap-6 py-4">
                                <div className="space-y-2">
                                    <Label>Report Type</Label>
                                    <div className="grid grid-cols-3 gap-2">
                                        <div
                                            className={`p-3 rounded-lg border cursor-pointer transition-all text-center ${emailType === 'admin' ? 'bg-blue-600/20 border-blue-500 text-blue-400' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                                            onClick={() => setEmailType('admin')}
                                        >
                                            <ShieldIcon className="w-6 h-6 mx-auto mb-2" />
                                            <div className="text-xs font-bold">Internal / Admin</div>
                                        </div>
                                        <div
                                            className={`p-3 rounded-lg border cursor-pointer transition-all text-center ${emailType === 'client' ? 'bg-blue-600/20 border-blue-500 text-blue-400' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                                            onClick={() => setEmailType('client')}
                                        >
                                            <Users className="w-6 h-6 mx-auto mb-2" />
                                            <div className="text-xs font-bold">Client / Owner</div>
                                        </div>
                                        <div
                                            className={`p-3 rounded-lg border cursor-pointer transition-all text-center ${emailType === 'sub' ? 'bg-blue-600/20 border-blue-500 text-blue-400' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                                            onClick={() => setEmailType('sub')}
                                        >
                                            <HardHatIcon className="w-6 h-6 mx-auto mb-2" />
                                            <div className="text-xs font-bold">Subcontractors</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4 bg-black/20 p-4 rounded-lg border border-white/5">
                                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Preview Content</div>
                                    <ul className="text-sm text-slate-300 space-y-2 list-disc pl-4">
                                        {emailType === 'admin' && (
                                            <>
                                                <li>Full Manpower Log & Hours</li>
                                                <li>Detailed Work Descriptions</li>
                                                <li>Safety Incidents & Delays</li>
                                                <li><span className="text-emerald-400">Financial Impact Analysis</span></li>
                                            </>
                                        )}
                                        {emailType === 'client' && (
                                            <>
                                                <li>High-level Progress Summary</li>
                                                <li>Site Photos (Selected)</li>
                                                <li>Schedule Milestones</li>
                                                <li><i>Detailed constraints hidden</i></li>
                                            </>
                                        )}
                                        {emailType === 'sub' && (
                                            <>
                                                <li>Schedule Updates (Lookahead)</li>
                                                <li>Site Coordination Notes</li>
                                                <li>Safety Reminders</li>
                                                <li><i>Financials hidden</i></li>
                                            </>
                                        )}
                                    </ul>
                                </div>
                            </div>

                            <DialogFooter>
                                <Button variant="ghost" onClick={() => setIsEmailOpen(false)}>Cancel</Button>
                                <Button onClick={handleSendEmail} className="bg-blue-600 hover:bg-blue-500">
                                    <Send className="w-4 h-4 mr-2" /> Send via Email
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Weather & Manpower */}
                <div className="space-y-6">
                    {/* Weather Card */}
                    <Card className="bg-gradient-to-br from-blue-900/40 to-indigo-900/40 border-white/10 overflow-hidden relative">
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1592210454359-9043f067919b?q=80&w=1000&auto=format&fit=crop')] opacity-20 bg-cover bg-center"></div>
                        <CardHeader className="pb-2">
                            <div className="flex justify-between items-center">
                                <CardTitle className="text-white flex items-center gap-2">
                                    <Cloud className="w-5 h-5 text-blue-300" /> Site Conditions
                                </CardTitle>
                                <Badge className="bg-blue-500/20 text-blue-300 border-0">12:00 PM Log</Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-end justify-between">
                                <div>
                                    <div className="text-4xl font-bold text-white mb-1">{weather?.temp}°F</div>
                                    <div className="text-blue-200 font-medium">{weather?.condition}</div>
                                </div>
                                <div className="text-right space-y-1">
                                    <div className="text-sm text-slate-300 flex items-center justify-end gap-2">
                                        <Wind size={14} /> {weather?.wind} mph
                                    </div>
                                    <div className="text-sm text-slate-300 flex items-center justify-end gap-2">
                                        <Droplets size={14} /> {weather?.humidity}%
                                    </div>
                                </div>
                            </div>
                            <Button variant="ghost" size="sm" className="w-full mt-4 bg-white/10 hover:bg-white/20 text-white border-0">
                                Auto-Log Current Weather
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Manpower Log */}
                    <Card className="bg-[#0F172A]/60 border-white/5">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-lg text-white">Manpower</CardTitle>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                                <Plus size={16} />
                            </Button>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader className="bg-white/5">
                                    <TableRow className="border-white/5 hover:bg-transparent">
                                        <TableHead className="text-slate-400 h-8">Trade</TableHead>
                                        <TableHead className="text-center text-slate-400 h-8">Cnt</TableHead>
                                        <TableHead className="text-right text-slate-400 h-8">Hrs</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {manpower.map((row) => (
                                        <TableRow key={row.id} className="border-white/5 hover:bg-white/5">
                                            <TableCell className="py-2 text-slate-300 font-medium">
                                                {row.trade}
                                                <div className="text-[10px] text-slate-500 font-normal">{row.company}</div>
                                            </TableCell>
                                            <TableCell className="py-2 text-center text-slate-300">{row.workers}</TableCell>
                                            <TableCell className="py-2 text-right text-slate-300">{row.hours}</TableCell>
                                        </TableRow>
                                    ))}
                                    <TableRow className="border-t border-white/10 font-bold bg-white/5">
                                        <TableCell className="py-2 text-white">Total</TableCell>
                                        <TableCell className="py-2 text-center text-emerald-400">{manpower.reduce((a, b) => a + b.workers, 0)}</TableCell>
                                        <TableCell className="py-2 text-right text-emerald-400">{manpower.reduce((a, b) => a + b.hours, 0)}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Work Logs */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="bg-[#0F172A]/60 border-white/5">
                        <CardHeader>
                            <CardTitle className="text-white">Work Performed</CardTitle>
                            <CardDescription className="text-slate-400">Detailed description of activities on site today.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-slate-300">07:00 AM - 12:00 PM</Label>
                                <Textarea
                                    className="bg-black/20 border-white/10 text-white min-h-[100px]"
                                    placeholder="- Excavation continued in Zone B..."
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-slate-300">12:30 PM - 03:30 PM</Label>
                                <Textarea
                                    className="bg-black/20 border-white/10 text-white min-h-[100px]"
                                    placeholder="- Concrete pour for footing F-12 completed..."
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-[#0F172A]/60 border-white/5">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <AlertTriangle className="text-orange-500 w-5 h-5" /> Constraints & Delays
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2"></div>
                                    <div>
                                        <div className="text-sm font-bold text-orange-400">Material Delay: Steel Beams</div>
                                        <div className="text-sm text-orange-300/80 mt-1">
                                            Delivery pushed back to Thursday due to trucking shortage. Impact on Zone C framing.
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Button variant="ghost" className="mt-4 text-slate-400 hover:text-white w-full border border-dashed border-white/10">
                                <Plus className="w-4 h-4 mr-2" /> Add Delay Impact
                            </Button>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end pt-4">
                        <Button className="bg-emerald-600 hover:bg-emerald-500 w-full md:w-auto">
                            <Save className="w-4 h-4 mr-2" /> Save Daily Report
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Icons for the modal
function ShieldIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
        </svg>
    )
}

function HardHatIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M2 12h20" />
            <path d="M10 12V6a2 2 0 0 1 2-2 2 2 0 0 1 2 2v6" />
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2v4" />
        </svg>
    )
}
