'use client';

import React, { useState, useEffect } from 'react';
import {
  Wifi,
  Battery,
  Signal,
  Sun,
  Moon,
  Smartphone,
  Maximize2,
  Minimize2,
  Utensils,
  ChevronUp,
} from 'lucide-react';

interface IPhoneFrameProps {
  children: React.ReactNode;
  isDark: boolean;
  onToggleDark: () => void;
  todayMealPreview?: string;
  isFrameMode: boolean;
  onToggleFrameMode: () => void;
}

export function IPhoneFrame({
  children,
  isDark,
  onToggleDark,
  todayMealPreview,
  isFrameMode,
  onToggleFrameMode,
}: IPhoneFrameProps) {
  const [timeString, setTimeString] = useState('12:30');
  const [isIslandExpanded, setIsIslandExpanded] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      setTimeString(`${h}:${m}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#f2f2f7] dark:bg-[#000000] sm:bg-[#e5e5ea] sm:dark:bg-[#09090b] transition-colors duration-300 flex flex-col items-center justify-start sm:py-6 px-0 sm:px-4">
      {/* Top Floating control bar only visible on desktop / tablet */}
      <aside
        aria-label="뷰 모드 및 테마 제어"
        className="hidden sm:flex items-center justify-between w-full max-w-[430px] mb-3 px-3.5 py-1.5 rounded-2xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-sm text-xs"
      >
        <div className="flex items-center gap-1.5 font-medium text-zinc-600 dark:text-zinc-300">
          <Smartphone className="w-3.5 h-3.5 text-[#007AFF]" />
          <span>iPhone 16 Pro</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Dark Mode Toggle */}
          <button
            onClick={onToggleDark}
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 transition-colors active:scale-95"
            title="다크 모드 전환"
          >
            {isDark ? (
              <>
                <Sun className="w-3 h-3 text-amber-400" />
                <span>라이트</span>
              </>
            ) : (
              <>
                <Moon className="w-3 h-3 text-indigo-500" />
                <span>다크</span>
              </>
            )}
          </button>

          {/* Frame View Toggle */}
          <button
            onClick={onToggleFrameMode}
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 transition-colors active:scale-95"
            title={isFrameMode ? '넓은 화면으로 보기' : '아이폰 프레임으로 보기'}
          >
            {isFrameMode ? (
              <>
                <Maximize2 className="w-3 h-3 text-zinc-500" />
                <span>와이드</span>
              </>
            ) : (
              <>
                <Minimize2 className="w-3 h-3 text-zinc-500" />
                <span>프레임</span>
              </>
            )}
          </button>
        </div>
      </aside>

      {/* Frame Container */}
      <div
        className={`w-full transition-all duration-300 ${
          isFrameMode ? 'sm:max-w-[430px] sm:my-auto' : 'max-w-3xl'
        }`}
      >
        {isFrameMode ? (
          /* On mobile: Pure content with no chassis. On desktop: Realistic iPhone chassis */
          <div className="relative mx-auto w-full sm:rounded-[54px] sm:p-[12px] sm:bg-gradient-to-b sm:from-[#2a2a2e] sm:via-[#1c1c1f] sm:to-[#121214] sm:ring-1 sm:ring-white/20 sm:shadow-[0_25px_70px_rgba(0,0,0,0.35),0_10px_25px_rgba(0,0,0,0.2)]">
            {/* Side Hardware Buttons (Desktop only) */}
            <div className="hidden sm:block absolute -left-[4px] top-28 w-[4px] h-8 bg-zinc-600 rounded-l-sm" />
            <div className="hidden sm:block absolute -left-[4px] top-42 w-[4px] h-12 bg-zinc-600 rounded-l-sm" />
            <div className="hidden sm:block absolute -left-[4px] top-58 w-[4px] h-12 bg-zinc-600 rounded-l-sm" />
            <div className="hidden sm:block absolute -right-[4px] top-40 w-[4px] h-16 bg-zinc-600 rounded-r-sm" />

            {/* Screen View */}
            <div className="relative w-full sm:rounded-[44px] sm:overflow-hidden bg-[#f2f2f7] dark:bg-[#000000] text-[#1c1c1e] dark:text-[#f2f2f7] flex flex-col min-h-screen sm:min-h-[760px] sm:max-h-[860px] sm:shadow-inner">
              {/* iOS Status Bar & Dynamic Island (Desktop only, hidden on mobile so native mobile status bar is used) */}
              <div className="hidden sm:flex relative z-50 pt-3 px-7 pb-1 bg-transparent items-center justify-between text-xs font-semibold text-zinc-900 dark:text-white shrink-0 select-none">
                <span className="text-[13px] tracking-tight font-medium pl-1">
                  {timeString}
                </span>

                {/* Apple Dynamic Island */}
                <div
                  onClick={() => setIsIslandExpanded(!isIslandExpanded)}
                  className={`cursor-pointer transition-all duration-300 ease-out bg-black text-white flex items-center justify-center shadow-lg ${
                    isIslandExpanded
                      ? 'w-[280px] h-[52px] rounded-[26px] px-3.5 py-1.5'
                      : 'w-[110px] h-[30px] rounded-full px-2'
                  }`}
                >
                  {isIslandExpanded ? (
                    <div className="flex items-center justify-between w-full text-xs">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-7 h-7 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                          <Utensils className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0 text-left">
                          <div className="text-[10px] text-zinc-400 font-medium">대진전자통신고 급식</div>
                          <div className="text-[11px] font-bold text-white truncate max-w-[170px]">
                            {todayMealPreview || '오늘의 급식'}
                          </div>
                        </div>
                      </div>
                      <ChevronUp className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                    </div>
                  ) : (
                    <div className="flex items-center justify-between w-full px-1">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#111116] border border-[#222228] flex items-center justify-center">
                        <div className="w-1 h-1 rounded-full bg-blue-900/60" />
                      </div>
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/90" title="NEIS 실시간 연결" />
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-1.5 pr-1">
                  <Signal className="w-3.5 h-3.5" />
                  <Wifi className="w-3.5 h-3.5" />
                  <Battery className="w-4 h-4 text-emerald-500" />
                </div>
              </div>

              {/* Screen Content: fluid on mobile, scrollable container on desktop */}
              <div className="flex-1 sm:overflow-y-auto sm:no-scrollbar relative flex flex-col">
                {children}
              </div>

              {/* iOS Home Indicator (Desktop only, hidden on mobile) */}
              <div className="hidden sm:block pt-1 pb-2 bg-gradient-to-t from-[#f2f2f7] dark:from-[#000000] to-transparent shrink-0">
                <div className="w-32 h-1 bg-zinc-400/60 dark:bg-zinc-600/70 rounded-full mx-auto" />
              </div>
            </div>
          </div>
        ) : (
          /* Wide View */
          <div className="w-full sm:rounded-3xl overflow-hidden bg-[#f2f2f7] dark:bg-[#000000] sm:shadow-xl sm:border sm:border-black/5 sm:dark:border-white/10">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
