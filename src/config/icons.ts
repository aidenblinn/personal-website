import Placeholder from "../features/programs/placeholder/placeholder.tsx";
import { IconType } from "../../types.ts";

/**
 * List of icons to be displayed on desktop,
 * mapping either to a program modal or an external link.
 */
const icons: IconType[] = [
  {
    name: "Email",
    type: "program",
    programModal: Placeholder,
    size: {
      initHeight: 300,
      initWidth: 400,
      minHeight: 200,
      minWidth: 200,
    },
  },
  {
    name: "Clock",
    type: "program",
    programModal: Placeholder,
    size: {
      initHeight: 300,
      initWidth: 400,
      minHeight: 200,
      minWidth: 200,
    },
  },
  {
    name: "Folder",
    type: "program",
    programModal: Placeholder,
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
    type: "program",
    programModal: Placeholder,
    size: {
      initHeight: 300,
      initWidth: 400,
      minHeight: 200,
      minWidth: 200,
    },
  },
  {
    name: "Paint",
    type: "program",
    programModal: Placeholder,
    size: {
      initHeight: 300,
      initWidth: 400,
      minHeight: 200,
      minWidth: 200,
    },
  },
  {
    name: "Trash",
    type: "program",
    programModal: Placeholder,
    size: {
      initHeight: 300,
      initWidth: 400,
      minHeight: 200,
      minWidth: 200,
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
