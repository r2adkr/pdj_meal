'use client';

import React from 'react';
import { DAEJIN_SCHOOL } from '@/lib/neis';
import {
  Building2,
  Phone,
  Printer,
  Globe,
  MapPin,
  Calendar,
  X,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';

interface SchoolInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SchoolInfoModal({ isOpen, onClose }: SchoolInfoModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg bg-[#f2f2f7] dark:bg-[#1c1c1e] rounded-[28px] shadow-2xl border border-black/10 dark:border-white/10 overflow-hidden flex flex-col z-10 animate-fadeIn">
        {/* Header with iOS card style */}
        <div className="p-6 bg-gradient-to-br from-blue-600 via-indigo-600 to-sky-700 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl font-bold shadow-inner">
              🏫
            </div>
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-200">
                {DAEJIN_SCHOOL.officeName}
              </span>
              <h2 className="text-xl font-bold tracking-tight">
                {DAEJIN_SCHOOL.schoolName}
              </h2>
              <p className="text-xs text-blue-100 mt-0.5">
                {DAEJIN_SCHOOL.schoolType}
              </p>
            </div>
          </div>
        </div>

        {/* School Info list (iOS Inset Grouped style) */}
        <div className="p-5 space-y-3 overflow-y-auto max-h-[70vh]">
          <div className="bg-white dark:bg-zinc-800 rounded-2xl overflow-hidden border border-black/5 dark:border-white/5 divide-y divide-black/5 dark:divide-white/5 text-xs sm:text-sm">
            <div className="p-3.5 flex items-center gap-3">
              <MapPin className="w-4 h-4 text-blue-500 shrink-0" />
              <div className="flex-1">
                <div className="text-[11px] text-zinc-400">도로명 주소</div>
                <div className="font-medium text-zinc-800 dark:text-zinc-200">
                  {DAEJIN_SCHOOL.address} ({DAEJIN_SCHOOL.addressDetail})
                </div>
              </div>
            </div>

            <div className="p-3.5 flex items-center gap-3">
              <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
              <div className="flex-1">
                <div className="text-[11px] text-zinc-400">교무실 / 행정실 전화</div>
                <a
                  href={`tel:${DAEJIN_SCHOOL.tel}`}
                  className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {DAEJIN_SCHOOL.tel}
                </a>
              </div>
            </div>

            <div className="p-3.5 flex items-center gap-3">
              <Printer className="w-4 h-4 text-zinc-400 shrink-0" />
              <div className="flex-1">
                <div className="text-[11px] text-zinc-400">팩스 번호</div>
                <div className="font-medium text-zinc-800 dark:text-zinc-200">
                  {DAEJIN_SCHOOL.fax}
                </div>
              </div>
            </div>

            <div className="p-3.5 flex items-center gap-3">
              <Globe className="w-4 h-4 text-indigo-500 shrink-0" />
              <div className="flex-1">
                <div className="text-[11px] text-zinc-400">공식 웹사이트</div>
                <a
                  href={DAEJIN_SCHOOL.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                >
                  <span>{DAEJIN_SCHOOL.website}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="p-3.5 flex items-center gap-3">
              <Calendar className="w-4 h-4 text-amber-500 shrink-0" />
              <div className="flex-1">
                <div className="text-[11px] text-zinc-400">개교기념일 / 설립일자</div>
                <div className="font-medium text-zinc-800 dark:text-zinc-200">
                  {DAEJIN_SCHOOL.foundedDate}
                </div>
              </div>
            </div>

            <div className="p-3.5 flex items-center gap-3">
              <ShieldCheck className="w-4 h-4 text-purple-500 shrink-0" />
              <div className="flex-1">
                <div className="text-[11px] text-zinc-400">NEIS 행정표준코드</div>
                <div className="font-mono font-medium text-zinc-800 dark:text-zinc-200">
                  {DAEJIN_SCHOOL.schoolCode} (시도: {DAEJIN_SCHOOL.officeCode})
                </div>
              </div>
            </div>
          </div>

          {/* NEIS attribution */}
          <div className="p-3.5 rounded-2xl bg-zinc-100 dark:bg-zinc-800/60 border border-black/5 dark:border-white/5 text-[11px] text-zinc-500 space-y-1">
            <span className="font-semibold text-zinc-700 dark:text-zinc-300 block">
              공공데이터 출처 안내
            </span>
            <p>
              본 서비스의 급식 및 영양정보는 교육부 한국교육학술정보원(KERIS)의 <strong>나이스 교육정보 개방포털(open.neis.go.kr)</strong>의 공공데이터 Open API를 통해 정식으로 실시간 수신됩니다.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white/90 dark:bg-zinc-800/90 backdrop-blur border-t border-black/5 dark:border-white/5">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-[#007AFF] hover:bg-blue-600 text-white font-medium rounded-xl text-sm transition-colors"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
