import React from "react";
import { Container, makeStyles } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

import styles from "./styles";

const UnauthHome = () => {
  const classes = styles();

  return (
    <div className={classes.unauthHeading}>
      <Container maxWidth="md">
        <h2>Welcome to your</h2>
        <h1>WORKOUT LOGGER</h1>
        <p>
          We know the importance of tracking your progress while working out has
          on motivating you to continiously improve. Accelerate your development
          with our flexible application designed to help you view and update
          your progress with ease.
        </p>
        <p>
          Get started by{" "}
          <RouterLink to="/account/register">creating an account</RouterLink> or{" "}
          <RouterLink to="/account/login">signing in</RouterLink>.
        </p>
      </Container>
    </div>
  );
};

export default UnauthHome;
