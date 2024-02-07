// Stores information about an individual program,
// which is rendered as a pop-up modal on the simulated desktop
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
