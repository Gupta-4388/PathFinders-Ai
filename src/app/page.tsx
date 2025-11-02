
'use client';

import Link from 'next/link';
import {
  ArrowRight,
  BrainCircuit,
  Briefcase,
  FileText,
  LineChart,
  MessageCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Logo } from './components/shared/logo';

const features = [
  {
    icon: <FileText className="w-8 h-8 text-primary" />,
    title: 'Resume Parsing',
    description:
      'Instantly extract and analyze your skills and experience by uploading your resume.',
  },
  {
    icon: <MessageCircle className="w-8 h-8 text-primary" />,
    title: 'AI Chat Mentor',
    description:
      'Get personalized career advice and skill-gap analysis from our AI-powered mentor.',
  },
  {
    icon: <Briefcase className="w-8 h-8 text-primary" />,
    title: 'Career Path Visualization',
    description:
      'Discover your top 3 career paths with required skills, growth stats, and a visual roadmap.',
  },
  {
    icon: <LineChart className="w-8 h-8 text-primary" />,
    title: 'Job Market Trends',
    description:
      'Stay ahead with real-time data on skill demand, salary benchmarks, and job openings.',
  },
  {
    icon: <BrainCircuit className="w-8 h-8 text-primary" />,
    title: 'Mock Interview Simulator',
    description:
      'Practice role-specific questions and get instant feedback to ace your next interview.',
  },
];

function LandingPageContent() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/">
            <Logo />
        </Link>
        <Button asChild>
            <Link href="/dashboard">Explore</Link>
        </Button>
      </header>

      <main className="flex-grow">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tighter text-foreground">
              Unlock Your Career Potential with PathFinder AI
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Empowering every self-learner with AI-driven career guidance. Get personalized insights, practice interviews, and discover your ideal career path.
            </p>
            <div className="mt-8 flex justify-center gap-4">
               <Button asChild size="lg">
                <Link href="/dashboard">
                  Explore
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="features" className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-card/60 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-primary/10 transition-shadow">
                <CardHeader className="flex flex-row items-center gap-4">
                  {feature.icon}
                  <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="about" className="bg-secondary/50 py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <Image
                data-ai-hint="technology abstract"
                src="https://picsum.photos/seed/tech-world-2/600/400"
                alt="Our Mission"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="font-headline text-3xl md:text-4xl font-bold text-foreground">
                Our Mission
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                To empower every self-learner with intelligent, personalized, and accessible AI-driven career guidance. We believe that with the right tools, anyone can navigate the complexities of the modern job market and build a fulfilling career.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-foreground text-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} PathFinder AI. All rights reserved.</p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <Link href="#" className="text-sm hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-sm hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}


export default function LandingPage() {
  return (
      <LandingPageContent />
  )
}
