import Link from 'next/link';

export default function ChatPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-2xl font-bold mb-4">챗 페이지</h1>
      {/* GPT/Claude 기반 대화창 구현 예정 */}
      <p className="text-gray-600 mb-8">AI와 대화하며 상호작용합니다.</p>
      {/* 임시: 대시보드 페이지로 이동 링크 */}
      <Link href="/dashboard" className="text-blue-500 hover:underline">
        (임시) 대시보드로 이동
      </Link>
    </div>
  );
} 