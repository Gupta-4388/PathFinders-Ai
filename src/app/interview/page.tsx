import { AppLayout } from "../components/layout/app-layout";
import { InterviewSimulator } from "../components/interview/interview-simulator";

export default function InterviewPage() {
  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto">
        <InterviewSimulator />
      </div>
    </AppLayout>
  );
}
