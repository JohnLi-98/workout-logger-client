import React, { useState, useContext } from "react";
import { Container } from "@material-ui/core";

import styles from "./styles";
import LoginForm from "../forms/Login";

const LoginPage = ({ props }) => {
  const classes = styles();

  return (
    <Container maxWidth="md">
      <div className={classes.heading}>
        <h1>LOGIN</h1>
      </div>

      <LoginForm props={props} />
    </Container>
  );
};

export default LoginPage;
