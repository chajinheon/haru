import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import userService from '../../services/userService';
import PrivateRoute from '../../components/PrivateRoute';
import Navbar from '../../components/Navbar';
import styles from '../../styles/SettingsPage.module.css'; // For specific styles

const ProfileSettingsPage = () => {
  const { token, logout, setError: setAuthError, setLoading: setAuthLoading } = useAuth();

  // Password Change State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);

  // Account Deletion State
  const [deleteMessage, setDeleteMessage] = useState('');
  const [deleteError, setDeleteError] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordMessage('');
    setPasswordError('');
    setAuthError(null);

    if (newPassword !== confirmNewPassword) {
      setPasswordError('새 비밀번호와 확인 비밀번호가 일치하지 않습니다.');
      return;
    }
    if (newPassword.length < 6) { // Example: Basic password length validation
        setPasswordError('새 비밀번호는 6자 이상이어야 합니다.');
        return;
    }

    setPasswordLoading(true);
    setAuthLoading(true);
    try {
      await userService.updatePassword(token, {
        current_password: currentPassword,
        new_password: newPassword,
      });
      setPasswordMessage('비밀번호가 성공적으로 변경되었습니다. 다시 로그인해주세요.');
      setTimeout(() => {
        logout();
      }, 2000); // Wait 2 seconds before logging out
    } catch (err) {
      const errMsg = err.response?.data?.detail || '비밀번호 변경에 실패했습니다. 현재 비밀번호를 확인해주세요.';
      setPasswordError(errMsg);
      setAuthError(errMsg);
    } finally {
      setPasswordLoading(false);
      setAuthLoading(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    }
  };

  const handleDeleteAccount = async () => {
    setDeleteMessage('');
    setDeleteError('');
    setAuthError(null);

    const confirmed = window.confirm("정말 계정을 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없으며 모든 데이터가 삭제됩니다.");
    if (!confirmed) {
      return;
    }

    setDeleteLoading(true);
    setAuthLoading(true);
    try {
      await userService.deleteAccount(token);
      setDeleteMessage('계정이 성공적으로 삭제되었습니다.');
      setTimeout(() => {
        logout();
      }, 2000);
    } catch (err) {
      const errMsg = err.response?.data?.detail || '계정 삭제에 실패했습니다. 다시 시도해주세요.';
      setDeleteError(errMsg);
      setAuthError(errMsg);
    } finally {
      setDeleteLoading(false);
      setAuthLoading(false);
    }
  };

  return (
    <PrivateRoute>
      <Navbar />
      <div className={`container ${styles.settingsContainer}`}>
        <h1>계정 설정</h1>

        <section className={styles.settingsSection}>
          <h2>비밀번호 변경</h2>
          <form onSubmit={handlePasswordChange}>
            <div>
              <label htmlFor="currentPassword">현재 비밀번호</label>
              <input
                type="password"
                id="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="newPassword">새 비밀번호</label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="confirmNewPassword">새 비밀번호 확인</label>
              <input
                type="password"
                id="confirmNewPassword"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                required
              />
            </div>
            {passwordMessage && <p className={styles.successMessage}>{passwordMessage}</p>}
            {passwordError && <p className={`error-message ${styles.errorMessage}`}>{passwordError}</p>}
            <button type="submit" disabled={passwordLoading}>
              {passwordLoading ? '변경 중...' : '비밀번호 변경'}
            </button>
          </form>
        </section>

        <section className={styles.settingsSection}>
          <h2>계정 탈퇴</h2>
          {deleteMessage && <p className={styles.successMessage}>{deleteMessage}</p>}
          {deleteError && <p className={`error-message ${styles.errorMessage}`}>{deleteError}</p>}
          <button onClick={handleDeleteAccount} className={styles.deleteButton} disabled={deleteLoading}>
            {deleteLoading ? '삭제 중...' : '계정 영구 삭제'}
          </button>
        </section>
      </div>
    </PrivateRoute>
  );
};

export default ProfileSettingsPage;
