'use client';

import React from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { formatDateToYMD } from '@/lib/neis';

interface IOSCalendarStripProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  mealDates: Set<string>;
  onOpenDatePicker: () => void;
}

const KOREAN_DAY_NAMES = ['일', '월', '화', '수', '목', '금', '토'];

export function IOSCalendarStrip({
  selectedDate,
  onSelectDate,
  mealDates,
  onOpenDatePicker,
}: IOSCalendarStripProps) {
  const todayYMD = formatDateToYMD(new Date());
  const selectedYMD = formatDateToYMD(selectedDate);

  // Generate 7-day strip around selectedDate (Monday to Sunday)
  const currentDayOfWeek = selectedDate.getDay();
  const mondayOffset = currentDayOfWeek === 0 ? -6 : 1 - currentDayOfWeek;
  const monday = new Date(selectedDate);
  monday.setDate(selectedDate.getDate() + mondayOffset);

  const days: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    days.push(d);
  }

  const handlePrevDay = () => {
    const prev = new Date(selectedDate);
    prev.setDate(selectedDate.getDate() - 1);
    onSelectDate(prev);
  };

  const handleNextDay = () => {
    const next = new Date(selectedDate);
    next.setDate(selectedDate.getDate() + 1);
    onSelectDate(next);
  };

  return (
    <div className="bg-white dark:bg-[#1c1c1e] rounded-[24px] p-3 shadow-xs border border-black/[0.04] dark:border-white/[0.08]">
      {/* Month Header and Custom iOS Date Picker trigger */}
      <div className="flex items-center justify-between px-1 mb-2">
        <button
          onClick={onOpenDatePicker}
          className="flex items-center gap-1.5 hover:opacity-80 active:scale-95 transition-all text-left"
          title="날짜 선택 달력 열기"
        >
          <span className="text-sm font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            {selectedDate.getFullYear()}년 {selectedDate.getMonth() + 1}월
          </span>
          <CalendarIcon className="w-3.5 h-3.5 text-[#007AFF]" />
          {selectedYMD === todayYMD && (
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[#007AFF] text-white ml-0.5">
              오늘
            </span>
          )}
        </button>

        <div className="flex items-center gap-0.5">
          <button
            onClick={handlePrevDay}
            className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-zinc-600 dark:text-zinc-400 transition-colors active:scale-95"
            title="이전 날짜"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNextDay}
            className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-zinc-600 dark:text-zinc-400 transition-colors active:scale-95"
            title="다음 날짜"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 7-Day iOS Strip */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((dayDate) => {
          const ymd = formatDateToYMD(dayDate);
          const isSelected = ymd === selectedYMD;
          const isToday = ymd === todayYMD;
          const dayNum = dayDate.getDate();
          const dayOfWeekIdx = dayDate.getDay();
          const dayName = KOREAN_DAY_NAMES[dayOfWeekIdx];
          const isSunday = dayOfWeekIdx === 0;
          const isSaturday = dayOfWeekIdx === 6;
          const hasMeal = mealDates.has(ymd);

          return (
            <button
              key={ymd}
              onClick={() => onSelectDate(dayDate)}
              className={`flex flex-col items-center justify-center py-2 px-0.5 rounded-[14px] transition-all duration-150 active:scale-95 ${
                isSelected
                  ? 'bg-[#007AFF] text-white shadow-xs scale-[1.02]'
                  : isToday
                  ? 'bg-blue-500/10 text-[#007AFF] font-bold border border-blue-500/25'
                  : 'hover:bg-black/5 dark:hover:bg-white/5 text-zinc-800 dark:text-zinc-200'
              }`}
            >
              <span
                className={`text-[10px] font-medium ${
                  isSelected
                    ? 'text-white/80'
                    : isSunday
                    ? 'text-[#FF3B30]'
                    : isSaturday
                    ? 'text-[#007AFF]'
                    : 'text-[#8E8E93]'
                }`}
              >
                {dayName}
              </span>

              <span
                className={`text-[14px] font-bold my-0.5 leading-none ${
                  isSelected ? 'text-white' : 'text-zinc-900 dark:text-zinc-100'
                }`}
              >
                {dayNum}
              </span>

              <div className="h-1 flex items-center justify-center mt-0.5">
                {hasMeal ? (
                  <span
                    className={`w-1 h-1 rounded-full ${
                      isSelected ? 'bg-white' : 'bg-[#34C759]'
                    }`}
                  />
                ) : (
                  <span className="w-1 h-1" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
