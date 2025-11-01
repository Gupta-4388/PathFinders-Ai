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
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-primary"
              >
                <path d="M14 25.6667C20.4434 25.6667 25.6667 20.4434 25.6667 14C25.6667 7.55666 20.4434 2.33334 14 2.33334C7.55666 2.33334 2.33334 7.55666 2.33334 14C2.33334 20.4434 7.55666 25.6667 14 25.6667Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
