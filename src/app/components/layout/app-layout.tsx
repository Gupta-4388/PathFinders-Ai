import { SidebarProvider, Sidebar, SidebarInset, SidebarContent, SidebarFooter } from '@/components/ui/sidebar';
import { AppHeader } from './header';
import { SidebarNav } from './sidebar-nav';
import { ResumeProvider } from '@/app/contexts/resume-context';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import Link from 'next/link';

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ResumeProvider>
      <SidebarProvider>
        <div className="min-h-screen">
          <Sidebar collapsible="icon" className="border-r border-border/60">
            <SidebarNav />
            <SidebarFooter>
              <div className="flex items-center gap-3 p-2">
                 <Avatar className="h-8 w-8">
                  <AvatarImage src="https://picsum.photos/seed/user-avatar/100/100" alt="User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="flex-1 overflow-hidden group-data-[collapsible=icon]:hidden">
                  <p className="text-sm font-medium truncate">Profile</p>
                </div>
                 <Button asChild variant="ghost" size="icon" className="h-7 w-7 group-data-[collapsible=icon]:hidden">
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
    </ResumeProvider>
  );
}
