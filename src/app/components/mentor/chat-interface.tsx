
'use client';

import { useState, useRef, useEffect, FormEvent } from 'react';
import { Send, User, Bot, Loader2, Lightbulb, BookOpen, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useResume } from '@/app/contexts/resume-context';
import { aiCareerMentor } from '@/ai/flows/ai-career-mentor';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Message {
  text: string;
  sender: 'user' | 'bot';
  isJson?: boolean;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'bot', text: "Hello! I'm your AI Career Mentor. How can I help you navigate your career path today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { resumeData } = useResume();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { text: input, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await aiCareerMentor({
        resumeText: resumeData?.rawText ?? "No resume provided.",
        userInput: input,
      });
      const botMessage: Message = { text: JSON.stringify(response.response), sender: 'bot', isJson: true };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = { text: "Sorry, I'm having trouble connecting. Please try again later.", sender: 'bot' };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderBotMessage = (message: Message) => {
    if (message.isJson) {
      try {
        const data = JSON.parse(message.text);
        return (
          <div className="space-y-4">
            {data.advice && (
              <p className="text-sm">{data.advice}</p>
            )}
            {data.skillGaps && data.skillGaps.length > 0 && (
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-base flex items-center gap-2"><Lightbulb className="h-4 w-4"/> Skill Gaps Identified</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex flex-wrap gap-2">
                    {data.skillGaps.map((skill: string, index: number) => (
                      <Badge key={index} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
            {data.learningRecommendations && data.learningRecommendations.length > 0 && (
               <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-base flex items-center gap-2"><GraduationCap className="h-4 w-4"/> Learning Recommendations</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 space-y-3">
                  {data.learningRecommendations.map((rec: { resource: string, reason: string }, index: number) => (
                    <div key={index} className="text-sm">
                      <p className="font-semibold flex items-center gap-2"><BookOpen className="h-4 w-4 text-primary" /> {rec.resource}</p>
                      <p className="text-muted-foreground pl-6">{rec.reason}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        );
      } catch (e) {
        // Fallback for non-json or malformed json
        return <p className="text-sm">{message.text}</p>;
      }
    }
    return <p className="text-sm">{message.text}</p>;
  };

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-6">
          {messages.map((message, index) => (
            <div key={index} className={`flex items-start gap-3 ${message.sender === 'user' ? 'justify-end' : ''}`}>
              {message.sender === 'bot' && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback><Bot /></AvatarFallback>
                </Avatar>
              )}
              <div className={`rounded-lg px-4 py-3 max-w-lg ${message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                {renderBotMessage(message)}
              </div>
              {message.sender === 'user' && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback><User /></AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback><Bot /></AvatarFallback>
              </Avatar>
              <div className="rounded-lg px-4 py-3 bg-secondary flex items-center">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <div className="p-4 border-t">
        <form onSubmit={handleSubmit} className="flex items-center gap-3">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your mentor a question..."
            disabled={isLoading || !resumeData}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading || !input.trim() || !resumeData} size="icon">
            <Send className="h-5 w-5" />
          </Button>
        </form>
         {!resumeData && (
          <p className="text-xs text-center text-muted-foreground mt-2">
            Please analyze your resume first to have a personalized chat with the mentor.
          </p>
        )}
      </div>
    </div>
  );
}
