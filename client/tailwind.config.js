/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#2563eb',
          600: '#1d4ed8',
          700: '#1e40af'
        },
        slate: {
          950: '#020617'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui']
      },
      boxShadow: {
        soft: '0 20px 40px rgba(15, 23, 42, 0.08)'
      },
      backgroundImage: {
        mesh: 'radial-gradient(circle at top left, rgba(37,99,235,0.16), transparent 35%), radial-gradient(circle at top right, rgba(14,165,233,0.12), transparent 30%), linear-gradient(135deg, #f8fafc 0%, #eef4ff 45%, #f8fafc 100%)'
      }
    }
  },
  plugins: []
};
