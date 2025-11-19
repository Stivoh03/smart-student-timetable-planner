'use client';

import { useState, useEffect } from 'react';
import { useGoalStore } from '@/lib/store';
import { StudyGoal } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Trash2, Edit2, TrendingUp, Target } from 'lucide-react';
import { showToast } from '@/components/toast-notification';

export default function GoalsPage() {
  const { goals, addGoal, updateGoal, deleteGoal } = useGoalStore();
  const [isHydrated, setIsHydrated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<StudyGoal, 'id'>>({
    title: '',
    targetHours: 10,
    completedHours: 0,
    weekStartDate: new Date().toISOString().split('T')[0],
    description: '',
    completed: false,
  });

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || formData.targetHours <= 0) {
      showToast('Please enter a goal title and target hours', 'error');
      return;
    }

    if (editingId) {
      updateGoal(editingId, formData);
      showToast(`"${formData.title}" has been updated!`, 'success');
      setEditingId(null);
    } else {
      addGoal(formData);
      showToast(`"${formData.title}" goal created!`, 'success');
    }

    setFormData({
      title: '',
      targetHours: 10,
      completedHours: 0,
      weekStartDate: new Date().toISOString().split('T')[0],
      description: '',
      completed: false,
    });
    setIsOpen(false);
  };

  const handleEdit = (goal: StudyGoal) => {
    const { id, ...rest } = goal;
    setFormData(rest);
    setEditingId(id);
    setIsOpen(true);
  };

  const handleDelete = (id: string) => {
    const goal = goals.find(g => g.id === id);
    if (confirm(`Delete "${goal?.title}"?`)) {
      deleteGoal(id);
      showToast(`"${goal?.title}" has been deleted`, 'info');
    }
  };

  const handleUpdateHours = (id: string, hours: number) => {
    updateGoal(id, { completedHours: Math.max(0, hours) });
  };

  if (!isHydrated) return null;

  const weeklyGoals = goals.filter((g) => {
    const today = new Date();
    const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
    return new Date(g.weekStartDate) >= weekStart;
  });

  const totalCompleted = weeklyGoals.reduce((sum, g) => sum + g.completedHours, 0);
  const totalTarget = weeklyGoals.reduce((sum, g) => sum + g.targetHours, 0);
  const overallProgress = totalTarget > 0 ? (totalCompleted / totalTarget) * 100 : 0;

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-balance">Study Goals</h1>
              <p className="text-muted-foreground text-sm mt-1">Set weekly learning objectives and track progress</p>
            </div>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button 
                size="lg"
                onClick={() => {
                  setEditingId(null);
                  setFormData({
                    title: '',
                    targetHours: 10,
                    completedHours: 0,
                    weekStartDate: new Date().toISOString().split('T')[0],
                    description: '',
                    completed: false,
                  });
                }}
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Goal
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>{editingId ? 'Edit Goal' : 'Set New Study Goal'}</DialogTitle>
                <DialogDescription>
                  {editingId ? 'Update your goal details' : 'Create a new weekly learning objective'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor="title" className="block text-sm font-semibold">
                    Goal Title <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="title"
                    placeholder="e.g., Study Physics Chapter 3"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="targetHours" className="block text-sm font-semibold">
                    Target Hours <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="targetHours"
                    type="number"
                    placeholder="10"
                    min="1"
                    step="0.5"
                    value={formData.targetHours}
                    onChange={(e) => setFormData({ ...formData, targetHours: parseFloat(e.target.value) || 1 })}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="weekStartDate" className="block text-sm font-semibold">
                    Week Start Date
                  </label>
                  <Input
                    id="weekStartDate"
                    type="date"
                    value={formData.weekStartDate}
                    onChange={(e) => setFormData({ ...formData, weekStartDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="description" className="block text-sm font-semibold">
                    Description (Optional)
                  </label>
                  <Textarea
                    id="description"
                    placeholder="Add notes or details about your goal..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="resize-none"
                  />
                </div>
                <Button type="submit" className="w-full font-semibold">
                  {editingId ? 'Update' : 'Create'} Goal
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Weekly Progress Overview */}
        {weeklyGoals.length > 0 && (
          <Card className="p-6 mb-8 bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-950/20 dark:to-purple-900/10 border border-purple-200 dark:border-purple-800">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <div className="w-5 h-5 rounded bg-purple-600/20 flex items-center justify-center">
                    <TrendingUp className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                  </div>
                  Weekly Progress
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {totalCompleted.toFixed(1)} of {totalTarget} hours completed
                </p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  {Math.round(overallProgress)}%
                </p>
              </div>
            </div>
            <div className="w-full bg-purple-200 dark:bg-purple-800/30 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-purple-600 to-purple-500 dark:from-purple-400 dark:to-purple-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(overallProgress, 100)}%` }}
              />
            </div>
          </Card>
        )}

        {/* Goals List */}
        <div className="space-y-3">
          {weeklyGoals.length === 0 ? (
            <Card className="p-12 text-center border-dashed">
              <Target className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">No study goals set for this week</p>
              <p className="text-muted-foreground text-sm mt-2">Create your first goal to start tracking progress</p>
            </Card>
          ) : (
            weeklyGoals.map((goal) => {
              const progress = Math.min((goal.completedHours / goal.targetHours) * 100, 100);
              return (
                <Card key={goal.id} className="p-5 border hover:border-primary/50 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground text-lg">{goal.title}</p>
                      {goal.description && (
                        <p className="text-sm text-muted-foreground mt-2">{goal.description}</p>
                      )}
                      
                      {/* Progress Bar */}
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-muted-foreground">Progress</span>
                          <span className="text-xs font-bold text-primary">
                            {goal.completedHours.toFixed(1)}/{goal.targetHours} hours
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-primary to-accent h-2.5 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>

                      {/* Hour Buttons */}
                      <div className="flex gap-2 mt-4 flex-wrap">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUpdateHours(goal.id, goal.completedHours - 1)}
                          className="text-xs"
                        >
                          -1h
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUpdateHours(goal.id, goal.completedHours - 0.5)}
                          className="text-xs"
                        >
                          -0.5h
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUpdateHours(goal.id, goal.completedHours + 0.5)}
                          className="text-xs"
                        >
                          +0.5h
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUpdateHours(goal.id, goal.completedHours + 1)}
                          className="text-xs"
                        >
                          +1h
                        </Button>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(goal)}
                        aria-label={`Edit ${goal.title}`}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(goal.id)}
                        className="text-destructive hover:text-destructive"
                        aria-label={`Delete ${goal.title}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </main>
  );
}
