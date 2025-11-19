'use client';

import { Card } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle, Play, BookOpen, AlertCircle } from 'lucide-react';

const faqItems = [
  {
    title: 'How do I add a class to my timetable?',
    content:
      'Navigate to the Timetable page and click "Add Class". Fill in the course name, lecturer name, select the day and time, then click "Add Class". The class will immediately appear in your schedule.',
  },
  {
    title: 'Can I edit or delete a class?',
    content:
      'Yes! Click the edit button (pencil icon) next to any class to modify it, or click the delete button (trash icon) to remove it. Changes are saved automatically.',
  },
  {
    title: 'What is the Dashboard for?',
    content:
      'The Dashboard gives you an overview of your entire week at a glance. It shows today\'s classes, pending assignments, study goals, and your weekly progress.',
  },
  {
    title: 'How do I track assignments?',
    content:
      'Go to the Assignments page and click "Add Assignment". Enter the course, title, due date, and priority level. Mark assignments as complete by clicking the circle icon next to them.',
  },
  {
    title: 'What are Study Goals?',
    content:
      'Study Goals let you set targets for how many hours you want to study each week. You can track your progress and update completed hours using the +/- buttons. This helps you maintain a healthy study routine.',
  },
  {
    title: 'Can I change the text size?',
    content:
      'Yes! Go to Settings > Accessibility and select your preferred font size: Small, Medium, or Large. You can also enable High Contrast mode for better visibility.',
  },
  {
    title: 'How do I backup my data?',
    content:
      'In Settings > Data Management, click "Export Data as JSON". This downloads a file with all your timetables, assignments, and goals that you can keep safe as a backup.',
  },
  {
    title: 'Is my data private?',
    content:
      'Yes! All your data is stored locally on your device using browser storage. We don\'t send any data to external servers. Only you can access your information.',
  },
];

const tutorialSteps = [
  {
    title: 'Getting Started',
    description:
      'Start by adding your classes to the Timetable. Click "Add Class" and fill in your course details for each class in your schedule.',
  },
  {
    title: 'Check Your Dashboard',
    description:
      'Visit the Dashboard to see all your classes, assignments, and study goals in one place. It\'s the best way to get a quick overview of your week.',
  },
  {
    title: 'Add Assignments',
    description:
      'Track all your coursework by adding assignments with due dates and priority levels. Mark them complete as you finish them.',
  },
  {
    title: 'Set Study Goals',
    description:
      'Set weekly study goals and track your progress. Log the hours you\'ve studied to stay motivated and accountable.',
  },
  {
    title: 'Customize Your Experience',
    description:
      'Adjust your preferences in Settings. Change the theme, font size, Pomodoro timer length, and more to suit your needs.',
  },
];

export default function HelpPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-muted/50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Help & Support</h1>

        {/* Getting Started */}
        <Card className="p-8 mb-8 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/10 border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-4">
            <Play className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-semibold mb-3">Getting Started</h2>
              <p className="text-muted-foreground mb-6">
                Welcome to the Smart Student Timetable Planner! Follow these steps to get the most out of the app:
              </p>
              <div className="space-y-4">
                {tutorialSteps.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 dark:bg-blue-500 text-white flex items-center justify-center font-semibold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold">{step.title}</p>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Features Overview */}
        <Card className="p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            Features Overview
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Timetable</h3>
              <p className="text-sm text-muted-foreground">
                View your weekly schedule in grid or list format. Add, edit, and delete classes with ease.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Dashboard</h3>
              <p className="text-sm text-muted-foreground">
                Get a quick overview of your day, upcoming assignments, and study progress.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Assignments</h3>
              <p className="text-sm text-muted-foreground">
                Track all your coursework with due dates, priority levels, and completion status.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Study Goals</h3>
              <p className="text-sm text-muted-foreground">
                Set weekly study targets and monitor your progress towards your goals.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Accessibility</h3>
              <p className="text-sm text-muted-foreground">
                Customize font size, enable high contrast mode, and switch between light/dark themes.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Data Management</h3>
              <p className="text-sm text-muted-foreground">
                Export your data as a backup or import previously saved data.
              </p>
            </div>
          </div>
        </Card>

        {/* FAQ */}
        <Card className="p-8">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <HelpCircle className="w-6 h-6" />
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{item.title}</AccordionTrigger>
                <AccordionContent>{item.content}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Support */}
          <div className="mt-8 p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm mb-1">Need more help?</p>
                <p className="text-sm text-muted-foreground">
                  If you encounter any issues or have suggestions, feel free to reach out. Your feedback helps us improve!
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}
