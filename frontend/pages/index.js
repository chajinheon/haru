import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar'; // Keep Navbar for consistent look

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If user is loaded and exists, redirect to dashboard
    if (!loading && user) {
      router.replace('/dashboard'); // Use replace to avoid adding to history
    }
  }, [user, loading, router]);

  // If user is logged in and not yet redirected, show minimal content or a loader
  if (loading || user) {
    return (
      <>
        <Navbar />
        <div className="container" style={{ textAlign: 'center', paddingTop: '50px' }}>
          <p>로딩 중이거나 대시보드로 이동 중입니다...</p>
        </div>
      </>
    );
  }

  // This content is shown if the user is not logged in
  return (
    <>
      <Navbar />
      <div className="container" style={{ textAlign: 'center', paddingTop: '50px' }}>
        <h1>Haru에 오신 것을 환영합니다!</h1>
        <p>하루를 기록하고, 성장하며, 더 나은 당신을 만나보세요.</p>
        <p>
          <a href="/auth/login" style={{ marginRight: '10px' }}>로그인</a>
          <a href="/auth/signup">회원가입</a>
        </p>
        <section style={{ marginTop: '40px', lineHeight: '1.8' }}>
          <h2>주요 기능</h2>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li>📝 할 일 관리</li>
            <li>📅 캘린더 연동</li>
            <li>📔 일지 작성</li>
            <li>💡 아이디어 노트</li>
            <li>😊 감정 기록 (준비 중)</li>
          </ul>
        </section>
      </div>
    </>
  );
}
