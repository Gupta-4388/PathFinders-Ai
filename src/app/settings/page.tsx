'use client';
import { AppLayout } from '../components/layout/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useProfile } from '../contexts/profile-context';
import { ChangePasswordForm } from '../components/auth/change-password-form';

function SettingsPageContent() {
    const { name, setName, goals, setGoals } = useProfile();
    const { toast } = useToast();

    const handleSave = async () => {
        toast({
            title: "Settings Saved",
            description: "Your preferences have been updated.",
        });
    };

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div>
                <h1 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">
                    Settings
                </h1>
                <p className="mt-2 text-muted-foreground">
                    Manage your profile and preferences.
                </p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Profile</CardTitle>
                    <CardDescription>This information is stored locally and can be cleared at any time.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="goals">Career Goals</Label>
                        <Input id="goals" placeholder="e.g., Become a Senior AI Engineer" value={goals} onChange={(e) => setGoals(e.target.value)} />
                    </div>
                    <Button onClick={handleSave}>Save Changes</Button>
                </CardContent>
            </Card>
            <ChangePasswordForm />
        </div>
    );
}

export default function SettingsPage() {
    return (
        <AppLayout>
            <SettingsPageContent />
        </AppLayout>
    );
}
