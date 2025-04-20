import Link from 'next/link';

export default function ReportPage() {
  return (
    <div className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-2xl font-bold mb-4">리포트 페이지</h1>
      {/* 자동 생성 리포트 및 시각화 구현 예정 */}
      <p className="text-gray-600 mb-8">주간 분석 리포트가 표시됩니다.</p>
      <Link href="/dashboard" className="text-blue-500 hover:underline">
        대시보드로 돌아가기
      </Link>
    </div>
  );
} 