'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Calendar, CheckSquare, Target, Settings, HelpCircle, Info, Menu, X, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/timetable', label: 'Timetable', icon: Calendar },
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/assignments', label: 'Assignments', icon: CheckSquare },
  { href: '/goals', label: 'Study Goals', icon: Target },
  { href: '/settings', label: 'Settings', icon: Settings },
  { href: '/help', label: 'Help', icon: HelpCircle },
  { href: '/about', label: 'About', icon: Info },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/timetable') {
      return pathname === '/timetable';
    }
    return pathname === href;
  };

  return (
    <>
      {/* Mobile nav button */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-background border-b border-border sticky top-0 z-40">
        <h1 className="font-bold text-lg text-foreground">Planner</h1>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {/* Sidebar navigation */}
      <nav
        className={cn(
          'fixed md:relative top-0 left-0 w-64 h-screen bg-card border-r border-border transition-transform duration-300 z-50',
          'flex flex-col gap-2 p-6',
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
          'md:top-auto'
        )}
      >
        <div className="hidden md:block mb-6">
          <h1 className="text-2xl font-bold text-primary">Planner</h1>
          <p className="text-xs text-muted-foreground mt-1">Smart Student Organizer</p>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={active ? 'default' : 'ghost'}
                  className={cn(
                    'w-full justify-start gap-3',
                    active && 'bg-primary text-primary-foreground font-semibold'
                  )}
                  onClick={() => setIsOpen(false)}
                  aria-current={active ? 'page' : undefined}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span>{item.label}</span>
                </Button>
              </Link>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground text-center font-medium">Smart Student Planner</p>
          <p className="text-xs text-muted-foreground text-center">v1.0.1</p>
        </div>
      </nav>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-40"
          onClick={() => setIsOpen(false)}
          aria-label="Close menu"
        />
      )}
    </>
  );
}
