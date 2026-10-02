'use client';

import React from 'react';
import { MealData } from '@/types/meal';
import { formatDateToYMD } from '@/lib/neis';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MonthCalendarViewProps {
  currentMonth: Date;
  onChangeMonth: (delta: number) => void;
  mealsByDate: Map<string, MealData[]>;
  userAllergens: number[];
  onSelectDate: (date: Date) => void;
}

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

export function MonthCalendarView({
  currentMonth,
  onChangeMonth,
  mealsByDate,
  userAllergens,
  onSelectDate,
}: MonthCalendarViewProps) {
  const todayYMD = formatDateToYMD(new Date());

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const cells: (Date | null)[] = [];
  for (let i = 0; i < firstDay; i++) {
    cells.push(null);
  }
  for (let d = 1; d <= totalDays; d++) {
    cells.push(new Date(year, month, d));
  }

  return (
    <div className="bg-white dark:bg-[#1c1c1e] rounded-[24px] p-3.5 shadow-xs border border-black/[0.04] dark:border-white/[0.08]">
      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-2 px-1">
        <h3 className="text-sm font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          {year}년 {month + 1}월
        </h3>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onChangeMonth(-1)}
            className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-zinc-600 dark:text-zinc-400 transition-colors active:scale-95"
            title="이전 달"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => onChangeMonth(1)}
            className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-zinc-600 dark:text-zinc-400 transition-colors active:scale-95"
            title="다음 달"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-1 text-center mb-1">
        {WEEKDAYS.map((wd, i) => (
          <div
            key={wd}
            className={`text-[11px] font-semibold py-1 ${
              i === 0
                ? 'text-[#FF3B30]'
                : i === 6
                ? 'text-[#007AFF]'
                : 'text-zinc-400'
            }`}
          >
            {wd}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((dateObj, idx) => {
          if (!dateObj) {
            return (
              <div
                key={`empty-${idx}`}
                className="h-14 rounded-[12px] bg-black/[0.01] dark:bg-white/[0.01]"
              />
            );
          }

          const ymd = formatDateToYMD(dateObj);
          const isToday = ymd === todayYMD;
          const meals = mealsByDate.get(ymd) || [];
          const meal = meals[0];
          const hasMeal = !!meal;
          const dayOfWeek = dateObj.getDay();
          const isSunday = dayOfWeek === 0;
          const isSaturday = dayOfWeek === 6;

          const hasUserAllergen =
            meal &&
            meal.allAllergens.some((a) => userAllergens.includes(a.code));

          return (
            <button
              key={ymd}
              onClick={() => onSelectDate(dateObj)}
              className={`h-14 p-1 rounded-[12px] flex flex-col justify-between text-left transition-all duration-150 border active:scale-95 ${
                isToday
                  ? 'border-[#007AFF] bg-blue-500/10'
                  : hasMeal
                  ? 'border-black/[0.04] dark:border-white/[0.06] bg-zinc-50 dark:bg-zinc-800/40 hover:bg-black/5 dark:hover:bg-white/5'
                  : 'border-transparent bg-transparent'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span
                  className={`text-[11px] font-bold ${
                    isToday
                      ? 'w-4 h-4 rounded-full bg-[#007AFF] text-white flex items-center justify-center text-[10px]'
                      : isSunday
                      ? 'text-[#FF3B30]'
                      : isSaturday
                      ? 'text-[#007AFF]'
                      : 'text-zinc-800 dark:text-zinc-200'
                  }`}
                >
                  {dateObj.getDate()}
                </span>

                {hasUserAllergen && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF9500]" />
                )}
              </div>

              {hasMeal ? (
                <div className="text-[9px] font-medium text-zinc-800 dark:text-zinc-200 truncate">
                  {meal.dishes[0]?.cleanName || meal.mealName}
                </div>
              ) : (
                <div className="text-[9px] text-zinc-300 dark:text-zinc-600">
                  {isSunday || isSaturday ? '주말' : '-'}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
