
'use client';

import { AppHeader } from './header';
import { ResumeProvider } from '@/app/contexts/resume-context';

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ResumeProvider>
      <div className="min-h-screen flex flex-col">
        <AppHeader />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </ResumeProvider>
  );
}
