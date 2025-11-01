'use client';
import { AppLayout } from '../components/layout/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUser, useFirestore, useDoc } from '@/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

interface UserProfile {
    name: string;
    goals: string;
}

export default function SettingsPage() {
    const { user } = useUser();
    const firestore = useFirestore();
    const [name, setName] = useState('');
    const [goals, setGoals] = useState('');

    const userProfileRef = user && firestore ? doc(firestore, 'users', user.uid) : null;
    const { data: userProfile } = useDoc<UserProfile>(userProfileRef);

    useEffect(() => {
        if (userProfile) {
            setName(userProfile.name || user?.displayName || '');
            setGoals(userProfile.goals || '');
        } else if (user) {
            setName(user.displayName || '');
        }
    }, [userProfile, user]);

    const handleSave = async () => {
        if (userProfileRef) {
            await setDoc(userProfileRef, { name, goals }, { merge: true });
        }
    };

    return (
        <AppLayout>
            <div className="space-y-8 max-w-4xl mx-auto">
                <div>
                    <h1 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">
                        Settings
                    </h1>
                    <p className="mt-2 text-muted-foreground">
                        Manage your account and profile settings.
                    </p>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Profile</CardTitle>
                        <CardDescription>Update your personal information.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" value={user?.email ?? ''} disabled />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="goals">Career Goals</Label>
                            <Input id="goals" placeholder="e.g., Become a Senior AI Engineer" value={goals} onChange={(e) => setGoals(e.target.value)} />
                        </div>
                        <Button onClick={handleSave}>Save Changes</Button>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}