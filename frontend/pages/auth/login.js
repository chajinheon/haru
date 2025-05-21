import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';
import AuthForm from '../../components/auth/AuthForm';
import Link from 'next/link';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, login, loading, error, setError } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect if user is already logged in
    if (user) {
      router.push('/');
    }
    // Clear any previous errors when component mounts or user changes
    setError(null);
  }, [user, router, setError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    try {
      await login(email, password);
      // Login successful, router.push('/') is handled in AuthContext
    } catch (err) {
      // Error is already set in AuthContext, no need to set it here
      console.error('Login failed on page:', err);
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <AuthForm
        formType="login"
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
        loading={loading}
        error={error}
        buttonText="Login"
      />
      <p>
        Don't have an account? <Link href="/auth/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default LoginPage;
