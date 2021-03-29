import React from "react";
import { ButtonBase, Typography } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

import styles from "./styles";

const ImageButton = ({ image, url, text }) => {
  const classes = styles();

  return (
    <ButtonBase
      key="Workout"
      className={classes.image}
      component={RouterLink}
      to={url}
    >
      <span
        className={classes.imageSrc}
        style={{
          backgroundImage: `url(${image})`,
        }}
      />
      <span className={classes.imageBackdrop} />
      <span className={classes.imageButton}>
        <Typography
          component="span"
          variant="subtitle1"
          color="inherit"
          className={classes.imageTitle}
        >
          {text}
          <span className={classes.imageMarked} />
        </Typography>
      </span>
    </ButtonBase>
  );
};

export default ImageButton;
