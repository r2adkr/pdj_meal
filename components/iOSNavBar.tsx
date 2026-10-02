'use client';

import React from 'react';
import {
  ShieldAlert,
  Info,
  FileText,
  School,
  Moon,
  Sun,
  Sparkles,
} from 'lucide-react';

interface IOSNavBarProps {
  onOpenAllergyModal: () => void;
  onOpenSchoolInfo: () => void;
  onOpenPRD: () => void;
  onJumpToday: () => void;
  activeAllergyCount: number;
  isToday: boolean;
  isDark: boolean;
  onToggleDark: () => void;
}

export function IOSNavBar({
  onOpenAllergyModal,
  onOpenSchoolInfo,
  onOpenPRD,
  onJumpToday,
  activeAllergyCount,
  isToday,
  isDark,
  onToggleDark,
}: IOSNavBarProps) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-2xl bg-[#f2f2f7]/85 dark:bg-[#000000]/85 border-b border-black/[0.06] dark:border-white/[0.08] transition-colors">
      <div className="px-4 py-2.5 flex items-center justify-between">
        {/* Left: School brand in iOS style */}
        <button
          onClick={onOpenSchoolInfo}
          className="flex items-center gap-2 text-left group"
        >
          <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-[#007AFF] to-[#5856D6] text-white flex items-center justify-center font-bold shadow-xs group-active:scale-95 transition-transform">
            <School className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="font-semibold text-xs tracking-tight text-zinc-900 dark:text-zinc-100">
                대진전자통신고
              </span>
            </div>
            <p className="text-[10px] text-zinc-400 font-medium">NEIS 급식 알리미</p>
          </div>
        </button>

        {/* Right Action Icons (Apple Rounded Glass Buttons) */}
        <div className="flex items-center gap-1.5">
          {/* Today button */}
          <button
            onClick={onJumpToday}
            className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all active:scale-95 ${
              isToday
                ? 'bg-[#007AFF] text-white shadow-xs'
                : 'bg-black/5 dark:bg-white/10 text-zinc-700 dark:text-zinc-300 hover:bg-black/10'
            }`}
          >
            오늘
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={onToggleDark}
            className="p-1.5 rounded-full bg-black/5 dark:bg-white/10 text-zinc-700 dark:text-zinc-200 hover:bg-black/10 transition-colors active:scale-95"
            title={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
          >
            {isDark ? (
              <Sun className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-zinc-700" />
            )}
          </button>

          {/* Allergy filter button */}
          <button
            onClick={onOpenAllergyModal}
            className="relative p-1.5 rounded-full bg-black/5 dark:bg-white/10 text-zinc-700 dark:text-zinc-200 hover:bg-black/10 transition-colors active:scale-95"
            title="알레르기 안심 설정"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            {activeAllergyCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-amber-500 text-white rounded-full text-[8px] font-bold flex items-center justify-center shadow-xs">
                {activeAllergyCount}
              </span>
            )}
          </button>

          {/* PRD button */}
          <button
            onClick={onOpenPRD}
            className="px-2 py-1 rounded-full bg-black/5 dark:bg-white/10 text-zinc-700 dark:text-zinc-300 text-[11px] font-semibold hover:bg-black/10 transition-colors active:scale-95 flex items-center gap-0.5"
            title="제품 요구사항 정의서(PRD)"
          >
            <FileText className="w-3 h-3 text-[#007AFF]" />
            <span>PRD</span>
          </button>
        </div>
      </div>
    </header>
  );
}
