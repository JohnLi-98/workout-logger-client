import React from "react";
import { Container } from "@material-ui/core";

import styles from "./styles";
import RegisterForm from "../forms/Register";

const RegisterPage = ({ props }) => {
  const classes = styles();

  return (
    <Container maxWidth="md">
      <div className={classes.heading}>
        <h1>REGISTER</h1>
        <p>Fill in all fields to create an account</p>
      </div>

      <RegisterForm props={props} />
    </Container>
  );
};

export default RegisterPage;
