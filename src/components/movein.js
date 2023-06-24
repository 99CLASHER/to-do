export const moveIn = (delay) => {
    return {
      hidden: {
        x: -1000, // Move the element completely outside the left side of the screen
        opacity: 0,
      },
      show: {
        x: 0, // Move the element to its final position
        opacity: 1,
        transition: {
          type: 'tween',
          duration: 1.2,
          delay: delay,
          ease: [0.25, 0.25, 0.25, 0.75],
        },
      },
    };
  };