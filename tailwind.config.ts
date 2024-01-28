import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "bliss": "url('../../public/img/bliss-background.jpg')",
      },
      colors: {
        "bliss-blue": "#1a44d5",
      },
    },
  },
  plugins: [],
};
export default config;
