import React from 'react';

/**
 * Reusable InputField component
 * Handles labels, icons, input changes, and optional right-side action (like toggle password)
 */
function InputField({
  label,
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
  icon,
  rightAction,
  required = true,
}) {
  return (
    <div className="input-group">
      {label && <label htmlFor={id} className="input-label">{label}</label>}
      <div className="input-wrapper">
        {icon && <span className="input-icon left-icon">{icon}</span>}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={`input-control ${icon ? 'has-left-icon' : ''} ${rightAction ? 'has-right-action' : ''}`}
        />
        {rightAction && <span className="input-right-action">{rightAction}</span>}
      </div>
    </div>
  );
}

export default InputField;
