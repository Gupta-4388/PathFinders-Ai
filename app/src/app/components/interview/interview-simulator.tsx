
'use client';

import { useState, FormEvent, useEffect, useRef } from 'react';
import { generateMockInterviewQuestions } from '@/ai/flows/generate-mock-interview-questions';
import { textToSpeech } from '@/ai/flows/text-to-speech';
import { speechToText } from '@/ai/flows/speech-to-text';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Bot, Star, ArrowLeft, BrainCircuit, CheckCircle, Video, Mic, Type, AlertCircle, Square } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const INTERVIEW_LENGTH = 5;
type InterviewState = 'idle' | 'started' | 'answered' | 'finished';
type InterviewType = 'text' | 'audio' | 'video';

interface InterviewResult {
  question: string;
  answer: string;
  score?: number;
  feedback?: string;
}

export function InterviewSimulator() {
  const [role, setRole] = useState('');
  const [interviewType, setInterviewType] = useState<InterviewType>('text');
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [currentQuestionAudio, setCurrentQuestionAudio] = useState<string | null>(null);
  const [askedQuestions, setAskedQuestions] = useState<string[]>([]);
  const [userAnswer, setUserAnswer] = useState('');
  const [interviewState, setInterviewState] = useState<InterviewState>('idle');
  const [results, setResults] = useState<InterviewResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isGettingQuestion, setIsGettingQuestion] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  
  const { toast } = useToast();

  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(true);

  useEffect(() => {
    if (interviewState === 'started' && (interviewType === 'video' || interviewType === 'audio')) {
      const getPermissions = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ 
            video: interviewType === 'video', 
            audio: true 
          });
          mediaStreamRef.current = stream;
          setHasCameraPermission(true);
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (error) {
          console.error('Error accessing media devices:', error);
          setHasCameraPermission(false);
          toast({
            variant: 'destructive',
            title: 'Media Access Denied',
            description: 'Please enable camera and microphone permissions in your browser settings.',
          });
        }
      };
      getPermissions();

      return () => {
        if (mediaStreamRef.current) {
          mediaStreamRef.current.getTracks().forEach(track => track.stop());
        }
      }
    }
  }, [interviewState, interviewType, toast]);

  const handleStart = async (e: FormEvent) => {
    e.preventDefault();
    if (!role.trim()) {
      toast({ variant: 'destructive', title: 'Please enter a job role.' });
      return;
    }
    setIsLoading(true);
    setIsGettingQuestion(true);
    try {
      const { question } = await generateMockInterviewQuestions({ role, askedQuestions: [] });
      setCurrentQuestion(question);
      setAskedQuestions([question]);
      if (interviewType !== 'text') {
        const audio = await textToSpeech(question);
        setCurrentQuestionAudio(audio.media);
      }
      setInterviewState('started');
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error starting interview.', description: 'Could not fetch the first question.' });
    } finally {
      setIsLoading(false);
      setIsGettingQuestion(false);
    }
  };
  
  const submitRecordedAnswer = async (audioBlob: Blob) => {
    setIsLoading(true);
    try {
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      reader.onloadend = async () => {
        const base64Audio = reader.result as string;
        try {
          const { text: transcribedText } = await speechToText({ audioDataUri: base64Audio });
          
          if (!transcribedText || transcribedText.trim() === '') {
            toast({ variant: 'destructive', title: 'Could not understand audio', description: 'Please try recording your answer again.' });
            setIsLoading(false);
            return;
          }
          setUserAnswer(transcribedText);
          await submitAnswerLogic(transcribedText);
        } catch (sttError) {
          console.error('STT Error:', sttError);
          toast({ variant: 'destructive', title: 'Error transcribing audio', description: 'Please try again.' });
          setIsLoading(false);
        }
      }
    } catch (blobError) {
      console.error("Blob reading error", blobError);
      toast({ variant: 'destructive', title: 'Error processing recording.' });
      setIsLoading(false);
    }
  }

  const submitAnswerLogic = async (answerToSubmit: string) => {
    setIsLoading(true);
    try {
      const response = await generateMockInterviewQuestions({
        role,
        question: currentQuestion,
        userAnswer: answerToSubmit,
        askedQuestions,
      });

      const newResult: InterviewResult = {
        question: currentQuestion,
        answer: answerToSubmit,
        score: response.score,
        feedback: response.feedback,
      };
      setResults(prev => [...prev, newResult]);
      
      if (askedQuestions.length >= INTERVIEW_LENGTH) {
        setInterviewState('finished');
      } else {
        setInterviewState('answered');
        setCurrentQuestion(''); // Clear old question
        setCurrentQuestionAudio(null);
      }

    } catch (error) {
      toast({ variant: 'destructive', title: 'Error submitting answer.', description: 'Could not get feedback.' });
    } finally {
      setIsLoading(false);
    }
  }

  const handleSubmitAnswer = async (e: FormEvent) => {
    e.preventDefault();
    if (interviewType === 'text') {
        if (!userAnswer.trim()) {
            toast({ variant: 'destructive', title: 'Please provide an answer.' });
            return;
        }
        await submitAnswerLogic(userAnswer);
    }
  };
  
  const handleNextQuestion = async () => {
    setUserAnswer('');
    setIsGettingQuestion(true);
    try {
      const { question: nextQuestion } = await generateMockInterviewQuestions({ role, askedQuestions });
       if (interviewType !== 'text') {
        const audio = await textToSpeech(nextQuestion);
        setCurrentQuestionAudio(audio.media);
      }
      setCurrentQuestion(nextQuestion);
      setAskedQuestions(prev => [...prev, nextQuestion]);
      setInterviewState('started');
    } catch (error) {
        toast({ variant: 'destructive', title: 'Error getting next question.' });
    } finally {
        setIsGettingQuestion(false);
    }
  };

  const handleStartRecording = () => {
    if (!mediaStreamRef.current) {
        toast({ variant: 'destructive', title: 'Media stream not available. Please allow camera/mic access.' });
        return;
    }
    setIsRecording(true);
    audioChunksRef.current = [];
    
    // Choose a MIME type that is likely to be supported
    const options = { mimeType: 'audio/webm; codecs=opus' };
    try {
      mediaRecorderRef.current = new MediaRecorder(mediaStreamRef.current, options);
    } catch (e) {
      console.warn(`'${options.mimeType}' not supported, trying default.`);
      try {
        mediaRecorderRef.current = new MediaRecorder(mediaStreamRef.current);
      } catch (e2) {
        toast({ variant: 'destructive', title: 'Recording failed', description: 'Could not create MediaRecorder.' });
        setIsRecording(false);
        return;
      }
    }
    
    mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
        }
    };
    mediaRecorderRef.current.onstop = () => {
        const mimeType = mediaRecorderRef.current?.mimeType || 'audio/webm';
        const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
        console.log('Recording stopped, blob created:', audioBlob);
        
        submitRecordedAnswer(audioBlob);
    };
    mediaRecorderRef.current.start();
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
    }
  };
  
  const resetInterview = () => {
    setRole('');
    setCurrentQuestion('');
    setAskedQuestions([]);
    setUserAnswer('');
    setResults([]);
    setInterviewState('idle');
    setInterviewType('text');
    setCurrentQuestionAudio(null);
  };

  const totalScore = results.reduce((sum, r) => sum + (r.score || 0), 0);
  const averageScore = results.length > 0 ? totalScore / results.length : 0;

  const handleRecordButtonClick = () => {
      if(isRecording) {
          handleStopRecording();
      } else {
          handleStartRecording();
      }
  }

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
          <CardContent className="space-y-6">
            <div>
                <Label className="font-semibold mb-2 block">What role are you interviewing for?</Label>
                <Input 
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g., Senior Frontend Developer" 
                disabled={isLoading}
                />
            </div>
            <div>
                <Label className="font-semibold mb-3 block">Interview Type</Label>
                 <RadioGroup defaultValue="text" value={interviewType} onValueChange={(v: any) => setInterviewType(v)} className="grid grid-cols-3 gap-4">
                    <div>
                        <RadioGroupItem value="text" id="r-text" className="peer sr-only" />
                        <Label htmlFor="r-text" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                            <Type className="mb-3 h-6 w-6" /> Text
                        </Label>
                    </div>
                     <div>
                        <RadioGroupItem value="audio" id="r-audio" className="peer sr-only" />
                        <Label htmlFor="r-audio" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                            <Mic className="mb-3 h-6 w-6" /> Audio
                        </Label>
                    </div>
                     <div>
                        <RadioGroupItem value="video" id="r-video" className="peer sr-only" />
                        <Label htmlFor="r-video" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                            <Video className="mb-3 h-6 w-6" /> Video
                        </Label>
                    </div>
                </RadioGroup>
            </div>
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
               <div className="p-3 bg-secondary rounded-lg font-medium w-full space-y-3">
                {isGettingQuestion ? <Loader2 className="h-5 w-5 animate-spin" /> : <p>{currentQuestion}</p>}
                {currentQuestionAudio && !isGettingQuestion && (
                    <audio src={currentQuestionAudio} controls autoPlay className="w-full" />
                )}
               </div>
            </div>
            
            {interviewType === 'text' ? (
                <Textarea
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Your answer..."
                rows={6}
                disabled={isLoading}
                />
            ) : (
                <div className="bg-secondary rounded-lg p-4 space-y-4">
                    <video ref={videoRef} className={`w-full aspect-video rounded-md bg-black ${interviewType !== 'video' ? 'hidden' : ''}`} autoPlay muted playsInline />
                    {!hasCameraPermission && (
                         <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Camera/Mic Access Required</AlertTitle>
                            <AlertDescription>
                                Please allow camera and microphone access to use this feature.
                            </AlertDescription>
                        </Alert>
                    )}
                    <div className="text-center">
                        <Button type="button" variant={isRecording ? 'destructive' : 'default'} size="lg" onClick={handleRecordButtonClick} disabled={isLoading || isGettingQuestion || !hasCameraPermission}>
                            {isLoading ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : isRecording ? (
                                <Square className="mr-2 h-4 w-4" />
                            ) : (
                                <Mic className="mr-2 h-4 w-4" />
                            )}
                            {isLoading ? 'Processing...' : isRecording ? 'Stop Recording' : 'Start Recording'}
                        </Button>
                    </div>
                </div>
            )}
          </CardContent>
          <CardFooter className="justify-between">
            <Button variant="outline" onClick={resetInterview} type="button">
              <ArrowLeft className="mr-2 h-4 w-4" /> End Interview
            </Button>
            {interviewType === 'text' && (
                <Button type="submit" disabled={isLoading || isGettingQuestion}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Submit Answer
                </Button>
            )}
          </CardFooter>
        </form>
      )}

      {interviewState === 'answered' && results.length > 0 && (
        <>
          <CardContent className="space-y-6 pt-6">
             <div className="p-4 bg-secondary/50 rounded-lg space-y-4">
                 <h3 className="font-semibold text-lg">Your Answer for: <span className="italic">"{results[results.length - 1].question}"</span></h3>
                 <p className="text-sm text-muted-foreground border-l-2 pl-3 italic">{results[results.length - 1].answer}</p>
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
            <Button onClick={handleNextQuestion} disabled={isGettingQuestion}>
              {isGettingQuestion && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
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
