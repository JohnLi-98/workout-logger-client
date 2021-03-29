import React, { useState } from "react";
import { Container, Grid, IconButton } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import styles from "./styles";
import LogSetModal from "./LogSetModal";
import LogPageLinks from "./LogPageLinks";

const AuthHome = ({ user }) => {
  const classes = styles();
  const [logSetModalOpen, setLogSetModalOpen] = useState(false);
  const logSetModalChange = (show) => {
    setLogSetModalOpen(show);
  };

  return (
    <Container maxWidth="md">
      <Grid container spacing={2}>
        <Grid item xs={12} className={classes.heading}>
          <h1>Welcome back, {user.username}.</h1>
          <div className={classes.iconContainer}>
            <IconButton
              aria-label="Log a Set"
              className={classes.icon}
              title="Log a Set"
              onClick={() => logSetModalChange(true)}
            >
              <AddCircleIcon />
            </IconButton>
            <LogSetModal
              logSetModalOpen={logSetModalOpen}
              logSetModalChange={logSetModalChange}
            />
          </div>
        </Grid>

        <LogPageLinks />
      </Grid>
    </Container>
  );
};

export default AuthHome;
