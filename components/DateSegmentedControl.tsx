'use client';

import React from 'react';
import { Calendar, CalendarRange, Grid3X3 } from 'lucide-react';

export type ViewMode = 'day' | 'week' | 'month';

interface DateSegmentedControlProps {
  viewMode: ViewMode;
  onChange: (mode: ViewMode) => void;
}

export function DateSegmentedControl({
  viewMode,
  onChange,
}: DateSegmentedControlProps) {
  const options = [
    { id: 'day', label: '일별', icon: Calendar },
    { id: 'week', label: '주간', icon: CalendarRange },
    { id: 'month', label: '월간', icon: Grid3X3 },
  ];

  return (
    <div className="w-full px-1">
      <div className="flex items-center p-1 bg-[#767680]/15 dark:bg-[#767680]/25 rounded-[14px] backdrop-blur-md">
        {options.map((option) => {
          const Icon = option.icon;
          const isActive = viewMode === option.id;
          return (
            <button
              key={option.id}
              onClick={() => onChange(option.id as ViewMode)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-[10px] text-xs font-semibold transition-all duration-200 select-none active:scale-[0.98] ${
                isActive
                  ? 'bg-white dark:bg-[#636366] text-black dark:text-white shadow-[0_3px_8px_rgba(0,0,0,0.12),0_1px_1px_rgba(0,0,0,0.04)]'
                  : 'text-[#8e8e93] hover:text-black dark:hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{option.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
