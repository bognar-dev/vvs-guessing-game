import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        U1: 'var(--U1)',
        U2: 'var(--U2)',
        U3: 'var(--U3)',
        U4: 'var(--U4)',
        U5: 'var(--U5)',
        U6: 'var(--U6)',
        U7: 'var(--U7)',
        U8: 'var(--U8)',
        U9: 'var(--U9)',
        U11: 'var(--U11)',
        U12: 'var(--U12)',
        U13: 'var(--U13)',
        U14: 'var(--U14)',
        U15: 'var(--U15)',
        U16: 'var(--U16)',
        U19: 'var(--U19)',
        U29: 'var(--U29)',
        S1: 'var(--S1)',
        S2: 'var(--S2)',
        S3: 'var(--S3)',
        S4: 'var(--S4)',
        S5: 'var(--S5)',
        S6: 'var(--S6)',
        S60: 'var(--S60)',
        S62: 'var(--S62)',       
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
