'use client';

import { useAccessibilityStore } from '@/lib/store';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import { useState } from 'react';

export function AccessibilitySettings() {
  const { fontSize, highContrast, setFontSize, setHighContrast } = useAccessibilityStore();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Accessibility settings"
      >
        <Settings className="w-4 h-4 mr-2" />
        Accessibility
      </Button>

      {isOpen && (
        <Card className="absolute right-0 mt-2 p-4 w-64 shadow-lg z-10 bg-card border border-border">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Font Size
              </label>
              <div className="flex gap-2">
                {(['small', 'medium', 'large'] as const).map((size) => (
                  <Button
                    key={size}
                    size="sm"
                    variant={fontSize === size ? 'default' : 'outline'}
                    onClick={() => setFontSize(size)}
                  >
                    {size.charAt(0).toUpperCase() + size.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={highContrast}
                  onChange={(e) => setHighContrast(e.target.checked)}
                  className="w-4 h-4"
                  aria-label="Enable high contrast mode"
                />
                <span className="text-sm font-medium">High Contrast</span>
              </label>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
