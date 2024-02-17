/**
 * Stores information about a desktop icon that opens
 * a program modal when clicked
 */
export type ProgramType = {
  name: string;
  type: "program";
  programModal: () => React.ReactElement;
  size: {
    initHeight: number;
    initWidth: number;
    minHeight: number;
    minWidth: number;
  };
  url?: never;
};

/**
 * Stores information about a desktop icon that opens
 * a link in a new tab when clicked
 */
type LinkType = {
  name: string;
  type: "link";
  url: string;
  programModal?: never;
  size?: never;
};

/**
 * Each icon is either an application on the simulated desktop
 * or a link to an external page
 */
export type IconType = ProgramType | LinkType;
