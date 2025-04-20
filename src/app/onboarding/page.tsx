import Link from 'next/link';

export default function OnboardingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-2xl font-bold mb-4">온보딩 페이지</h1>
      {/* 사용자 정보 입력 폼 구현 예정 */}
      <p className="text-gray-600 mb-8">맞춤형 정보를 입력해주세요.</p>
      {/* 임시: 챗 페이지로 이동 링크 */}
      <Link href="/chat" className="text-blue-500 hover:underline">
        (임시) 챗 페이지로 이동
      </Link>
    </div>
  );
} 