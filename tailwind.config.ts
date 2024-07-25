import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lexend: ['var(--font-lexend)']
      },

      colors: {
        'ppmb-000': '#f5f5f5',
        'ppmb-50': "#e9e9e9",
        'ppmb-100': '#dddddd',
        'ppmb-200': '#c4c4c4',
        'ppmb-300': '#acacac',
        'ppmb-400': '#939393',
        'ppmb-500': '#7b7b7b',
        'ppmb-600': '#626262',
        'ppmb-700': '#494949',
        'ppmb-800': '#313131',
        'ppmb-900': '#181818',

        "ppmb-red-100": "#fde8e8",
        "ppmb-red-500": "#e91a1a",

        "ppmb-blue-100": "#e9f1fc",
        "ppmb-blue-200": "#a8c9f4",
        "ppmb-blue-300": "#66a0eb",
        "ppmb-blue-400": "#5192e9",
        "ppmb-blue-500": "#2577e3",
        "ppmb-blue-600": "#1a539f",
        "ppmb-blue-700": "#133c72",
        "ppmb-blue-800": "#0b2444",
        "ppmb-blue-900": "#040c17",

        "ppmb-success": "#1eb81e",
        "ppmb-warning": "#d6bd02"
      },

      boxShadow: {
        'custom': '4px 4px 10px rgba(0, 0, 0, 0.1)',
        'custom-sm': '3px 3px 7px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};
export default config;
