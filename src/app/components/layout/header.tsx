
'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Logo } from '../shared/logo';
import { Button } from '@/components/ui/button';
import { ArrowLeft, LayoutDashboard, LogOut } from 'lucide-react';
import Link from 'next/link';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useFirebase } from '@/firebase';
import { useUser } from '@/firebase/auth/use-user';


function capitalize(str: string) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function AppHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { auth } = useFirebase();
  const { user } = useUser();

  const handleSignOut = async () => {
    await auth.signOut();
    router.push('/signin');
  };
  
  const pathParts = pathname.split('/').filter(Boolean);
  const pageTitle = pathParts.length > 0 ? capitalize(pathParts[pathParts.length -1].replace('-', ' ')) : 'Dashboard';
  const isDashboard = pathname === '/dashboard' || pathname === '/';

  return (
    <header className="sticky top-0 z-10 flex h-20 items-center justify-between gap-4 border-b border-border/60 bg-background/80 px-4 backdrop-blur-sm sm:px-6 lg:px-8">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="md:hidden"/>
        {!isDashboard ? (
          <>
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
                <ArrowLeft />
                <span className="sr-only">Go back</span>
            </Button>
            <Button variant="ghost" size="icon" asChild>
                <Link href="/dashboard">
                    <LayoutDashboard />
                    <span className="sr-only">Go to Dashboard</span>
                </Link>
            </Button>
          </>
        ) : (
             <Logo />
        )}
        <h1 className="font-headline text-2xl font-bold tracking-tight">{pageTitle}</h1>
      </div>

      <div className="flex flex-1 items-center justify-end gap-2">
        {user && (
            <Button variant="ghost" onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
            </Button>
        )}
      </div>
    </header>
  );
}
