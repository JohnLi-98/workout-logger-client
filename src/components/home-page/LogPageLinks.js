import React from "react";
import { Grid } from "@material-ui/core";

import ImageButton from "./ImageButton";
import workoutImage from "../../images/workout.png";
import exerciseImage from "../../images/exercise.png";

const LogPageLinks = () => {
  return (
    <>
      <Grid item xs={6}>
        <ImageButton
          image={workoutImage}
          url="/my-workout-logs"
          text="Workout Logs"
        />
      </Grid>

      <Grid item xs={6}>
        <ImageButton
          image={exerciseImage}
          url="/my-exercise-logs"
          text="Exercise Logs"
        />
      </Grid>
    </>
  );
};

export default LogPageLinks;
