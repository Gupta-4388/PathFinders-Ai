
'use client';

import { SidebarProvider, Sidebar, SidebarInset, SidebarContent, SidebarFooter } from '@/components/ui/sidebar';
import { AppHeader } from './header';
import { SidebarNav } from './sidebar-nav';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import Link from 'next/link';
import { useUser, useAuth, FirebaseClientProvider, initializeFirebase } from '@/firebase';
import { ResumeProvider } from '@/app/contexts/resume-context';


export function AppLayout({ children }: { children: React.ReactNode }) {
  const firebaseApp = initializeFirebase();
  return (
    <FirebaseClientProvider firebaseApp={firebaseApp}>
      <ResumeProvider>
        <AppLayoutContent>{children}</AppLayoutContent>
      </ResumeProvider>
    </FirebaseClientProvider>
  );
}

function AppLayoutContent({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const auth = useAuth();
  const handleSignOut = () => {
    if (auth) {
      auth.signOut();
    }
  };
  
  return (
    <SidebarProvider>
      <div className="min-h-screen">
        <Sidebar collapsible="icon" className="border-r border-border/60">
          <SidebarNav />
          <SidebarFooter>
            <div className="flex items-center gap-3 p-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.photoURL ?? ''} alt={user?.displayName ?? ''} />
                <AvatarFallback>{user?.displayName?.charAt(0) ?? 'U'}</AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden group-data-[collapsible=icon]:hidden">
                <p className="text-sm font-medium truncate">{user?.displayName ?? 'Profile'}</p>
              </div>
              <Button asChild variant="ghost" size="icon" className="h-7 w-7 group-data-[collapsible=icon]:hidden" onClick={handleSignOut}>
                <Link href="/"><LogOut /></Link>
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <AppHeader />
          <main className="p-4 sm:p-6 lg:p-8 bg-transparent flex-1">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
