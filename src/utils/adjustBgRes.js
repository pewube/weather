const adjustBgRes = () => {
  if (window.screen.width <= 1024 && window.screen.height <= 1024) {
    return "m";
  } else if (window.screen.width <= 1920 && window.screen.height <= 1920) {
    return "d";
  } else {
    return "q";
  }
};

export default adjustBgRes;
