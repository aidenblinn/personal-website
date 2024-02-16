import Email from "../features/programs/email/email.tsx";
import Placeholder from "../features/programs/placeholder/placeholder.tsx";
import { ProgramType } from "../../types.ts";

/**
 * List of programs to be displayed on desktop
 */
const programs: ProgramType[] = [
  {
    programModal: Placeholder,
    name: "Email",
    size: {
      initHeight: 300,
      initWidth: 400,
      minHeight: 100,
      minWidth: 100,
    },
  },
  {
    programModal: Placeholder,
    name: "Clock",
    size: {
      initHeight: 300,
      initWidth: 400,
      minHeight: 100,
      minWidth: 100,
    },
  },
  {
    programModal: Placeholder,
    name: "Folder",
    size: {
      initHeight: 300,
      initWidth: 400,
      minHeight: 100,
      minWidth: 100,
    },
  },
  {
    programModal: Placeholder,
    name: "LinkedIn",
    size: {
      initHeight: 300,
      initWidth: 400,
      minHeight: 100,
      minWidth: 100,
    },
  },
  {
    programModal: Placeholder,
    name: "Music",
    size: {
      initHeight: 300,
      initWidth: 400,
      minHeight: 100,
      minWidth: 100,
    },
  },
  {
    programModal: Placeholder,
    name: "Paint",
    size: {
      initHeight: 300,
      initWidth: 400,
      minHeight: 100,
      minWidth: 100,
    },
  },
  {
    programModal: Placeholder,
    name: "Trash",
    size: {
      initHeight: 300,
      initWidth: 400,
      minHeight: 100,
      minWidth: 100,
    },
  },
];

/**
 * Each sub-array represents a column of programs to be displayed on the desktop
 */
export const programColumns: ProgramType[][] = [
  programs.slice(0, 4),
  programs.slice(4, 7),
];
