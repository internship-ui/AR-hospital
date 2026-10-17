/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        hospital: {
          // AR Hospital Logo Palette: Deep Maroon (#820141)
          maroon: {
            50:  '#fdf2f4',   // ultra-soft subtle blush wash
            100: '#fce7ec',   // soft pink tint / subtle highlights
            200: '#f8ccd6',   // soft pink border
            300: '#f19bb0',   // rose accent
            400: '#d94474',   // vibrant berry accent
            500: '#a80c55',   // rich crimson maroon
            600: '#820141',   // PRIMARY DEEP MAROON (Direct from AR Hospital Logo)
            700: '#6e0137',   // dark maroon hover
            800: '#5a012d',   // deep maroon active
            900: '#460123',   // midnight maroon
            950: '#2e0016',   // deepest maroon
          },
          // Soft Pink for subtle highlights, pill badges, hover states
          pink: {
            50:  '#fff5f7',
            100: '#fce7ec',
            200: '#f8ccd6',
            300: '#f19bb0',
            400: '#e65985',
            500: '#d94474',
            600: '#820141',
          },
          // Logo Charcoal Grey (#656565) for secondary text, supporting icons, and borders
          grey: {
            50:  '#f9fafb',
            100: '#f3f4f6',
            200: '#e5e7eb',
            300: '#d1d5db',
            400: '#9ca3af',
            500: '#656565',   // Logo grey
            600: '#4b5563',
            700: '#374151',
            800: '#1f2937',
            900: '#111827',
          },
          slate: {
            50:  '#f8fafc',
            100: '#f1f5f9',
            200: '#e2e8f0',
            700: '#334155',
            800: '#1e293b',
            900: '#0f172a',
          },
          // Fallback mappings: Blue/Teal/Cyan mapped directly to Maroon/Pink/Grey to prevent any rogue blue leakage
          blue: {
            50:  '#fdf2f4',
            100: '#fce7ec',
            200: '#f8ccd6',
            300: '#f19bb0',
            400: '#d94474',
            500: '#a80c55',
            600: '#820141',
            700: '#6e0137',
            800: '#5a012d',
            900: '#460123',
            950: '#2e0016',
          },
          teal: {
            50:  '#fdf2f4',
            100: '#fce7ec',
            200: '#f8ccd6',
            300: '#f19bb0',
            400: '#d94474',
            500: '#a80c55',
            600: '#820141',
            700: '#6e0137',
            800: '#5a012d',
            900: '#460123',
          },
          cyan: {
            50:  '#fdf2f4',
            100: '#fce7ec',
            500: '#a80c55',
            600: '#820141',
            700: '#6e0137',
          }
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft-maroon': '0 10px 25px -5px rgba(130, 1, 65, 0.15), 0 8px 10px -6px rgba(130, 1, 65, 0.10)',
        'soft-pink': '0 10px 25px -5px rgba(248, 204, 214, 0.25), 0 8px 10px -6px rgba(248, 204, 214, 0.15)',
        'soft-blue': '0 10px 25px -5px rgba(130, 1, 65, 0.15), 0 8px 10px -6px rgba(130, 1, 65, 0.10)',
        'soft-teal': '0 10px 25px -5px rgba(130, 1, 65, 0.12), 0 8px 10px -6px rgba(130, 1, 65, 0.08)',
        'card': '0 4px 20px -2px rgba(15, 23, 42, 0.06), 0 2px 6px -1px rgba(15, 23, 42, 0.04)',
        'card-hover': '0 20px 30px -10px rgba(130, 1, 65, 0.12), 0 10px 15px -5px rgba(130, 1, 65, 0.08)',
        'glow-maroon': '0 0 20px rgba(130, 1, 65, 0.35)',
        'glow-blue': '0 0 20px rgba(130, 1, 65, 0.35)',
        'glow-teal': '0 0 20px rgba(130, 1, 65, 0.35)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'fadeIn': 'fadeIn 0.4s ease-out forwards',
        'slideUp': 'slideUp 0.5s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
