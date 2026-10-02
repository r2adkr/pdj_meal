import { NextRequest, NextResponse } from 'next/server';
import { DAEJIN_SCHOOL, formatDateToYMD, parseMealRow } from '@/lib/neis';
import { MealData } from '@/types/meal';

// Cache responses in-memory for 10 minutes to ensure snappy iOS-like performance
const cache = new Map<string, { timestamp: number; data: MealData[] }>();
const CACHE_TTL_MS = 10 * 60 * 1000;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const dateParam = searchParams.get('date'); // YYYYMMDD
    const fromParam = searchParams.get('from'); // YYYYMMDD
    const toParam = searchParams.get('to'); // YYYYMMDD
    const monthParam = searchParams.get('month'); // YYYYMM

    const todayYmd = formatDateToYMD(new Date());

    let fromYmd = fromParam;
    let toYmd = toParam;
    let singleDate = dateParam;

    if (monthParam && monthParam.length === 6) {
      const year = parseInt(monthParam.slice(0, 4), 10);
      const month = parseInt(monthParam.slice(4, 6), 10);
      const lastDay = new Date(year, month, 0).getDate();
      fromYmd = `${monthParam}01`;
      toYmd = `${monthParam}${String(lastDay).padStart(2, '0')}`;
    }

    const cacheKey = singleDate
      ? `date_${singleDate}`
      : `range_${fromYmd}_${toYmd}`;

    const cached = cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
      return NextResponse.json({
        success: true,
        source: 'cache',
        count: cached.data.length,
        meals: cached.data,
      });
    }

    // Build NEIS URL
    const url = new URL('https://open.neis.go.kr/hub/mealServiceDietInfo');
    url.searchParams.set('Type', 'json');
    url.searchParams.set('pIndex', '1');
    url.searchParams.set('pSize', '100');
    url.searchParams.set('ATPT_OFCDC_SC_CODE', DAEJIN_SCHOOL.officeCode);
    url.searchParams.set('SD_SCHUL_CODE', DAEJIN_SCHOOL.schoolCode);

    if (singleDate) {
      url.searchParams.set('MLSV_YMD', singleDate);
    } else if (fromYmd && toYmd) {
      url.searchParams.set('MLSV_FROM_YMD', fromYmd);
      url.searchParams.set('MLSV_TO_YMD', toYmd);
    }

    const neisRes = await fetch(url.toString(), {
      next: { revalidate: 3600 },
    });

    if (!neisRes.ok) {
      throw new Error(`NEIS API error status: ${neisRes.status}`);
    }

    const neisData = await neisRes.json();

    // Check if result has rows
    let meals: MealData[] = [];
    if (neisData?.mealServiceDietInfo) {
      const rows = neisData.mealServiceDietInfo[1]?.row || [];
      meals = rows.map((row: any) => parseMealRow(row, todayYmd));
    } else if (neisData?.RESULT?.CODE === 'INFO-200') {
      // INFO-200 means "해당하는 데이터가 없습니다" (e.g. weekend or vacation)
      meals = [];
    }

    // Store in cache
    cache.set(cacheKey, { timestamp: Date.now(), data: meals });

    return NextResponse.json({
      success: true,
      source: 'live',
      count: meals.length,
      meals,
      info: {
        school: DAEJIN_SCHOOL.schoolName,
        queryDate: singleDate || `${fromYmd} ~ ${toYmd}`,
      },
    });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch meal data',
        meals: [],
      },
      { status: 500 }
    );
  }
}
