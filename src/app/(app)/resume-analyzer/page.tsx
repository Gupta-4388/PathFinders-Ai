
import { ResumeParser } from "../../components/dashboard/resume-parser";
import { JobTrendsSummary } from "../../components/dashboard/job-trends-summary";

export default function ResumeAnalyzerPage() {
  return (
      <div className="space-y-8">
        <div>
          <h1 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">
            Resume Analyzer
          </h1>
          <p className="mt-2 text-muted-foreground">
            Upload your resume to get a detailed analysis of your skills and experience.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ResumeParser />
          </div>
          <JobTrendsSummary />
        </div>
      </div>
  );
}
