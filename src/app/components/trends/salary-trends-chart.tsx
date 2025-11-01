'use client';

import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart';

const chartData = [
  { month: 'Jan', dataScientist: 120, productManager: 110, uxDesigner: 90 },
  { month: 'Feb', dataScientist: 122, productManager: 112, uxDesigner: 92 },
  { month: 'Mar', dataScientist: 125, productManager: 115, uxDesigner: 95 },
  { month: 'Apr', dataScientist: 128, productManager: 118, uxDesigner: 98 },
  { month: 'May', dataScientist: 130, productManager: 120, uxDesigner: 100 },
  { month: 'Jun', dataScientist: 132, productManager: 122, uxDesigner: 102 },
];

const chartConfig = {
  dataScientist: {
    label: 'Data Scientist',
    color: 'hsl(var(--chart-1))',
  },
  productManager: {
    label: 'Product Manager',
    color: 'hsl(var(--chart-2))',
  },
  uxDesigner: {
    label: 'UX Designer',
    color: 'hsl(var(--chart-3))',
  },
};

export function SalaryTrendsChart() {
  return (
    <Card className="bg-card/60 backdrop-blur-sm border-white/20 shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Average Salary Trends (YoY)</CardTitle>
        <CardDescription>Salary in thousands (USD) for popular roles.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ResponsiveContainer>
            <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <YAxis
                tickFormatter={(value) => `$${value}k`}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                />
              <Tooltip content={<ChartTooltipContent indicator="line" />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Line
                dataKey="dataScientist"
                type="monotone"
                stroke="var(--color-dataScientist)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey="productManager"
                type="monotone"
                stroke="var(--color-productManager)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey="uxDesigner"
                type="monotone"
                stroke="var(--color-uxDesigner)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
