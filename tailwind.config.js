/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1A73E8',
        'primary-dark': '#1557B0',
        secondary: '#34A853',
        error: '#D93025',
        'text-primary': '#202124',
        'text-secondary': '#5F6368',
        success: '#34A853',
        warning: '#FBBC04',
        'light-surface': '#F8F9FA',
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        xxl: '48px',
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '16px',
      },
    },
  },
  plugins: [],
};
