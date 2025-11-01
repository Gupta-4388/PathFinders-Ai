
'use client';
import { AppLayout } from '../components/layout/app-layout';
import { InterviewSimulator } from '../components/interview/interview-simulator';

function InterviewPageContent() {
  return (
    <div className="max-w-4xl mx-auto">
      <InterviewSimulator />
    </div>
  );
}

export default function InterviewPage() {
  return (
    <AppLayout>
      <InterviewPageContent />
    </AppLayout>
  );
}
