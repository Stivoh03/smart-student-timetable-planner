'use client';

import { useState, useCallback } from 'react';
import { X, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

export type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  type: ToastType;
  message: string;
}

const toastStore: Toast[] = [];
const listeners = new Set<() => void>();

export function showToast(message: string, type: ToastType = 'info') {
  const id = Date.now().toString();
  const toast: Toast = { id, type, message };
  toastStore.push(toast);
  listeners.forEach((listener) => listener());

  setTimeout(() => {
    const index = toastStore.findIndex((t) => t.id === id);
    if (index !== -1) {
      toastStore.splice(index, 1);
      listeners.forEach((listener) => listener());
    }
  }, 3500);
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useCallback(() => {
    const listener = () => setToasts([...toastStore]);
    listeners.add(listener);
    return () => listeners.delete(listener);
  }, [])();

  const removeToast = (id: string) => {
    const index = toastStore.findIndex((t) => t.id === id);
    if (index !== -1) {
      toastStore.splice(index, 1);
      setToasts([...toastStore]);
    }
  };

  const toastConfig = {
    success: {
      bg: 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800',
      text: 'text-emerald-900 dark:text-emerald-100',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />,
    },
    error: {
      bg: 'bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-800',
      text: 'text-red-900 dark:text-red-100',
      icon: <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />,
    },
    info: {
      bg: 'bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800',
      text: 'text-blue-900 dark:text-blue-100',
      icon: <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />,
    },
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2 pointer-events-none">
      {toastStore.map((toast) => {
        const config = toastConfig[toast.type];
        return (
          <div
            key={toast.id}
            className={`${config.bg} ${config.text} px-4 py-3 rounded-lg border shadow-lg flex items-center gap-3 min-w-[320px] pointer-events-auto animate-in fade-in slide-in-from-bottom-4 duration-300`}
            role="status"
            aria-live="polite"
            aria-label={`${toast.type} notification`}
          >
            {config.icon}
            <span className="text-sm font-medium flex-1">{toast.message}</span>
            <Button
              size="sm"
              variant="ghost"
              className="h-6 w-6 p-0 hover:bg-current/10 flex-shrink-0"
              onClick={() => removeToast(toast.id)}
              aria-label={`Close ${toast.message}`}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        );
      })}
    </div>
  );
}
