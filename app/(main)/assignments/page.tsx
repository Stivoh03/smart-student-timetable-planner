'use client';

import { useState, useEffect } from 'react';
import { useAssignmentStore } from '@/lib/store';
import { Assignment } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Trash2, Edit2, CheckCircle2, Circle, BookOpen } from 'lucide-react';
import { showToast } from '@/components/toast-notification';

export default function AssignmentsPage() {
  const { assignments, addAssignment, updateAssignment, deleteAssignment } = useAssignmentStore();
  const [isHydrated, setIsHydrated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Assignment, 'id'>>({
    course: '',
    title: '',
    dueDate: '',
    priority: 'medium',
    completed: false,
    description: '',
  });

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.course || !formData.title || !formData.dueDate) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    if (editingId) {
      updateAssignment(editingId, formData);
      showToast(`"${formData.title}" has been updated!`, 'success');
      setEditingId(null);
    } else {
      addAssignment(formData);
      showToast(`"${formData.title}" added to your assignments!`, 'success');
    }

    setFormData({
      course: '',
      title: '',
      dueDate: '',
      priority: 'medium',
      completed: false,
      description: '',
    });
    setIsOpen(false);
  };

  const handleEdit = (assignment: Assignment) => {
    const { id, ...rest } = assignment;
    setFormData(rest);
    setEditingId(id);
    setIsOpen(true);
  };

  const handleDelete = (id: string) => {
    const assignment = assignments.find(a => a.id === id);
    if (confirm(`Delete "${assignment?.title}"?`)) {
      deleteAssignment(id);
      showToast(`"${assignment?.title}" has been deleted`, 'info');
    }
  };

  const handleToggleComplete = (id: string, completed: boolean) => {
    const assignment = assignments.find(a => a.id === id);
    updateAssignment(id, { completed: !completed });
    showToast(
      !completed ? `"${assignment?.title}" marked as complete!` : `"${assignment?.title}" marked as pending`,
      'success'
    );
  };

  if (!isHydrated) return null;

  const sortedAssignments = [...assignments].sort(
    (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  );

  const pendingCount = assignments.filter((a) => !a.completed).length;
  const completedCount = assignments.filter((a) => a.completed).length;

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-balance">Assignments</h1>
              <p className="text-muted-foreground text-sm mt-1">Track and manage your coursework</p>
            </div>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button 
                size="lg"
                onClick={() => {
                  setEditingId(null);
                  setFormData({
                    course: '',
                    title: '',
                    dueDate: '',
                    priority: 'medium',
                    completed: false,
                    description: '',
                  });
                }}
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Assignment
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>{editingId ? 'Edit Assignment' : 'Add New Assignment'}</DialogTitle>
                <DialogDescription>
                  {editingId ? 'Update your assignment details below' : 'Create a new assignment to track'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor="course" className="block text-sm font-semibold">
                    Course <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="course"
                    placeholder="e.g., Mathematics"
                    value={formData.course}
                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="title" className="block text-sm font-semibold">
                    Assignment Title <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="title"
                    placeholder="e.g., Chapter 5 Problems"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="dueDate" className="block text-sm font-semibold">
                    Due Date <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="priority" className="block text-sm font-semibold">
                    Priority Level
                  </label>
                  <Select value={formData.priority} onValueChange={(value: any) => setFormData({ ...formData, priority: value })}>
                    <SelectTrigger id="priority">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low Priority</SelectItem>
                      <SelectItem value="medium">Medium Priority</SelectItem>
                      <SelectItem value="high">High Priority</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="description" className="block text-sm font-semibold">
                    Description (Optional)
                  </label>
                  <Textarea
                    id="description"
                    placeholder="Add notes or details..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="resize-none"
                  />
                </div>
                <Button type="submit" className="w-full font-semibold">
                  {editingId ? 'Update' : 'Add'} Assignment
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-950/20 dark:to-orange-900/10 border border-orange-200 dark:border-orange-800">
            <p className="text-muted-foreground text-sm font-medium mb-2">Pending</p>
            <p className="text-4xl font-bold text-orange-600 dark:text-orange-400">{pendingCount}</p>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-950/20 dark:to-emerald-900/10 border border-emerald-200 dark:border-emerald-800">
            <p className="text-muted-foreground text-sm font-medium mb-2">Completed</p>
            <p className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">{completedCount}</p>
          </Card>
        </div>

        {/* Assignments List */}
        <div className="space-y-3">
          {sortedAssignments.length === 0 ? (
            <Card className="p-12 text-center border-dashed">
              <BookOpen className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">No assignments yet</p>
              <p className="text-muted-foreground text-sm mt-2">Add your first assignment to get started</p>
            </Card>
          ) : (
            sortedAssignments.map((assignment) => (
              <Card 
                key={assignment.id} 
                className={`p-4 border transition-all ${assignment.completed ? 'opacity-60 bg-muted/30' : 'hover:border-primary/50'}`}
              >
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => handleToggleComplete(assignment.id, assignment.completed)}
                    className="mt-1 text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
                    aria-label={assignment.completed ? 'Mark as pending' : 'Mark as complete'}
                  >
                    {assignment.completed ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </button>
                  <div className="flex-1 min-w-0">
                    <p className={`font-semibold ${assignment.completed ? 'line-through text-muted-foreground' : ''}`}>
                      {assignment.title}
                    </p>
                    <p className="text-sm text-muted-foreground">{assignment.course}</p>
                    {assignment.description && (
                      <p className="text-sm text-muted-foreground mt-2">{assignment.description}</p>
                    )}
                    <div className="flex items-center gap-3 mt-3 flex-wrap">
                      <span className="text-xs font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded">
                        Due: {new Date(assignment.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                      <span
                        className={`text-xs px-2.5 py-1 rounded font-medium ${
                          assignment.priority === 'high'
                            ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                            : assignment.priority === 'medium'
                            ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
                            : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                        }`}
                      >
                        {assignment.priority.charAt(0).toUpperCase() + assignment.priority.slice(1)}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(assignment)}
                      aria-label={`Edit ${assignment.title}`}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(assignment.id)}
                      className="text-destructive hover:text-destructive"
                      aria-label={`Delete ${assignment.title}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
