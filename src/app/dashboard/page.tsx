import { AppLayout } from "../components/layout/app-layout";
import { WelcomeHeader } from "../components/dashboard/welcome-header";
import { ResumeParser } from "../components/dashboard/resume-parser";
import { CareerPaths } from "../components/dashboard/career-paths";
import { JobTrendsSummary } from "../components/dashboard/job-trends-summary";

export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="space-y-8">
        <WelcomeHeader />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ResumeParser />
          </div>
          <div className="lg:col-span-1">
            <JobTrendsSummary />
          </div>
        </div>
        <CareerPaths />
      </div>
    </AppLayout>
  );
}
