'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { MealData } from '@/types/meal';
import {
  formatDateToYMD,
  parseYMDToDate,
  getSchoolWeekRange,
} from '@/lib/neis';
import { downloadPRDMarkdown } from '@/lib/downloadPrd';
import { useTheme } from '@/hooks/use-theme';
import { IPhoneFrame } from '@/components/IPhoneFrame';
import { DateSegmentedControl, ViewMode } from '@/components/DateSegmentedControl';
import { IOSCalendarStrip } from '@/components/iOSCalendarStrip';
import { IOSDatePickerModal } from '@/components/IOSDatePickerModal';
import { MealCard } from '@/components/MealCard';
import { WeekView } from '@/components/WeekView';
import { MonthCalendarView } from '@/components/MonthCalendarView';
import { AllergyFilterModal } from '@/components/AllergyFilterModal';
import {
  Coffee,
  ArrowRight,
  ShieldAlert,
  Loader2,
  RefreshCw,
  Sun,
  Moon,
  Download,
} from 'lucide-react';

const KOREAN_DAY_NAMES = ['일', '월', '화', '수', '목', '금', '토'];

export default function HomePage() {
  const { resolvedTheme, toggleDarkMode } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const [isFrameMode, setIsFrameMode] = useState<boolean>(true);
  const [selectedDate, setSelectedDate] = useState<Date>(() => new Date());
  const [viewMode, setViewMode] = useState<ViewMode>('day');
  const [userAllergens, setUserAllergens] = useState<number[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('djhs_user_allergens');
        return saved ? JSON.parse(saved) : [];
      } catch (e) {
        console.error(e);
      }
    }
    return [];
  });

  // Modals
  const [isAllergyModalOpen, setIsAllergyModalOpen] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const [allMonthMeals, setAllMonthMeals] = useState<MealData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const saveAllergens = (allergens: number[]) => {
    setUserAllergens(allergens);
    try {
      localStorage.setItem('djhs_user_allergens', JSON.stringify(allergens));
    } catch (e) {
      console.error(e);
    }
  };

  const handleToggleAllergen = (code: number) => {
    const next = userAllergens.includes(code)
      ? userAllergens.filter((c) => c !== code)
      : [...userAllergens, code];
    saveAllergens(next);
  };

  const handleSelectMultipleAllergens = (codes: number[]) => {
    saveAllergens(codes);
  };

  const currentYear = selectedDate.getFullYear();
  const currentMonth = selectedDate.getMonth() + 1;
  const monthKey = `${currentYear}${String(currentMonth).padStart(2, '0')}`;

  const fetchMealsForMonth = useCallback(async (ym: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/meals?month=${ym}`);
      if (!res.ok) throw new Error('급식 정보를 불러오는데 실패했습니다.');
      const data = await res.json();
      setAllMonthMeals(data.meals || []);
    } catch (err: any) {
      console.error(err);
      setError(err.message || '네트워크 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let ignore = false;
    const load = async () => {
      try {
        const res = await fetch(`/api/meals?month=${monthKey}`);
        if (!res.ok) throw new Error('급식 정보를 불러오는데 실패했습니다.');
        const data = await res.json();
        if (!ignore) {
          setAllMonthMeals(data.meals || []);
          setError(null);
        }
      } catch (err: any) {
        if (!ignore) {
          setError(err.message || '네트워크 오류가 발생했습니다.');
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    load();
    return () => {
      ignore = true;
    };
  }, [monthKey]);

  const mealsByDate = useMemo(() => {
    const map = new Map<string, MealData[]>();
    allMonthMeals.forEach((meal) => {
      const existing = map.get(meal.date) || [];
      existing.push(meal);
      map.set(meal.date, existing);
    });
    return map;
  }, [allMonthMeals]);

  const mealDatesSet = useMemo(() => {
    return new Set(allMonthMeals.map((m) => m.date));
  }, [allMonthMeals]);

  const selectedYMD = formatDateToYMD(selectedDate);
  const todayYMD = formatDateToYMD(new Date());
  const isToday = selectedYMD === todayYMD;
  const currentDayMeals = mealsByDate.get(selectedYMD) || [];

  const todayMeal = useMemo(() => {
    const todayList = mealsByDate.get(todayYMD);
    return todayList && todayList[0] ? todayList[0] : undefined;
  }, [mealsByDate, todayYMD]);

  const todayPreviewText = todayMeal
    ? `${todayMeal.mealName}: ${todayMeal.dishes.slice(0, 2).map((d) => d.cleanName).join(', ')}`
    : '대진전자통신고 급식';

  const weekRange = useMemo(() => {
    return getSchoolWeekRange(selectedDate);
  }, [selectedDate]);

  const handleJumpToday = () => {
    setSelectedDate(new Date());
    setViewMode('day');
  };

  const handleChangeMonth = (delta: number) => {
    const nextDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + delta, 1);
    setSelectedDate(nextDate);
  };

  const findNextMealDay = () => {
    const futureMeals = allMonthMeals
      .filter((m) => m.date > selectedYMD)
      .sort((a, b) => a.date.localeCompare(b.date));
    if (futureMeals.length > 0) {
      setSelectedDate(parseYMDToDate(futureMeals[0].date));
    }
  };

  return (
    <>
      <IPhoneFrame
        isDark={isDark}
        onToggleDark={toggleDarkMode}
        todayMealPreview={todayPreviewText}
        isFrameMode={isFrameMode}
        onToggleFrameMode={() => setIsFrameMode(!isFrameMode)}
      >
        <main className="flex-1 p-3.5 sm:p-4 space-y-3 pb-8">
          {/* Native iOS Header */}
          <div className="flex items-center justify-between px-1 pt-1">
            <div>
              <span className="text-[11px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block">
                대진전자통신고등학교
              </span>
              <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                {selectedDate.getMonth() + 1}월 {selectedDate.getDate()}일{' '}
                <span className="font-semibold text-[#8E8E93]">
                  {KOREAN_DAY_NAMES[selectedDate.getDay()]}
                </span>
              </h1>
            </div>

            {/* Minimal Action Controls */}
            <div className="flex items-center gap-1.5">
              {!isToday && (
                <button
                  onClick={handleJumpToday}
                  className="px-2.5 py-1 rounded-full bg-[#007AFF] text-white text-[11px] font-semibold active:scale-95 transition-transform"
                >
                  오늘
                </button>
              )}

              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full bg-black/5 dark:bg-white/10 text-zinc-700 dark:text-zinc-300 hover:bg-black/10 active:scale-95 transition-colors"
                title="다크 모드 전환"
              >
                {isDark ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </button>

              <button
                onClick={() => setIsAllergyModalOpen(true)}
                className="relative p-2 rounded-full bg-black/5 dark:bg-white/10 text-zinc-700 dark:text-zinc-300 hover:bg-black/10 active:scale-95 transition-colors"
                title="알레르기 설정"
              >
                <ShieldAlert className="w-4 h-4" />
                {userAllergens.length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#FF9500]" />
                )}
              </button>
            </div>
          </div>

          {/* Cupertino Segmented Control */}
          <DateSegmentedControl
            viewMode={viewMode}
            onChange={(mode) => setViewMode(mode)}
          />

          {/* Error message */}
          {error && (
            <div className="p-3 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs flex items-center justify-between">
              <span>{error}</span>
              <button
                onClick={() => fetchMealsForMonth(monthKey)}
                className="flex items-center gap-1 font-semibold underline ml-2"
              >
                <RefreshCw className="w-3 h-3" />
                재시도
              </button>
            </div>
          )}

          {/* View Mode Content */}
          {loading && allMonthMeals.length === 0 ? (
            <div className="py-20 flex flex-col items-center justify-center gap-2 text-zinc-400">
              <Loader2 className="w-6 h-6 animate-spin text-[#007AFF]" />
              <p className="text-xs">식단 조회 중...</p>
            </div>
          ) : (
            <>
              {/* 1. DAY VIEW */}
              {viewMode === 'day' && (
                <div className="space-y-3">
                  <IOSCalendarStrip
                    selectedDate={selectedDate}
                    onSelectDate={(d) => setSelectedDate(d)}
                    mealDates={mealDatesSet}
                    onOpenDatePicker={() => setIsDatePickerOpen(true)}
                  />

                  {currentDayMeals.length > 0 ? (
                    <div className="space-y-3">
                      {currentDayMeals.map((meal) => (
                        <MealCard
                          key={meal.id}
                          meal={meal}
                          userAllergens={userAllergens}
                          onOpenAllergySettings={() => setIsAllergyModalOpen(true)}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 rounded-[24px] bg-white dark:bg-[#1c1c1e] border border-black/[0.04] dark:border-white/[0.08] text-center space-y-2">
                      <Coffee className="w-6 h-6 text-zinc-400 mx-auto" />
                      <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                        급식 없음
                      </h3>
                      <div className="pt-1">
                        <button
                          onClick={findNextMealDay}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#007AFF] text-white font-semibold text-xs active:scale-95"
                        >
                          <span>다음 급식일</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 2. WEEK VIEW */}
              {viewMode === 'week' && (
                <WeekView
                  weekDays={weekRange.days}
                  mealsByDate={mealsByDate}
                  userAllergens={userAllergens}
                  onSelectDate={(d) => {
                    setSelectedDate(d);
                    setViewMode('day');
                  }}
                  onOpenMealDetail={(meal) => {
                    setSelectedDate(parseYMDToDate(meal.date));
                    setViewMode('day');
                  }}
                />
              )}

              {/* 3. MONTH CALENDAR VIEW */}
              {viewMode === 'month' && (
                <MonthCalendarView
                  currentMonth={selectedDate}
                  onChangeMonth={handleChangeMonth}
                  mealsByDate={mealsByDate}
                  userAllergens={userAllergens}
                  onSelectDate={(d) => {
                    setSelectedDate(d);
                    setViewMode('day');
                  }}
                />
              )}
            </>
          )}
        </main>

        {/* Custom Apple iOS Date Picker Modal (With Meal status indicators) */}
        <IOSDatePickerModal
          isOpen={isDatePickerOpen}
          onClose={() => setIsDatePickerOpen(false)}
          selectedDate={selectedDate}
          onSelectDate={(d) => setSelectedDate(d)}
          mealDates={mealDatesSet}
        />

        {/* Allergy Settings Modal */}
        <AllergyFilterModal
          isOpen={isAllergyModalOpen}
          onClose={() => setIsAllergyModalOpen(false)}
          selectedAllergens={userAllergens}
          onToggleAllergen={handleToggleAllergen}
          onSelectMultiple={handleSelectMultipleAllergens}
        />
      </IPhoneFrame>

      {/* Discrete Corner PRD Download Button */}
      <button
        onClick={downloadPRDMarkdown}
        className="fixed bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 z-30 px-2.5 py-1 rounded-full bg-white/80 dark:bg-zinc-800/80 backdrop-blur-md border border-black/5 dark:border-white/10 text-[10px] font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 shadow-xs transition-all active:scale-95 flex items-center gap-1 opacity-60 hover:opacity-100"
        title="제품 요구사항 정의서(PRD.md) 파일 다운로드"
      >
        <Download className="w-3 h-3 text-[#007AFF]" />
        <span>PRD.md</span>
      </button>
    </>
  );
}
