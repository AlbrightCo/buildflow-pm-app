"use client";

import { useState } from "react";
import {
    Calendar as CalendarIcon,
    List,
    Plus,
    MoreVertical,
    Clock,
    CheckCircle2,
    AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    DndContext,
    DragOverlay,
    closestCorners,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragStartEvent,
    DragEndEvent,
    DragOverEvent
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { format, addDays, startOfWeek } from "date-fns";

// Mock Data
const initialTasks = [
    { id: "t1", title: "Site Clearing", status: "done", assignee: "Sarah M.", date: "2024-03-01", duration: 5 },
    { id: "t2", title: "Foundation Pour", status: "in-progress", assignee: "Mike R.", date: "2024-03-08", duration: 3 },
    { id: "t3", title: "Structural Steel", status: "todo", assignee: "Unassigned", date: "2024-03-15", duration: 10 },
    { id: "t4", title: "Electrical Rough-in", status: "todo", assignee: "Dave K.", date: "2024-03-25", duration: 7 },
    { id: "t5", title: "Plumbing Rough-in", status: "review", assignee: "Steve L.", date: "2024-03-28", duration: 6 },
    { id: "t6", title: "Insulation", status: "todo", assignee: "Unassigned", date: "2024-04-05", duration: 4 },
];

const columns = [
    { id: "todo", title: "To Do", color: "bg-slate-500" },
    { id: "in-progress", title: "In Progress", color: "bg-blue-500" },
    { id: "review", title: "Review", color: "bg-orange-500" },
    { id: "done", title: "Done", color: "bg-emerald-500" },
];

// Sortable Task Item Component
function SortableTask({ task }: { task: any }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: task.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="p-3 bg-[#0F172A]/80 border border-white/5 rounded-lg mb-2 hover:border-blue-500/50 cursor-grab active:cursor-grabbing group shadow-sm"
        >
            <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-medium text-white">{task.title}</span>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-slate-500 opacity-0 group-hover:opacity-100">
                    <MoreVertical size={14} />
                </Button>
            </div>
            <div className="flex justify-between items-center text-xs text-slate-400">
                <div className="flex items-center gap-1">
                    <div className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center text-[10px] text-white font-bold">
                        {task.assignee.charAt(0)}
                    </div>
                    <span>{task.assignee}</span>
                </div>
                <div className="flex items-center gap-1">
                    <Clock size={12} />
                    <span>{task.duration}d</span>
                </div>
            </div>
        </div>
    );
}


