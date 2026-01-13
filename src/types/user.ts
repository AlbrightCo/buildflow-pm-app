export interface UserProfile {
    uid: string;
    email: string | null;
    displayName: string | null;
    role: 'admin' | 'manager' | 'client';
    trialExpiresAt: Date; // Firestore Timestamp converted to Date
    subscriptionStatus: 'trial' | 'active' | 'expired';
    createdAt: Date;
}
