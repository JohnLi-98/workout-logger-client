import React from "react";
import { Container, Paper } from "@material-ui/core";
import { useQuery } from "@apollo/client";

import styles from "../styles";
import { GET_WORKOUT_LOGS } from "../../../util/graphql-operations";
import WorkoutsTable from "./WorkoutsTable";

/**
 *
 * @returns Content for the Workout Logs page. (Entry point)
 */
export const WorkoutLogs = () => {
  const classes = styles();

  // Get user's workout logs to display in the WorkoutsTable component.
  const {
    loading,
    data: { getAllWorkoutLogs: workoutLogs } = {},
  } = useQuery(GET_WORKOUT_LOGS, { fetchPolicy: "cache-and-network" });

  return (
    <Container maxWidth="md" className={classes.container}>
      <Paper className={classes.heading}>
        <h1>Workout Logs</h1>
        <p>
          View your progression and history for each workout by clicking on it
          below.
        </p>
      </Paper>

      {loading ? (
        <Paper className={classes.centerContent}>
          <h1>Retrieving Workouts...</h1>
        </Paper>
      ) : (
        <WorkoutsTable workouts={workoutLogs} />
      )}
    </Container>
  );
};
