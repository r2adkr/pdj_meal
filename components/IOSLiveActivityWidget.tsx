'use client';

import React from 'react';
import { MealData } from '@/types/meal';
import { Sparkles, Utensils, Flame, AlertCircle } from 'lucide-react';

interface IOSLiveActivityWidgetProps {
  todayMeal?: MealData;
  userAllergens: number[];
  onOpenMeal: () => void;
}

export function IOSLiveActivityWidget({
  todayMeal,
  userAllergens,
  onOpenMeal,
}: IOSLiveActivityWidgetProps) {
  if (!todayMeal) {
    return (
      <div className="mx-1 p-3.5 rounded-[24px] bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 dark:from-blue-950/40 dark:via-indigo-950/40 dark:to-purple-950/40 border border-blue-500/20 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-sm">
            ☕
          </div>
          <div>
            <div className="font-semibold text-zinc-800 dark:text-zinc-200">
              오늘의 급식 일정 안내
            </div>
            <div className="text-[11px] text-[#8E8E93]">
              휴일 또는 급식 미운영일입니다
            </div>
          </div>
        </div>
      </div>
    );
  }

  const triggeredAllergens = todayMeal.allAllergens.filter((a) =>
    userAllergens.includes(a.code)
  );

  const mainDishes = todayMeal.dishes.slice(0, 3).map((d) => d.cleanName).join(' · ');

  return (
    <div
      onClick={onOpenMeal}
      className="mx-1 p-3.5 rounded-[26px] bg-black/90 dark:bg-[#1c1c1e] text-white shadow-lg border border-white/10 cursor-pointer active:scale-[0.99] transition-all group relative overflow-hidden"
    >
      {/* Background ambient glow */}
      <div className="absolute -right-8 -top-8 w-28 h-28 bg-[#007AFF]/25 rounded-full blur-2xl pointer-events-none" />

      <div className="relative flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-[#007AFF] to-[#5856D6] flex items-center justify-center text-white shadow-sm shrink-0">
            <Utensils className="w-4 h-4" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-md bg-white/20 uppercase tracking-wider text-blue-200">
                Live Activity
              </span>
              <span className="text-xs font-bold text-white tracking-tight">
                오늘의 {todayMeal.mealName}
              </span>
            </div>
            <div className="text-[11px] text-zinc-300 font-medium truncate mt-0.5">
              {mainDishes}
            </div>
          </div>
        </div>

        <div className="text-right shrink-0">
          <div className="flex items-center gap-1 text-xs font-bold text-[#FF9500]">
            <Flame className="w-3.5 h-3.5" />
            <span>{Math.round(todayMeal.calories)} kcal</span>
          </div>
          <div className="text-[10px] text-zinc-400 mt-0.5">
            12:40 점심시간
          </div>
        </div>
      </div>

      {triggeredAllergens.length > 0 && (
        <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center gap-1.5 text-[10px] text-amber-300 font-medium">
          <AlertCircle className="w-3 h-3 text-amber-400 shrink-0" />
          <span>주의 알레르기: {triggeredAllergens.map((a) => a.name).join(', ')}</span>
        </div>
      )}
    </div>
  );
}
