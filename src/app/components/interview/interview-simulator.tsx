'use client';

import { useState, FormEvent, useEffect } from 'react';
import { generateMockInterviewQuestions } from '@/ai/flows/generate-mock-interview-questions';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Bot, Star, ArrowLeft, BrainCircuit, CheckCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const INTERVIEW_LENGTH = 15;
type InterviewState = 'idle' | 'started' | 'answered' | 'finished';

interface InterviewResult {
  question: string;
  answer: string;
  score?: number;
  feedback?: string;
}

export function InterviewSimulator() {
  const [role, setRole] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [askedQuestions, setAskedQuestions] = useState<string[]>([]);
  const [userAnswer, setUserAnswer] = useState('');
  const [interviewState, setInterviewState] = useState<InterviewState>('idle');
  const [results, setResults] = useState<InterviewResult[]>([]);
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

      const newResult: InterviewResult = {
        question: currentQuestion,
        answer: userAnswer,
        score: response.score,
        feedback: response.feedback,
      };
      setResults(prev => [...prev, newResult]);
      
      if (askedQuestions.length >= INTERVIEW_LENGTH) {
        setInterviewState('finished');
      } else {
        setInterviewState('answered');
        setCurrentQuestion(response.question);
        setAskedQuestions(prev => [...prev, response.question]);
      }

    } catch (error) {
      toast({ variant: 'destructive', title: 'Error submitting answer.', description: 'Could not get feedback.' });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleNextQuestion = () => {
    setUserAnswer('');
    setInterviewState('started');
  };
  
  const resetInterview = () => {
    setRole('');
    setCurrentQuestion('');
    setAskedQuestions([]);
    setUserAnswer('');
    setResults([]);
    setInterviewState('idle');
  };

  const totalScore = results.reduce((sum, r) => sum + (r.score || 0), 0);
  const averageScore = results.length > 0 ? totalScore / results.length : 0;

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
      
      { (interviewState === 'started' || interviewState === 'answered') && (
        <>
            <Progress value={(askedQuestions.length / INTERVIEW_LENGTH) * 100} className="mx-6" />
            <p className="text-center text-sm text-muted-foreground mt-2">Question {askedQuestions.length} of {INTERVIEW_LENGTH}</p>
        </>
      )}

      {interviewState === 'started' && (
        <form onSubmit={handleSubmitAnswer}>
          <CardContent className="space-y-4 pt-6">
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

      {interviewState === 'answered' && results.length > 0 && (
        <>
          <CardContent className="space-y-6 pt-6">
             <div className="p-4 bg-secondary/50 rounded-lg space-y-4">
                 <h3 className="font-semibold text-lg">Your Answer for: <span className="italic">"{results[results.length - 1].question}"</span></h3>
                <div className="space-y-2">
                    <h4 className="font-semibold">Score:</h4>
                    <div className="flex items-center gap-2">
                        <Progress value={(results[results.length - 1].score || 0) * 10} className="w-full" />
                        <span className="font-bold text-lg text-primary">{results[results.length - 1].score || 0}/10</span>
                    </div>
                </div>
                <div>
                    <h4 className="font-semibold">AI Feedback:</h4>
                    <p className="text-sm leading-relaxed">{results[results.length - 1].feedback}</p>
                </div>
            </div>
          </CardContent>
          <CardFooter className="justify-between">
            <Button variant="outline" onClick={resetInterview}>
             <ArrowLeft className="mr-2 h-4 w-4" /> End Interview
            </Button>
            <Button onClick={handleNextQuestion} disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Next Question
            </Button>
          </CardFooter>
        </>
      )}

      {interviewState === 'finished' && (
        <>
            <CardContent className="space-y-6 pt-6">
                <div className="text-center p-6 bg-secondary/50 rounded-lg">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold font-headline">Interview Complete!</h2>
                    <p className="text-muted-foreground mt-2">Great job on finishing the mock interview.</p>
                </div>

                <div className="space-y-4">
                    <h3 className="font-semibold text-xl">Overall Performance</h3>
                    <div className="p-4 border rounded-lg">
                        <p className="text-sm text-muted-foreground">Average Score</p>
                        <p className="text-3xl font-bold text-primary">{averageScore.toFixed(1)} / 10</p>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button onClick={resetInterview} className="w-full">
                    Start a New Interview
                </Button>
            </CardFooter>
        </>
      )}

    </Card>
  );
}
