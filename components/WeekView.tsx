'use client';

import React from 'react';
import { MealData } from '@/types/meal';
import { formatDateToYMD } from '@/lib/neis';
import { ChevronRight, Flame, AlertTriangle } from 'lucide-react';

interface WeekViewProps {
  weekDays: Date[];
  mealsByDate: Map<string, MealData[]>;
  userAllergens: number[];
  onSelectDate: (date: Date) => void;
  onOpenMealDetail: (meal: MealData) => void;
}

const KOREAN_DAY_NAMES = ['일', '월', '화', '수', '목', '금', '토'];

export function WeekView({
  weekDays,
  mealsByDate,
  userAllergens,
  onSelectDate,
  onOpenMealDetail,
}: WeekViewProps) {
  const todayYMD = formatDateToYMD(new Date());

  return (
    <div className="space-y-2">
      {weekDays.map((dayDate) => {
        const ymd = formatDateToYMD(dayDate);
        const isToday = ymd === todayYMD;
        const dayName = KOREAN_DAY_NAMES[dayDate.getDay()];
        const meals = mealsByDate.get(ymd) || [];
        const mainMeal = meals[0];

        if (!mainMeal) {
          return (
            <div
              key={ymd}
              onClick={() => onSelectDate(dayDate)}
              className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                isToday
                  ? 'bg-blue-500/5 dark:bg-blue-500/10 border-blue-500/30'
                  : 'bg-white/50 dark:bg-[#1c1c1e]/50 border-black/[0.04] dark:border-white/[0.06] opacity-60'
              }`}
            >
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                    {dayDate.getMonth() + 1}월 {dayDate.getDate()}일 ({dayName})
                  </span>
                  {isToday && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[#007AFF] text-white">
                      오늘
                    </span>
                  )}
                </div>
                <span className="text-zinc-400 text-[11px]">급식 없음</span>
              </div>
            </div>
          );
        }

        const triggeredAllergens = mainMeal.allAllergens.filter((a) =>
          userAllergens.includes(a.code)
        );

        return (
          <div
            key={ymd}
            onClick={() => {
              onSelectDate(dayDate);
              onOpenMealDetail(mainMeal);
            }}
            className={`p-3.5 rounded-2xl bg-white dark:bg-[#1c1c1e] shadow-xs border transition-all cursor-pointer active:scale-[0.99] ${
              isToday
                ? 'border-[#007AFF] ring-1 ring-[#007AFF]/25'
                : 'border-black/[0.04] dark:border-white/[0.08]'
            }`}
          >
            {/* Day header */}
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-black/[0.04] dark:border-white/[0.06]">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  {dayDate.getMonth() + 1}월 {dayDate.getDate()}일 ({dayName})
                </span>
                {isToday && (
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[#007AFF] text-white">
                    오늘
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1.5">
                {mainMeal.calories > 0 && (
                  <div className="flex items-center gap-1 text-[11px] font-bold text-[#FF9500] bg-[#FF9500]/10 px-2 py-0.5 rounded-full">
                    <Flame className="w-3 h-3" />
                    <span>{mainMeal.calories} kcal</span>
                  </div>
                )}
                <ChevronRight className="w-4 h-4 text-zinc-400" />
              </div>
            </div>

            {/* Allergy alert */}
            {triggeredAllergens.length > 0 && (
              <div className="mb-2 px-2 py-0.5 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-300 text-[10px] font-medium flex items-center gap-1">
                <AlertTriangle className="w-3 h-3 text-[#FF9500] shrink-0" />
                <span>{triggeredAllergens.map((a) => a.name).join(', ')} 포함</span>
              </div>
            )}

            {/* Dishes */}
            <div className="flex flex-wrap gap-1">
              {mainMeal.dishes.map((dish, i) => {
                const hasUserAllergen = dish.allergenCodes.some((c) =>
                  userAllergens.includes(c)
                );
                return (
                  <span
                    key={i}
                    className={`text-[11px] px-2 py-0.5 rounded-lg font-medium ${
                      hasUserAllergen
                        ? 'bg-amber-500/15 text-amber-800 dark:text-amber-200 border border-amber-500/30 font-semibold'
                        : 'bg-black/[0.04] dark:bg-white/[0.06] text-zinc-800 dark:text-zinc-200'
                    }`}
                  >
                    {dish.cleanName}
                  </span>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
