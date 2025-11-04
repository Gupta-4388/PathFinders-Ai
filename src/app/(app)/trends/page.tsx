
import { SkillDemandChart } from "../../components/trends/skill-demand-chart";
import { SalaryTrendsChart } from "../../components/trends/salary-trends-chart";
import { JobOpeningsChart } from "../../components/trends/job-openings-chart";

export default function TrendsPage() {
  return (
      <div className="space-y-8">
        <div>
          <h1 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">
            Job Market Trends
          </h1>
          <p className="mt-2 text-muted-foreground">
            Explore the latest data on skills, salaries, and job openings.
          </p>
        </div>
        <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
          <SkillDemandChart />
          <SalaryTrendsChart />
          <div className="lg:col-span-2">
            <JobOpeningsChart />
          </div>
        </div>
      </div>
  );
}
