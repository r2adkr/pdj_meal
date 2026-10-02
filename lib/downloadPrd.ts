export function downloadPRDMarkdown() {
  const prdContent = `# [PRD] 대진전자통신고등학교 NEIS 실시간 급식 알리미

## 1. 프로젝트 개요 (Overview)
- **프로젝트명**: 대진전자통신고등학교 실시간 급식 알리미 (DJHS Meal Informer)
- **목적**: 교육부 나이스(NEIS) 교육정보 개방포털 Open API를 기반으로 부산 대진전자통신고등학교의 일별/주간/월간 급식 식단, 열량(Kcal), 3대 영양소 및 식약처 19종 알레르기 유발물질 정보를 실시간 제공
- **타겟 사용자**: 재학생, 학부모, 교직원
- **디자인 가이드라인**: Apple iOS Human Interface Guidelines (HIG), Apple iPhone 16 Pro 섀시 및 OLED 다크 모드

## 2. 기관 및 API 연동 명세
- **시도교육청코드**: C10 (부산광역시교육청)
- **행정표준코드**: 7150597 (대진전자통신고등학교)
- **엔드포인트**: https://open.neis.go.kr/hub/mealServiceDietInfo
- **파라미터**: Type=json, ATPT_OFCDC_SC_CODE=C10, SD_SCHUL_CODE=7150597, MLSV_FROM_YMD, MLSV_TO_YMD

## 3. 핵심 기능 요구사항 (Functional Requirements)
1. **실시간 식단 조회**: NEIS Open API 연동 및 당월 100건 일괄 캐싱으로 0.1초 고속 브라우징
2. **Apple iOS 캘린더 날짜 탐색**: 일별 수평 스트립, 주간 모아보기, 월간 캘린더 및 급식 제공일 시각화 팝오버
3. **식약처 공인 19종 알레르기 안심 케어**: 사용자별 알레르기 유발 물질 저장(localStorage) 및 식단 내 즉시 경고 배지
4. **Apple Activity Ring 스타일 영양 분석**: 탄수화물, 단백질, 지방 3대 매크로 영양소 및 칼로리 시각화
5. **편의 기능**: 식단 원클릭 클립보드 복사, 식재료 원산지 아코디언, 다크 모드 지원

## 4. UI/UX 디자인 시스템 사양
- **화면 섀시**: Apple iPhone 16 Pro 티타늄 프레임, 인터랙티브 Dynamic Island, iOS Status Bar
- **테마 시스템**: True Black (#000000) OLED 다크 모드 및 System Grouped Background (#F2F2F7)
- **컨트롤러**: Cupertino 세그먼트 컨트롤러 및 Inset Grouped Table Cards
`;

  const blob = new Blob([prdContent], { type: 'text/markdown;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', '대진전자통신고_급식알리미_PRD.md');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
