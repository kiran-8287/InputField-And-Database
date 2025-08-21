import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

export interface ThemeToggleProps {
  className?: string;
  showLabels?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = '',
  showLabels = false,
  size = 'md'
}) => {
  const { theme, setTheme, isDark, toggleTheme } = useTheme();

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Quick Toggle Button */}
      <button
        onClick={toggleTheme}
        type="button"
        className={`
          ${sizeClasses[size]} 
          relative rounded-full bg-gradient-to-br from-amber-400 to-orange-500 
          dark:from-blue-400 dark:to-purple-600 
          p-2 transition-all duration-300 ease-in-out
          hover:scale-110 hover:shadow-lg
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500
          dark:focus:ring-offset-gray-900
          flex items-center justify-center
        `}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      >
        {/* Sun Icon */}
        <svg
          className={`
            ${iconSizes[size]} text-white transition-all duration-300
            ${isDark ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}
            absolute inset-0 m-auto pointer-events-none
          `}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            clipRule="evenodd"
          />
        </svg>

        {/* Moon Icon */}
        <svg
          className={`
            ${iconSizes[size]} text-white absolute inset-0 m-auto transition-all duration-300 pointer-events-none
            ${isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}
          `}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      </button>

      {/* Theme Selector Dropdown */}
      {showLabels && (
        <div className="flex items-center gap-1">
          <button
            onClick={() => handleThemeChange('light')}
            className={`
              px-2 py-1 text-xs rounded-md transition-colors duration-200
              ${theme === 'light' 
                ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200' 
                : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
              }
            `}
          >
            Light
          </button>
          <button
            onClick={() => handleThemeChange('dark')}
            className={`
              px-2 py-1 text-xs rounded-md transition-colors duration-200
              ${theme === 'dark' 
                ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200' 
                : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
              }
            `}
          >
            Dark
          </button>
          <button
            onClick={() => handleThemeChange('system')}
            className={`
              px-2 py-1 text-xs rounded-md transition-colors duration-200
              ${theme === 'system' 
                ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200' 
                : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
              }
            `}
          >
            Auto
          </button>
        </div>
      )}
    </div>
  );
};

export default ThemeToggle;
