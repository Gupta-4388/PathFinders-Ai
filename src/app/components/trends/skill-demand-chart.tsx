'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

const chartData = [
  { skill: 'Python', demand: 98 },
  { skill: 'JavaScript', demand: 95 },
  { skill: 'SQL', demand: 92 },
  { skill: 'AWS', demand: 88 },
  { skill: 'React', demand: 85 },
  { skill: 'Java', demand: 81 },
  { skill: 'Docker', demand: 78 },
  { skill: 'Kubernetes', demand: 75 },
];

const chartConfig = {
  demand: {
    label: 'Demand Score (out of 100)',
    color: 'hsl(var(--primary))',
  },
};

export function SkillDemandChart() {
  return (
    <Card className="bg-card/60 backdrop-blur-sm border-white/20 shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Top In-Demand Skills</CardTitle>
        <CardDescription>Based on recent job postings analysis.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ResponsiveContainer>
            <BarChart layout="vertical" data={chartData} margin={{ left: 10 }}>
              <CartesianGrid horizontal={false} />
              <YAxis
                dataKey="skill"
                type="category"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                className="text-sm"
              />
              <XAxis dataKey="demand" type="number" hide />
              <Tooltip cursor={{ fill: 'hsl(var(--muted))' }} content={<ChartTooltipContent />} />
              <Bar dataKey="demand" fill="var(--color-demand)" radius={5} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
