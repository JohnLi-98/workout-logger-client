import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { Container, Link, Paper } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

import styles from "../styles";
import { GET_EXERCISE_LOG } from "../../../util/graphql-operations";
import SetsTable from "./SetsTable";

/**
 *
 * @param props react-router-dom props that is passed to all routes - used to get exerciseId
 * @returns Content for a single exercise log (renders sets - entry point).
 */
export const SingleExerciseLog = ({ props }) => {
  const classes = styles();
  const [error, setError] = useState();

  // Get the exercise ID from props (url) and use it to get the log for that exercise.
  const exerciseId = props.match.params.exerciseId;
  const { loading, data: { getExerciseLog: exercise } = {} } = useQuery(
    GET_EXERCISE_LOG,
    {
      onError(err) {
        setError(err.graphQLErrors[0].message);
      },
      variables: {
        exerciseId,
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
          {exercise ? (
            <>
              <Paper className={classes.heading}>
                <h1>{exercise.exerciseName}</h1>
                <p>
                  {`View your progression and set history for ${exercise.exerciseName} below.`}
                </p>
              </Paper>

              <Paper className={classes.paper}>
                {exercise.sets[0] ? (
                  <SetsTable exerciseId={exercise.id} sets={exercise.sets} />
                ) : (
                  <Paper className={classes.centerContent}>
                    <p>No sets logged for this exercise</p>
                  </Paper>
                )}
              </Paper>
            </>
          ) : (
            <Paper className={classes.heading}>
              <h1>Error</h1>
              <p>
                {`${error}. `}
                <Link component={RouterLink} to="/my-exercise-logs">
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
