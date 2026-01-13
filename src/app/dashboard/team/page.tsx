"use client";

import { useState, useEffect } from "react";
import { db, auth } from "@/lib/firebase";
import { collection, query, getDocs, addDoc, deleteDoc, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth"; // Note: This creates auth user, but we're in client side. 
// Admin usually creates users via Admin SDK. Client SDK can only create user by logging in as them. 
// For this stub, we will just add to Firestore 'users' collection and assume a separate invite flow or just mock it.
// Actually, `v-7` app `createUser` likely used `auth.createUserWithEmailAndPassword` which would log the admin out!
// Let's see `app.js`. It's missing `createUser` function implementation (it was likely in `auth.js` which is missing).
// We will just add to Firestore for now as a "Directory" and not perform actual Auth creation to avoid logging out the admin.

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
import { Plus, Search, Trash2, Edit, Loader2, User, Mail, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface UserData {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    active: boolean;
}

export default function TeamPage() {
    const { userData } = useAuth(); // We can use this to check if currentUser is admin
    const [users, setUsers] = useState<UserData[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const [newUser, setNewUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        role: "client"
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const q = query(collection(db, "users"));
            const snapshot = await getDocs(q);
            const usersData: UserData[] = [];
            snapshot.forEach((doc) => usersData.push({ id: doc.id, ...doc.data() } as UserData));
            setUsers(usersData);
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateUser = async () => {
        if (!newUser.email || !newUser.firstName) return;
        try {
            setIsSubmitting(true);
            // In a real app, we'd call a Cloud Function to create Auth user + Firestore doc.
            // Here we just create the Firestore doc to populate the list.
            await addDoc(collection(db, "users"), {
                ...newUser,
                active: true,
                createdAt: serverTimestamp()
            });

            setIsAddModalOpen(false);
            setNewUser({ firstName: "", lastName: "", email: "", role: "client" });
            fetchUsers();
            alert("User added to directory. (Note: Auth account not created in this demo version)");
        } catch (e) {
            console.error(e);
            alert("Failed to add user");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteUser = async (id: string) => {
        if (!confirm("Remove this user from the team?")) return;
        try {
            await deleteDoc(doc(db, "users", id));
            fetchUsers();
        } catch (e) { console.error(e); }
    };

    const filteredUsers = users.filter(u =>
        (u.firstName?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (u.lastName?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (u.email?.toLowerCase() || "").includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Team</h1>
                    <p className="text-muted-foreground">Manage your team members and permissions.</p>
                </div>
                <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            <Plus className="mr-2 h-4 w-4" /> Add Member
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle>Add Team Member</DialogTitle>
                            <DialogDescription>
                                Add a new user to the organization.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="fname">First Name *</Label>
                                    <Input id="fname" value={newUser.firstName} onChange={e => setNewUser({ ...newUser, firstName: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lname">Last Name</Label>
                                    <Input id="lname" value={newUser.lastName} onChange={e => setNewUser({ ...newUser, lastName: e.target.value })} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email *</Label>
                                <Input type="email" id="email" value={newUser.email} onChange={e => setNewUser({ ...newUser, email: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="role">Role</Label>
                                <select
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    id="role"
                                    value={newUser.role}
                                    onChange={e => setNewUser({ ...newUser, role: e.target.value })}
                                >
                                    <option value="admin">Administrator</option>
                                    <option value="manager">Project Manager</option>
                                    <option value="client">Client</option>
                                    <option value="subcontractor">Subcontractor</option>
                                </select>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
                            <Button onClick={handleCreateUser} disabled={isSubmitting}>
                                {isSubmitting ? <Loader2 className="animate-spin h-4 w-4" /> : "Add User"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <CardTitle>Team Directory</CardTitle>
                        <div className="relative w-full max-w-sm">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search users..."
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
                                <TableHead>No.</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow><TableCell colSpan={6} className="text-center py-8"><Loader2 className="animate-spin h-6 w-6 mx-auto text-blue-600" /></TableCell></TableRow>
                            ) : filteredUsers.length === 0 ? (
                                <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No users found.</TableCell></TableRow>
                            ) : (
                                filteredUsers.map((u, i) => (
                                    <TableRow key={u.id}>
                                        <TableCell className="text-muted-foreground text-xs">{i + 1}</TableCell>
                                        <TableCell className="font-medium">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs">
                                                    {u.firstName?.[0]}{u.lastName?.[0]}
                                                </div>
                                                {u.firstName} {u.lastName}
                                            </div>
                                        </TableCell>
                                        <TableCell>{u.email}</TableCell>
                                        <TableCell>
                                            <span className="capitalize bg-gray-100 px-2 py-1 rounded-md text-xs font-medium text-gray-700">
                                                {u.role}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${u.active !== false ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                                }`}>
                                                {u.active !== false ? 'Active' : 'Inactive'}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-red-500" onClick={() => handleDeleteUser(u.id)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
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
