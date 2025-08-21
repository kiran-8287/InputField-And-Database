<<<<<<< HEAD
# Theme System Guide

This document describes the comprehensive light and dark theme system implemented in the React component library.

## Overview

The theme system provides:
- **Light/Dark/System themes** with automatic detection
- **Smooth transitions** between themes
- **Persistent preferences** stored in localStorage
- **System theme detection** that follows OS preferences
- **Beautiful animated components** with theme-aware styling

## Architecture

### ThemeContext (`src/contexts/ThemeContext.tsx`)

The core theme management system that provides:

```typescript
interface ThemeContextType {
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: Theme) => void;
  isDark: boolean;
  toggleTheme: () => void;
}
```

**Features:**
- Automatic theme detection and persistence
- System theme change listening
- Smooth transition animations
- TypeScript support with proper error handling

### ThemeToggle Component (`src/components/ThemeToggle/`)

A beautiful, animated theme switcher component with:

- **Three sizes**: `sm`, `md`, `lg`
- **Label options**: Show/hide theme selection buttons
- **Smooth animations**: Sun/moon icon transitions
- **Accessibility**: Proper ARIA labels and keyboard support

## Usage

### Basic Setup

1. **Wrap your app with ThemeProvider:**

```tsx
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  );
}
```

2. **Use the theme context in components:**

```tsx
import { useTheme } from './contexts/ThemeContext';

function MyComponent() {
  const { theme, isDark, toggleTheme } = useTheme();
  
  return (
    <div className={`${isDark ? 'dark' : ''}`}>
      <button onClick={toggleTheme}>
        Switch to {isDark ? 'light' : 'dark'} mode
      </button>
    </div>
  );
}
```

3. **Add the ThemeToggle component:**

```tsx
import ThemeToggle from './components/ThemeToggle';

function Header() {
  return (
    <header>
      <h1>My App</h1>
      <ThemeToggle size="md" showLabels={true} />
    </header>
  );
}
```

### Theme Toggle Variants

```tsx
// Simple toggle button
<ThemeToggle />

// With theme selection labels
<ThemeToggle showLabels={true} />

// Different sizes
<ThemeToggle size="sm" />
<ThemeToggle size="md" />
<ThemeToggle size="lg" />

// Custom styling
<ThemeToggle className="my-custom-class" />
```

## CSS Classes and Utilities

### Theme Transitions

The system automatically adds smooth transitions:

```css
.theme-transition,
.theme-transition *,
.theme-transition *:before,
.theme-transition *:after {
  transition: background-color 0.3s ease, 
              border-color 0.3s ease, 
              color 0.3s ease, 
              box-shadow 0.3s ease, 
              opacity 0.3s ease, 
              transform 0.3s ease !important;
}
```

### Component Classes

Pre-built theme-aware component classes:

```css
/* Cards */
.card { /* Theme-aware card styling */ }
.card-header { /* Card header with theme borders */ }
.card-body { /* Card content area */ }
.card-footer { /* Card footer with theme borders */ }

/* Buttons */
.btn { /* Base button styles */ }
.btn-primary { /* Primary button theme */ }
.btn-secondary { /* Secondary button theme */ }
.btn-ghost { /* Ghost button theme */ }

/* Tables */
.table-container { /* Table wrapper with theme borders */ }
.table-header { /* Table header with theme background */ }
.table-row { /* Table rows with hover effects */ }

/* Status badges */
.badge-success { /* Success state colors */ }
.badge-error { /* Error state colors */ }
.badge-warning { /* Warning state colors */ }
.badge-info { /* Info state colors */ }
```

### Tailwind Integration

The system works seamlessly with Tailwind's dark mode:

```tsx
// Automatic dark mode classes
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  Content with automatic theming
</div>

// Custom color schemes
<div className="bg-primary-50 dark:bg-primary-900">
  Primary color theming
</div>
```

## Theme Detection Logic

1. **Initial Load:**
   - Check localStorage for saved preference
   - Fall back to system preference if no saved choice
   - Apply appropriate theme

2. **System Theme Changes:**
   - Listen for `prefers-color-scheme` media query changes
   - Automatically update if using "system" theme
   - Maintain user choice if manually set

3. **User Theme Changes:**
   - Save preference to localStorage
   - Apply theme immediately
   - Add smooth transition animations

## Accessibility Features

- **ARIA labels** for screen readers
- **Keyboard navigation** support
- **Focus management** with visible focus rings
- **High contrast** themes for better visibility
- **Reduced motion** support (can be added)

## Performance Considerations

- **Efficient re-renders** using React context
- **CSS transitions** instead of JavaScript animations
- **Minimal DOM manipulation** during theme switches
- **Lazy loading** of theme-specific assets (if needed)

## Browser Support

- **Modern browsers** with CSS custom properties support
- **Fallback themes** for older browsers
- **Progressive enhancement** approach

