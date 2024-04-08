/* Eager Loading (with initial request) */
import InProgress from "../features/desktop/programs/inProgress/index.tsx";
import Email from "../features/desktop/programs/email/index.tsx";

/* Lazy Loading for larger components */
import dynamic from "next/dynamic";
import Loading from "@/features/desktop/programs/loading.tsx";
const Snake = dynamic(
  () => import("../features/desktop/programs/snake/index.tsx"),
  {
    loading: Loading,
  }
);
const Gallery = dynamic(
  () => import("../features/desktop/programs/gallery/index.tsx"),
  {
    loading: Loading,
  }
);

import { IconType } from "../../types.ts";

/**
 * List of icons to be displayed on desktop,
 * mapping either to a program modal or an external link.
 */
const icons: IconType[] = [
  {
    name: "Email",
    type: "program",
    ProgramModal: Email,
    size: {
      initHeight: 400,
      initWidth: 400,
      minHeight: 360,
      minWidth: 320,
    },
  },
  {
    name: "Snake",
    type: "program",
    ProgramModal: Snake,
    size: {
      initHeight: 440,
      initWidth: 400,
      disableResize: true,
    },
  },
  {
    name: "SECRET",
    type: "inprogress",
    ProgramModal: InProgress,
    size: {
      initHeight: 300,
      initWidth: 400,
      minHeight: 200,
      minWidth: 200,
    },
  },
  {
    name: "LinkedIn",
    type: "link",
    url: "https://www.linkedin.com/in/aidenblinn/",
  },
  {
    name: "Music",
    type: "inprogress",
    ProgramModal: InProgress,
    size: {
      initHeight: 300,
      initWidth: 400,
      minHeight: 200,
      minWidth: 200,
    },
  },
  {
    name: "Paint",
    type: "inprogress",
    ProgramModal: InProgress,
    size: {
      initHeight: 300,
      initWidth: 400,
      minHeight: 200,
      minWidth: 200,
    },
  },
  {
    name: "Gallery",
    type: "inprogress",
    ProgramModal: Gallery,
    size: {
      initHeight: 500,
      initWidth: 800,
      minHeight: 400,
      minWidth: 400,
    },
  },
  {
    name: "GitHub",
    type: "link",
    url: "https://github.com/aidenblinn",
  },
];

/**
 * Each sub-array represents a column of icons to be displayed on the desktop
 */
export const iconColumns: IconType[][] = [icons.slice(0, 4), icons.slice(4, 8)];
