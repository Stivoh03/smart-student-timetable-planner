'use client';

import { useMemo } from 'react';
import { TimeSlot } from '@/lib/types';
import { DAYS_OF_WEEK, TIME_SLOTS, formatTime, getTimeIndex } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, Edit2 } from 'lucide-react';

interface TimetableGridProps {
  slots: TimeSlot[];
  onEdit: (slot: TimeSlot) => void;
  onDelete: (id: string) => void;
}

export function TimetableGrid({
  slots,
  onEdit,
  onDelete,
}: TimetableGridProps) {
  const gridData = useMemo(() => {
    const grid: { [key: string]: { [key: string]: TimeSlot | null } } = {};
    DAYS_OF_WEEK.forEach((day) => {
      grid[day] = {};
      TIME_SLOTS.forEach((time) => {
        grid[day][time] = null;
      });
    });

    slots.forEach((slot) => {
      const timeIndex = getTimeIndex(slot.startTime);
      if (timeIndex >= 0 && timeIndex < TIME_SLOTS.length && grid[slot.day]) {
        grid[slot.day][TIME_SLOTS[timeIndex]] = slot;
      }
    });

    return grid;
  }, [slots]);

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse bg-card rounded-lg overflow-hidden shadow-md">
        <thead>
          <tr className="bg-primary text-primary-foreground">
            <th className="px-3 py-3 text-left text-sm font-semibold border border-border">
              Time
            </th>
            {DAYS_OF_WEEK.map((day) => (
              <th
                key={day}
                className="px-3 py-3 text-center text-sm font-semibold border border-border min-w-[140px]"
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TIME_SLOTS.map((time) => (
            <tr key={time} className="hover:bg-muted/30 transition-colors">
              <td className="px-3 py-3 text-sm font-medium text-muted-foreground border border-border bg-muted/20">
                {formatTime(time)}
              </td>
              {DAYS_OF_WEEK.map((day) => (
                <td
                  key={`${day}-${time}`}
                  className="px-3 py-3 border border-border align-top min-h-[80px]"
                >
                  {gridData[day][time] && (
                    <Card
                      className={`p-2 mb-1 cursor-pointer hover:shadow-md transition-shadow border-l-4 ${gridData[day][time]!.color}`}
                    >
                      <p className="font-semibold text-xs truncate">
                        {gridData[day][time]!.courseName}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {gridData[day][time]!.lecturer}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {gridData[day][time]!.startTime} - {gridData[day][time]!.endTime}
                      </p>
                      <div className="flex gap-1 mt-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 w-6 p-0"
                          onClick={() => onEdit(gridData[day][time]!)}
                          aria-label={`Edit ${gridData[day][time]!.courseName}`}
                        >
                          <Edit2 className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 w-6 p-0 text-destructive hover:bg-destructive/10"
                          onClick={() => onDelete(gridData[day][time]!.id)}
                          aria-label={`Delete ${gridData[day][time]!.courseName}`}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </Card>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
