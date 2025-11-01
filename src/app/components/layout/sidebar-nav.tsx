
'use client';

import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, MessageCircle, Bot, LineChart, FileText } from 'lucide-react';
import { Logo } from '../shared/logo';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', icon: <LayoutDashboard />, label: 'Dashboard', tooltip: 'Dashboard' },
  { href: '/resume-analyzer', icon: <FileText />, label: 'Resume Analyzer', tooltip: 'Resume Analyzer' },
  { href: '/mentor', icon: <MessageCircle />, label: 'AI Mentor', tooltip: 'AI Mentor' },
  { href: '/interview', icon: <Bot />, label: 'Mock Interview', tooltip: 'Mock Interview' },
  { href: '/trends', icon: <LineChart />, label: 'Job Trends', tooltip: 'Job Trends' },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader className="p-4">
        <Link href="/dashboard" className="flex items-center gap-2 group-data-[collapsible=icon]:hidden">
            <Logo />
        </Link>
        <div className="hidden group-data-[collapsible=icon]:block">
           <Link href="/dashboard">
             <svg
                width="32"
                height="32"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#f97316" strokeWidth="5" />
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#2563eb" strokeWidth="5" />
                  <path 
                    d="M 50,95 
                       C 50,95 20,75 30,50 
                       S 45,20 50,10 
                       s 20,40 20,40 
                       c 0,0 -10,25 -20,45 z" 
                    fill="#333" 
                    transform="scale(1, 0.9) translate(0, 5)"
                  />
                  <path 
                    d="M 50,85 
                       C 50,85 40,70 45,50 
                       S 48,30 50,20 
                       s 5,20 5,30 
                       c 0,0 -5,15 -5,35 z" 
                    fill="none" 
                    stroke="white" 
                    strokeWidth="1.5" 
                    strokeDasharray="5, 3" 
                    transform="scale(1, 0.9) translate(0, 5)"
                  />
                </g>
              </svg>
           </Link>
        </div>
      </SidebarHeader>
      <SidebarMenu className="p-2">
        {navItems.map((item) => (
          <SidebarMenuItem key={item.href}>
            <Link href={item.href}>
              <SidebarMenuButton
                isActive={pathname === item.href}
                tooltip={{ children: item.tooltip, side: 'right' }}
                className={cn(
                    pathname === item.href ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'text-sidebar-foreground/80 hover:text-sidebar-foreground'
                )}
              >
                {item.icon}
                <span className="truncate">{item.label}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </>
  );
}
