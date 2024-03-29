const formatWindDirection = (windDeg) => {
  let direction = "";

  const directions = {
    n1: [0, 11.25],
    nne: [11.26, 33.75],
    ne: [33.76, 56.25],
    ene: [56.26, 78.75],
    e: [78.76, 101.25],
    ese: [101.26, 123.75],
    se: [123.76, 146.25],
    sse: [146.26, 168.75],
    s: [168.76, 191.25],
    ssw: [191.26, 213.75],
    sw: [213.76, 236.25],
    wsw: [236.26, 258.75],
    w: [258.76, 281.25],
    wnw: [281.26, 303.75],
    nw: [303.76, 326.25],
    nnw: [326.26, 348.75],
    n2: [348.76, 360],
  };

  for (const [key, value] of Object.entries(directions)) {
    if (windDeg >= value[0] && windDeg <= value[1]) {
      direction = key;
      /*
      switch (direction) {
        case "n1":
          return "pn.";
        case "nne":
          return "pn.-pn.-wsch.";
        case "ne":
          return "pn.-wsch.";
        case "ene":
          return "wsch.-pn.-wsch.";
        case "e":
          return "wsch.";
        case "ese":
          return "wsch.-pd.-wsch.";
        case "se":
          return "pd.-wsch.";
        case "sse":
          return "pd.-pd.-wsch.";
        case "s":
          return "pd.";
        case "ssw":
          return "pd.-pd.-zach.";
        case "sw":
          return "pd.-zach.";
        case "wsw":
          return "zach.-pd.-zach.";
        case "w":
          return "zach.";
        case "wnw":
          return "zach.-pn.-zach.";
        case "nw":
          return "pn.-zach.";
        case "nnw":
          return "pn.-pn.-zach.";
        case "nn2":
          return "pn.";
        default:
          return "?";
      }
      */
      return direction === "n1" || direction === "n2"
        ? "N"
        : direction.toUpperCase();
    }
  }
};

export default formatWindDirection;
