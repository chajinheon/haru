import Link from 'next/link';

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-2xl font-bold mb-4">설정 페이지</h1>
      {/* 사용자 설정 관리 폼 구현 예정 */}
      <p className="text-gray-600 mb-8">사용자 목표, 패턴, 분석 설정을 관리합니다.</p>
      <Link href="/dashboard" className="text-blue-500 hover:underline">
        대시보드로 돌아가기
      </Link>
    </div>
  );
} 