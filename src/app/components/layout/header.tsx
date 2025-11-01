
'use client';

import { usePathname } from 'next/navigation';
import { SidebarTrigger } from '@/components/ui/sidebar';

function capitalize(str: string) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function AppHeader() {
  const pathname = usePathname();
  const pathParts = pathname.split('/').filter(Boolean);
  const pageTitle = pathParts.length > 0 ? capitalize(pathParts[pathParts.length -1].replace('-', ' ')) : 'Dashboard';

  return (
    <header className="sticky top-0 z-10 flex h-20 items-center justify-between gap-4 border-b border-border/60 bg-transparent px-4 backdrop-blur-sm sm:px-6 lg:px-8">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="md:hidden" />
        <h1 className="font-headline text-2xl font-bold tracking-tight">{pageTitle}</h1>
      </div>

      <div className="flex flex-1 items-center justify-end gap-2">
      </div>
    </header>
  );
}
