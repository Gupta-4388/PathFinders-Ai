'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useResume } from '@/app/contexts/resume-context';
import { useEffect, useState } from 'react';
import { CheckCircle, Circle } from 'lucide-react';

const careerPathsData = [
  {
    id: '1',
    title: 'AI/ML Engineer',
    yoy: '+18%',
    description: 'Design and develop machine learning and deep learning systems.',
    requiredSkills: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'NLP'],
    roadmapProgress: 75,
    milestones: [
      { text: 'Master Python & Core Libraries', completed: true },
      { text: 'Learn Foundational ML Concepts', completed: true },
      { text: 'Deep Dive into Deep Learning', completed: true },
      { text: 'Specialize in NLP or Computer Vision', completed: false },
      { text: 'Build Portfolio Projects', completed: false },
    ],
  },
  {
    id: '2',
    title: 'Full-Stack Developer',
    yoy: '+12%',
    description: 'Work on both the front-end and back-end of web applications.',
    requiredSkills: ['JavaScript', 'React', 'Node.js', 'SQL', 'APIs'],
    roadmapProgress: 60,
    milestones: [
        { text: 'HTML, CSS, & JavaScript Fundamentals', completed: true },
        { text: 'Master a Frontend Framework (React)', completed: true },
        { text: 'Learn Backend Development (Node.js)', completed: true },
        { text: 'Database Management (SQL/NoSQL)', completed: false },
        { text: 'Deploy a Full-Stack Application', completed: false },
    ]
  },
  {
    id: '3',
    title: 'Cloud & DevOps Engineer',
    yoy: '+22%',
    description: 'Manage and automate infrastructure on cloud platforms.',
    requiredSkills: ['AWS/GCP/Azure', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform'],
    roadmapProgress: 40,
    milestones: [
        { text: 'Cloud Provider Fundamentals (AWS)', completed: true },
        { text: 'Containerization with Docker', completed: true },
        { text: 'Orchestration with Kubernetes', completed: false },
        { text: 'Infrastructure as Code (Terraform)', completed: false },
        { text: 'CI/CD Pipeline Automation', completed: false },
    ]
  },
];

export function CareerPaths() {
  const { resumeData } = useResume();
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (resumeData) {
      const timer = setTimeout(() => setShouldRender(true), 300);
      return () => clearTimeout(timer);
    } else {
      // For demo purposes, render even without resume data
      const timer = setTimeout(() => setShouldRender(true), 300);
      return () => clearTimeout(timer);
    }
  }, [resumeData]);

  if (!shouldRender) {
    return (
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="bg-card/80 animate-pulse h-[450px]"></Card>
        ))}
      </div>
    );
  }

  return (
    <div className={`transition-opacity duration-500 ${shouldRender ? 'opacity-100' : 'opacity-0'}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
        {careerPathsData.map((path) => {
          const userSkills = resumeData?.skills.map(s => s.toLowerCase()) || [];
          const required = path.requiredSkills.map(s => s.toLowerCase());
          const matchedSkills = required.filter(skill => userSkills.includes(skill));
          
          return (
            <Card key={path.id} className="overflow-hidden bg-card/80 backdrop-blur-sm border-white/10 shadow-lg hover:shadow-primary/10 transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                    <CardTitle className="font-headline text-2xl">{path.title}</CardTitle>
                    <Badge variant="secondary" className="bg-green-500/10 text-green-400 border-green-500/20">{path.yoy}</Badge>
                </div>
                <CardDescription className="pt-1">{path.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 flex-grow">
                <div>
                  <h4 className="text-sm font-semibold mb-2 text-muted-foreground">Required Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {path.requiredSkills.map((skill) => (
                      <Badge key={skill} variant={matchedSkills.includes(skill.toLowerCase()) ? 'default' : 'outline'} className="bg-secondary/80 border-secondary-foreground/20">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="pt-2">
                    <h4 className="text-sm font-semibold mb-2 text-muted-foreground">Roadmap Progress</h4>
                    <div className="w-full">
                        <div className="flex justify-between mb-1 text-sm">
                            <span className="text-muted-foreground">{path.roadmapProgress}% complete</span>
                        </div>
                        <Progress value={path.roadmapProgress} aria-label={`${path.roadmapProgress}% roadmap progress`} className="h-2 bg-secondary/80" />
                    </div>
                </div>
                 <div className="pt-2">
                    <h4 className="text-sm font-semibold mb-2 text-muted-foreground">Next Milestones</h4>
                    <ul className="space-y-2">
                        {path.milestones.map((milestone, index) => (
                            <li key={index} className="flex items-center gap-3 text-sm">
                                {milestone.completed ? (
                                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                                ) : (
                                    <Circle className="h-4 w-4 text-muted-foreground/50 flex-shrink-0" />
                                )}
                                <span className={milestone.completed ? 'text-foreground' : 'text-muted-foreground'}>{milestone.text}</span>
                            </li>
                        ))}
                    </ul>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
