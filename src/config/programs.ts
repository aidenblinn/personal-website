import Email from "../features/programs/email/email.tsx";
import { Program } from "../../types.ts";

/**
 * List of programs to be displayed on desktop
 */
const programs: Program[] = [
  {
    programModal: Email,
    name: "Email",
    size: {
      initHeight: 300,
      initWidth: 400,
      minHeight: 100,
      minWidth: 100,
    },
  },
  {
    programModal: Email,
    name: "Clock",
    size: {
      initHeight: 300,
      initWidth: 400,
      minHeight: 100,
      minWidth: 100,
    },
  },
  {
    programModal: Email,
    name: "Folder",
    size: {
      initHeight: 300,
      initWidth: 400,
      minHeight: 100,
      minWidth: 100,
    },
  },
  {
    programModal: Email,
    name: "LinkedIn",
    size: {
      initHeight: 300,
      initWidth: 400,
      minHeight: 100,
      minWidth: 100,
    },
  },
  {
    programModal: Email,
    name: "Music",
    size: {
      initHeight: 300,
      initWidth: 400,
      minHeight: 100,
      minWidth: 100,
    },
  },
  {
    programModal: Email,
    name: "Paint",
    size: {
      initHeight: 300,
      initWidth: 400,
      minHeight: 100,
      minWidth: 100,
    },
  },
  {
    programModal: Email,
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
export const programColumns: Program[][] = [
  programs.slice(0, 4),
  programs.slice(4, 7),
];
