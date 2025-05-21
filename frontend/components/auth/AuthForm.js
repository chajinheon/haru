import React from 'react';
import Input from '../common/Input';

const AuthForm = ({
  formType, // "login" or "signup"
  email,
  setEmail,
  password,
  setPassword,
  fullName,
  setFullName,
  handleSubmit,
  loading,
  error,
  buttonText,
}) => {
  return (
    <form onSubmit={handleSubmit} className="auth-form">
      {formType === 'signup' && (
        <Input
          label="Full Name"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Enter your full name"
          name="fullName"
        />
      )}
      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        name="email"
      />
      <Input
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
        required
        name="password"
      />
      {error && <p className="error-message">{error}</p>}
      <button type="submit" disabled={loading}>
        {loading ? 'Loading...' : buttonText}
      </button>
    </form>
  );
};

export default AuthForm;
