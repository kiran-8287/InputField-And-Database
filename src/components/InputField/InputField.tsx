import React, { useState, forwardRef } from 'react';

export interface InputFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  invalid?: boolean;
  variant?: 'default' | 'filled' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  clearable?: boolean;
  showPasswordToggle?: boolean;
  onClear?: () => void;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(({
  label,
  helperText,
  errorMessage,
  invalid = false,
  variant = 'default',
  size = 'md',
  clearable = false,
  showPasswordToggle = false,
  onClear,
  className = '',
  type = 'text',
  value,
  onChange,
  disabled,
  required,
  placeholder,
  id,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [internalType, setInternalType] = useState(type);

  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  // Handle password toggle
  React.useEffect(() => {
    if (type === 'password' && showPasswordToggle) {
      setInternalType(showPassword ? 'text' : 'password');
    } else {
      setInternalType(type);
    }
  }, [type, showPassword, showPasswordToggle]);

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleClear = () => {
    if (onClear) {
      onClear();
    } else if (onChange) {
      const syntheticEvent = {
        target: { value: '' },
        currentTarget: { value: '' }
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
    }
  };

  // Size classes
  const sizeClasses = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-3 py-2 text-base',
    lg: 'px-4 py-3 text-lg'
  };

  // Variant classes
  const variantClasses = {
    default: `
      border border-gray-300 dark:border-gray-600 
      bg-white dark:bg-gray-700
      focus:ring-2 focus:ring-primary-500 focus:border-primary-500
      dark:focus:ring-primary-400 dark:focus:border-primary-400
    `,
    filled: `
      border-0 
      bg-gray-100 dark:bg-gray-800
      focus:ring-2 focus:ring-primary-500 focus:bg-white
      dark:focus:ring-primary-400 dark:focus:bg-gray-700
    `,
    ghost: `
      border-0 border-b-2 border-gray-200 dark:border-gray-700
      bg-transparent
      rounded-none
      focus:ring-0 focus:border-primary-500
      dark:focus:border-primary-400
    `
  };

  const baseClasses = `
    w-full rounded-md
    text-gray-900 dark:text-white
    placeholder-gray-500 dark:placeholder-gray-400
    disabled:opacity-50 disabled:cursor-not-allowed
    transition-all duration-200
  `;

  const errorClasses = invalid || errorMessage ? `
    border-red-500 dark:border-red-400
    focus:ring-red-500 focus:border-red-500
    dark:focus:ring-red-400 dark:focus:border-red-400
  ` : '';

  const inputClasses = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${errorClasses}
    ${className}
    ${(clearable && value) || (showPasswordToggle && type === 'password') ? 'pr-10' : ''}
  `;

  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <input
          ref={ref}
          id={inputId}
          type={internalType}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          placeholder={placeholder}
          className={inputClasses}
          aria-invalid={invalid || !!errorMessage}
          aria-describedby={
            helperText || errorMessage 
              ? `${inputId}-description` 
              : undefined
          }
          {...props}
        />
        
        {/* Clear button */}
        {clearable && value && !disabled && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            aria-label="Clear input"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
        
        {/* Password toggle button */}
        {showPasswordToggle && type === 'password' && !disabled && (
          <button
            type="button"
            onClick={handlePasswordToggle}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        )}
      </div>
      
      {/* Helper text or error message */}
      {(helperText || errorMessage) && (
        <p 
          id={`${inputId}-description`}
          className={`mt-1 text-sm ${
            errorMessage 
              ? 'text-red-600 dark:text-red-400' 
              : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          {errorMessage || helperText}
        </p>
      )}
    </div>
  );
});

InputField.displayName = 'InputField';

export default InputField;
