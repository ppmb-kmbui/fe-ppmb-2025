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
        montserrat: ['var(--font-montserrat)'],
        crimson: ['var(--font-crimson)'],
      },

      colors: {
        'ppmb-000': '#f5f5f5',
        'ppmb-100': '#dddddd',
        'ppmb-200': '#c4c4c4',
        'ppmb-300': '#acacac',
        'ppmb-400': '#939393',
        'ppmb-500': '#7b7b7b',
        'ppmb-600': '#626262',
        'ppmb-700': '#494949',
        'ppmb-800': '#313131',
        'ppmb-900': '#181818',

        // "ppmb-red-300": "#fba195",
        // "ppmb-red-400": "#fb9588",
        // // "ppmb-red-500": "#FA897B",
        // "ppmb-red-500": "#db3324",
        // // "ppmb-red-500": "#f2392a",
        // "ppmb-red-600": "#e17b6f",
        // "ppmb-red-700": "#c86e62",

        
        // "ppmb-red-200": "#f37a72",
        // "ppmb-red-300": "#f1645b",
        // "ppmb-red-400": "#e91a1a",
        "ppmb-red-500": "#e91a1a",
        // "ppmb-red-600": "#d41f12",


        "ppmb-blue-400": "#5192e9",
        "ppmb-blue-500": "#2577e3",
        "ppmb-blue-600": "#1a539f",
        "ppmb-blue-700": "#133c72",
        "ppmb-blue-800": "#0b2444",
        "ppmb-blue-900": "#040c17",

        // "ppmb-green-500": "#00b000",
        // "ppmb-success": "#21cc21",
        "ppmb-success": "#37d137",
        "ppmb-warning": "#d6bd02"

      },

      boxShadow: {
        'custom': '2px 2px 10px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};
export default config;
