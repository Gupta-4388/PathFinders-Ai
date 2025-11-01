
'use client';
import { AppLayout } from '../components/layout/app-layout';
import { ChatInterface } from '../components/mentor/chat-interface';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useResume } from '../contexts/resume-context';
import { ResumeParser } from '../components/dashboard/resume-parser';

export default function MentorPage() {
  const { resumeData } = useResume();

  return (
    <AppLayout>
      <div className="h-[calc(100vh-10rem)]">
        <Card className="h-full w-full bg-card/60 backdrop-blur-sm border-white/20 shadow-lg flex flex-col">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">AI Career Mentor</CardTitle>
            <CardDescription>Chat with your AI mentor for personalized guidance.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden p-0 sm:p-0 lg:p-0">
            {resumeData ? <ChatInterface /> : (
              <div className="p-4 sm:p-6 lg:p-8 h-full">
                <div className="lg:col-span-2">
                  <ResumeParser />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
