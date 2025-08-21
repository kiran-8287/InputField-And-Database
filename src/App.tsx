import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Demo from './pages/Demo';

function App() {
  return (
    <ThemeProvider>
      <Demo />
    </ThemeProvider>
  );
}

export default App;