export default function SchedulePage() {
    const [viewMode, setViewMode] = useState<"kanban" | "gantt">("kanban");
    const [tasks, setTasks] = useState(initialTasks);
    const [activeId, setActiveId] = useState<string | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    // Dnd Handlers
    function handleDragStart(event: DragStartEvent) {
        setActiveId(event.active.id as string);
    }

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        setActiveId(null);

        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        // Note: For a real Kanban, we'd enable reordering within columns and moving between columns.
        // This is a simplified "move to column" logic for the MVP.
        const activeTask = tasks.find(t => t.id === activeId);
        if (activeTask && columns.some(c => c.id === overId)) {
            setTasks(tasks.map(t =>
                t.id === activeId ? { ...t, status: overId as string } : t
            ));
        }
    }

    function handleDragOver(event: DragOverEvent) {
        const { active, over } = event;
        if (!over) return;

        // Find the container (column)
        const activeItem = tasks.find(t => t.id === active.id);
        const overItem = tasks.find(t => t.id === over.id);

        if (!activeItem) return;

        // If over a column directly
        if (columns.some(c => c.id === over.id)) {
            if (activeItem.status !== over.id) {
                setTasks(tasks.map(t =>
                    t.id === active.id ? { ...t, status: over.id as string } : t
                ));
            }
        }
    }


    return (
        <div className="space-y-6 h-[calc(100vh-140px)] flex flex-col">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white">Project Schedule</h1>
                    <p className="text-slate-400 mt-1">Manage timeline and tasks.</p>
                </div>
                <div className="flex items-center gap-2 bg-[#0F172A]/60 p-1 rounded-lg border border-white/5 backdrop-blur-sm">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setViewMode("kanban")}
                        className={viewMode === "kanban" ? "bg-blue-600 text-white hover:bg-blue-500" : "text-slate-400 hover:text-white"}
                    >
                        <List className="w-4 h-4 mr-2" /> Board
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setViewMode("gantt")}
                        className={viewMode === "gantt" ? "bg-blue-600 text-white hover:bg-blue-500" : "text-slate-400 hover:text-white"}
                    >
                        <CalendarIcon className="w-4 h-4 mr-2" /> Gantt
                    </Button>
                </div>
            </div>

            <div className="flex-1 min-h-0 bg-[#0F172A]/40 border border-white/5 rounded-xl backdrop-blur-sm overflow-hidden p-4 relative">

                {viewMode === "kanban" ? (
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCorners}
                        onDragStart={handleDragStart}
                        onDragOver={handleDragOver}
                        onDragEnd={handleDragEnd}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-full">
                            {columns.map(col => (
                                <div key={col.id} className="flex flex-col h-full bg-[#0F172A]/40 rounded-lg border border-white/5">
                                    <div className="p-3 border-b border-white/5 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-3 h-3 rounded-full ${col.color}`}></div>
                                            <h3 className="font-semibold text-sm text-slate-200">{col.title}</h3>
                                        </div>
                                        <span className="text-xs text-slate-500 font-mono bg-black/20 px-2 py-0.5 rounded">
                                            {tasks.filter(t => t.status === col.id).length}
                                        </span>
                                    </div>
                                    <SortableContext
                                        id={col.id}
                                        items={tasks.filter(t => t.status === col.id).map(t => t.id)}
                                        strategy={verticalListSortingStrategy}
                                    >
                                        <div className="flex-1 p-2 overflow-y-auto">
                                            {tasks.filter(t => t.status === col.id).map(task => (
                                                <SortableTask key={task.id} task={task} />
                                            ))}
                                            <Button variant="ghost" className="w-full mt-2 border border-dashed border-slate-700 text-slate-500 hover:text-white hover:bg-white/5 text-xs h-8">
                                                <Plus className="w-3 h-3 mr-1" /> Add Task
                                            </Button>
                                        </div>
                                    </SortableContext>
                                </div>
                            ))}
                        </div>
                        <DragOverlay>
                            {activeId ? (
                                <div className="p-3 bg-blue-600 border border-white/10 rounded-lg shadow-2xl opacity-90 rotate-3 cursor-grabbing">
                                    <span className="text-sm font-bold text-white">
                                        {tasks.find(t => t.id === activeId)?.title}
                                    </span>
                                </div>
                            ) : null}
                        </DragOverlay>
                    </DndContext>
                ) : (
                    // Simple Gantt View Placeholder (High Fidelity CSS Grid)
                    <div className="h-full flex flex-col overflow-hidden">
                        <div className="flex border-b border-white/10 bg-black/20">
                            <div className="w-64 p-4 border-r border-white/10 text-xs font-bold text-slate-400">Task Name</div>
                            <div className="flex-1 overflow-x-auto flex">
                                {Array.from({ length: 14 }).map((_, i) => (
                                    <div key={i} className="min-w-[100px] border-r border-white/5 p-2 text-center text-xs text-slate-500">
                                        {format(addDays(new Date('2024-03-01'), i * 3), 'MMM d')}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto">
                            {tasks.map((task) => (
                                <div key={task.id} className="flex border-b border-white/5 hover:bg-white/5 group">
                                    <div className="w-64 p-3 border-r border-white/10 text-sm text-slate-300 font-medium truncate shrink-0 pl-4 flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${task.status === 'done' ? 'bg-emerald-500' :
                                            task.status === 'in-progress' ? 'bg-blue-500' :
                                                task.status === 'review' ? 'bg-orange-500' : 'bg-slate-500'
                                            }`}></div>
                                        {task.title}
                                    </div>
                                    <div className="flex-1 relative min-h-[44px]">
                                        {/* Grid lines */}
                                        <div className="absolute inset-0 flex pointer-events-none">
                                            {Array.from({ length: 14 }).map((_, i) => (
                                                <div key={i} className="min-w-[100px] border-r border-white/5 h-full"></div>
                                            ))}
                                        </div>
                                        {/* Bar */}
                                        <div
                                            className="absolute top-2 h-7 rounded-sm shadow-sm flex items-center px-2 text-xs text-white font-medium truncate"
                                            style={{
                                                left: `${(new Date(task.date).getDate() % 14) * 35}px`, // Mock positioning logic 
                                                width: `${task.duration * 30}px`,
                                                backgroundColor: task.status === 'done' ? '#10b981' :
                                                    task.status === 'in-progress' ? '#3b82f6' :
                                                        task.status === 'review' ? '#f97316' : '#64748b'
                                            }}
                                        >
                                            {task.duration}d
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
