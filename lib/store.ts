import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TimeSlot, TimetableStore, AccessibilitySettings, Assignment, StudyGoal, AppSettings, Theme } from './types';

// Generate unique ID
const generateId = () => Math.random().toString(36).substr(2, 9);

// Color palette for timetable entries
const colors = [
  'bg-blue-100 dark:bg-blue-900 border-blue-300 dark:border-blue-700',
  'bg-purple-100 dark:bg-purple-900 border-purple-300 dark:border-purple-700',
  'bg-pink-100 dark:bg-pink-900 border-pink-300 dark:border-pink-700',
  'bg-emerald-100 dark:bg-emerald-900 border-emerald-300 dark:border-emerald-700',
  'bg-amber-100 dark:bg-amber-900 border-amber-300 dark:border-amber-700',
  'bg-cyan-100 dark:bg-cyan-900 border-cyan-300 dark:border-cyan-700',
];

let colorIndex = 0;

export const useTimetableStore = create<TimetableStore>()(
  persist(
    (set) => ({
      slots: [],
      addSlot: (slot) =>
        set((state) => ({
          slots: [
            ...state.slots,
            {
              ...slot,
              id: generateId(),
              color: colors[colorIndex++ % colors.length],
            },
          ],
        })),
      updateSlot: (id, updates) =>
        set((state) => ({
          slots: state.slots.map((slot) =>
            slot.id === id ? { ...slot, ...updates } : slot
          ),
        })),
      deleteSlot: (id) =>
        set((state) => ({
          slots: state.slots.filter((slot) => slot.id !== id),
        })),
      clearAll: () => set({ slots: [] }),
    }),
    {
      name: 'timetable-storage',
    }
  )
);

// Accessibility store
export const useAccessibilityStore = create<AccessibilitySettings>()(
  persist(
    (set) => ({
      fontSize: 'medium',
      highContrast: false,
      setFontSize: (size: 'small' | 'medium' | 'large') =>
        set({ fontSize: size }),
      setHighContrast: (enabled: boolean) =>
        set({ highContrast: enabled }),
    }),
    {
      name: 'accessibility-storage',
    }
  )
);

// Assignment store
export const useAssignmentStore = create<{
  assignments: Assignment[];
  addAssignment: (assignment: Omit<Assignment, 'id'>) => void;
  updateAssignment: (id: string, updates: Partial<Assignment>) => void;
  deleteAssignment: (id: string) => void;
  clearAssignments: () => void;
}>()(
  persist(
    (set) => ({
      assignments: [],
      addAssignment: (assignment) =>
        set((state) => ({
          assignments: [
            ...state.assignments,
            {
              ...assignment,
              id: Math.random().toString(36).substr(2, 9),
            },
          ],
        })),
      updateAssignment: (id, updates) =>
        set((state) => ({
          assignments: state.assignments.map((a) =>
            a.id === id ? { ...a, ...updates } : a
          ),
        })),
      deleteAssignment: (id) =>
        set((state) => ({
          assignments: state.assignments.filter((a) => a.id !== id),
        })),
      clearAssignments: () => set({ assignments: [] }),
    }),
    {
      name: 'assignments-storage',
    }
  )
);

// Goal store
export const useGoalStore = create<{
  goals: StudyGoal[];
  addGoal: (goal: Omit<StudyGoal, 'id'>) => void;
  updateGoal: (id: string, updates: Partial<StudyGoal>) => void;
  deleteGoal: (id: string) => void;
  clearGoals: () => void;
}>()(
  persist(
    (set) => ({
      goals: [],
      addGoal: (goal) =>
        set((state) => ({
          goals: [
            ...state.goals,
            {
              ...goal,
              id: Math.random().toString(36).substr(2, 9),
            },
          ],
        })),
      updateGoal: (id, updates) =>
        set((state) => ({
          goals: state.goals.map((g) =>
            g.id === id ? { ...g, ...updates } : g
          ),
        })),
      deleteGoal: (id) =>
        set((state) => ({
          goals: state.goals.filter((g) => g.id !== id),
        })),
      clearGoals: () => set({ goals: [] }),
    }),
    {
      name: 'goals-storage',
    }
  )
);

// Settings store
export const useSettingsStore = create<{
  settings: AppSettings;
  updateTheme: (theme: Theme) => void;
  toggleNotifications: () => void;
  setPomodoroLength: (minutes: number) => void;
}>()(
  persist(
    (set) => ({
      settings: {
        theme: { mode: 'system', accentColor: 'blue' },
        notifications: true,
        pomodoroLength: 25,
      },
      updateTheme: (theme) =>
        set((state) => ({
          settings: { ...state.settings, theme },
        })),
      toggleNotifications: () =>
        set((state) => ({
          settings: {
            ...state.settings,
            notifications: !state.settings.notifications,
          },
        })),
      setPomodoroLength: (minutes) =>
        set((state) => ({
          settings: {
            ...state.settings,
            pomodoroLength: minutes,
          },
        })),
    }),
    {
      name: 'settings-storage',
    }
  )
);
