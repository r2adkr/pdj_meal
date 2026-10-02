'use client';

import React, { useState } from 'react';
import {
  FileText,
  X,
  Target,
  Users,
  Layers,
  Sparkles,
  Database,
  CheckCircle2,
  Copy,
  Check,
  ShieldCheck,
  Palette,
} from 'lucide-react';

interface PRDModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PRDModal({ isOpen, onClose }: PRDModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'ui' | 'api' | 'tech'>('overview');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const copyMarkdownPRD = () => {
    const prdText = `# [PRD] 대진전자통신고등학교 NEIS 실시간 급식 알리미 반응형 웹 애플리케이션
## 1. 프로젝트 개요 (Overview)
- 목적: 교육부 나이스(NEIS) 교육정보 개방포털의 급식식단정보 Open API를 연동하여 부산 대진전자통신고등학교의 실시간 급식 정보를 직관적이고 미려하게 제공
- 플랫폼: 반응형 웹 (모바일 우선, 데스크톱 최적화, iOS Web App 대응)
- 디자인 철학: Apple iOS Human Interface Guidelines (HIG) 기반 세련된 글래스모피즘, 인셋 그룹트 테이블 뷰, 액티비티 링

## 2. 타겟 사용자 (Target Audience)
- 대진전자통신고등학교 재학생 (급식 메뉴, 칼로리, 중식 시간 확인, 친구 공유)
- 학부모 (자녀의 일별 영양 섭취량, 식재료 원산지, 알레르기 유발 물질 확인)
- 교직원 및 조리종사원 (주간/월간 식단 편성 확인, 급식 인원수 점검)

## 3. 핵심 기능 요구사항 (Functional Requirements)
- FR-1: NEIS 실시간 API 연동 (부산교육청 C10, 학교코드 7150597)
- FR-2: 날짜별 탐색 (일별 뷰, 주간 뷰, 월간 캘린더 뷰, 당일 바로가기)
- FR-3: 알레르기 안심 필터 (식약처 19종 유발물질 개인화 저장 및 하이라이트 경고)
- FR-4: Apple 헬스 스타일 3대 영양소 링 차트 및 칼로리 시각화
- FR-5: 식재료 원산지 상세 조회 및 메뉴 클립보드 원클릭 복사/공유
- FR-6: 학교 기본 정보 및 NEIS Open API 메타데이터 연동

## 4. 디자인 시스템 (iOS HIG System)
- 레이아웃: SF Pro / Pretendard 기반 타이포그래피 계층, Inset Grouped Card
- 모달 및 인터랙션: iOS Sheet 모달, 세그먼트 컨트롤러, 햅틱 감성 트랜지션
- 색상 체계: iOS System Background (#F2F2F7), System Blue (#007AFF), System Amber (#FF9500), System Green (#34C759)`;

    navigator.clipboard.writeText(prdText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-3xl bg-[#f2f2f7] dark:bg-[#1c1c1e] rounded-[28px] shadow-2xl border border-black/10 dark:border-white/10 overflow-hidden max-h-[92vh] flex flex-col z-10 animate-fadeIn">
        {/* Header */}
        <div className="px-6 py-4 bg-white/80 dark:bg-zinc-800/80 backdrop-blur border-b border-black/5 dark:border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100">
                  제품 요구사항 정의서 (PRD)
                </h2>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
                  v1.0 Final
                </span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                대진전자통신고등학교 NEIS 급식 실시간 조회 시스템
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copyMarkdownPRD}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-200 text-xs font-medium hover:bg-zinc-200 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span>복사됨</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>PRD 복사</span>
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-700 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* iOS Segmented Tabs */}
        <div className="p-3 bg-zinc-100/60 dark:bg-zinc-800/40 border-b border-black/5 dark:border-white/5 overflow-x-auto">
          <div className="flex items-center gap-1 min-w-max p-1 bg-zinc-200/60 dark:bg-zinc-900/60 rounded-xl">
            {[
              { id: 'overview', label: '1. 개요 & 배경', icon: Target },
              { id: 'features', label: '2. 기능 요구사항', icon: Layers },
              { id: 'ui', label: '3. iOS HIG 디자인', icon: Palette },
              { id: 'api', label: '4. NEIS API & 데이터', icon: Database },
              { id: 'tech', label: '5. 비기능 & 아키텍처', icon: ShieldCheck },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content area */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 text-sm">
          {activeTab === 'overview' && (
            <div className="space-y-5 animate-fadeIn">
              <div className="bg-white dark:bg-zinc-800 p-5 rounded-2xl border border-black/5 dark:border-white/5 space-y-3">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                  <Target className="w-4 h-4 text-blue-500" />
                  프로젝트 목표 및 배경
                </h3>
                <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed text-xs sm:text-sm">
                  본 프로젝트는 교육부 산하 한국교육학술정보원(KERIS)의 <strong>나이스(NEIS) 교육정보 개방포털</strong> Open API를 기반으로, <strong>부산 대진전자통신고등학교</strong>의 급식 식단, 열량(Kcal), 탄수화물·단백질·지방 영양성분 및 식재료 원산지 정보를 실시간으로 수집·가공하여 Apple iOS의 미려한 사용자 경험(HIG)으로 제공하는 반응형 웹 서비스입니다.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 text-xs">
                    <span className="font-semibold text-blue-700 dark:text-blue-300 block mb-1">
                      시도교육청코드 / 행정표준코드
                    </span>
                    <span className="font-mono text-zinc-700 dark:text-zinc-300">
                      C10 (부산광역시교육청) / 7150597 (대진전자통신고)
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 text-xs">
                    <span className="font-semibold text-emerald-700 dark:text-emerald-300 block mb-1">
                      학교 주소 및 설립
                    </span>
                    <span className="text-zinc-700 dark:text-zinc-300">
                      부산 금정구 수림로 92 (1995년 개교)
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-zinc-800 p-5 rounded-2xl border border-black/5 dark:border-white/5 space-y-3">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                  <Users className="w-4 h-4 text-orange-500" />
                  사용자 페르소나 및 핵심 문제 해결
                </h3>
                <div className="space-y-2.5">
                  <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-750 text-xs space-y-1">
                    <span className="font-bold text-zinc-800 dark:text-zinc-200">
                      1. 재학생 (박민준, 2학년 스마트전자과)
                    </span>
                    <p className="text-zinc-600 dark:text-zinc-400">
                      &ldquo;쉬는 시간에 오늘 점심 뭐 나오는지 친구들과 빠르게 확인하고 싶고, 계란 알레르기가 있어서 메뉴에 들어있는지 매번 영양표를 보기 번거로워요.&rdquo;
                      <br />
                      ➔ <strong>해결:</strong> 모바일 최적화 일별 뷰, 3초 이내 메뉴 복사 및 개인별 알레르기 자동 감지 경고 시스템 제공.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-750 text-xs space-y-1">
                    <span className="font-bold text-zinc-800 dark:text-zinc-200">
                      2. 학부모 (김수연 님, 학부모회)
                    </span>
                    <p className="text-zinc-600 dark:text-zinc-400">
                      &ldquo;아이가 고등학교에서 어떤 영양소를 섭취하고 국내산 식재료를 쓰는지 주간/월간 단위로 알고 싶어요.&rdquo;
                      <br />
                      ➔ <strong>해결:</strong> 주간 식단표 모아보기, 월간 달력 네비게이션, Apple Activity 스타일 3대 영양소 링 차트 및 식약처 식재료 원산지 투명 공개.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'features' && (
            <div className="space-y-4 animate-fadeIn">
              {[
                {
                  title: 'FR-1. 실시간 NEIS Open API 연동 및 파싱',
                  desc: '나이스 mealServiceDietInfo 엔드포인트를 통해 실시간 급식 일자별 데이터 조회. HTML 태그(<br/>) 제거, 요리명 및 표준 알레르기 번호(1~19번) 분리, 열량 및 영양성분 객체화 정규화.',
                },
                {
                  title: 'FR-2. 3단 날짜 탐색 (일별 / 주간 / 월간 뷰)',
                  desc: 'iOS 세그먼트 컨트롤러를 통한 즉각적인 뷰 전환. 오늘 날짜 원클릭 복귀, 수평 스크롤 요일 캘린더 스트립, 월간 달력에서 급식 제공일 인디케이터 도트 표시.',
                },
                {
                  title: 'FR-3. 식약처 표준 19종 알레르기 안심 케어 필터',
                  desc: '난류, 우유, 메밀, 땅콩, 대두, 밀, 고등어, 게, 새우, 돼지고기, 복숭아, 토마토, 아황산류, 호두, 닭고기, 쇠고기, 오징어, 조개류, 잣 등 사용자 관심 성분 저장(localStorage) 및 식단 카드 내 시각적 경고 배너 출력.',
                },
                {
                  title: 'FR-4. Apple Health 스타일 매크로 영양소 인포그래픽',
                  desc: '고등학생 1일 권장 섭취량 기준(1식 기준 약 850kcal, 탄수화물 125g, 단백질 45g, 지방 22g) 대비 3중 SVG 환형 프로그레스 링 및 비타민/무기질 세부 지표 제공.',
                },
                {
                  title: 'FR-5. 소통형 편의 기능 (메뉴 클립보드 복사 & 원산지 표기)',
                  desc: '단톡방 공유를 위한 정돈된 텍스트 원클릭 클립보드 복사, 쌀/배추/육류/수산물 등 상세 원산지 아코디언 서랍 제공.',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-zinc-800 p-4 rounded-2xl border border-black/5 dark:border-white/5 space-y-1.5"
                >
                  <div className="flex items-center gap-2 font-bold text-zinc-900 dark:text-zinc-100 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>{item.title}</span>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 pl-6 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'ui' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-white dark:bg-zinc-800 p-5 rounded-2xl border border-black/5 dark:border-white/5 space-y-3">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                  <Palette className="w-4 h-4 text-indigo-500" />
                  Apple iOS HIG (Human Interface Guidelines) 구현 원칙
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-750 space-y-1">
                    <span className="font-bold text-zinc-800 dark:text-zinc-200">
                      1. Inset Grouped Table View
                    </span>
                    <p className="text-zinc-500 dark:text-zinc-400">
                      24px 스쿼클(Squircle) 라운딩, 미세한 헤어라인 보더(border-black/5), 카드형 섹션 분리.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-750 space-y-1">
                    <span className="font-bold text-zinc-800 dark:text-zinc-200">
                      2. Glassmorphic Frosted Bar
                    </span>
                    <p className="text-zinc-500 dark:text-zinc-400">
                      backdrop-blur-xl 반투명 상단 네비게이션 바 및 라지 타이틀(Large Title) 타이포그래피.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-750 space-y-1">
                    <span className="font-bold text-zinc-800 dark:text-zinc-200">
                      3. iOS Segmented Control
                    </span>
                    <p className="text-zinc-500 dark:text-zinc-400">
                      부드러운 슬라이딩 필(Pill) 애니메이션으로 구성된 일별/주간/월간 모드 전환기.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-750 space-y-1">
                    <span className="font-bold text-zinc-800 dark:text-zinc-200">
                      4. Apple Color System
                    </span>
                    <p className="text-zinc-500 dark:text-zinc-400">
                      System Blue(#007AFF), System Amber(#FF9500), System Green(#34C759), Background(#F2F2F7).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'api' && (
            <div className="space-y-4 animate-fadeIn text-xs">
              <div className="bg-white dark:bg-zinc-800 p-5 rounded-2xl border border-black/5 dark:border-white/5 space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                  <Database className="w-4 h-4 text-purple-500" />
                  NEIS API 엔드포인트 명세
                </h3>
                <div className="p-3 bg-zinc-900 text-zinc-200 rounded-xl font-mono text-[11px] overflow-x-auto">
                  GET https://open.neis.go.kr/hub/mealServiceDietInfo
                  <br />
                  ?Type=json&pIndex=1&pSize=100
                  <br />
                  &ATPT_OFCDC_SC_CODE=C10
                  <br />
                  &SD_SCHUL_CODE=7150597
                  <br />
                  &MLSV_YMD=YYYYMMDD (또는 MLSV_FROM_YMD ~ MLSV_TO_YMD)
                </div>
                <div className="space-y-1 pt-2">
                  <div className="font-semibold text-zinc-800 dark:text-zinc-200">
                    주요 응답 필드 매핑:
                  </div>
                  <ul className="list-disc pl-5 space-y-1 text-zinc-600 dark:text-zinc-400">
                    <li><code>DDISH_NM</code>: 요리명 (예: &apos;닭갈비볶음밥 (2.5.6.9.12.13.15.18)&apos;)</li>
                    <li><code>CAL_INFO</code>: 칼로리 정보 (예: &apos;893.8 Kcal&apos;)</li>
                    <li><code>NTR_INFO</code>: 영양소 구성 (탄수화물, 단백질, 지방, 칼슘 등)</li>
                    <li><code>ORPLC_INFO</code>: 원산지 정보 (쇠고기, 돼지고기, 쌀, 배추 등)</li>
                    <li><code>MLSV_FGR</code>: 급식 인원수 (식수)</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tech' && (
            <div className="space-y-4 animate-fadeIn text-xs">
              <div className="bg-white dark:bg-zinc-800 p-5 rounded-2xl border border-black/5 dark:border-white/5 space-y-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  비기능 요구사항 & 아키텍처
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-750 space-y-1">
                    <span className="font-bold text-zinc-800 dark:text-zinc-200">
                      1. 인메모리 캐싱 (TTL 10분)
                    </span>
                    <p className="text-zinc-500 dark:text-zinc-400">
                      반복 요청 시 NEIS API 호출을 줄이고 50ms 이내 초고속 응답 보장.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-750 space-y-1">
                    <span className="font-bold text-zinc-800 dark:text-zinc-200">
                      2. 주말/방학 예외 처리
                    </span>
                    <p className="text-zinc-500 dark:text-zinc-400">
                      INFO-200(데이터 없음) 수신 시 친절한 휴일 안내 화면 렌더링.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-750 space-y-1">
                    <span className="font-bold text-zinc-800 dark:text-zinc-200">
                      3. 반응형 뷰포트 지원
                    </span>
                    <p className="text-zinc-500 dark:text-zinc-400">
                      iPhone 14/15/16 및 iPad, 데스크톱 브라우저 완벽 대응 (360px ~ 1440px).
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-750 space-y-1">
                    <span className="font-bold text-zinc-800 dark:text-zinc-200">
                      4. Web App Manifest & 메타태그
                    </span>
                    <p className="text-zinc-500 dark:text-zinc-400">
                      iOS 홈 화면 추가(홈스크린 앱) 시 전체화면 네이티브 앱처럼 동작.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-white/90 dark:bg-zinc-800/90 backdrop-blur border-t border-black/5 dark:border-white/5 flex items-center justify-between">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">
            대진전자통신고등학교 x 나이스 Open API 연동 규격
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#007AFF] text-white text-xs font-semibold rounded-xl hover:bg-blue-600 transition-colors shadow-sm"
          >
            확인 및 닫기
          </button>
        </div>
      </div>
    </div>
  );
}
