
'use client';

import { TrendingUp, ArrowRight } from 'lucide-react';
import { LineChart, CartesianGrid, XAxis, Tooltip, ResponsiveContainer, Line, YAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useResume } from '@/app/contexts/resume-context';
import { useMemo } from 'react';

const defaultChartData = [
  { skill: 'React', demand: 95 },
  { skill: 'Python', demand: 92 },
  { skill: 'SQL', demand: 85 },
  { skill: 'AWS', demand: 88 },
  { skill: 'Figma', demand: 78 },
];

const chartConfig = {
  demand: {
    label: 'Demand Score',
    color: 'hsl(var(--primary))',
  },
};

export function JobTrendsSummary() {
  const { resumeData } = useResume();

  const chartData = useMemo(() => {
    if (resumeData && resumeData.skills.length > 0) {
      return resumeData.skills.slice(0, 5).map((skill) => ({
        skill,
        demand: 80 + Math.floor(Math.random() * 20), // Simulate real-time demand score
      }));
    }
    return defaultChartData;
  }, [resumeData]);

  return (
    <Card className="h-full bg-card/60 backdrop-blur-sm border-white/20 shadow-lg flex flex-col">
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center gap-2">
          <TrendingUp className="h-6 w-6" />
          Skill Demand
        </CardTitle>
        <CardDescription>
            {resumeData ? "Demand for skills from your resume." : "A quick look at top trending skills."}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ChartContainer config={chartConfig} className="h-[180px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart accessibilityLayer data={chartData} layout="vertical" margin={{ left: 10, right: 40 }}>
              <CartesianGrid horizontal={false} />
              <XAxis type="number" hide domain={[70, 100]} />
              <YAxis 
                dataKey="skill" 
                type="category" 
                axisLine={false} 
                tickLine={false} 
                width={80} 
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                interval={0}
              />
              <Tooltip cursor={{ fill: 'hsl(var(--muted))' }} content={<ChartTooltipContent />} />
              <Line 
                dataKey="demand" 
                type="monotone" 
                stroke="var(--color-demand)"
                strokeWidth={2}
                dot={{r: 5, fill: 'var(--color-demand)', strokeWidth: 0}} 
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <Button asChild variant="ghost" className="w-full">
          <Link href="/trends">
            Explore More Trends <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
