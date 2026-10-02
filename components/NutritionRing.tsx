'use client';

import React from 'react';

interface NutritionRingProps {
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
}

export function NutritionRing({ calories, carbs, protein, fat }: NutritionRingProps) {
  const targetCalories = 850;
  const targetCarbs = 125;
  const targetProtein = 45;
  const targetFat = 22;

  const carbPercent = Math.min(Math.round((carbs / targetCarbs) * 100), 150);
  const proteinPercent = Math.min(Math.round((protein / targetProtein) * 100), 150);
  const fatPercent = Math.min(Math.round((fat / targetFat) * 100), 150);
  const calPercent = Math.min(Math.round((calories / targetCalories) * 100), 150);

  const size = 96;
  const center = size / 2;
  const strokeWidth = 7;
  const gap = 2;

  const r1 = center - strokeWidth / 2;
  const c1 = 2 * Math.PI * r1;
  const offset1 = c1 - (Math.min(calPercent, 100) / 100) * c1;

  const r2 = r1 - strokeWidth - gap;
  const c2 = 2 * Math.PI * r2;
  const offset2 = c2 - (Math.min(proteinPercent, 100) / 100) * c2;

  const r3 = r2 - strokeWidth - gap;
  const c3 = 2 * Math.PI * r3;
  const offset3 = c3 - (Math.min(fatPercent, 100) / 100) * c3;

  return (
    <div className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-900/60 p-3 rounded-2xl border border-black/[0.04] dark:border-white/[0.06]">
      {/* Activity Ring */}
      <div className="relative shrink-0 w-[96px] h-[96px]">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={center}
            cy={center}
            r={r1}
            stroke="#FA114F"
            strokeOpacity="0.2"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <circle
            cx={center}
            cy={center}
            r={r2}
            stroke="#A1FF00"
            strokeOpacity="0.2"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <circle
            cx={center}
            cy={center}
            r={r3}
            stroke="#00F0FF"
            strokeOpacity="0.2"
            strokeWidth={strokeWidth}
            fill="transparent"
          />

          <circle
            cx={center}
            cy={center}
            r={r1}
            stroke="#FA114F"
            strokeWidth={strokeWidth}
            strokeDasharray={c1}
            strokeDashoffset={offset1}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-700 ease-out"
          />
          <circle
            cx={center}
            cy={center}
            r={r2}
            stroke="#A1FF00"
            strokeWidth={strokeWidth}
            strokeDasharray={c2}
            strokeDashoffset={offset2}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-700 ease-out"
          />
          <circle
            cx={center}
            cy={center}
            r={r3}
            stroke="#00F0FF"
            strokeWidth={strokeWidth}
            strokeDasharray={c3}
            strokeDashoffset={offset3}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-700 ease-out"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-[11px] font-bold text-zinc-900 dark:text-white">
            {calories ? Math.round(calories) : 0}
          </span>
          <span className="text-[9px] text-[#8E8E93]">kcal</span>
        </div>
      </div>

      {/* Macronutrient breakdown */}
      <div className="flex-1 min-w-0 space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#FA114F]" />
            <span className="font-medium text-zinc-800 dark:text-zinc-200">탄수화물</span>
          </div>
          <span className="font-bold text-zinc-900 dark:text-white">{carbs}g</span>
        </div>

        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#A1FF00]" />
            <span className="font-medium text-zinc-800 dark:text-zinc-200">단백질</span>
          </div>
          <span className="font-bold text-zinc-900 dark:text-white">{protein}g</span>
        </div>

        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF]" />
            <span className="font-medium text-zinc-800 dark:text-zinc-200">지방</span>
          </div>
          <span className="font-bold text-zinc-900 dark:text-white">{fat}g</span>
        </div>
      </div>
    </div>
  );
}
