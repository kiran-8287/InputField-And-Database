# React Component Library

A modern, accessible React component library built with TypeScript, featuring beautiful light/dark themes and comprehensive testing.

[LIvE DEMO](https://kiran-8287.github.io/InputField-And-Database/)

## 🎯 **Deliverables Status**

✅ **Two Working Components** - Actually delivered **THREE** components!  
✅ **Simple Demo/Example Usage** - Interactive demo page with all components  
✅ **Basic Documentation** - Comprehensive guides and Storybook stories  

---

## 🚀 **Components**

### 1. **InputField Component**
A versatile, accessible input component with multiple variants and states.

**Features:**
- Multiple variants: default, filled, ghost
- Different sizes: small, medium, large
- Validation states with error messages
- Password toggle functionality
- Clearable inputs
- Helper text support
- Full accessibility (ARIA labels, focus management)

**Usage:**
```tsx
import InputField from './components/InputField';

<InputField
  label="Email Address"
  type="email"
  placeholder="Enter your email"
  helperText="We'll never share your email"
  required
/>
```

### 2. **DataTable Component**
A powerful, generic data table with sorting, selection, and custom rendering.

**Features:**
- Generic TypeScript support
- Sortable columns
- Row selection (single/multiple)
- Custom cell rendering
- Loading states
- Responsive design
- Theme-aware styling

**Usage:**
```tsx
import DataTable from './components/DataTable';

<DataTable
  data={users}
  columns={userColumns}
  selectable={true}
  onRowSelect={setSelectedUsers}
/>
```

### 3. **ThemeToggle Component** ⭐ **BONUS**
A beautiful animated theme switcher with light/dark/system support.

**Features:**
- Three theme modes: Light, Dark, System
- Smooth animated transitions
- Multiple sizes (sm, md, lg)
- Optional theme selection labels
- localStorage persistence
- System theme detection
- Full accessibility support

**Usage:**
```tsx
import ThemeToggle from './components/ThemeToggle';

<ThemeToggle size="lg" showLabels={true} />
```

---

## 🎨 **Theme System**

**Advanced Features:**
- **Automatic theme detection** (follows OS preference)
- **Persistent user preferences** (saved to localStorage)
- **Smooth 300ms transitions** between themes
- **System theme change listening** (real-time updates)
- **Beautiful animated components** with sun/moon icons
- **Full accessibility support** (ARIA, keyboard navigation)

---

## 📱 **Demo & Examples**

### **Live Demo Page**
- **Interactive showcase** of all components
- **Real-time theme switching** with smooth transitions
- **Component variants** and states demonstration
- **Form examples** with validation
- **Data table examples** with sorting and selection

### **Storybook Documentation**
- **Component stories** for all variants
- **Interactive controls** for props
- **Usage examples** and best practices
- **Accessibility guidelines**

---

## 🛠 **Technology Stack**

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for utility-first styling
- **Storybook** for component documentation
- **Jest + Testing Library** for comprehensive testing
- **PostCSS** for CSS processing

---

## 🚀 **Getting Started**

### **Installation**
   ```bash
   npm install
   ```

### **Development**
   ```bash
npm run dev          # Start development server
npm run storybook    # Open Storybook documentation
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
```

### **Building**
```bash
npm run build        # Build for production
npm run preview      # Preview production build
```

---

## 📚 **Documentation**

### **Component Documentation**
- **InputField**: `src/components/InputField/`
- **DataTable**: `src/components/DataTable/`
- **ThemeToggle**: `src/components/ThemeToggle/`

### **Theme System Guide**
- **THEME_GUIDE.md**: Comprehensive theme system documentation
- **Usage examples** and customization options
- **Troubleshooting** and best practices

### **Storybook Stories**
- **Interactive examples** for all components
- **Prop controls** and variations
- **Accessibility guidelines**

---

## 🧪 **Testing**

**Comprehensive Test Coverage:**
- **Unit tests** for all components
- **Accessibility testing** with ARIA validation
- **User interaction testing** with React Testing Library
- **Theme system testing** with localStorage mocking
- **Component rendering tests** for all variants

**Run Tests:**
```bash
npm test                    # Run all tests
npm run test:watch         # Watch mode
npm run test:coverage      # Coverage report
```

---

## 🎨 **Styling & Theming**

### **CSS Classes**
- **Theme-aware components** with automatic light/dark support
- **Utility classes** for common patterns
- **Responsive design** with mobile-first approach
- **Smooth transitions** and animations

### **Customization**
- **CSS custom properties** for easy theming
- **Tailwind configuration** with custom color palette
- **Component variants** for different use cases
- **Accessibility-focused** design patterns

---

## 🌟 **Key Features**

### **Accessibility**
- **ARIA labels** and descriptions
- **Keyboard navigation** support
- **Focus management** with visible focus rings
- **Screen reader** compatibility
- **High contrast** theme support

### **Performance**
- **Efficient re-renders** with React context
- **CSS transitions** instead of JavaScript animations
- **Lazy loading** support for large datasets
- **Optimized bundle** size

### **Developer Experience**
- **TypeScript support** with proper type safety
- **Comprehensive error handling**
- **Detailed console warnings** for debugging
- **Easy customization** with clear APIs

---

## 📁 **Project Structure**

```
src/
├── components/           # React components
│   ├── InputField/      # Input component with variants
│   ├── DataTable/       # Data table with sorting
│   └── ThemeToggle/     # Theme switcher
├── contexts/            # React contexts
│   └── ThemeContext.tsx # Theme management
├── pages/               # Demo pages
│   └── Demo.tsx        # Component showcase
├── test/                # Test utilities
└── index.css            # Global styles and utilities
```

---

## 🎯 **Deliverables Summary**

| Requirement | Status | Details |
|-------------|--------|---------|
| **Two Working Components** | ✅ **EXCEEDED** | Delivered **3 components** |
| **Simple Demo/Example Usage** | ✅ **COMPLETE** | Interactive demo page |
| **Basic Documentation** | ✅ **COMPLETE** | README + THEME_GUIDE + Storybook |

---

## 🚀 **Next Steps**

1. **Explore the demo** at `http://localhost:5174/`
2. **Check Storybook** with `npm run storybook`
3. **Run tests** to verify everything works
4. **Customize components** for your needs
5. **Add more components** to the library

---

## 🤝 **Contributing**

When adding new components:
1. **Include theme support** using provided classes
2. **Add comprehensive tests** for all functionality
3. **Create Storybook stories** for documentation
4. **Ensure accessibility** compliance
5. **Update this README** with new features

---

## 📤 Submission

- **GitHub Repository**
  - Repo: https://github.com/kiran-8287/InputField-And-Database
  - Clear structure: `src/components/*`, `src/pages`, `src/contexts`, tests, Storybook stories
  - Setup in README: `npm install`, `npm run dev`, `npm run storybook`, `npm test`
  - Approach: TypeScript typing, responsive design, ARIA basics, Tailwind styling, tests, theming

- **Storybook Preview Link**
  - URL: 
    View the Storybook for this project on Vercel:  
    [Storybook Vercel](https://input-field-and-database-git-main-sunnysai2166-9423s-projects.vercel.app/?path=/docs/components-datatable--docs)
    
  - Option A – Chromatic (fastest):
    1. `npm i -D chromatic`
    2. `npx chromatic --project-token <YOUR_CHROMATIC_TOKEN>`
    3. Paste the published Storybook URL above
  - Option B – Vercel:
    1. Connect repo in Vercel
    2. Build Command: `npm run build-storybook`
    3. Output Directory: `storybook-static`
    4. Paste the deployment URL above

- **Checklist**
  - [ ] Repo pushed and public
  - [ ] Storybook link accessible
  - [ ] README updated with links and approach
  - [ ] Optional GIFs/screenshots added

---

**Built with ❤️ using modern React best practices**
