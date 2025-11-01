'use client';
import { AppLayout } from '../components/layout/app-layout';
import { CareerPaths } from '../components/dashboard/career-paths';
import { useResume } from '../contexts/resume-context';
import { ResumeParser } from '../components/dashboard/resume-parser';
import { JobTrendsSummary } from '../components/dashboard/job-trends-summary';
import { WelcomeHeader } from '../components/dashboard/welcome-header';

function DashboardPageContent() {
  const { resumeData } = useResume();
  return (
    <div className="space-y-8">
      <WelcomeHeader />
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ResumeParser />
        </div>
        <JobTrendsSummary />
      </div>
      <div>
        <h2 className="font-headline text-2xl md:text-3xl font-bold tracking-tight">
          Top Career Paths For You
        </h2>
        <p className="mt-2 text-muted-foreground">
          Based on your profile, here are some recommended career paths.
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
