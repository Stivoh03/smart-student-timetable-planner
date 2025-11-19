'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TimeSlot } from '@/lib/types';
import { DAYS_OF_WEEK, TIME_SLOTS } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, X } from 'lucide-react';

interface TimetableFormProps {
  initialData?: TimeSlot;
  onSubmit: (data: Omit<TimeSlot, 'id' | 'color'>) => void;
  onCancel: () => void;
  submitLabel?: string;
}

export function TimetableForm({
  initialData,
  onSubmit,
  onCancel,
  submitLabel = 'Add Class',
}: TimetableFormProps) {
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: initialData || {
      courseName: '',
      lecturer: '',
      day: 'Monday',
      startTime: '09:00',
      endTime: '10:00',
    },
  });

  const startTime = watch('startTime');
  const endTime = watch('endTime');
  const isTimeInvalid = startTime >= endTime;

  return (
    <Card className="p-6 bg-card border border-border shadow-md">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Course Name Field */}
        <div className="space-y-2">
          <label htmlFor="course" className="block text-sm font-semibold text-foreground">
            Course Name <span className="text-destructive font-bold">*</span>
          </label>
          <input
            id="course"
            {...register('courseName', { 
              required: 'Course name is required',
              minLength: { value: 2, message: 'Course name must be at least 2 characters' }
            })}
            placeholder="e.g., Data Structures"
            className="w-full px-3 py-2.5 border border-input rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            aria-describedby={errors.courseName ? 'course-error' : undefined}
          />
          {errors.courseName && (
            <p id="course-error" className="text-destructive text-xs font-medium">
              {errors.courseName.message}
            </p>
          )}
        </div>

        {/* Lecturer Name Field */}
        <div className="space-y-2">
          <label htmlFor="lecturer" className="block text-sm font-semibold text-foreground">
            Lecturer Name <span className="text-destructive font-bold">*</span>
          </label>
          <input
            id="lecturer"
            {...register('lecturer', { 
              required: 'Lecturer name is required',
              minLength: { value: 2, message: 'Lecturer name must be at least 2 characters' }
            })}
            placeholder="e.g., Dr. Smith"
            className="w-full px-3 py-2.5 border border-input rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            aria-describedby={errors.lecturer ? 'lecturer-error' : undefined}
          />
          {errors.lecturer && (
            <p id="lecturer-error" className="text-destructive text-xs font-medium">
              {errors.lecturer.message}
            </p>
          )}
        </div>

        {/* Day Selection */}
        <div className="space-y-2">
          <label htmlFor="day" className="block text-sm font-semibold text-foreground">
            Day of Week <span className="text-destructive font-bold">*</span>
          </label>
          <select
            id="day"
            {...register('day', { required: 'Day is required' })}
            className="w-full px-3 py-2.5 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all cursor-pointer"
          >
            {DAYS_OF_WEEK.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>

        {/* Time Selection */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            Class Time <span className="text-destructive font-bold">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label htmlFor="startTime" className="block text-xs font-medium text-muted-foreground">
                Start Time
              </label>
              <select
                id="startTime"
                {...register('startTime', { required: 'Start time is required' })}
                className="w-full px-3 py-2.5 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all cursor-pointer"
              >
                {TIME_SLOTS.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="endTime" className="block text-xs font-medium text-muted-foreground">
                End Time
              </label>
              <select
                id="endTime"
                {...register('endTime', { required: 'End time is required' })}
                className="w-full px-3 py-2.5 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all cursor-pointer"
              >
                {TIME_SLOTS.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {isTimeInvalid && (
            <p className="text-destructive text-xs font-medium mt-2">
              End time must be after start time
            </p>
          )}
        </div>

        {/* Form Actions */}
        <div className="flex gap-2 pt-4 border-t border-border">
          <Button 
            type="submit" 
            className="flex-1 font-semibold"
            disabled={isTimeInvalid}
          >
            <Plus className="w-4 h-4 mr-2" />
            {submitLabel}
          </Button>
          <Button
            type="button"
            onClick={onCancel}
            variant="outline"
            className="flex-1"
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
}
