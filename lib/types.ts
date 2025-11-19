export interface TimeSlot {
  id: string;
  courseName: string;
  lecturer: string;
  day: string;
  startTime: string;
  endTime: string;
  color: string;
}

export interface TimetableStore {
  slots: TimeSlot[];
  addSlot: (slot: Omit<TimeSlot, 'id'>) => void;
  updateSlot: (id: string, slot: Partial<TimeSlot>) => void;
  deleteSlot: (id: string) => void;
  clearAll: () => void;
}

export interface AccessibilitySettings {
  fontSize: 'small' | 'medium' | 'large';
  highContrast: boolean;
  setFontSize?: (size: 'small' | 'medium' | 'large') => void;
  setHighContrast?: (enabled: boolean) => void;
}

export interface Assignment {
  id: string;
  course: string;
  title: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  description?: string;
}

export interface StudyGoal {
  id: string;
  title: string;
  targetHours: number;
  completedHours: number;
  weekStartDate: string;
  description?: string;
  completed: boolean;
}

export interface Theme {
  mode: 'light' | 'dark' | 'system';
  accentColor: string;
}

export interface AppSettings {
  theme: Theme;
  notifications: boolean;
  pomodoroLength: number;
}
