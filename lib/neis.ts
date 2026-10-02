import {
  ALLERGEN_LIST,
  AllergenInfo,
  DishItem,
  MealData,
  NutrientItem,
  OriginItem,
  SchoolInfo,
} from '@/types/meal';

export const DAEJIN_SCHOOL: SchoolInfo = {
  officeCode: 'C10',
  officeName: '부산광역시교육청',
  schoolCode: '7150597',
  schoolName: '대진전자통신고등학교',
  schoolType: '특성화고등학교 (전문계)',
  address: '부산광역시 금정구 수림로 92',
  addressDetail: '장전동',
  tel: '051-582-8100',
  fax: '051-582-8120',
  website: 'http://www.pdj.hs.kr',
  foundedDate: '1995년 10월 30일',
  anniversary: '10월 30일',
};

const KOREAN_DAY_NAMES = ['일', '월', '화', '수', '목', '금', '토'];

// Convert allergen code to info
export function getAllergenByCode(code: number): AllergenInfo {
  const found = ALLERGEN_LIST.find((a) => a.code === code);
  if (found) return found;
  return { code, name: `기타(${code})`, category: '기타', icon: '⚠️' };
}

// Parse single dish string like "닭갈비볶음밥 (2.5.6.9.12.13.15.18)" or "어묵국 1.5.6"
export function parseDishItem(raw: string): DishItem {
  const trimmed = raw.trim();
  // Match allergen pattern at the end: (1.5.6) or 1.5.6
  const allergenMatch = trimmed.match(/[\(\[]?([0-9\.\s]+)[\)\]]?$/);

  let cleanName = trimmed;
  const allergenCodes: number[] = [];

  if (allergenMatch && allergenMatch[1]) {
    const codeSegment = allergenMatch[1];
    // verify it contains numbers separated by dots
    const nums = codeSegment
      .split('.')
      .map((s) => parseInt(s.trim(), 10))
      .filter((n) => !isNaN(n) && n >= 1 && n <= 30);

    if (nums.length > 0) {
      nums.forEach((n) => {
        if (!allergenCodes.includes(n)) {
          allergenCodes.push(n);
        }
      });
      // Remove allergen pattern from name
      cleanName = trimmed.replace(allergenMatch[0], '').trim();
    }
  }

  // Remove trailing dots or special punctuation
  cleanName = cleanName.replace(/[\.\s]+$/, '').trim();

  const allergens = allergenCodes.map(getAllergenByCode);

  return {
    rawName: trimmed,
    cleanName: cleanName || trimmed,
    allergenCodes,
    allergens,
  };
}

// Parse nutrients string
// Example: "탄수화물(g) : 140.9<br/>단백질(g) : 42.7<br/>지방(g) : 17.4..."
export function parseNutrients(raw: string): {
  nutrients: NutrientItem[];
  carbs: number;
  protein: number;
  fat: number;
} {
  const nutrients: NutrientItem[] = [];
  let carbs = 0;
  let protein = 0;
  let fat = 0;

  if (!raw) {
    return { nutrients, carbs, protein, fat };
  }

  const items = raw.split(/<br\s*\/?>/i);
  for (const item of items) {
    const trimmed = item.trim();
    if (!trimmed) continue;

    // Pattern: "탄수화물(g) : 140.9"
    const match = trimmed.match(/([가-힣a-zA-Z\s]+)(?:\(([a-zA-Z\.\s]+)\))?\s*:\s*([0-9\.]+)/);
    if (match) {
      const name = match[1].trim();
      const unit = (match[2] || 'g').trim();
      const amount = parseFloat(match[3]);

      if (name.includes('탄수화물')) carbs = amount;
      if (name.includes('단백질')) protein = amount;
      if (name.includes('지방')) fat = amount;

      nutrients.push({
        name,
        amount,
        unit,
      });
    }
  }

  return { nutrients, carbs, protein, fat };
}

// Parse origin string
// Example: "쇠고기(종류) : 국내산(한우)<br/>돼지고기 : 국내산..."
export function parseOrigins(raw: string): OriginItem[] {
  const origins: OriginItem[] = [];
  if (!raw) return origins;

  const items = raw.split(/<br\s*\/?>/i);
  for (const item of items) {
    const trimmed = item.trim();
    if (!trimmed) continue;
    const parts = trimmed.split(':');
    if (parts.length >= 2) {
      origins.push({
        ingredient: parts[0].trim(),
        origin: parts.slice(1).join(':').trim(),
      });
    }
  }
  return origins;
}

