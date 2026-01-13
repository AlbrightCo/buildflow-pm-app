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
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

const schema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    name: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { signUp } = useAuth();
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
        <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center p-4 relative overflow-hidden">
             
            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[20%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[128px]" />
                <div className="absolute bottom-[-20%] right-[10%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[128px]" />
            </div>

            <div className="absolute top-6 left-6 z-20">
                <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
                    <ArrowLeft size={18} /> Back to Home
                </Link>
            </div>

            <div className="w-full max-w-md relative z-10">
                <div className="text-center mb-8">
                    <div className="relative w-12 h-12 mx-auto mb-4">
                        <Image src="/logo.png" alt="BuildFlow" fill className="object-contain" />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-white">
                        {isLogin ? "Welcome back" : "Create your account"}
                    </h1>
                    <p className="text-slate-400 mt-2">
                        {isLogin ? "Enter your credentials to access your account" : "Start your 14-day free trial today"}
                    </p>
                </div>

                <Card className="border-white/10 bg-[#0F172A]/60 backdrop-blur-xl shadow-2xl">
                    <CardContent className="pt-6">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none text-slate-300" htmlFor="email">Email</label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@company.com"
                                    className="bg-black/20 border-white/10 text-white placeholder:text-slate-600 focus:ring-blue-500 focus:border-blue-500"
                                    {...register("email")}
                                />
                                {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
                            </div>

                            {!isLogin && (
                                <div className="space-y-2">
                                    <label className="text-sm font-medium leading-none text-slate-300" htmlFor="name">Full Name</label>
                                    <Input
                                        id="name"
                                        type="text"
                                        placeholder="John Doe"
                                        className="bg-black/20 border-white/10 text-white placeholder:text-slate-600 focus:ring-blue-500 focus:border-blue-500"
                                        {...register("name")}
                                    />
                                    {errors.name && <p className="text-xs text-red-400">{errors.name.message}</p>}
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none text-slate-300" htmlFor="password">Password</label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    className="bg-black/20 border-white/10 text-white placeholder:text-slate-600 focus:ring-blue-500 focus:border-blue-500"
                                    {...register("password")}
                                />
                                {errors.password && <p className="text-xs text-red-400">{errors.password.message}</p>}
                            </div>

                            {error && (
                                <div className="p-3 text-sm text-red-300 bg-red-500/10 border border-red-500/20 rounded-md">
                                    {error}
                                </div>
                            )}

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-6 shadow-lg shadow-blue-500/20"
                            >
                                {isSubmitting ? "Loading..." : (isLogin ? "Sign In" : "Create Account")}
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-center border-t border-white/5 pt-6">
                        <div className="text-sm text-center w-full text-slate-400">
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                            <button
                                onClick={() => { setIsLogin(!isLogin); setError(null); }}
                                className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                            >
                                {isLogin ? "Sign up" : "Log in"}
                            </button>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
