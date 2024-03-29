import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
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
    ...["yellow", "blue", "red", "green"].reduce((prev: string[], cur) => {
      prev.push(`bg-${cur}-500`, `bg-${cur}-600`);
      return prev;
    }, []),
  ],
  theme: {
    extend: {
      backgroundImage: {
        "bliss": "url('../../public/img/desktopAssets/bliss-background.jpg')",
      },
      cursor: {
        "xp-default": "url('../../public/cursors/arrow.cur'), default",
        "xp-help": "url('../../public/cursors/help.cur'), help",
        "xp-link": "url('../../public/cursors/link.cur'), pointer",
        "xp-move": "url('../../public/cursors/move.cur'), move",
        "xp-no": "url('../../public/cursors/no.cur'), not-allowed",
        "xp-size": "url('../../public/cursors/size.cur'), nwse-resize",
        "xp-wait": "url('../../public/cursors/wait.cur'), wait",
      },
    },
  },
  plugins: [],
};

export default config;
