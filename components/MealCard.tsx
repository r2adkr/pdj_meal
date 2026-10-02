'use client';

import React, { useState } from 'react';
import { MealData, DishItem } from '@/types/meal';
import { NutritionRing } from './NutritionRing';
import {
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  Flame,
  Utensils,
  Leaf,
  Info,
} from 'lucide-react';

interface MealCardProps {
  meal: MealData;
  userAllergens: number[];
  onOpenAllergySettings?: () => void;
}

export function MealCard({
  meal,
  userAllergens,
  onOpenAllergySettings,
}: MealCardProps) {
  const [showNutrients, setShowNutrients] = useState(false);
  const [showOrigins, setShowOrigins] = useState(false);
  const [copied, setCopied] = useState(false);

  const triggeredAllergens = meal.allAllergens.filter((a) =>
    userAllergens.includes(a.code)
  );

  const handleCopyMenu = () => {
    const dishesText = meal.dishes.map((d) => d.cleanName).join(', ');
    const fullText = `[대진전자통신고] ${meal.dateFormatted}\n메뉴: ${dishesText}\n열량: ${meal.calorieText}`;
    navigator.clipboard.writeText(fullText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div className="bg-white dark:bg-[#1c1c1e] rounded-[24px] shadow-xs border border-black/[0.04] dark:border-white/[0.08] overflow-hidden">
      {/* Header bar */}
      <div className="px-4 py-3 border-b border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 text-xs font-bold rounded-lg bg-[#007AFF]/10 text-[#007AFF] dark:text-[#0A84FF]">
            {meal.mealName}
          </span>
          <span className="text-[11px] text-zinc-400">12:40 ~ 13:30</span>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FF9500]/10 text-[#FF9500] font-bold text-xs">
          <Flame className="w-3.5 h-3.5" />
          <span>{meal.calories > 0 ? `${meal.calories} kcal` : meal.calorieText}</span>
        </div>
      </div>

      {/* Allergy warning if triggered */}
      {triggeredAllergens.length > 0 && (
        <div className="mx-4 mt-3 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-200 text-xs flex items-center justify-between">
          <div className="flex items-center gap-1.5 min-w-0">
            <AlertTriangle className="w-3.5 h-3.5 text-[#FF9500] shrink-0" />
            <span className="truncate">
              주의: {triggeredAllergens.map((a) => a.name).join(', ')} 포함
            </span>
          </div>
          {onOpenAllergySettings && (
            <button
              onClick={onOpenAllergySettings}
              className="text-[10px] font-semibold text-[#007AFF] dark:text-[#0A84FF] shrink-0 ml-2"
            >
              설정
            </button>
          )}
        </div>
      )}

      {/* Dishes List */}
      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between text-xs text-[#8E8E93] px-1">
          <span className="font-semibold text-[11px] flex items-center gap-1">
            <Utensils className="w-3 h-3" />
            메뉴
          </span>
          <button
            onClick={handleCopyMenu}
            className="flex items-center gap-1 text-[11px] text-[#007AFF] dark:text-[#0A84FF] font-semibold active:scale-95"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-[#34C759]" />
                <span className="text-[#34C759]">복사됨</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>복사</span>
              </>
            )}
          </button>
        </div>

        <div className="divide-y divide-black/[0.04] dark:divide-white/[0.06] border border-black/[0.04] dark:border-white/[0.06] rounded-xl overflow-hidden bg-zinc-50/60 dark:bg-zinc-900/40">
          {meal.dishes.map((dish: DishItem, index: number) => {
            const hasUserAllergen = dish.allergenCodes.some((code) =>
              userAllergens.includes(code)
            );

            return (
              <div
                key={index}
                className={`p-2.5 flex items-center justify-between gap-2 ${
                  hasUserAllergen ? 'bg-amber-500/10' : ''
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-black/5 dark:bg-white/10 text-zinc-400 text-[10px] font-bold flex items-center justify-center shrink-0">
                    {index + 1}
                  </span>
                  <span
                    className={`text-xs font-semibold ${
                      hasUserAllergen
                        ? 'text-amber-800 dark:text-amber-200'
                        : 'text-zinc-900 dark:text-zinc-100'
                    }`}
                  >
                    {dish.cleanName}
                  </span>
                </div>

                {dish.allergens.length > 0 && (
                  <div className="flex flex-wrap items-center gap-0.5">
                    {dish.allergens.map((alg) => {
                      const isTargeted = userAllergens.includes(alg.code);
                      return (
                        <span
                          key={alg.code}
                          className={`text-[9px] px-1 rounded font-medium ${
                            isTargeted
                              ? 'bg-[#FF9500] text-white font-bold'
                              : 'bg-black/5 dark:bg-white/10 text-zinc-500 dark:text-zinc-400'
                          }`}
                        >
                          {alg.name}
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Accordions */}
      <div className="px-4 pb-4 space-y-2">
        <div className="grid grid-cols-2 gap-1.5">
          <button
            onClick={() => setShowNutrients(!showNutrients)}
            className={`py-1.5 px-2.5 rounded-xl text-[11px] font-semibold flex items-center justify-center gap-1 border transition-all ${
              showNutrients
                ? 'bg-[#007AFF]/10 border-[#007AFF]/30 text-[#007AFF] dark:text-[#0A84FF]'
                : 'bg-black/5 dark:bg-white/10 border-transparent text-zinc-700 dark:text-zinc-300'
            }`}
          >
            <Info className="w-3 h-3" />
            <span>영양 성분</span>
            {showNutrients ? (
              <ChevronUp className="w-3 h-3 ml-auto" />
            ) : (
              <ChevronDown className="w-3 h-3 ml-auto text-zinc-400" />
            )}
          </button>

          <button
            onClick={() => setShowOrigins(!showOrigins)}
            className={`py-1.5 px-2.5 rounded-xl text-[11px] font-semibold flex items-center justify-center gap-1 border transition-all ${
              showOrigins
                ? 'bg-[#34C759]/10 border-[#34C759]/30 text-[#34C759]'
                : 'bg-black/5 dark:bg-white/10 border-transparent text-zinc-700 dark:text-zinc-300'
            }`}
          >
            <Leaf className="w-3 h-3" />
            <span>원산지 ({meal.origins.length})</span>
            {showOrigins ? (
              <ChevronUp className="w-3 h-3 ml-auto" />
            ) : (
              <ChevronDown className="w-3 h-3 ml-auto text-zinc-400" />
            )}
          </button>
        </div>

        {showNutrients && (
          <div className="space-y-2 pt-1">
            <NutritionRing
              calories={meal.calories}
              carbs={meal.carbs}
              protein={meal.protein}
              fat={meal.fat}
            />

            {meal.nutrients.length > 0 && (
              <div className="grid grid-cols-3 gap-1 bg-zinc-50 dark:bg-zinc-900/60 p-2 rounded-xl border border-black/[0.04] dark:border-white/[0.06]">
                {meal.nutrients.map((n, i) => (
                  <div
                    key={i}
                    className="p-1.5 rounded-lg bg-white dark:bg-zinc-800/80 border border-black/[0.04] dark:border-white/[0.06] flex flex-col justify-between"
                  >
                    <span className="text-[9px] text-zinc-400 truncate">
                      {n.name}
                    </span>
                    <span className="text-[10px] font-bold text-zinc-800 dark:text-zinc-200 mt-0.5">
                      {n.amount} {n.unit}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {showOrigins && (
          <div className="pt-1">
            <div className="max-h-48 overflow-y-auto rounded-xl border border-black/[0.04] dark:border-white/[0.06] divide-y divide-black/[0.04] dark:divide-white/[0.06] bg-zinc-50 dark:bg-zinc-900/60 text-xs">
              {meal.origins.map((origin, i) => (
                <div
                  key={i}
                  className="px-3 py-1.5 flex items-center justify-between text-[11px]"
                >
                  <span className="text-zinc-700 dark:text-zinc-300">
                    {origin.ingredient}
                  </span>
                  <span className="text-zinc-400 font-mono text-[10px]">
                    {origin.origin}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
