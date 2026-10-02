import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '대진전자통신고등학교 급식 알리미 | DJHS Meal',
  description: '나이스(NEIS) 교육정보 개방포털 실시간 연동 대진전자통신고등학교 일별/주간/월간 급식 식단, 영양성분 및 알레르기 안심 조회 서비스',
  applicationName: '대진전자통신고 급식',
  appleWebApp: {
    capable: true,
    title: '대진전자고 급식',
    statusBarStyle: 'default',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    title: '대진전자통신고등학교 급식 알리미',
    description: '나이스(NEIS) 교육정보 개방포털 실시간 연동 대진전자통신고등학교 일별/주간/월간 급식 식단, 영양성분 및 알레르기 안심 조회 서비스',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '대진전자통신고등학교 급식 알리미',
    description: '나이스(NEIS) 실시간 급식 식단표 및 영양 정보 안내',
  },
};

export const viewport: Viewport = {
  themeColor: '#f2f2f7',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
        />
      </head>
      <body className="min-h-full bg-[#f2f2f7] dark:bg-[#000000] text-[#1c1c1e] dark:text-[#f2f2f7] font-sans selection:bg-blue-500 selection:text-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
