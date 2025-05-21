import React from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav>
      <ul>
        <li>
          <Link href="/dashboard">Home</Link> {/* Updated to point to /dashboard */}
        </li>
        {user ? (
          <>
            <li>
              <Link href="/profile/edit">Profile</Link>
            </li>
            <li>
              <Link href="/profile/settings">Settings</Link>
            </li>
            <li>
              <Link href="/todos">할 일 목록</Link> {/* Added Todos link */}
            </li>
            <li>
              <Link href="/calendar">캘린더</Link> {/* Added Calendar link */}
            </li>
            <li>
              <Link href="/journal">일지</Link> {/* Added Journal link */}
            </li>
            <li>
              <Link href="/notes">노트</Link> {/* Added Notes link */}
            </li>
            <li>
              {/* Display user email or name if available */}
              <span>{user.full_name || user.email || 'User'}</span> 
            </li>
            <li>
              <button onClick={logout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/auth/login">Login</Link>
            </li>
            <li>
              <Link href="/auth/signup">Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
