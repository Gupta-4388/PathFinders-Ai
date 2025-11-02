'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sun, Moon, Laptop } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

export function AppearanceForm() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>
                Customize the look and feel of the application. Select your preferred theme.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-3 gap-4">
                    <Skeleton className="h-20" />
                    <Skeleton className="h-20" />
                    <Skeleton className="h-20" />
                </div>
            </CardContent>
        </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Appearance</CardTitle>
        <CardDescription>
          Customize the look and feel of the application. Select your preferred theme.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <Button
            variant="outline"
            className={cn(
              'h-20 flex-col gap-2',
              theme === 'light' && 'border-primary ring-2 ring-primary'
            )}
            onClick={() => setTheme('light')}
          >
            <Sun className="h-6 w-6" />
            Light
          </Button>
          <Button
            variant="outline"
            className={cn(
              'h-20 flex-col gap-2',
              theme === 'dark' && 'border-primary ring-2 ring-primary'
            )}
            onClick={() => setTheme('dark')}
          >
            <Moon className="h-6 w-6" />
            Dark
          </Button>
          <Button
            variant="outline"
            className={cn(
              'h-20 flex-col gap-2',
              theme === 'system' && 'border-primary ring-2 ring-primary'
            )}
            onClick={() => setTheme('system')}
          >
            <Laptop className="h-6 w-6" />
            System
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
