import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import userService from '../../services/userService';
import PrivateRoute from '../../components/PrivateRoute';
import Navbar from '../../components/Navbar'; // Assuming Navbar should be part of the layout

const ProfileEditPage = () => {
  const { user, token, loading: authLoading, updateUserContextProfile, error: authError, setError, setLoading: setAuthLoading } = useAuth();

  const [bio, setBio] = useState('');
  const [interests, setInterests] = useState('');
  const [growthGoals, setGrowthGoals] = useState('');
  const [message, setMessage] = useState('');
  const [pageError, setPageError] = useState(null);
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setBio(user.bio || '');
      setInterests(user.interests ? user.interests.join(', ') : '');
      setGrowthGoals(user.growth_goals ? user.growth_goals.join(', ') : '');
    }
    setError(null); // Clear global errors from AuthContext
  }, [user, setError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setPageError(null);
    setError(null); // Clear global context error
    setPageLoading(true);
    setAuthLoading(true); // Indicate loading state in AuthContext

    const profileData = {
      bio: bio,
      interests: interests.split(',').map(item => item.trim()).filter(item => item), // Split, trim and remove empty strings
      growth_goals: growthGoals.split(',').map(item => item.trim()).filter(item => item),
    };

    try {
      const updatedUser = await userService.updateUserProfile(token, profileData);
      updateUserContextProfile(updatedUser.data); // Update user in AuthContext
      setMessage('프로필이 업데이트되었습니다.');
    } catch (err) {
      const errMsg = err.response?.data?.detail || '프로필 업데이트에 실패했습니다. 다시 시도해주세요.';
      setPageError(errMsg);
      setError(errMsg); // Also set in global context if preferred
    } finally {
      setPageLoading(false);
      setAuthLoading(false); // Clear loading state in AuthContext
    }
  };

  if (authLoading || !user) {
    return <p>Loading profile...</p>;
  }

  return (
    <PrivateRoute>
      <Navbar />
      <div className="container">
        <h1>프로필 수정</h1>
        {message && <p style={{ color: 'green' }}>{message}</p>}
        {(pageError || authError) && <p className="error-message">{pageError || authError}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="bio">자기소개</label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="자신에 대해 알려주세요."
            />
          </div>
          <div>
            <label htmlFor="interests">관심사 (쉼표로 구분)</label>
            <input
              type="text"
              id="interests"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              placeholder="예: 프로그래밍, 독서, 여행"
            />
          </div>
          <div>
            <label htmlFor="growthGoals">성장 목표 (쉼표로 구분)</label>
            <input
              type="text"
              id="growthGoals"
              value={growthGoals}
              onChange={(e) => setGrowthGoals(e.target.value)}
              placeholder="예: 새 기술 배우기, 프로젝트 완료"
            />
          </div>
          <button type="submit" disabled={pageLoading || authLoading}>
            {(pageLoading || authLoading) ? '저장 중...' : '프로필 저장'}
          </button>
        </form>
      </div>
    </PrivateRoute>
  );
};

export default ProfileEditPage;
