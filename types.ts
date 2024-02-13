/**
 * Stores information about an individual program,
 * which is rendered as a pop-up modal on the simulated desktop
 */
export type Program = {
  programModal: () => React.ReactElement;
  name: string;
  size: {
    initHeight: number;
    initWidth: number;
    minHeight: number;
    minWidth: number;
  };
};

/**
 * Stores information about the state of programs on the simulated desktop
 */
export type DesktopState = {
  /** Programs are layered by z-index to simulate a multi-window desktop.
   * Program modals are prioritized by most recent open / focus.
   */
  modalHierarchy: string[];
  /**
   * List of open programs to be rendered in task bar,
   * ordered left to right by first program opened.
   */
  taskBarPrograms: string[];
  /** Active program (most recently opened / focused program)
   * will be indicated in task bar and in modal border color.
   */
  activeProgram: string | null;
};
