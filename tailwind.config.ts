import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // 주식 시장 색상 테마
        primary: {
          DEFAULT: '#2563eb', // 파란색 (상승)
          dark: '#1e40af',
          light: '#3b82f6',
        },
        danger: {
          DEFAULT: '#dc2626', // 빨간색 (하락)
          dark: '#b91c1c',
          light: '#ef4444',
        },
        neutral: {
          DEFAULT: '#6b7280', // 회색 (보합)
          dark: '#4b5563',
          light: '#9ca3af',
        },
      },
    },
  },
  plugins: [],
}
export default config


