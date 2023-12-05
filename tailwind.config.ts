import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "gauge_fadeIn": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "gauge_fill": {
          from: { "stroke-dashoffset": "332", opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "gauge_fadeIn": "gauge_fadeIn 1s ease forwards",
        "gauge_fill": "gauge_fill 1s ease forwards",
      },

    },
    backgroundImage: {
      'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      'gradient-conic':
        'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
    },

  },
  plugins: [require("tailwindcss-animate")],
}
export default config
