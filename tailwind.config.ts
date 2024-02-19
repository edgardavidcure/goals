import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  
    colors: {
      'light-orange': "#e6c887",
      'extra-light-orange': "#fcf9f0",

      'dark-blue': "#143642",

      'light-gray': "#f6f7f9",
      
      'white': 'hsl(0, 0%, 100%)',

      'black': 'hsl(0, 0%, 0%)',

      'transparent': 'rgba(0, 0, 0, 0)',
      
      'yellow': '#ffc43d',

      'green': '#11B136',

      'gray': '#959595',

      'red': '#fb3640'
    }
  },
  keyframes: {
    shimmer: {
      '100%': {
        transform: 'translateX(100%)',
      },
    },
  },
  plugins: [],
};
export default config;
