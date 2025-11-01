
'use client';
import { AppLayout } from '../components/layout/app-layout';
import { InterviewSimulator } from '../components/interview/interview-simulator';
import { useResume } from '../contexts/resume-context';
import { ResumeParser } from '../components/dashboard/resume-parser';
import { Card, CardContent } from '@/components/ui/card';

function InterviewPageContent() {
  const { resumeData } = useResume();
  return (
    <div className="max-w-4xl mx-auto">
      {resumeData ? <InterviewSimulator /> : (
          <Card className="bg-card/60 backdrop-blur-sm border-white/20 shadow-lg">
              <CardContent className="p-4 sm:p-6 lg:p-8">
                   <ResumeParser />
              </CardContent>
          </Card>
      )}
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
