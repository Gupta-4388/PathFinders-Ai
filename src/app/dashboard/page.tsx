
'use client';
import { AppLayout } from '../components/layout/app-layout';
import { CareerPaths } from '../components/dashboard/career-paths';
import { WelcomeHeader } from '../components/dashboard/welcome-header';

function DashboardPageContent() {
  return (
    <div className="space-y-8">
      <WelcomeHeader />

      <div>
        <h2 className="font-headline text-2xl md:text-3xl font-bold tracking-tight">
          Top Career Paths For You
        </h2>
        <p className="mt-2 text-muted-foreground">
          Based on Current Trends, here are some recommended career paths.
        </p>
      </div>
      <CareerPaths />
    </div>
  );
}

export default function DashboardPage() {
  return (
    <AppLayout>
      <DashboardPageContent />
    </AppLayout>
  );
}
