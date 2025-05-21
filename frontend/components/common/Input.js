import React from 'react';

const Input = ({ label, type = 'text', value, onChange, placeholder, required = false, name }) => {
  return (
    <div>
      {label && <label htmlFor={name || type}>{label}</label>}
      <input
        type={type}
        id={name || type}
        name={name || type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default Input;
