/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          light: '#C8E6D1',
          DEFAULT: '#A8D5BA',
          dark: '#8ABF9E',
        },
        mint: {
          light: '#F2FBF4',
          DEFAULT: '#D8F3DC',
          dark: '#B7E4C7',
        },
        beige: {
          light: '#FAF8F6',
          DEFAULT: '#F8F5F2',
          dark: '#EFEAE4',
        },
        offwhite: {
          DEFAULT: '#FCFCFA',
        },
        lightgrey: {
          DEFAULT: '#ECECEC',
          dark: '#DBDBDB',
        },
        slategrey: {
          light: '#7F8E90',
          DEFAULT: '#5F6B6D',
          dark: '#454E50',
        },
        accent: {
          green: '#10B981', // completed tasks
          amber: '#F59E0B', // medium priority
          red: '#F87171',   // soft red for high priority
          blue: '#3B82F6',  // buttons and links
          bluedark: '#2563EB',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'Manrope', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(95, 107, 109, 0.08), 0 2px 8px -1px rgba(95, 107, 109, 0.04)',
        'soft-lg': '0 10px 30px -5px rgba(95, 107, 109, 0.1), 0 4px 12px -2px rgba(95, 107, 109, 0.05)',
      }
    },
  },
  plugins: [],
}
