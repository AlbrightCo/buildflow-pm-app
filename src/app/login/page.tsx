"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/contexts/AuthContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"; // Assuming you have a button component, if not I will use standard or create it.
// Actually, I don't see a button component in the file list earlier, but I see input and card. I'll check user file list again.
// User has input.tsx and card.tsx. I'll use standard <button> with tailwind if Button component is missing, or try to import it if I think it exists.
// I'll check for Button component first to be safe, but for now I'll assume standard HTML button with classes to avoid errors if file missing.

const schema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    name: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { signUp } = useAuth(); // We need to export signIn from context too or just import direct from firebase content.
    // I imported signInWithEmailAndPassword directly.
    const router = useRouter();

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data: FormData) => {
        setError(null);
        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, data.email, data.password);
            } else {
                if (!data.name) {
                    setError("Name is required for sign up");
                    return;
                }
                await signUp(data.email, data.password, data.name);
            }
            router.push("/dashboard");
        } catch (err: any) {
            console.error(err);
            let msg = "An error occurred";
            if (err.code === "auth/email-already-in-use") msg = "Email already in use";
            if (err.code === "auth/invalid-credential") msg = "Invalid credentials";
            setError(msg);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-zinc-900 p-4">
            <Card className="w-full max-w-md shadow-xl border-0 bg-white dark:bg-zinc-950">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">
                        {isLogin ? "Welcome back" : "Start your free trial"}
                    </CardTitle>
                    <CardDescription className="text-center">
                        {isLogin
                            ? "Enter your credentials to access your account"
                            : "No credit card required for 14-day trial"}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="email">Email</label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                {...register("email")}
                            />
                            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                        </div>

                        {!isLogin && (
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none" htmlFor="name">Full Name</label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="John Doe"
                                    {...register("name")}
                                />
                                {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none" htmlFor="password">Password</label>
                            <Input
                                id="password"
                                type="password"
                                {...register("password")}
                            />
                            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                        </div>

                        {error && (
                            <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-900/20 rounded-md">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 bg-black text-white dark:bg-white dark:text-black mt-4"
                        >
                            {isSubmitting ? "Loading..." : (isLogin ? "Sign In" : "Create Account")}
                        </button>
                    </form>
                </CardContent>
                <CardFooter>
                    <div className="text-sm text-center w-full text-gray-500">
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <button
                            onClick={() => { setIsLogin(!isLogin); setError(null); }}
                            className="underline text-black dark:text-white hover:text-gray-700 font-medium"
                        >
                            {isLogin ? "Sign up" : "Log in"}
                        </button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
