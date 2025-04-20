import { redirect } from 'next/navigation';

export default function HomePage() {
  redirect('/login');
  // 리디렉션 후에는 아무것도 렌더링되지 않으므로 null 또는 빈 Fragment를 반환할 수 있습니다.
  // return null;
} 