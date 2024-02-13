import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  /**
   * Program indices will have z-indices indicating their layering on the page
   * Tailwind utility classes must be present in generated CSS so they can be
   * dynamically rendered as the user interacts with the site.
   */
  safelist: [
    ...Array(12)
      .fill(0)
      .map((_, index) => `!z-[${index}]`),
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
