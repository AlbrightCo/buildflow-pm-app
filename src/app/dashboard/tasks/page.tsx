"use client";

import { useState, useEffect } from "react";
import { db, auth } from "@/lib/firebase";
import { collection, query, getDocs, addDoc, deleteDoc, doc, serverTimestamp, orderBy, updateDoc } from "firebase/firestore";
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
import { Plus, Search, Trash2, Edit, Loader2, Calendar, CheckCircle2, Clock, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

interface Project {
    id: string;
    name: string;
}

interface Task {
    id: string;
    name: string;
    type: string;
    startDate: string;
    endDate: string;
    priority: string;
    status: string;
    phase: string;
}

export default function TasksPage() {
    const { userData } = useAuth();
    const [projects, setProjects] = useState<Project[]>([]);
    const [selectedProjectId, setSelectedProjectId] = useState<string>("");
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newTask, setNewTask] = useState({
        name: "",
        type: "task",
        startDate: "",
        endDate: "",
        priority: "medium",
        phase: "",
        notes: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fetch Projects for Selector
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
                const snapshot = await getDocs(q);
                const projectsData: Project[] = [];
                snapshot.forEach((doc) => ({ id: doc.id, name: doc.data().name })); // Fix: missing push
                snapshot.forEach((doc) => projectsData.push({ id: doc.id, name: doc.data().name }));
                setProjects(projectsData);

                if (projectsData.length > 0) {
                    setSelectedProjectId(projectsData[0].id);
                }
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };
        fetchProjects();
    }, []);

    // Fetch Tasks when Project Changes
    useEffect(() => {
        if (!selectedProjectId) return;

        const fetchTasks = async () => {
            try {
                setLoading(true);
                const tasksRef = collection(db, "projects", selectedProjectId, "tasks");
                const q = query(tasksRef, orderBy("startDate", "asc"));
                const snapshot = await getDocs(q);

                const tasksData: Task[] = [];
                snapshot.forEach((doc) => {
                    tasksData.push({ id: doc.id, ...doc.data() } as Task);
                });

                setTasks(tasksData);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTasks();
    }, [selectedProjectId]);

    const handleCreateTask = async () => {
        if (!newTask.name || !selectedProjectId) return;

        try {
            setIsSubmitting(true);
            const tasksRef = collection(db, "projects", selectedProjectId, "tasks");
            await addDoc(tasksRef, {
                ...newTask,
                status: 'pending',
                createdAt: serverTimestamp(),
                createdBy: auth.currentUser?.uid
            });

            setIsAddModalOpen(false);
            setNewTask({
                name: "",
                type: "task",
                startDate: "",
                endDate: "",
                priority: "medium",
                phase: "",
                notes: ""
            });

            // Refresh tasks
            const q = query(tasksRef, orderBy("startDate", "asc"));
            const snapshot = await getDocs(q);
            const tasksData: Task[] = [];
            snapshot.forEach((doc) => tasksData.push({ id: doc.id, ...doc.data() } as Task));
            setTasks(tasksData);

        } catch (error) {
            console.error("Error creating task:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteTask = async (taskId: string) => {
        if (!confirm("Delete this task?")) return;
        try {
            await deleteDoc(doc(db, "projects", selectedProjectId, "tasks", taskId));
            setTasks(tasks.filter(t => t.id !== taskId));
        } catch (e) { console.error(e); }
    };

    const handleStatusChange = async (taskId: string, newStatus: string) => {
        try {
            await updateDoc(doc(db, "projects", selectedProjectId, "tasks", taskId), { status: newStatus });
            setTasks(tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
        } catch (e) { console.error(e); }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Tasks</h1>
                    <p className="text-muted-foreground">Manage project schedule and assignments.</p>
                </div>

                <div className="flex items-center gap-4">
                    <select
                        className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-[200px]"
                        value={selectedProjectId}
                        onChange={(e) => setSelectedProjectId(e.target.value)}
                    >
                        {projects.map(p => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                        {projects.length === 0 && <option value="">No Projects Found</option>}
                    </select>

                    <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-blue-600 hover:bg-blue-700" disabled={!selectedProjectId}>
                                <Plus className="mr-2 h-4 w-4" /> Add Task
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                                <DialogTitle>Add New Task</DialogTitle>
                                <DialogDescription>
                                    Add a task to <strong>{projects.find(p => p.id === selectedProjectId)?.name}</strong>
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="space-y-2">
                                    <Label htmlFor="tName">Task Name *</Label>
                                    <Input id="tName" value={newTask.name} onChange={e => setNewTask({ ...newTask, name: e.target.value })} />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="tType">Type</Label>
                                        <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            id="tType" value={newTask.type} onChange={e => setNewTask({ ...newTask, type: e.target.value })}>
                                            <option value="task">Task</option>
                                            <option value="milestone">Milestone</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="tPriority">Priority</Label>
                                        <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            id="tPriority" value={newTask.priority} onChange={e => setNewTask({ ...newTask, priority: e.target.value })}>
                                            <option value="low">Low</option>
                                            <option value="medium">Medium</option>
                                            <option value="high">High</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="tStart">Start Date</Label>
                                        <Input type="date" id="tStart" value={newTask.startDate} onChange={e => setNewTask({ ...newTask, startDate: e.target.value })} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="tEnd">End Date</Label>
                                        <Input type="date" id="tEnd" value={newTask.endDate} onChange={e => setNewTask({ ...newTask, endDate: e.target.value })} />
                                    </div>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
                                <Button onClick={handleCreateTask} disabled={isSubmitting}>
                                    {isSubmitting ? <Loader2 className="animate-spin h-4 w-4" /> : "Save Task"}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                    {projects.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground">
                            <AlertTriangle className="h-10 w-10 mx-auto mb-4 opacity-20" />
                            <p>No projects found. Please create a project first.</p>
                        </div>
                    ) : !selectedProjectId ? (
                        <div className="text-center py-12 text-muted-foreground">
                            <p>Select a project to view tasks.</p>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Task Name</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Start</TableHead>
                                    <TableHead>End</TableHead>
                                    <TableHead>Priority</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow><TableCell colSpan={7} className="text-center py-8"><Loader2 className="animate-spin h-6 w-6 mx-auto text-blue-600" /></TableCell></TableRow>
                                ) : tasks.length === 0 ? (
                                    <TableRow><TableCell colSpan={7} className="text-center py-8 text-muted-foreground">No tasks scheduled.</TableCell></TableRow>
                                ) : (
                                    tasks.map(task => (
                                        <TableRow key={task.id}>
                                            <TableCell className="font-medium">
                                                <div className="flex items-center gap-2">
                                                    {task.type === 'milestone' && <div className="w-2 h-2 rounded-full bg-purple-500" title="Milestone"></div>}
                                                    {task.name}
                                                </div>
                                            </TableCell>
                                            <TableCell className="capitalize text-muted-foreground">{task.type}</TableCell>
                                            <TableCell>{task.startDate ? format(new Date(task.startDate), 'MMM d, yyyy') : '-'}</TableCell>
                                            <TableCell>{task.endDate ? format(new Date(task.endDate), 'MMM d, yyyy') : '-'}</TableCell>
                                            <TableCell>
                                                <span className={`px-2 py-0.5 rounded text-xs font-medium uppercase ${task.priority === 'high' ? 'bg-red-100 text-red-700' :
                                                        task.priority === 'low' ? 'bg-blue-100 text-blue-700' :
                                                            'bg-gray-100 text-gray-700'
                                                    }`}>
                                                    {task.priority}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <select
                                                    className="h-8 text-xs rounded border border-gray-200 bg-transparent"
                                                    value={task.status}
                                                    onChange={(e) => handleStatusChange(task.id, e.target.value)}
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="in_progress">In Progress</option>
                                                    <option value="completed">Completed</option>
                                                    <option value="delayed">Delayed</option>
                                                </select>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-red-500" onClick={() => handleDeleteTask(task.id)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
