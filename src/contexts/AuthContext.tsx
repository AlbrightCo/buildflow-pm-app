"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
    onAuthStateChanged,
    User,
    createUserWithEmailAndPassword,
    updateProfile
} from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { UserProfile } from "@/types/user";
import { addDays } from "date-fns";

interface AuthContextType {
    user: User | null;
    userData: UserProfile | null;
    loading: boolean;
    signUp: (email: string, pass: string, name: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    userData: null,
    loading: true,
    signUp: async () => { }
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [userData, setUserData] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    const signUp = async (email: string, pass: string, name: string) => {
        try {
            // 1. Create Auth User
            const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
            const user = userCredential.user;

            // 2. Update Display Name
            await updateProfile(user, { displayName: name });

            // 3. Create Firestore Profile with 14-day trial
            const trialExpiresAt = addDays(new Date(), 14);

            const nameParts = name.split(' ');
            const firstName = nameParts[0];
            const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

            const newProfile: UserProfile = {
                uid: user.uid,
                email: user.email,
                displayName: name,
                firstName: firstName,
                lastName: lastName,
                role: 'client', // Default role
                trialExpiresAt: trialExpiresAt,
                subscriptionStatus: 'trial',
                createdAt: new Date()
            };

            // We store Dates as Timestamps in Firestore
            await setDoc(doc(db, "users", user.uid), {
                ...newProfile,
                trialExpiresAt: Timestamp.fromDate(trialExpiresAt),
                createdAt: Timestamp.fromDate(new Date())
            });

            setUserData(newProfile);
        } catch (error) {
            console.error("Signup error:", error);
            throw error;
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
            setUser(authUser);
            if (authUser) {
                // Fetch user profile
                try {
                    const docRef = doc(db, "users", authUser.uid);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        setUserData({
                            uid: authUser.uid,
                            email: authUser.email,
                            displayName: data.displayName,
                            firstName: data.firstName || data.displayName?.split(' ')[0], // Fallback for existing users
                            lastName: data.lastName,
                            role: data.role,
                            trialExpiresAt: data.trialExpiresAt?.toDate() || new Date(),
                            subscriptionStatus: data.subscriptionStatus,
                            createdAt: data.createdAt?.toDate() || new Date(),
                        } as UserProfile);
                    } else {
                        setUserData(null);
                    }

                } catch (error) {
                    console.error("Error fetching user data:", error);
                    setUserData(null);
                }
            } else {
                setUserData(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, userData, loading, signUp }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
