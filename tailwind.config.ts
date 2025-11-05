import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // Industry-standard breakpoints
      screens: {
        'xs': '375px',   // Mobile (iPhone SE)
        'sm': '640px',   // Mobile landscape / Small tablet
        'md': '768px',   // Tablet portrait
        'lg': '1024px',  // Tablet landscape / Small desktop
        'xl': '1280px',  // Desktop
        '2xl': '1536px', // Large desktop
      },
      // Max-width containers for content
      maxWidth: {
        'container-xs': '480px',   // Mobile
        'container-sm': '640px',   // Tablet
        'container-md': '768px',   // Medium
        'container-lg': '1024px',  // Desktop
        'container-xl': '1280px',  // Large desktop
        'container-2xl': '1536px', // Extra large
      },
      // Responsive spacing
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
    },
  },
  plugins: [],
}

export default config