'use client';

import { useState, FormEvent, useEffect } from 'react';
import { generateMockInterviewQuestions } from '@/ai/flows/generate-mock-interview-questions';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Bot, Star, ArrowLeft, BrainCircuit } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

type InterviewState = 'idle' | 'started' | 'answered' | 'finished';

interface InterviewResult {
  question: string;
  score?: number;
  feedback?: string;
}

export function InterviewSimulator() {
  const [role, setRole] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [askedQuestions, setAskedQuestions] = useState<string[]>([]);
  const [userAnswer, setUserAnswer] = useState('');
  const [interviewState, setInterviewState] = useState<InterviewState>('idle');
  const [result, setResult] = useState<InterviewResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleStart = async (e: FormEvent) => {
    e.preventDefault();
    if (!role.trim()) {
      toast({ variant: 'destructive', title: 'Please enter a job role.' });
      return;
    }
    setIsLoading(true);
    try {
      const { question } = await generateMockInterviewQuestions({ role, askedQuestions: [] });
      setCurrentQuestion(question);
      setAskedQuestions([question]);
      setInterviewState('started');
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error starting interview.', description: 'Could not fetch the first question.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitAnswer = async (e: FormEvent) => {
    e.preventDefault();
    if (!userAnswer.trim()) {
      toast({ variant: 'destructive', title: 'Please provide an answer.' });
      return;
    }
    setIsLoading(true);
    try {
      const response = await generateMockInterviewQuestions({
        role,
        question: currentQuestion,
        userAnswer,
        askedQuestions,
      });
      setResult(response);
      setInterviewState('answered');
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error submitting answer.', description: 'Could not get feedback.' });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleNextQuestion = () => {
    setIsLoading(true);
    setResult(null);
    setUserAnswer('');
    generateMockInterviewQuestions({ role, askedQuestions })
      .then(({ question }) => {
        setCurrentQuestion(question);
        setAskedQuestions((prev) => [...prev, question]);
        setInterviewState('started');
      })
      .catch(() => toast({ variant: 'destructive', title: 'Error fetching next question.' }))
      .finally(() => setIsLoading(false));
  };
  
  const resetInterview = () => {
    setRole('');
    setCurrentQuestion('');
    setAskedQuestions([]);
    setUserAnswer('');
    setResult(null);
    setInterviewState('idle');
  };

  return (
    <Card className="bg-card/60 backdrop-blur-sm border-white/20 shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center gap-2">
          <BrainCircuit className="h-6 w-6 text-primary" /> Mock Interview Simulator
        </CardTitle>
        <CardDescription>Practice makes perfect. Hone your interview skills here.</CardDescription>
      </CardHeader>
      
      {interviewState === 'idle' && (
        <form onSubmit={handleStart}>
          <CardContent>
            <p className="font-semibold mb-2">What role are you interviewing for?</p>
            <Input 
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g., Senior Frontend Developer" 
              disabled={isLoading}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Start Interview
            </Button>
          </CardFooter>
        </form>
      )}

      {interviewState === 'started' && (
        <form onSubmit={handleSubmitAnswer}>
          <CardContent className="space-y-4">
            <div className="flex gap-3">
              <Bot className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
              <p className="p-3 bg-secondary rounded-lg font-medium">{currentQuestion}</p>
            </div>
            <Textarea
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Your answer..."
              rows={6}
              disabled={isLoading}
            />
          </CardContent>
          <CardFooter className="justify-between">
            <Button variant="outline" onClick={resetInterview} type="button">
              <ArrowLeft className="mr-2 h-4 w-4" /> End Interview
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit Answer
            </Button>
          </CardFooter>
        </form>
      )}

      {interviewState === 'answered' && result && (
        <>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">Your Score:</h3>
              <div className="flex items-center gap-2">
                <Progress value={(result.score || 0) * 10} className="w-full" />
                <span className="font-bold text-lg text-primary">{result.score || 0}/10</span>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">AI Feedback:</h3>
              <p className="p-3 bg-secondary rounded-lg text-sm leading-relaxed">{result.feedback}</p>
            </div>
          </CardContent>
          <CardFooter className="justify-between">
            <Button variant="outline" onClick={resetInterview}>
             <ArrowLeft className="mr-2 h-4 w-4" /> New Interview
            </Button>
            <Button onClick={handleNextQuestion} disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Next Question
            </Button>
          </CardFooter>
        </>
      )}
    </Card>
  );
}