## Customization

### Adding New Themes

1. **Extend the Theme type:**

```typescript
type Theme = 'light' | 'dark' | 'system' | 'custom';
```

2. **Add theme logic in ThemeContext:**

```typescript
const applyTheme = (newTheme: Theme) => {
  if (newTheme === 'custom') {
    // Apply custom theme
    document.documentElement.classList.add('theme-custom');
  }
  // ... existing logic
};
```

3. **Add CSS variables:**

```css
.theme-custom {
  --bg-primary: #your-color;
  --text-primary: #your-color;
}
```

### Component-Specific Theming

```tsx
// Use theme context in custom components
function CustomComponent() {
  const { isDark } = useTheme();
  
  return (
    <div className={`
      ${isDark 
        ? 'bg-gray-800 text-white' 
        : 'bg-white text-gray-900'
      }
      transition-colors duration-300
    `}>
      Custom themed content
    </div>
  );
}
```

## Testing

The theme system includes comprehensive tests:

```bash
# Run theme-related tests
npm test -- --testPathPattern=ThemeToggle
npm test -- --testPathPattern=ThemeContext
```

**Test Coverage:**
- Theme switching functionality
- localStorage persistence
- System theme detection
- Component rendering
- Accessibility features

## Troubleshooting

### Common Issues

1. **Theme not persisting:**
   - Check localStorage permissions
   - Verify ThemeProvider is wrapping the app

2. **Flickering on load:**
   - Ensure ThemeProvider loads before content
   - Check for conflicting CSS

3. **Transitions not working:**
   - Verify CSS classes are applied
   - Check for CSS conflicts

### Debug Mode

Add debug logging to ThemeContext:

```typescript
const setTheme = (newTheme: Theme) => {
  console.log('Setting theme:', newTheme);
  setThemeState(newTheme);
  localStorage.setItem('theme', newTheme);
  applyTheme(newTheme);
};
```

## Future Enhancements

- **Multiple theme variants** (high contrast, sepia, etc.)
- **Theme presets** for different use cases
- **Animation customization** options
- **Server-side theme detection**
- **Theme synchronization** across tabs/windows

## Contributing

When adding new components or modifying existing ones:

1. **Always include theme support** using the provided classes
2. **Test in both light and dark modes**
3. **Ensure smooth transitions** are maintained
4. **Update this documentation** for new features

---

For more information, see the component stories in Storybook or the test files for implementation details.
=======
# Theme System Guide

This document describes the comprehensive light and dark theme system implemented in the React component library.

## Overview

The theme system provides:
- **Light/Dark/System themes** with automatic detection
- **Smooth transitions** between themes
- **Persistent preferences** stored in localStorage
- **System theme detection** that follows OS preferences
- **Beautiful animated components** with theme-aware styling

## Architecture

### ThemeContext (`src/contexts/ThemeContext.tsx`)

The core theme management system that provides:

```typescript
interface ThemeContextType {
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: Theme) => void;
  isDark: boolean;
  toggleTheme: () => void;
}
```

**Features:**
- Automatic theme detection and persistence
- System theme change listening
- Smooth transition animations
- TypeScript support with proper error handling

### ThemeToggle Component (`src/components/ThemeToggle/`)

A beautiful, animated theme switcher component with:

- **Three sizes**: `sm`, `md`, `lg`
- **Label options**: Show/hide theme selection buttons
- **Smooth animations**: Sun/moon icon transitions
- **Accessibility**: Proper ARIA labels and keyboard support

## Usage

### Basic Setup

1. **Wrap your app with ThemeProvider:**

```tsx
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  );
}
```

2. **Use the theme context in components:**

```tsx
import { useTheme } from './contexts/ThemeContext';

function MyComponent() {
  const { theme, isDark, toggleTheme } = useTheme();
  
  return (
    <div className={`${isDark ? 'dark' : ''}`}>
      <button onClick={toggleTheme}>
        Switch to {isDark ? 'light' : 'dark'} mode
      </button>
    </div>
  );
}
```

3. **Add the ThemeToggle component:**

```tsx
import ThemeToggle from './components/ThemeToggle';

function Header() {
  return (
    <header>
      <h1>My App</h1>
      <ThemeToggle size="md" showLabels={true} />
    </header>
  );
}
```

### Theme Toggle Variants

```tsx
// Simple toggle button
<ThemeToggle />

// With theme selection labels
<ThemeToggle showLabels={true} />

// Different sizes
<ThemeToggle size="sm" />
<ThemeToggle size="md" />
<ThemeToggle size="lg" />

// Custom styling
<ThemeToggle className="my-custom-class" />
```

## CSS Classes and Utilities

### Theme Transitions

The system automatically adds smooth transitions:

