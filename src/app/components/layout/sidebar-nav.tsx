
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
                  <circle cx="50" cy="50" r="45" fill="#2563eb" />
                  <path
                    d="M 30 70 Q 50 50, 70 30"
                    stroke="#f97316"
                    strokeWidth="10"
                    strokeLinecap="round"
                    fill="none"
                  />
                   <path
                    d="M 30 70 Q 50 50, 70 30"
                    stroke="white"
                    strokeWidth="3"
                    strokeDasharray="5 5"
                    strokeLinecap="round"
                    fill="none"
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
