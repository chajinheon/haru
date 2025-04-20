import Link from 'next/link';

export default function DashboardPage() {
  const buttonStyle = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-2xl font-bold mb-8">대시보드</h1>
      <div className="grid grid-cols-2 gap-4">
        {/* 기능 버튼 구현 예정 */}
        <button className={buttonStyle}>(리마인더)</button>
        <button className={buttonStyle}>(대시보드 - 현재)</button>
        <button className={buttonStyle}>(캘린더)</button>
        <button className={buttonStyle}>(일지)</button>
        <Link href="/report" className={buttonStyle}>리포트</Link>
        <Link href="/settings" className={buttonStyle}>설정</Link>
      </div>
    </div>
  );
} 