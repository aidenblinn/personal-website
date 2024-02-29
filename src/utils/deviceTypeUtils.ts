import { ProgramType } from "../../types.ts";

type ProgramModalAttributes = {
  size: ProgramType["size"];
  onFocus: () => void;
};

export const isMobileDevice =
  // Only access navigator object if on client side
  typeof navigator === "undefined"
    ? false
    : /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

export const getAttributesByDeviceType = ({
  size,
  onFocus,
}: ProgramModalAttributes) => {
  if (isMobileDevice) {
    return {
      disableResize: true,
      disableMove: true,
      // 48 refers to the height of the utility bar in px
      // 32 refers to the height of the title bar of the program
      initHeight: (window.innerHeight - 48 - 32) * 0.95,
      initWidth: window.innerWidth * 0.95,
    };
  } else {
    return {
      ...size,
      onFocus: () => onFocus(),
    };
  }
};
