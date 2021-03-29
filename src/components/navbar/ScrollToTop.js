import React from "react";
import { Zoom, useScrollTrigger } from "@material-ui/core";

const style = {
  position: `fixed`,
  bottom: `35px`,
  right: `50px`,
  zIndex: `99`,
};

const ScrollToTop = ({ children }) => {
  const trigger = useScrollTrigger();

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#scroll-to-top-anchor"
    );
    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" style={style}>
        {children}
      </div>
    </Zoom>
  );
};

export default ScrollToTop;
