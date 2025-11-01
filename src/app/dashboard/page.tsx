'use client';
import { AppLayout } from '../components/layout/app-layout';
import { CareerPaths } from '../components/dashboard/career-paths';
import { WelcomeHeader } from '../components/dashboard/welcome-header';

function DashboardPageContent() {
  return (
    <div className="space-y-8">
      <WelcomeHeader />

      <div className="text-center py-8">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
          Personalise your AI app with long-term memory API
        </h2>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Delight your users with blazing fast and scalable memory for your AI application. Interoperable between models and modalities.
        </p>
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
