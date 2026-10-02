'use client';

import React, { useState } from 'react';
import { ALLERGEN_LIST, AllergenInfo } from '@/types/meal';
import { Check, ShieldAlert, X, RotateCcw, Sparkles } from 'lucide-react';

interface AllergyFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedAllergens: number[];
  onToggleAllergen: (code: number) => void;
  onSelectMultiple: (codes: number[]) => void;
}

export function AllergyFilterModal({
  isOpen,
  onClose,
  selectedAllergens,
  onToggleAllergen,
  onSelectMultiple,
}: AllergyFilterModalProps) {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filtered = ALLERGEN_LIST.filter(
    (a) =>
      a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(a.code).includes(searchTerm)
  );

  const applyCommonPreset = () => {
    // Egg(1), Milk(2), Peanut(4), Wheat(6), Shrimp(9), Crab(8)
    onSelectMultiple([1, 2, 4, 6, 8, 9]);
  };

  const clearAll = () => {
    onSelectMultiple([]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop with iOS blur */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal / Action Sheet Container */}
      <div className="relative w-full max-w-lg bg-[#f2f2f7] dark:bg-[#1c1c1e] rounded-t-[28px] sm:rounded-[28px] shadow-2xl border border-black/10 dark:border-white/10 overflow-hidden max-h-[90vh] flex flex-col transition-all">
        {/* iOS Grabber for mobile sheet */}
        <div className="sm:hidden flex justify-center pt-2.5 pb-1">
          <div className="w-9 h-1 rounded-full bg-zinc-300 dark:bg-zinc-600" />
        </div>

        {/* Header */}
        <div className="px-5 py-3.5 bg-white/80 dark:bg-zinc-800/80 backdrop-blur border-b border-black/5 dark:border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-amber-500/10 dark:bg-amber-400/20 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                알레르기 안심 필터
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                선택한 성분이 포함된 식단에 하이라이트 경고를 표시합니다
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-zinc-100 dark:bg-zinc-700 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick presets */}
        <div className="px-5 pt-3 pb-2 flex flex-wrap items-center gap-2 text-xs">
          <button
            onClick={applyCommonPreset}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-medium hover:bg-blue-500/20 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            주요 6대 알레르기 설정
          </button>
          <button
            onClick={clearAll}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-zinc-200/70 dark:bg-zinc-700/70 text-zinc-600 dark:text-zinc-300 font-medium hover:bg-zinc-300 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            초기화
          </button>
          <div className="ml-auto text-xs font-semibold text-zinc-500">
            {selectedAllergens.length > 0
              ? `${selectedAllergens.length}개 선택됨`
              : '선택 없음'}
          </div>
        </div>

        {/* Search input (iOS Search field style) */}
        <div className="px-5 py-2">
          <div className="relative">
            <input
              type="text"
              placeholder="알레르기 유발물질 검색 (예: 우유, 땅콩, 6번)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white dark:bg-zinc-800 rounded-xl px-4 py-2 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 border border-black/5 dark:border-white/5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Allergen list - iOS Grouped style */}
        <div className="flex-1 overflow-y-auto px-5 py-2 space-y-1.5 divide-y divide-black/5 dark:divide-white/5">
          <div className="bg-white dark:bg-zinc-800 rounded-2xl overflow-hidden border border-black/5 dark:border-white/5">
            {filtered.map((item: AllergenInfo) => {
              const isChecked = selectedAllergens.includes(item.code);
              return (
                <div
                  key={item.code}
                  onClick={() => onToggleAllergen(item.code)}
                  className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-750 transition-colors border-b last:border-b-0 border-black/5 dark:border-white/5"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{item.icon || '⚠️'}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                          {item.name}
                        </span>
                        <span className="text-[11px] font-mono text-zinc-400">
                          #{item.code}
                        </span>
                      </div>
                      <span className="text-[11px] text-zinc-400">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  {/* iOS Style Checkmark */}
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                      isChecked
                        ? 'bg-blue-500 text-white'
                        : 'border-2 border-zinc-300 dark:border-zinc-600'
                    }`}
                  >
                    {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white/90 dark:bg-zinc-800/90 backdrop-blur border-t border-black/5 dark:border-white/5 flex gap-3">
          <button
            onClick={onClose}
            className="w-full py-3 bg-[#007AFF] hover:bg-blue-600 active:bg-blue-700 text-white font-medium rounded-xl text-sm transition-all shadow-sm shadow-blue-500/20"
          >
            완료
          </button>
        </div>
      </div>
    </div>
  );
}
