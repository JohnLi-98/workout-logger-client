import React, { useState } from "react";
import { Container, Link, Paper } from "@material-ui/core";
import { useQuery } from "@apollo/client";
import { Link as RouterLink } from "react-router-dom";

import styles from "../styles";
import { GET_WORKOUT_LOG } from "../../../util/graphql-operations";
import { convertToDateTime } from "../../../util/common-functions";
import WorkoutInfo from "./WorkoutInfo";

/**
 *
 * @param props react-router-dom props that is passed to all routes - used to get workoutId
 * @returns Content for a single workout log (renders exercises and sets - entry point).
 */
export const SingleWorkoutLog = ({ props }) => {
  const classes = styles();
  const [error, setError] = useState({});

  // Get the exercise ID from props (url) and use it to get the log for that workout.
  const workoutId = props.match.params.workoutId;
  const { loading, data: { getWorkoutLog: workout } = {} } = useQuery(
    GET_WORKOUT_LOG,
    {
      onError(err) {
        setError(err.graphQLErrors[0].message);
      },
      variables: {
        workoutId,
      },
    }
  );

  return (
    <Container maxWidth="md" className={classes.container}>
      {loading ? (
        <Paper className={classes.loading}>
          <h1>Retrieving Log...</h1>
        </Paper>
      ) : (
        <>
          {workout ? (
            <>
              <Paper className={classes.heading}>
                <h1>{convertToDateTime(workout.createdAt)}</h1>
                <p>
                  {`View your progression and set history for the workout below.`}
                </p>
              </Paper>

              <Paper className={classes.paper}>
                <WorkoutInfo workout={workout} />
              </Paper>
            </>
          ) : (
            <Paper className={classes.heading}>
              <h1>Error</h1>
              <p>
                {`${error}. `}
                <Link component={RouterLink} to="/my-workout-logs">
                  Back to List of Logs
                </Link>
              </p>
            </Paper>
          )}
        </>
      )}
    </Container>
  );
};
