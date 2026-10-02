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
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal / Action Sheet Container */}
      <div className="relative w-full max-w-md bg-[#f2f2f7] dark:bg-[#1c1c1e] rounded-t-[28px] sm:rounded-[28px] shadow-2xl border border-black/10 dark:border-white/10 overflow-hidden max-h-[85vh] flex flex-col transition-all z-10">
        {/* Mobile grabber */}
        <div className="sm:hidden flex justify-center pt-2.5 pb-1">
          <div className="w-8 h-1 rounded-full bg-zinc-300 dark:bg-zinc-600" />
        </div>

        {/* Header */}
        <div className="px-4 py-3 bg-white/80 dark:bg-zinc-800/80 backdrop-blur border-b border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-amber-500/10 dark:bg-amber-400/20 text-[#FF9500] flex items-center justify-center">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              알레르기 안심 설정
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-black/5 dark:bg-white/10 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 flex items-center justify-center transition-colors active:scale-95"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Quick presets */}
        <div className="px-4 pt-2.5 pb-1.5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5">
            <button
              onClick={applyCommonPreset}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-500/10 text-[#007AFF] dark:text-[#0A84FF] font-semibold hover:bg-blue-500/20 active:scale-95 transition-all text-[11px]"
            >
              <Sparkles className="w-3 h-3" />
              주요 6대
            </button>
            <button
              onClick={clearAll}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/5 dark:bg-white/10 text-zinc-600 dark:text-zinc-400 font-semibold hover:bg-black/10 active:scale-95 transition-all text-[11px]"
            >
              <RotateCcw className="w-3 h-3" />
              초기화
            </button>
          </div>

          <span className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400">
            {selectedAllergens.length > 0
              ? `${selectedAllergens.length}개 선택됨`
              : '선택 없음'}
          </span>
        </div>

        {/* Search input */}
        <div className="px-4 py-1.5">
          <input
            type="text"
            placeholder="알레르기 검색 (예: 우유, 난류, 땅콩, 6번)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white dark:bg-zinc-800 rounded-xl px-3.5 py-2 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 border border-black/5 dark:border-white/10 focus:outline-none focus:ring-1 focus:ring-[#007AFF]"
          />
        </div>

        {/* Allergen list */}
        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-1">
          <div className="bg-white dark:bg-zinc-900/70 rounded-2xl overflow-hidden border border-black/[0.04] dark:border-white/[0.08] divide-y divide-black/[0.04] dark:divide-white/[0.06]">
            {filtered.map((item: AllergenInfo) => {
              const isChecked = selectedAllergens.includes(item.code);
              return (
                <div
                  key={item.code}
                  onClick={() => onToggleAllergen(item.code)}
                  className={`flex items-center justify-between px-3.5 py-2.5 cursor-pointer transition-colors ${
                    isChecked
                      ? 'bg-blue-500/10 dark:bg-blue-950/40'
                      : 'hover:bg-zinc-100 dark:hover:bg-zinc-800/90'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">{item.icon || '⚠️'}</span>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                          {item.name}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-400">
                          #{item.code}
                        </span>
                      </div>
                      <span className="text-[10px] text-zinc-400 dark:text-zinc-500">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                      isChecked
                        ? 'bg-[#007AFF] text-white'
                        : 'border-2 border-zinc-300 dark:border-zinc-600'
                    }`}
                  >
                    {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-white/90 dark:bg-zinc-800/90 backdrop-blur border-t border-black/[0.04] dark:border-white/[0.06]">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-[#007AFF] hover:bg-blue-600 active:scale-[0.99] text-white font-semibold rounded-xl text-xs transition-all shadow-xs"
          >
            선택 완료
          </button>
        </div>
      </div>
    </div>
  );
}
