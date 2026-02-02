export const getAnimationVariants = (animationType: string) => {
  switch (animationType) {
    case "fade":
      return {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 },
      };
    case "scale":
      return {
        hidden: { scale: 0.8, opacity: 0 },
        visible: { scale: 1, opacity: 1 },
        exit: { scale: 0.8, opacity: 0 },
      };
    case "slide":
      return {
        hidden: { y: "-100vh", opacity: 0 },
        visible: { y: 0, opacity: 1 },
        exit: { y: "-100vh", opacity: 0 },
      };
    case "flip":
      return {
        hidden: { rotateX: 90, opacity: 0 },
        visible: { rotateX: 0, opacity: 1 },
        exit: { rotateX: 90, opacity: 0 },
      };
    default:
      return {
        hidden: { scale: 0.8, opacity: 0 },
        visible: { scale: 1, opacity: 1 },
        exit: { scale: 0.8, opacity: 0 },
      };
  }
};
