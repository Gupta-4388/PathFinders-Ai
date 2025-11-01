import { AppLayout } from "../components/layout/app-layout";
import { ChatInterface } from "../components/mentor/chat-interface";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function MentorPage() {
  return (
    <AppLayout>
      <div className="h-[calc(100vh-10rem)]">
        <Card className="h-full w-full bg-card/60 backdrop-blur-sm border-white/20 shadow-lg flex flex-col">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">AI Career Mentor</CardTitle>
            <CardDescription>Chat with your AI mentor for personalized guidance.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden p-0 sm:p-0 lg:p-0">
             <ChatInterface />
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
