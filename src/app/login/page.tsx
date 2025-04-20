import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-2xl font-bold mb-4">로그인 페이지</h1>
      {/* 로그인 폼 구현 예정 */}
      <p className="text-gray-600 mb-8">이메일과 비밀번호로 로그인하세요.</p>
      {/* 임시: 온보딩 페이지로 이동 링크 */}
      <Link href="/onboarding" className="text-blue-500 hover:underline">
        (임시) 온보딩으로 이동
      </Link>
    </div>
  );
} 