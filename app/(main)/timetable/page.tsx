'use client';

import { useState, useEffect } from 'react';
import { useTimetableStore, useAccessibilityStore } from '@/lib/store';
import { TimeSlot } from '@/lib/types';
import { TimetableForm } from '@/components/timetable-form';
import { TimetableGrid } from '@/components/timetable-grid';
import { TimetableList } from '@/components/timetable-list';
import { ToastContainer, showToast } from '@/components/toast-notification';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Moon, Sun, Grid3x3, List, Book, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type ViewMode = 'grid' | 'list';

export default function TimetablePage() {
  const { slots, addSlot, updateSlot, deleteSlot, clearAll } = useTimetableStore();
  const { highContrast } = useAccessibilityStore();

  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [isDark, setIsDark] = useState(false);
  const [editingSlot, setEditingSlot] = useState<TimeSlot | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
    const isDarkMode =
      localStorage.getItem('theme') === 'dark' ||
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDark(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleAddSlot = (data: Omit<TimeSlot, 'id' | 'color'>) => {
    addSlot(data);
    showToast(`${data.courseName} added to your timetable!`, 'success');
    setShowForm(false);
  };

  const handleEditSlot = (slot: TimeSlot) => {
    setEditingSlot(slot);
    setShowForm(true);
  };

  const handleUpdateSlot = (data: Omit<TimeSlot, 'id' | 'color'>) => {
    if (editingSlot) {
      updateSlot(editingSlot.id, data);
      showToast(`${data.courseName} updated successfully!`, 'success');
      setEditingSlot(null);
      setShowForm(false);
    }
  };

  const handleDeleteSlot = (id: string) => {
    const slot = slots.find((s) => s.id === id);
    deleteSlot(id);
    if (slot) {
      showToast(`${slot.courseName} removed from timetable`, 'info');
    }
  };

  const handleClearAll = () => {
    if (confirm('Are you sure? This will delete all your classes permanently.')) {
      clearAll();
      showToast('All classes cleared from your timetable', 'info');
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingSlot(null);
  };

  if (!isHydrated) return null;

  return (
    <main className={cn(
      'min-h-screen bg-gradient-to-br from-background via-background to-muted/30',
      highContrast && 'high-contrast-mode'
    )}>
      <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Book className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-balance">Your Timetable</h1>
                <p className="text-muted-foreground text-sm mt-1">Organize and manage your weekly class schedule</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="lg"
              onClick={toggleDarkMode}
              aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            >
              {isDark ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>
          </div>

          {/* View Controls */}
          <div className="flex gap-2 flex-wrap">
            <div className="flex gap-2 bg-muted p-1 rounded-lg border border-border">
              <Button
                size="sm"
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                onClick={() => setViewMode('grid')}
                aria-pressed={viewMode === 'grid'}
                className="gap-2"
              >
                <Grid3x3 className="w-4 h-4" />
                Grid View
              </Button>
              <Button
                size="sm"
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                onClick={() => setViewMode('list')}
                aria-pressed={viewMode === 'list'}
                className="gap-2"
              >
                <List className="w-4 h-4" />
                List View
              </Button>
            </div>
            {slots.length > 0 && (
              <Button
                size="sm"
                variant="outline"
                onClick={handleClearAll}
                className="ml-auto gap-2 text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
                Clear All
              </Button>
            )}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              {!showForm ? (
                <Button
                  size="lg"
                  onClick={() => setShowForm(true)}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                  aria-label="Add new class"
                >
                  <Book className="w-5 h-5 mr-2" />
                  Add New Class
                </Button>
              ) : (
                <TimetableForm
                  initialData={editingSlot || undefined}
                  onSubmit={editingSlot ? handleUpdateSlot : handleAddSlot}
                  onCancel={handleCancel}
                  submitLabel={editingSlot ? 'Update Class' : 'Add Class'}
                />
              )}

              {/* Info Card */}
              <Card className="mt-4 p-4 bg-accent/5 border border-accent/20 space-y-3">
                <h3 className="font-semibold text-sm text-foreground">Quick Tips</h3>
                <ul className="text-xs space-y-2 text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-accent">→</span>
                    <span>Enter course name and lecturer details</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent">→</span>
                    <span>Select day and time for your class</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent">→</span>
                    <span>Each course gets a unique color</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent">→</span>
                    <span>Edit or delete classes anytime</span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>

          {/* Timetable Display Section */}
          <div className="lg:col-span-2">
            <Card className="p-6 bg-card border border-border shadow-lg">
              {slots.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Book className="w-8 h-8 text-muted-foreground/50" />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground mb-2">
                    No Classes Yet
                  </h2>
                  <p className="text-muted-foreground text-center max-w-md">
                    Get started by adding your first class. Build your perfect weekly schedule today!
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-foreground">
                    {viewMode === 'grid' ? (
                      <>
                        <div className="w-5 h-5 rounded bg-primary/20 flex items-center justify-center">
                          <Grid3x3 className="w-3 h-3 text-primary" />
                        </div>
                        Weekly Schedule
                      </>
                    ) : (
                      <>
                        <div className="w-5 h-5 rounded bg-primary/20 flex items-center justify-center">
                          <List className="w-3 h-3 text-primary" />
                        </div>
                        All Classes
                      </>
                    )}
                  </h2>
                  {viewMode === 'grid' ? (
                    <TimetableGrid
                      slots={slots}
                      onEdit={handleEditSlot}
                      onDelete={handleDeleteSlot}
                    />
                  ) : (
                    <TimetableList
                      slots={slots}
                      onEdit={handleEditSlot}
                      onDelete={handleDeleteSlot}
                    />
                  )}
                </>
              )}
            </Card>
          </div>
        </div>
      </div>

      <ToastContainer />
    </main>
  );
}
