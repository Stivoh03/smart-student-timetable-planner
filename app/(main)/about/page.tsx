'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Zap, Lock, Accessibility, Target } from 'lucide-react';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-muted/50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">About Timetable Planner</h1>
        <p className="text-muted-foreground text-lg mb-8">
          A modern, accessible scheduling tool designed for students
        </p>

        {/* Mission */}
        <Card className="p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-muted-foreground leading-relaxed">
            Smart Student Timetable Planner was created with one goal in mind: to help students manage their academic
            lives more effectively. We believe that good organization leads to better time management, reduced stress, and
            improved academic performance. By combining an intuitive timetable system with assignment tracking and study
            goal management, we provide students with a comprehensive tool to stay on top of their coursework.
          </p>
        </Card>

        {/* HCI Principles */}
        <Card className="p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6">Designed with HCI Principles</h2>
          <p className="text-muted-foreground mb-6">
            This application was built following Human-Computer Interaction (HCI) best practices to ensure a seamless,
            intuitive user experience:
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <Target className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Cognitive Load Reduction</h3>
                <p className="text-sm text-muted-foreground">
                  Information is organized logically with clear visual hierarchy, icons, and color coding to reduce mental effort.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Zap className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Immediate Feedback</h3>
                <p className="text-sm text-muted-foreground">
                  Real-time updates, toast notifications, and visual cues provide instant confirmation of all actions.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Accessibility className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Universal Accessibility</h3>
                <p className="text-sm text-muted-foreground">
                  WCAG AA compliant with keyboard navigation, screen reader support, and customizable accessibility settings.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Lock className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Privacy & Data Security</h3>
                <p className="text-sm text-muted-foreground">
                  All data is stored locally in your browser. We never send personal information to external servers.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Key Features */}
        <Card className="p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6">Key Features</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Badge className="mt-1">Feature</Badge>
              <div>
                <h3 className="font-semibold">Smart Timetable Management</h3>
                <p className="text-sm text-muted-foreground">Add, edit, and organize classes with color-coded course identification.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Badge className="mt-1">Feature</Badge>
              <div>
                <h3 className="font-semibold">Assignment Tracking</h3>
                <p className="text-sm text-muted-foreground">Monitor deadlines and priorities with visual status indicators.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Badge className="mt-1">Feature</Badge>
              <div>
                <h3 className="font-semibold">Study Goal Monitoring</h3>
                <p className="text-sm text-muted-foreground">Set weekly targets and track your progress visually.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Badge className="mt-1">Feature</Badge>
              <div>
                <h3 className="font-semibold">Dark Mode & Customization</h3>
                <p className="text-sm text-muted-foreground">Choose your preferred theme and adjust accessibility settings.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Badge className="mt-1">Feature</Badge>
              <div>
                <h3 className="font-semibold">Data Backup & Export</h3>
                <p className="text-sm text-muted-foreground">Export your data for safekeeping or migration.</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Technology Stack */}
        <Card className="p-8">
          <h2 className="text-2xl font-semibold mb-6">Technology Stack</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-3 text-primary">Frontend</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Next.js 16 with App Router</li>
                <li>• React 19</li>
                <li>• TypeScript</li>
                <li>• Tailwind CSS v4</li>
                <li>• shadcn/ui Components</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-primary">State Management & Storage</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Zustand for global state</li>
                <li>• localStorage for persistence</li>
                <li>• React Hook Form for forms</li>
                <li>• Lucide React for icons</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}
