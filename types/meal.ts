export interface AllergenInfo {
  code: number;
  name: string;
  category: string;
  icon?: string;
}

export const ALLERGEN_LIST: AllergenInfo[] = [
  { code: 1, name: '난류(계란)', category: '단백질', icon: '🥚' },
  { code: 2, name: '우유', category: '유제품', icon: '🥛' },
  { code: 3, name: '메밀', category: '곡류', icon: '🌾' },
  { code: 4, name: '땅콩', category: '견과류', icon: '🥜' },
  { code: 5, name: '대두(콩)', category: '두류', icon: '🫘' },
  { code: 6, name: '밀', category: '곡류', icon: '🍞' },
  { code: 7, name: '고등어', category: '생선류', icon: '🐟' },
  { code: 8, name: '게', category: '갑각류', icon: '🦀' },
  { code: 9, name: '새우', category: '갑각류', icon: '🦐' },
  { code: 10, name: '돼지고기', category: '육류', icon: '🥩' },
  { code: 11, name: '복숭아', category: '과일류', icon: '🍑' },
  { code: 12, name: '토마토', category: '채소류', icon: '🍅' },
  { code: 13, name: '아황산류', category: '첨가물', icon: '🧪' },
  { code: 14, name: '호두', category: '견과류', icon: '🌰' },
  { code: 15, name: '닭고기', category: '가금육', icon: '🍗' },
  { code: 16, name: '쇠고기', category: '육류', icon: '🥩' },
  { code: 17, name: '오징어', category: '연체류', icon: '🦑' },
  { code: 18, name: '조개류(굴/전복/홍합)', category: '패류', icon: '🦪' },
  { code: 19, name: '잣', category: '견과류', icon: '🌲' },
];

export interface DishItem {
  rawName: string;
  cleanName: string;
  allergenCodes: number[];
  allergens: AllergenInfo[];
}

export interface NutrientItem {
  name: string;
  amount: number;
  unit: string;
  dailyPercent?: number;
}

export interface OriginItem {
  ingredient: string;
  origin: string;
}

export interface MealData {
  id: string; // MLSV_YMD + MMEAL_SC_CODE
  schoolCode: string;
  schoolName: string;
  mealCode: string; // '1' | '2' | '3'
  mealName: string; // '조식' | '중식' | '석식'
  date: string; // YYYYMMDD
  dateFormatted: string; // YYYY.MM.DD (요일)
  year: number;
  month: number;
  day: number;
  dayOfWeek: string; // '월' | '화' | ...
  isToday: boolean;
  calorieText: string;
  calories: number; // numeric e.g. 893.8
  dishes: DishItem[];
  allAllergens: AllergenInfo[];
  nutrients: NutrientItem[];
  carbs: number; // g
  protein: number; // g
  fat: number; // g
  origins: OriginItem[];
  mealCount?: number; // MLSV_FGR
}

export interface SchoolInfo {
  officeCode: string;
  officeName: string;
  schoolCode: string;
  schoolName: string;
  schoolType: string;
  address: string;
  addressDetail: string;
  tel: string;
  fax: string;
  website: string;
  foundedDate: string;
  anniversary: string;
}
