import { AppLayout } from "../components/layout/app-layout";
import { ResumeParser } from "../components/dashboard/resume-parser";
import { JobTrendsSummary } from "../components/dashboard/job-trends-summary";
import { WelcomeHeader } from "../components/dashboard/welcome-header";

export default function ResumeAnalyzerPage() {
  return (
    <AppLayout>
      <div className="space-y-8">
        <WelcomeHeader />
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ResumeParser />
          </div>
          <JobTrendsSummary />
        </div>
      </div>
    </AppLayout>
  );
}
