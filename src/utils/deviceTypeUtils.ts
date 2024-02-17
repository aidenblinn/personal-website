type ProgramModalAttributes = {
  initHeight: number;
  initWidth: number;
  minHeight: number;
  minWidth: number;
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
  initHeight,
  initWidth,
  minHeight,
  minWidth,
  onFocus,
}: ProgramModalAttributes) => {
  if (isMobileDevice) {
    return {
      disableResize: true,
      disableMove: true,
      // 48 refers to the height of the utility bar in px
      initHeight: (window.innerHeight - 48) * 0.95,
      initWidth: window.innerWidth * 0.95,
    };
  } else {
    return {
      minHeight,
      minWidth,
      initHeight,
      initWidth,
      onFocus: () => onFocus(),
    };
  }
};
