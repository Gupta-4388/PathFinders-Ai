'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

const chartData = [
  { location: 'San Francisco', openings: 4000 },
  { location: 'New York', openings: 3000 },
  { location: 'Austin', openings: 2000 },
  { location: 'Seattle', openings: 2780 },
  { location: 'Boston', openings: 1890 },
  { location: 'Remote', openings: 5200 },
];

const chartConfig = {
  openings: {
    label: 'Job Openings',
    color: 'hsl(var(--accent))',
  },
};

export function JobOpeningsChart() {
  return (
    <Card className="bg-card/60 backdrop-blur-sm border-white/20 shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Job Openings by Location</CardTitle>
        <CardDescription>Number of open positions in key tech hubs.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[350px] w-full">
          <ResponsiveContainer>
            <BarChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="location" tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip cursor={{ fill: 'hsl(var(--muted))' }} content={<ChartTooltipContent />} />
              <Bar dataKey="openings" fill="var(--color-openings)" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