```css
.theme-transition,
.theme-transition *,
.theme-transition *:before,
.theme-transition *:after {
  transition: background-color 0.3s ease, 
              border-color 0.3s ease, 
              color 0.3s ease, 
              box-shadow 0.3s ease, 
              opacity 0.3s ease, 
              transform 0.3s ease !important;
}
```

### Component Classes

Pre-built theme-aware component classes:

```css
/* Cards */
.card { /* Theme-aware card styling */ }
.card-header { /* Card header with theme borders */ }
.card-body { /* Card content area */ }
.card-footer { /* Card footer with theme borders */ }

/* Buttons */
.btn { /* Base button styles */ }
.btn-primary { /* Primary button theme */ }
.btn-secondary { /* Secondary button theme */ }
.btn-ghost { /* Ghost button theme */ }

/* Tables */
.table-container { /* Table wrapper with theme borders */ }
.table-header { /* Table header with theme background */ }
.table-row { /* Table rows with hover effects */ }

/* Status badges */
.badge-success { /* Success state colors */ }
.badge-error { /* Error state colors */ }
.badge-warning { /* Warning state colors */ }
.badge-info { /* Info state colors */ }
```

### Tailwind Integration

The system works seamlessly with Tailwind's dark mode:

```tsx
// Automatic dark mode classes
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  Content with automatic theming
</div>

// Custom color schemes
<div className="bg-primary-50 dark:bg-primary-900">
  Primary color theming
</div>
```

## Theme Detection Logic

1. **Initial Load:**
   - Check localStorage for saved preference
   - Fall back to system preference if no saved choice
   - Apply appropriate theme

2. **System Theme Changes:**
   - Listen for `prefers-color-scheme` media query changes
   - Automatically update if using "system" theme
   - Maintain user choice if manually set

3. **User Theme Changes:**
   - Save preference to localStorage
   - Apply theme immediately
   - Add smooth transition animations

## Accessibility Features

- **ARIA labels** for screen readers
- **Keyboard navigation** support
- **Focus management** with visible focus rings
- **High contrast** themes for better visibility
- **Reduced motion** support (can be added)

## Performance Considerations

- **Efficient re-renders** using React context
- **CSS transitions** instead of JavaScript animations
- **Minimal DOM manipulation** during theme switches
- **Lazy loading** of theme-specific assets (if needed)

## Browser Support

- **Modern browsers** with CSS custom properties support
- **Fallback themes** for older browsers
- **Progressive enhancement** approach

## Customization

### Adding New Themes

1. **Extend the Theme type:**

```typescript
type Theme = 'light' | 'dark' | 'system' | 'custom';
```

2. **Add theme logic in ThemeContext:**

```typescript
const applyTheme = (newTheme: Theme) => {
  if (newTheme === 'custom') {
    // Apply custom theme
    document.documentElement.classList.add('theme-custom');
  }
  // ... existing logic
};
```

3. **Add CSS variables:**

```css
.theme-custom {
  --bg-primary: #your-color;
  --text-primary: #your-color;
}
```

### Component-Specific Theming

```tsx
// Use theme context in custom components
function CustomComponent() {
  const { isDark } = useTheme();
  
  return (
    <div className={`
      ${isDark 
        ? 'bg-gray-800 text-white' 
        : 'bg-white text-gray-900'
      }
      transition-colors duration-300
    `}>
      Custom themed content
    </div>
  );
}
```

## Testing

The theme system includes comprehensive tests:

```bash
# Run theme-related tests
npm test -- --testPathPattern=ThemeToggle
npm test -- --testPathPattern=ThemeContext
```

**Test Coverage:**
- Theme switching functionality
- localStorage persistence
- System theme detection
- Component rendering
- Accessibility features

## Troubleshooting

### Common Issues

1. **Theme not persisting:**
   - Check localStorage permissions
   - Verify ThemeProvider is wrapping the app

2. **Flickering on load:**
   - Ensure ThemeProvider loads before content
   - Check for conflicting CSS

3. **Transitions not working:**
   - Verify CSS classes are applied
   - Check for CSS conflicts

### Debug Mode

Add debug logging to ThemeContext:

```typescript
const setTheme = (newTheme: Theme) => {
  console.log('Setting theme:', newTheme);
  setThemeState(newTheme);
  localStorage.setItem('theme', newTheme);
  applyTheme(newTheme);
};
```

## Future Enhancements

- **Multiple theme variants** (high contrast, sepia, etc.)
- **Theme presets** for different use cases
- **Animation customization** options
- **Server-side theme detection**
- **Theme synchronization** across tabs/windows

## Contributing

When adding new components or modifying existing ones:

1. **Always include theme support** using the provided classes
2. **Test in both light and dark modes**
3. **Ensure smooth transitions** are maintained
4. **Update this documentation** for new features

---

For more information, see the component stories in Storybook or the test files for implementation details.
>>>>>>> 7e4e980a80064fd01e193255503a3b9b473fdbd3