// Parse full NEIS row
export function parseMealRow(row: any, todayYmd: string): MealData {
  const ymd = String(row.MLSV_YMD || '');
  const year = parseInt(ymd.slice(0, 4), 10);
  const month = parseInt(ymd.slice(4, 6), 10);
  const day = parseInt(ymd.slice(6, 8), 10);

  const dateObj = new Date(year, month - 1, day);
  const dayOfWeek = KOREAN_DAY_NAMES[dateObj.getDay()] || '';
  const dateFormatted = `${year}.${String(month).padStart(2, '0')}.${String(day).padStart(2, '0')} (${dayOfWeek})`;

  // Dishes
  const dishRaw = String(row.DDISH_NM || '');
  const dishLines = dishRaw.split(/<br\s*\/?>/i).filter((s) => s.trim().length > 0);
  const dishes = dishLines.map(parseDishItem);

  // Collect unique allergens in meal
  const allAllergensMap = new Map<number, AllergenInfo>();
  dishes.forEach((d) => {
    d.allergens.forEach((a) => {
      allAllergensMap.set(a.code, a);
    });
  });
  const allAllergens = Array.from(allAllergensMap.values()).sort((a, b) => a.code - b.code);

  // Calorie
  const calRaw = String(row.CAL_INFO || '');
  const calMatch = calRaw.match(/([0-9\.]+)/);
  const calories = calMatch ? parseFloat(calMatch[1]) : 0;

  // Nutrients
  const { nutrients, carbs, protein, fat } = parseNutrients(String(row.NTR_INFO || ''));

  // Origins
  const origins = parseOrigins(String(row.ORPLC_INFO || ''));

  const mealCode = String(row.MMEAL_SC_CODE || '2');
  const mealName = String(row.MMEAL_SC_NM || (mealCode === '1' ? '조식' : mealCode === '2' ? '중식' : '석식'));

  return {
    id: `${ymd}-${mealCode}`,
    schoolCode: String(row.SD_SCHUL_CODE || DAEJIN_SCHOOL.schoolCode),
    schoolName: String(row.SCHUL_NM || DAEJIN_SCHOOL.schoolName),
    mealCode,
    mealName,
    date: ymd,
    dateFormatted,
    year,
    month,
    day,
    dayOfWeek,
    isToday: ymd === todayYmd,
    calorieText: calRaw || (calories > 0 ? `${calories} Kcal` : '정보 없음'),
    calories,
    dishes,
    allAllergens,
    nutrients,
    carbs,
    protein,
    fat,
    origins,
    mealCount: row.MLSV_FGR ? parseInt(row.MLSV_FGR, 10) : undefined,
  };
}

// Date helpers
export function formatDateToYMD(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}${m}${day}`;
}

export function parseYMDToDate(ymd: string): Date {
  const y = parseInt(ymd.slice(0, 4), 10);
  const m = parseInt(ymd.slice(4, 6), 10) - 1;
  const d = parseInt(ymd.slice(6, 8), 10);
  return new Date(y, m, d);
}

// Get Monday to Friday of the week containing the given date
export function getSchoolWeekRange(targetDate: Date): { fromYMD: string; toYMD: string; days: Date[] } {
  const current = new Date(targetDate);
  const day = current.getDay(); // 0: Sun, 1: Mon, ...
  // Calculate Monday
  const diffToMon = day === 0 ? -6 : 1 - day;
  const monday = new Date(current);
  monday.setDate(current.getDate() + diffToMon);

  const days: Date[] = [];
  for (let i = 0; i < 5; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    days.push(d);
  }

  return {
    fromYMD: formatDateToYMD(days[0]),
    toYMD: formatDateToYMD(days[4]),
    days,
  };
}

// Get Month range (from 1st to last day of month)
export function getMonthRange(year: number, month: number): { fromYMD: string; toYMD: string } {
  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 0); // last day of month
  return {
    fromYMD: formatDateToYMD(start),
    toYMD: formatDateToYMD(end),
  };
}
