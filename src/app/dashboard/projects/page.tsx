"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { db, auth } from "@/lib/firebase";
import { collection, query, getDocs, addDoc, deleteDoc, doc, serverTimestamp, where, orderBy } from "firebase/firestore";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Search, Trash2, Edit, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Project {
    id: string;
    name: string;
    client: string;
    contractValue: number;
    pmFee: number;
    startDate: string;
    endDate: string;
    description: string;
    completion: number;
    status: string;
}

export default function ProjectsPage() {
    const { userData } = useAuth();
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    // New Project Form State
    const [newProject, setNewProject] = useState({
        name: "",
        client: "",
        contractValue: "",
        pmFee: "8",
        startDate: "",
        endDate: "",
        description: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetchProjects();
    }, [userData]);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const projectsRef = collection(db, "projects");
            // Basic query for now, can refine permissions later
            const q = query(projectsRef, orderBy("createdAt", "desc"));
            const snapshot = await getDocs(q);

            const projectsData: Project[] = [];
            snapshot.forEach((doc) => {
                projectsData.push({ id: doc.id, ...doc.data() } as Project);
            });

            setProjects(projectsData);
        } catch (error) {
            console.error("Error fetching projects:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateProject = async () => {
        if (!newProject.name || !newProject.client) return;

        try {
            setIsSubmitting(true);

            await addDoc(collection(db, "projects"), {
                name: newProject.name,
                client: newProject.client,
                contractValue: parseFloat(newProject.contractValue) || 0,
                pmFee: parseFloat(newProject.pmFee) || 0,
                startDate: newProject.startDate,
                endDate: newProject.endDate,
                description: newProject.description,
                completion: 0,
                spent: 0,
                status: 'active',
                createdAt: serverTimestamp(),
                createdBy: auth.currentUser?.uid,
            });

            setIsAddModalOpen(false);
            setNewProject({
                name: "",
                client: "",
                contractValue: "",
                pmFee: "8",
                startDate: "",
                endDate: "",
                description: ""
            });
            fetchProjects();
        } catch (error) {
            console.error("Error creating project:", error);
            alert("Failed to create project");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteProject = async (id: string) => {
        if (!confirm("Are you sure you want to delete this project?")) return;
        try {
            await deleteDoc(doc(db, "projects", id));
            fetchProjects();
        } catch (error) {
            console.error("Error deleting project:", error);
        }
    };

    const filteredProjects = projects.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.client.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Projects</h1>
                    <p className="text-muted-foreground">Manage your construction projects.</p>
                </div>
                <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            <Plus className="mr-2 h-4 w-4" /> New Project
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                            <DialogTitle>Create New Project</DialogTitle>
                            <DialogDescription>
                                Add the details of the new project below.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Project Name *</Label>
                                    <Input
                                        id="name"
                                        value={newProject.name}
                                        onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="client">Client *</Label>
                                    <Input
                                        id="client"
                                        value={newProject.client}
                                        onChange={(e) => setNewProject({ ...newProject, client: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="value">Contract Value ($)</Label>
                                    <Input
                                        id="value"
                                        type="number"
                                        value={newProject.contractValue}
                                        onChange={(e) => setNewProject({ ...newProject, contractValue: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="fee">PM Fee (%)</Label>
                                    <Input
                                        id="fee"
                                        type="number"
                                        value={newProject.pmFee}
                                        onChange={(e) => setNewProject({ ...newProject, pmFee: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="start">Start Date</Label>
                                    <Input
                                        id="start"
                                        type="date"
                                        value={newProject.startDate}
                                        onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="end">End Date</Label>
                                    <Input
                                        id="end"
                                        type="date"
                                        value={newProject.endDate}
                                        onChange={(e) => setNewProject({ ...newProject, endDate: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Input
                                    id="description"
                                    value={newProject.description}
                                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
                            <Button onClick={handleCreateProject} disabled={isSubmitting}>
                                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Create Project"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <CardTitle>All Projects</CardTitle>
                        <div className="relative w-full max-w-sm">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search projects..."
                                className="pl-8"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Project Name</TableHead>
                                <TableHead>Client</TableHead>
                                <TableHead>Value</TableHead>
                                <TableHead>Progress</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-10">
                                        <Loader2 className="h-6 w-6 animate-spin mx-auto text-blue-600" />
                                    </TableCell>
                                </TableRow>
                            ) : filteredProjects.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                                        No projects found. Create one to get started.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredProjects.map((project) => (
                                    <TableRow key={project.id}>
                                        <TableCell className="font-medium">
                                            <Link href={`/dashboard/projects/${project.id}`} className="hover:underline text-blue-400 hover:text-blue-300">
                                                {project.name}
                                            </Link>
                                        </TableCell>
                                        <TableCell>{project.client}</TableCell>
                                        <TableCell>${project.contractValue?.toLocaleString()}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <div className="h-2 w-16 bg-gray-100 rounded-full overflow-hidden">
                                                    <div className="h-full bg-blue-600" style={{ width: `${project.completion}%` }} />
                                                </div>
                                                <span className="text-xs text-muted-foreground">{project.completion}%</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${project.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                                                }`}>
                                                {project.status || 'Active'}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link href={`/dashboard/projects/${project.id}`}>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-blue-600">
                                                        <Search className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-blue-600">
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-gray-500 hover:text-red-600"
                                                    onClick={() => handleDeleteProject(project.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
