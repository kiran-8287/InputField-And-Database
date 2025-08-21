import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider } from '../../contexts/ThemeContext';
import ThemeToggle from './ThemeToggle';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider>
      {component}
    </ThemeProvider>
  );
};

describe('ThemeToggle', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockReturnValue(null);
    localStorageMock.setItem.mockClear();
  });

  it('renders without crashing', () => {
    renderWithTheme(<ThemeToggle />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders with correct size classes', () => {
    const { rerender } = renderWithTheme(<ThemeToggle size="sm" />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('w-8', 'h-8');

    rerender(
      <ThemeProvider>
        <ThemeToggle size="lg" />
      </ThemeProvider>
    );
    expect(button).toHaveClass('w-12', 'h-12');
  });

  it('shows labels when showLabels is true', () => {
    renderWithTheme(<ThemeToggle showLabels={true} />);
    
    expect(screen.getByText('Light')).toBeInTheDocument();
    expect(screen.getByText('Dark')).toBeInTheDocument();
    expect(screen.getByText('Auto')).toBeInTheDocument();
  });

  it('does not show labels when showLabels is false', () => {
    renderWithTheme(<ThemeToggle showLabels={false} />);
    
    expect(screen.queryByText('Light')).not.toBeInTheDocument();
    expect(screen.queryByText('Dark')).not.toBeInTheDocument();
    expect(screen.queryByText('Auto')).not.toBeInTheDocument();
  });

  it('toggles theme when main button is clicked', async () => {
    renderWithTheme(<ThemeToggle />);
    const button = screen.getByRole('button');
    
    // Initial state should be light theme
    expect(button).toHaveAttribute('aria-label', 'Switch to dark mode');
    
    fireEvent.click(button);
    
    // After click, should switch to dark theme
    await waitFor(() => {
      expect(button).toHaveAttribute('aria-label', 'Switch to light mode');
    });
  });

  it('changes theme when label buttons are clicked', async () => {
    renderWithTheme(<ThemeToggle showLabels={true} />);
    
    const lightButton = screen.getByText('Light');
    const darkButton = screen.getByText('Dark');
    const autoButton = screen.getByText('Auto');
    
    // Click dark button
    fireEvent.click(darkButton);
    await waitFor(() => {
      expect(darkButton).toHaveClass('bg-primary-100', 'text-primary-800');
    });
    
    // Click light button
    fireEvent.click(lightButton);
    await waitFor(() => {
      expect(lightButton).toHaveClass('bg-primary-100', 'text-primary-800');
    });
    
    // Click auto button
    fireEvent.click(autoButton);
    await waitFor(() => {
      expect(autoButton).toHaveClass('bg-primary-100', 'text-primary-800');
    });
  });

  it('applies custom className', () => {
    renderWithTheme(<ThemeToggle className="custom-class" />);
    const container = screen.getByRole('button').parentElement;
    expect(container).toHaveClass('custom-class');
  });

  it('has correct accessibility attributes', () => {
    renderWithTheme(<ThemeToggle />);
    const button = screen.getByRole('button');
    
    expect(button).toHaveAttribute('aria-label');
    expect(button).toHaveAttribute('type', 'button');
  });

  it('renders sun and moon icons', () => {
    renderWithTheme(<ThemeToggle />);
    
    // Check for sun icon (initially visible in light mode)
    const sunIcon = document.querySelector('svg[viewBox="0 0 20 20"]');
    expect(sunIcon).toBeInTheDocument();
    
    // Check for moon icon (initially hidden in light mode)
    const moonIcon = document.querySelector('svg[viewBox="0 0 20 20"]');
    expect(moonIcon).toBeInTheDocument();
  });

  it('persists theme preference in localStorage', async () => {
    renderWithTheme(<ThemeToggle showLabels={true} />);
    
    const darkButton = screen.getByText('Dark');
    fireEvent.click(darkButton);
    
    await waitFor(() => {
      expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark');
    });
  });

  it('loads theme preference from localStorage on mount', () => {
    localStorageMock.getItem.mockReturnValue('dark');
    
    renderWithTheme(<ThemeToggle />);
    
    expect(localStorageMock.getItem).toHaveBeenCalledWith('theme');
  });
});
