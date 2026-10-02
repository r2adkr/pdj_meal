'use client';

import React, { useState } from 'react';
import { formatDateToYMD } from '@/lib/neis';
import { ChevronLeft, ChevronRight, X, Utensils, Check } from 'lucide-react';

interface IOSDatePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  mealDates: Set<string>;
}

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

export function IOSDatePickerModal({
  isOpen,
  onClose,
  selectedDate,
  onSelectDate,
  mealDates,
}: IOSDatePickerModalProps) {
  const [viewDate, setViewDate] = useState<Date>(() => new Date(selectedDate));

  if (!isOpen) return null;

  const todayYMD = formatDateToYMD(new Date());
  const selectedYMD = formatDateToYMD(selectedDate);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const cells: (Date | null)[] = [];
  for (let i = 0; i < firstDay; i++) {
    cells.push(null);
  }
  for (let d = 1; d <= totalDays; d++) {
    cells.push(new Date(year, month, d));
  }

  const handlePrevMonth = () => {
    setViewDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(year, month + 1, 1));
  };

  const handlePickDate = (d: Date) => {
    onSelectDate(d);
    onClose();
  };

  const handleToday = () => {
    const today = new Date();
    setViewDate(today);
    onSelectDate(today);
    onClose();
  };

  const currentPickedYMD = formatDateToYMD(selectedDate);
  const isSelectedMealDay = mealDates.has(currentPickedYMD);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* iOS backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal sheet */}
      <div className="relative w-full max-w-sm bg-[#f2f2f7] dark:bg-[#1c1c1e] rounded-t-[28px] sm:rounded-[28px] shadow-2xl border border-black/10 dark:border-white/10 overflow-hidden flex flex-col z-10 animate-fadeIn">
        {/* iOS Grabber on mobile */}
        <div className="sm:hidden flex justify-center pt-2.5 pb-1">
          <div className="w-8 h-1 rounded-full bg-zinc-300 dark:bg-zinc-600" />
        </div>

        {/* Header */}
        <div className="px-4 py-3 bg-white/80 dark:bg-zinc-800/80 backdrop-blur border-b border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrevMonth}
              className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-zinc-600 dark:text-zinc-300 transition-colors active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm font-bold tracking-tight text-zinc-900 dark:text-zinc-100 min-w-[90px] text-center">
              {year}년 {month + 1}월
            </span>
            <button
              onClick={handleNextMonth}
              className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-zinc-600 dark:text-zinc-300 transition-colors active:scale-95"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleToday}
              className="px-2.5 py-1 text-xs font-semibold rounded-full bg-[#007AFF] text-white active:scale-95 transition-transform"
            >
              오늘
            </button>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-black/5 dark:bg-white/10 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 flex items-center justify-center transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Calendar Body */}
        <div className="p-3.5">
          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-1 text-center mb-1">
            {WEEKDAYS.map((wd, i) => (
              <div
                key={wd}
                className={`text-[10px] font-semibold py-1 ${
                  i === 0
                    ? 'text-[#FF3B30]'
                    : i === 6
                    ? 'text-[#007AFF]'
                    : 'text-[#8E8E93]'
                }`}
              >
                {wd}
              </div>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-7 gap-1">
            {cells.map((dateObj, idx) => {
              if (!dateObj) {
                return (
                  <div
                    key={`empty-${idx}`}
                    className="h-10 rounded-xl"
                  />
                );
              }

              const ymd = formatDateToYMD(dateObj);
              const isSelected = ymd === selectedYMD;
              const isToday = ymd === todayYMD;
              const hasMeal = mealDates.has(ymd);
              const dayOfWeek = dateObj.getDay();
              const isSunday = dayOfWeek === 0;
              const isSaturday = dayOfWeek === 6;

              return (
                <button
                  key={ymd}
                  onClick={() => handlePickDate(dateObj)}
                  className={`h-11 rounded-xl flex flex-col items-center justify-center relative transition-all active:scale-90 ${
                    isSelected
                      ? 'bg-[#007AFF] text-white shadow-xs'
                      : isToday
                      ? 'bg-blue-500/10 text-[#007AFF] font-bold border border-blue-500/30'
                      : hasMeal
                      ? 'hover:bg-black/5 dark:hover:bg-white/5 text-zinc-900 dark:text-zinc-100'
                      : 'text-zinc-400 dark:text-zinc-600 hover:bg-black/[0.02]'
                  }`}
                >
                  <span
                    className={`text-[12px] font-bold leading-none ${
                      isSelected
                        ? 'text-white'
                        : isSunday
                        ? 'text-[#FF3B30]'
                        : isSaturday
                        ? 'text-[#007AFF]'
                        : ''
                    }`}
                  >
                    {dateObj.getDate()}
                  </span>

                  {/* Meal Indicator: Green Dot / Badge */}
                  <div className="h-1.5 flex items-center justify-center mt-1">
                    {hasMeal ? (
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isSelected ? 'bg-white' : 'bg-[#34C759]'
                        }`}
                        title="급식 제공일"
                      />
                    ) : (
                      <span className="w-1.5 h-1.5" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Legend & Current Selected Status */}
        <div className="px-4 py-2.5 bg-white/70 dark:bg-zinc-800/70 border-t border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-3 text-zinc-500 dark:text-zinc-400">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#34C759]" />
              <span>급식 있음</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-zinc-300 dark:bg-zinc-600" />
              <span>급식 없음</span>
            </div>
          </div>

          <div className="font-semibold text-zinc-800 dark:text-zinc-200">
            {isSelectedMealDay ? (
              <span className="text-[#34C759]">선택일 급식 제공됨</span>
            ) : (
              <span className="text-zinc-400">선택일 급식 없음</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
