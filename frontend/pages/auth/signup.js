import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';
import AuthForm from '../../components/auth/AuthForm';
import Link from 'next/link';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const { user, signup, loading, error, setError } = useAuth();
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
      await signup(email, password, fullName);
      // Signup successful, router.push('/auth/login') is handled in AuthContext
    } catch (err) {
      // Error is already set in AuthContext, no need to set it here
      console.error('Signup failed on page:', err);
    }
  };

  return (
    <div className="container">
      <h1>Sign Up</h1>
      <AuthForm
        formType="signup"
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        fullName={fullName}
        setFullName={setFullName}
        handleSubmit={handleSubmit}
        loading={loading}
        error={error}
        buttonText="Sign Up"
      />
      <p>
        Already have an account? <Link href="/auth/login">Login</Link>
      </p>
    </div>
  );
};

export default SignupPage;
