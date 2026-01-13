"use client";

import { useState } from "react";
import {
    Users,
    Search,
    Plus,
    Mail,
    Phone,
    MoreVertical,
    Briefcase,
    Building2,
    Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export default function TeamPage() {
    const [isInviteOpen, setIsInviteOpen] = useState(false);

    // Mock Data
    const teamMembers = [
        { id: 1, name: "Dylan Albright", role: "Project Executive", email: "dylan@albrightco.com", phone: "555-0100", avatar: "" },
        { id: 2, name: "Sarah Miller", role: "Project Manager", email: "sarah.m@albrightco.com", phone: "555-0123", avatar: "https://github.com/shadcn.png" },
        { id: 3, name: "Mike Ross", role: "Superintendent", email: "mike.r@albrightco.com", phone: "555-0199", avatar: "" },
        { id: 4, name: "Jessica Lee", role: "Project Engineer", email: "jessica.l@albrightco.com", phone: "555-0145", avatar: "" },
    ];

    const subcontractors = [
        { id: "S1", company: "ABC Concrete", trade: "Concrete", contact: "John Smith", email: "john@abc-concrete.com", phone: "555-1111", status: "Active" },
        { id: "S2", company: "Steel Masters Inc", trade: "Structural Steel", contact: "Robert Iron", email: "rob@steelmasters.com", phone: "555-2222", status: "Active" },
        { id: "S3", company: "Sparky's Electric", trade: "Electrical", contact: "Tom Watt", email: "tom@sparkys.com", phone: "555-3333", status: "Pending" },
        { id: "S4", company: "Flow Plumbing", trade: "Plumbing", contact: "Mario Bros", email: "mario@flow.com", phone: "555-4444", status: "Active" },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white">Project Directory</h1>
                    <p className="text-slate-400 mt-1">Manage internal team members and external subcontractors.</p>
                </div>
                <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/20">
                            <Plus className="w-4 h-4 mr-2" /> Invite Member
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-[#0F172A] border-white/10 text-white sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Invite to Project</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email" className="text-slate-400">Email Address</Label>
                                <Input id="email" placeholder="colleague@company.com" className="bg-white/5 border-white/10 text-white" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="role" className="text-slate-400">Role</Label>
                                <Input id="role" placeholder="e.g. Project Manager" className="bg-white/5 border-white/10 text-white" />
                            </div>
                        </div>
                        <Button onClick={() => setIsInviteOpen(false)} className="w-full bg-blue-600 hover:bg-blue-500">
                            Send Invitation
                        </Button>
                    </DialogContent>
                </Dialog>
            </div>

            <Tabs defaultValue="team" className="w-full">
                <TabsList className="bg-[#0F172A]/60 border border-white/5 backdrop-blur-sm p-1">
                    <TabsTrigger value="team" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg text-slate-400">
                        Internal Team
                    </TabsTrigger>
                    <TabsTrigger value="subs" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg text-slate-400">
                        Subcontractors
                    </TabsTrigger>
                </TabsList>

                {/* Internal Team Tab */}
                <TabsContent value="team" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {teamMembers.map((member) => (
                            <Card key={member.id} className="bg-[#0F172A]/60 border-white/5 hover:bg-white/5 transition-colors group">
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-4">
                                            <Avatar className="h-12 w-12 border-2 border-blue-500/20">
                                                <AvatarImage src={member.avatar} />
                                                <AvatarFallback className="bg-blue-600 text-white font-bold">{member.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors">{member.name}</h3>
                                                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                                                    <Shield size={12} className="text-emerald-400" />
                                                    {member.role}
                                                </div>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="icon" className="text-slate-500 hover:text-white">
                                            <MoreVertical size={16} />
                                        </Button>
                                    </div>
                                    <div className="mt-6 space-y-2">
                                        <div className="flex items-center gap-3 text-sm text-slate-400 bg-white/5 p-2 rounded-lg border border-white/5">
                                            <Mail size={14} className="text-blue-400" />
                                            <span className="truncate">{member.email}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-slate-400 bg-white/5 p-2 rounded-lg border border-white/5">
                                            <Phone size={14} className="text-blue-400" />
                                            {member.phone}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                {/* Subcontractors Tab */}
                <TabsContent value="subs" className="mt-6">
                    <Card className="bg-[#0F172A]/60 border-white/5">
                        <div className="p-4 border-b border-white/5 flex items-center justify-between gap-4">
                            <div className="relative flex-1 max-w-sm">
                                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                                <Input
                                    placeholder="Search company or trade..."
                                    className="pl-9 bg-black/20 border-white/10 text-white placeholder:text-slate-600 focus-visible:ring-blue-500/50"
                                />
                            </div>
                        </div>
                        <Table>
                            <TableHeader className="bg-white/5">
                                <TableRow className="border-white/5 hover:bg-transparent">
                                    <TableHead className="text-slate-400">Company</TableHead>
                                    <TableHead className="text-slate-400">Trade</TableHead>
                                    <TableHead className="text-slate-400">Primary Contact</TableHead>
                                    <TableHead className="text-slate-400">Phone</TableHead>
                                    <TableHead className="text-slate-400">Status</TableHead>
                                    <TableHead className="text-right text-slate-400">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {subcontractors.map((sub) => (
                                    <TableRow key={sub.id} className="border-white/5 hover:bg-white/5 transition-colors group">
                                        <TableCell className="font-medium text-slate-200">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center">
                                                    <Building2 size={16} className="text-slate-400" />
                                                </div>
                                                {sub.company}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-slate-400">
                                            <Badge variant="outline" className="border-white/10 text-slate-300 font-normal">
                                                {sub.trade}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-slate-300">
                                            <div className="flex flex-col">
                                                <span>{sub.contact}</span>
                                                <span className="text-xs text-slate-500">{sub.email}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-slate-400 font-mono text-xs">{sub.phone}</TableCell>
                                        <TableCell>
                                            <Badge className={`
                                                border-0 text-[10px]
                                                ${sub.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-yellow-500/10 text-yellow-500'}
                                              `}>
                                                {sub.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-white">
                                                <Mail size={14} />
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
