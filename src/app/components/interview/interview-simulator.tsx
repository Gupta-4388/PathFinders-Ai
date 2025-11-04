
'use client';
import { InterviewSimulator } from '@/app/(app)/interview/page';

function InterviewPageContent() {
  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-10rem)]">
      <InterviewSimulator />
    </div>
  );
}

export default function InterviewPage() {
  return (
      <InterviewPageContent />
  );
}
