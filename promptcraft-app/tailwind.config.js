/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/providers/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        purple: {
          '400': '#a78bfa',
          '500': '#8b5cf6',
          '600': '#7c3aed',
          '700': '#6d28d9',
          '800': '#5b21b6',
          '900': '#4c1d95',
        },
        pink: {
          '400': '#f472b6',
          '500': '#ec4899',
          '600': '#db2777',
        },
        orange: {
          '400': '#fb923c',
          '500': '#f97316',
        },
        yellow: {
          '400': '#facc15',
          '500': '#eab308',
        },
        green: {
          '400': '#4ade80',
          '500': '#22c55e',
        },
        blue: {
          '400': '#60a5fa',
          '500': '#3b82f6',
        },
        teal: {
          '400': '#2dd4bf',
          '500': '#14b8a6',
        },
        red: {
          '400': '#f87171',
          '500': '#ef4444',
        },
        gray: {
          '400': '#9ca3af',
          '500': '#6b7280',
          '600': '#4b5563',
          '700': '#374151',
          '800': '#1f2937',
          '900': '#111827',
        },
      },
    },
  },
  safelist: [
    'bg-purple-500/20', 'text-purple-400',
    'bg-pink-500/20', 'text-pink-400',
    'bg-orange-500/20', 'text-orange-400',
    'bg-yellow-500/20', 'text-yellow-400',
    'bg-green-500/20', 'text-green-400',
    'bg-blue-500/20', 'text-blue-400',
    'bg-teal-500/20', 'text-teal-400',
    'bg-red-500/20', 'text-red-400',
    'bg-gray-500/20', 'text-gray-400',
  ],
  plugins: [],
}
