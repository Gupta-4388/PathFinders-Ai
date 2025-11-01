'use client';

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useResume } from '@/app/contexts/resume-context';
import { useEffect, useState } from 'react';

const careerPathsData = [
  {
    id: '1',
    title: 'Data Scientist',
    image: PlaceHolderImages.find(img => img.id === 'career-data-scientist'),
    description: 'Analyze complex data to help companies make better decisions.',
    requiredSkills: ['Python', 'R', 'SQL', 'Machine Learning', 'Statistics'],
    growth: 85,
    match: 75,
  },
  {
    id: '2',
    title: 'Product Manager',
    image: PlaceHolderImages.find(img => img.id === 'career-product-manager'),
    description: 'Guide the success of a product and lead the cross-functional team that is responsible for improving it.',
    requiredSkills: ['Agile', 'Roadmapping', 'User Research', 'Data Analysis'],
    growth: 78,
    match: 60,
  },
  {
    id: '3',
    title: 'UX Designer',
    image: PlaceHolderImages.find(img => img.id === 'career-ux-designer'),
    description: 'Create user-friendly interfaces that enable users to understand how to use complex technical products.',
    requiredSkills: ['Figma', 'Prototyping', 'Wireframing', 'User Testing'],
    growth: 82,
    match: 45,
  },
];

export function CareerPaths() {
  const { resumeData } = useResume();
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (resumeData) {
      // Delay rendering to allow for a subtle animation
      const timer = setTimeout(() => setShouldRender(true), 300);
      return () => clearTimeout(timer);
    } else {
      setShouldRender(false);
    }
  }, [resumeData]);

  if (!resumeData) {
    return (
      <Card className="bg-card/60 backdrop-blur-sm border-white/20 shadow-lg text-center">
        <CardHeader>
          <CardTitle className="font-headline">Your Recommended Career Paths</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Upload your resume to see personalized career recommendations.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={`transition-opacity duration-500 ${shouldRender ? 'opacity-100' : 'opacity-0'}`}>
      <h2 className="font-headline text-2xl font-bold mb-4">Top 3 Recommended Career Paths</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {careerPathsData.map((path) => {
          const userSkills = resumeData?.skills.map(s => s.toLowerCase()) || [];
          const required = path.requiredSkills.map(s => s.toLowerCase());
          const matchedSkills = required.filter(skill => userSkills.includes(skill));
          const matchPercentage = Math.round((matchedSkills.length / required.length) * 100);

          return (
            <Card key={path.id} className="overflow-hidden bg-card/60 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-primary/20 transition-all duration-300 transform hover:-translate-y-1">
              {path.image && (
                <Image
                  data-ai-hint={path.image.imageHint}
                  src={path.image.imageUrl}
                  alt={path.title}
                  width={600}
                  height={400}
                  className="w-full h-40 object-cover"
                />
              )}
              <CardHeader>
                <CardTitle className="font-headline text-xl">{path.title}</CardTitle>
                <CardDescription>{path.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold mb-2">Key Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {path.requiredSkills.map((skill) => (
                      <Badge key={skill} variant={matchedSkills.includes(skill.toLowerCase()) ? 'default' : 'outline'}>
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                 <div className="w-full">
                  <div className="flex justify-between mb-1 text-sm">
                    <span className="font-medium">Your Skill Match</span>
                    <span className="font-bold text-primary">{matchPercentage}%</span>
                  </div>
                  <Progress value={matchPercentage} aria-label={`${matchPercentage}% skill match`} />
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
