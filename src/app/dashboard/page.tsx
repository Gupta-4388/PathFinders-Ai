import { AppLayout } from "../components/layout/app-layout";
import { CareerPaths } from "../components/dashboard/career-paths";

export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="space-y-8">
         <div>
          <h1 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">
            Top Career Paths For You
          </h1>
          <p className="mt-2 text-muted-foreground">
            Based on your profile, here are the top recommended career paths.
          </p>
        </div>
        <CareerPaths />
      </div>
    </AppLayout>
  );
}
