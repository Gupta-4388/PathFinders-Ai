
'use client';

import { SidebarProvider, Sidebar, SidebarInset, SidebarContent, SidebarFooter } from '@/components/ui/sidebar';
import { AppHeader } from './header';
import { SidebarNav } from './sidebar-nav';
import { ResumeProvider } from '@/app/contexts/resume-context';

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ResumeProvider>
        <SidebarProvider>
          <div className="min-h-screen">
            <Sidebar collapsible="icon" className="border-r border-border/60">
              <SidebarNav />
              <SidebarFooter>
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
