'use client';

import { useTimetableStore, useAssignmentStore, useGoalStore } from '@/lib/store';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, CheckSquare, Target, Clock } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function DashboardPage() {
  const { slots } = useTimetableStore();
  const { assignments } = useAssignmentStore();
  const { goals } = useGoalStore();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) return null;

  const upcomingAssignments = assignments
    .filter((a) => !a.completed)
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 3);

  const todayClasses = slots.filter((slot) => {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    return slot.day === today;
  });

  const weeklyGoals = goals.filter((g) => {
    const today = new Date();
    const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
    return new Date(g.weekStartDate) >= weekStart;
  });

  const totalCompletedHours = weeklyGoals.reduce((sum, g) => sum + g.completedHours, 0);
  const totalTargetHours = weeklyGoals.reduce((sum, g) => sum + g.targetHours, 0);

  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-muted/50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/10 border-blue-200 dark:border-blue-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Total Classes</p>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{slots.length}</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-600 dark:text-blue-400 opacity-50" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/10 border-green-200 dark:border-green-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Today's Classes</p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">{todayClasses.length}</p>
              </div>
              <Clock className="w-8 h-8 text-green-600 dark:text-green-400 opacity-50" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-900/10 border-orange-200 dark:border-orange-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Pending Tasks</p>
                <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">{assignments.filter(a => !a.completed).length}</p>
              </div>
              <CheckSquare className="w-8 h-8 text-orange-600 dark:text-orange-400 opacity-50" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-900/10 border-purple-200 dark:border-purple-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Weekly Goals</p>
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{weeklyGoals.length}</p>
              </div>
              <Target className="w-8 h-8 text-purple-600 dark:text-purple-400 opacity-50" />
            </div>
          </Card>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Today's Classes */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Today's Schedule</h2>
            {todayClasses.length === 0 ? (
              <p className="text-muted-foreground">No classes today</p>
            ) : (
              <div className="space-y-3">
                {todayClasses.map((slot) => (
                  <div
                    key={slot.id}
                    className={`p-3 rounded-lg border-l-4 ${slot.color}`}
                  >
                    <p className="font-semibold text-sm">{slot.courseName}</p>
                    <p className="text-xs text-muted-foreground">{slot.startTime} - {slot.endTime}</p>
                    <p className="text-xs text-muted-foreground">Dr. {slot.lecturer}</p>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Upcoming Assignments */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Upcoming Assignments</h2>
            {upcomingAssignments.length === 0 ? (
              <p className="text-muted-foreground">No pending assignments</p>
            ) : (
              <div className="space-y-3">
                {upcomingAssignments.map((assignment) => (
                  <div
                    key={assignment.id}
                    className="p-3 rounded-lg border border-border bg-muted/50"
                  >
                    <p className="font-semibold text-sm">{assignment.title}</p>
                    <p className="text-xs text-muted-foreground">{assignment.course}</p>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-xs">{new Date(assignment.dueDate).toLocaleDateString()}</p>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          assignment.priority === 'high'
                            ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                            : assignment.priority === 'medium'
                            ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
                            : 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                        }`}
                      >
                        {assignment.priority}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <Button className="w-full mt-4" variant="outline" asChild>
              <Link href="/assignments">View All</Link>
            </Button>
          </Card>

          {/* Weekly Study Progress */}
          <Card className="p-6 lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Weekly Study Progress</h2>
            <div className="space-y-4">
              {weeklyGoals.length === 0 ? (
                <p className="text-muted-foreground">No study goals set this week</p>
              ) : (
                weeklyGoals.map((goal) => (
                  <div key={goal.id}>
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-sm">{goal.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {goal.completedHours}/{goal.targetHours} hours
                      </p>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{
                          width: `${Math.min((goal.completedHours / goal.targetHours) * 100, 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
            <Button className="w-full mt-4" variant="outline" asChild>
              <Link href="/goals">Set Goals</Link>
            </Button>
          </Card>
        </div>
      </div>
    </main>
  );
}
