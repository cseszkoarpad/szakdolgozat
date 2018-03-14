import React from 'react';

const TextInput = ({name, label, onChange, placeholder, value, type="text"}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <div className="field">
        <input
          type={type}
          name={name}
          className="form-control"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required />
      </div>
    </div>
  );
};

export default TextInput