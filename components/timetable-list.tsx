'use client';

import { TimeSlot } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, Edit2 } from 'lucide-react';

interface TimetableListProps {
  slots: TimeSlot[];
  onEdit: (slot: TimeSlot) => void;
  onDelete: (id: string) => void;
}

export function TimetableList({
  slots,
  onEdit,
  onDelete,
}: TimetableListProps) {
  if (slots.length === 0) {
    return (
      <Card className="p-8 text-center bg-card border border-border">
        <p className="text-muted-foreground">
          No classes added yet. Create your first timetable entry!
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {slots.map((slot) => (
        <Card
          key={slot.id}
          className={`p-4 border-l-4 shadow-md hover:shadow-lg transition-shadow ${slot.color}`}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="font-semibold text-sm">{slot.courseName}</h3>
              <p className="text-xs text-muted-foreground">
                {slot.lecturer}
              </p>
              <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                <span>{slot.day}</span>
                <span>{slot.startTime} - {slot.endTime}</span>
              </div>
            </div>
            <div className="flex gap-1">
              <Button
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0"
                onClick={() => onEdit(slot)}
                aria-label={`Edit ${slot.courseName}`}
              >
                <Edit2 className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10"
                onClick={() => onDelete(slot.id)}
                aria-label={`Delete ${slot.courseName}`}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
