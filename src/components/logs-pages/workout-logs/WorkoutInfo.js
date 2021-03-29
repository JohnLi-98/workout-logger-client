import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import styles from "../styles";
import { convertToDateTime } from "../../../util/common-functions";
import EditSetButton from "../EditSetButton";
import DeleteSetButton from "../DeleteSetButton";

/**
 *
 * @param workout Object that contains the workout data - exercises and sets.
 * @returns Individual accordions for each exercise and the number of sets logged for it.
 */
const WorkoutInfo = ({ workout }) => {
  const classes = styles();

  return (
    <div className={classes.paddingX}>
      {workout.exercises.map((exercise) => (
        <Accordion key={exercise.id} className={classes.accordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel-content"
            className={classes.accordionSummary}
          >
            <p>{exercise.exerciseName}</p>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container direction="column" justify="space-between">
              {exercise.sets.map((set, index) => (
                <div key={set.id}>
                  <Grid container>
                    <Grid item xs={12}>
                      <h2>{`Set ${index + 1}`}</h2>
                    </Grid>
                    <Grid item xs={6}>
                      <p>{`Weight: ${set.weight} kg`}</p>
                      <p>{`Reps: ${set.reps}`}</p>
                    </Grid>

                    <Grid item xs={6}>
                      <p>{`Set logged on: ${convertToDateTime(
                        set.createdAt
                      )}`}</p>
                    </Grid>

                    <Grid item xs={12}>
                      <p>
                        {`Notes: ${set.notes.length > 0 ? set.notes : "N/A"}`}
                      </p>
                    </Grid>
                  </Grid>

                  <Grid container justify="flex-end">
                    <EditSetButton
                      workoutId={workout.id}
                      exerciseId={exercise.id}
                      set={exercise.sets[index]}
                    />

                    <DeleteSetButton
                      workoutId={workout.id}
                      exerciseId={exercise.id}
                      setId={exercise.sets[index].id}
                    />
                  </Grid>
                </div>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default WorkoutInfo;
