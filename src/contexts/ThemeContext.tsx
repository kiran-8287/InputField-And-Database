import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') return 'system';
    
    try {
      // Check localStorage first, then system preference
      const savedTheme = localStorage.getItem('theme') as Theme;
      if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
        return savedTheme;
      }
      return 'system';
    } catch (error) {
      console.warn('Failed to access localStorage:', error);
      return 'system';
    }
  });

  const [isDark, setIsDark] = useState(false);

  const getSystemTheme = (): boolean => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  };

  const applyTheme = (newTheme: Theme) => {
    if (typeof document === 'undefined') return;
    
    const root = document.documentElement;
    const isDarkMode = newTheme === 'dark' || (newTheme === 'system' && getSystemTheme());
    
    setIsDark(isDarkMode);
    
    if (isDarkMode) {
      root.classList.add('dark');
      root.classList.add('theme-dark');
    } else {
      root.classList.remove('dark');
      root.classList.remove('theme-dark');
    }
    
    // Add transition class for smooth theme switching
    root.classList.add('theme-transition');
    
    // Remove transition class after animation completes
    setTimeout(() => {
      root.classList.remove('theme-transition');
    }, 300);
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    
    // Safely save to localStorage
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('theme', newTheme);
      } catch (error) {
        console.warn('Failed to save theme to localStorage:', error);
      }
    }
    
    applyTheme(newTheme);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  useEffect(() => {
    applyTheme(theme);
    
    // Only add event listeners in browser environment
    if (typeof window === 'undefined') return;
    
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        applyTheme('system');
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  const value: ThemeContextType = {
    theme,
    setTheme,
    isDark,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
