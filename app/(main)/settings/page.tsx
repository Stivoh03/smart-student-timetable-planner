'use client';

import { useState, useEffect } from 'react';
import { useAccessibilityStore, useTimetableStore, useAssignmentStore, useGoalStore, useSettingsStore } from '@/lib/store';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Moon, Sun, Monitor, Type, Contrast, RotateCcw, Download, Upload, SettingsIcon, Bell } from 'lucide-react';
import { showToast } from '@/components/toast-notification';

export default function SettingsPage() {
  const { fontSize, highContrast, setFontSize, setHighContrast } = useAccessibilityStore();
  const { settings, updateTheme, toggleNotifications, setPomodoroLength } = useSettingsStore();
  const { slots, clearAll: clearTimetable } = useTimetableStore();
  const { assignments, clearAssignments } = useAssignmentStore();
  const { goals, clearGoals } = useGoalStore();
  const [isHydrated, setIsHydrated] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
    const isDarkMode =
      localStorage.getItem('theme') === 'dark' ||
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDark(isDarkMode);
  }, []);

  const handleThemeChange = (mode: 'light' | 'dark' | 'system') => {
    updateTheme({ ...settings.theme, mode });
    if (mode === 'dark' || (mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    }
    showToast('Theme preference updated!', 'success');
  };

  const handleExportData = () => {
    const data = {
      timetable: slots,
      assignments,
      goals,
      settings: {
        fontSize,
        highContrast,
        theme: settings.theme,
      },
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `timetable-planner-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    showToast('Your data has been exported successfully!', 'success');
  };

  const handleImportData = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e: any) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const data = JSON.parse(event.target?.result as string);
            showToast('Import functionality coming soon!', 'info');
          } catch (error) {
            showToast('Failed to import data. Please check the file format.', 'error');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleResetAllData = () => {
    clearTimetable();
    clearAssignments();
    clearGoals();
    showToast('All your data has been permanently reset', 'info');
  };

  if (!isHydrated) return null;

  const totalData = slots.length + assignments.length + goals.length;

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
              <SettingsIcon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Settings</h1>
              <p className="text-muted-foreground text-sm mt-1">Customize your app experience</p>
            </div>
          </div>
        </div>

        {/* Theme Section */}
        <Card className="p-6 mb-6 border">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
              <Sun className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-xl font-semibold">Theme</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label htmlFor="appearance" className="text-sm font-medium mb-3 block">
                Appearance
              </label>
              <Select value={settings.theme.mode} onValueChange={(value: any) => handleThemeChange(value)}>
                <SelectTrigger id="appearance" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">
                    <div className="flex items-center gap-2">
                      <Sun className="w-4 h-4" />
                      Light Mode
                    </div>
                  </SelectItem>
                  <SelectItem value="dark">
                    <div className="flex items-center gap-2">
                      <Moon className="w-4 h-4" />
                      Dark Mode
                    </div>
                  </SelectItem>
                  <SelectItem value="system">
                    <div className="flex items-center gap-2">
                      <Monitor className="w-4 h-4" />
                      System Default
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-2">
                Choose how the app looks on your device
              </p>
            </div>
          </div>
        </Card>

        {/* Accessibility Section */}
        <Card className="p-6 mb-6 border">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/20 flex items-center justify-center">
              <Type className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h2 className="text-xl font-semibold">Accessibility</h2>
          </div>
          <div className="space-y-5">
            <div>
              <label htmlFor="fontSize" className="text-sm font-medium mb-3 flex items-center gap-2">
                <Type className="w-4 h-4" />
                Font Size
              </label>
              <Select value={fontSize} onValueChange={(value: any) => {
                setFontSize(value);
                showToast('Font size updated!', 'success');
              }}>
                <SelectTrigger id="fontSize">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small (Compact)</SelectItem>
                  <SelectItem value="medium">Medium (Default)</SelectItem>
                  <SelectItem value="large">Large (Easier to Read)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-2">
                Adjust text size for better readability
              </p>
            </div>

            <div className="border-t border-border pt-5">
              <div className="flex items-center justify-between">
                <label htmlFor="contrast" className="text-sm font-medium flex items-center gap-2">
                  <Contrast className="w-4 h-4" />
                  High Contrast Mode
                </label>
                <Switch
                  id="contrast"
                  checked={highContrast}
                  onCheckedChange={(checked) => {
                    setHighContrast(checked);
                    showToast(checked ? 'High contrast enabled' : 'High contrast disabled', 'success');
                  }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Increase color contrast for better visibility
              </p>
            </div>
          </div>
        </Card>

        {/* Productivity Section */}
        <Card className="p-6 mb-6 border">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
              <Bell className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
            <h2 className="text-xl font-semibold">Productivity</h2>
          </div>
          <div className="space-y-5">
            <div>
              <label htmlFor="pomodoro" className="text-sm font-medium mb-3 block">
                Pomodoro Timer Length
              </label>
              <Select value={settings.pomodoroLength.toString()} onValueChange={(value) => {
                setPomodoroLength(parseInt(value));
                showToast(`Pomodoro timer set to ${value} minutes`, 'success');
              }}>
                <SelectTrigger id="pomodoro">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="25">25 minutes (Recommended)</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">60 minutes</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-2">
                Set your preferred study interval length
              </p>
            </div>

            <div className="border-t border-border pt-5">
              <div className="flex items-center justify-between">
                <label htmlFor="notifications" className="text-sm font-medium flex items-center gap-2">
                  <Bell className="w-4 h-4" />
                  Enable Notifications
                </label>
                <Switch
                  id="notifications"
                  checked={settings.notifications}
                  onCheckedChange={() => {
                    toggleNotifications();
                    showToast('Notification settings updated!', 'success');
                  }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Get reminders for assignments and goals
              </p>
            </div>
          </div>
        </Card>

        {/* Data Management Section */}
        <Card className="p-6 mb-6 border">
          <h2 className="text-xl font-semibold mb-5">Data Management</h2>
          <div className="space-y-3">
            <Button 
              onClick={handleExportData} 
              variant="outline" 
              className="w-full justify-start h-auto py-3"
            >
              <Download className="w-5 h-5 mr-3 flex-shrink-0" />
              <div className="text-left">
                <p className="font-medium">Export Your Data</p>
                <p className="text-xs text-muted-foreground">Save {totalData} item(s) as JSON backup</p>
              </div>
            </Button>
            <Button 
              onClick={handleImportData} 
              variant="outline" 
              className="w-full justify-start h-auto py-3"
            >
              <Upload className="w-5 h-5 mr-3 flex-shrink-0" />
              <div className="text-left">
                <p className="font-medium">Import Data</p>
                <p className="text-xs text-muted-foreground">Restore from a previously exported file</p>
              </div>
            </Button>
          </div>
        </Card>

        {/* Danger Zone */}
        <Card className="p-6 border border-destructive/50 bg-destructive/5">
          <h2 className="text-xl font-semibold mb-5 text-destructive flex items-center gap-2">
            <RotateCcw className="w-5 h-5" />
            Danger Zone
          </h2>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                variant="destructive" 
                className="w-full justify-start h-auto py-3"
              >
                <RotateCcw className="w-5 h-5 mr-3 flex-shrink-0" />
                <div className="text-left">
                  <p className="font-medium">Reset All Data</p>
                  <p className="text-xs opacity-90">Permanently delete all {totalData} items</p>
                </div>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Reset All Data Permanently?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will delete all your timetables, assignments, study goals, and settings. This action cannot be undone. Consider exporting your data first.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="flex gap-3">
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleResetAllData} className="bg-destructive hover:bg-destructive/90">
                  Permanently Delete All Data
                </AlertDialogAction>
              </div>
            </AlertDialogContent>
          </AlertDialog>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>Smart Student Timetable Planner v1.0.1</p>
          <p className="mt-1">Built with accessibility and usability in mind</p>
        </div>
      </div>
    </main>
  );
}
