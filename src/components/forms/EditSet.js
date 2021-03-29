import React, { useState } from "react";
import { Button, DialogActions, Grid, TextField } from "@material-ui/core";
import { useMutation } from "@apollo/client";
import { useSnackbar } from "notistack";

import styles from "./styles";
import { useForm } from "../../util/form-hooks";
import {
  EDIT_SET,
  GET_EXERCISE_LOG,
  GET_WORKOUT_LOG,
} from "../../util/graphql-operations";

/**
 * This component is used in the EditSetButton component in the logs-pages directory.
 * @param workoutId ID of the workout that is being edited - only passed in if previous component was invoked by WorkoutInfo component.
 * @param exerciseId ID of the exercise that is being edited - always passed in.
 * @param set Object that contains the set data that is being edited - always passed in.
 * @param handleClose Function that closes the Dialog component that holds this component.
 * @returns Edit set form that changes a set data if submitted.
 */
const EditSetForm = ({ workoutId, exerciseId, set, handleClose }) => {
  const { id } = set;
  const classes = styles();
  const [errors, setErrors] = useState({});
  const { enqueueSnackbar } = useSnackbar();

  const editSetCallback = () => editSet();

  // useForm hook to handle form changes and updates the values. Set initial state of values to values in set object.
  const { onChange, onSubmit, values } = useForm(editSetCallback, {
    weight: set.weight,
    reps: set.reps,
    notes: set.notes,
  });

  /**
   * Function to invoke Apollo's useMutation hook that runs GraphQL mutation resolver on
   * the backend, with the form values as variables. If successful, update the cache results
   * for the user's logs. Also, add a success snackbar message to app before closing Dialog
   * component.
   */
  const [editSet] = useMutation(EDIT_SET, {
    update(proxy) {
      if (workoutId) {
        /**
         * If there is a workoutId passed in, also update the cache results of the user's workout
         * logs, so the change is reflected on the frontend.
         */
        const data = proxy.readQuery({
          query: GET_WORKOUT_LOG,
          variables: {
            workoutId,
          },
        });
        proxy.writeQuery({
          query: GET_WORKOUT_LOG,
          variables: {
            workoutId,
          },
          data: {
            getWorkoutLog: data,
          },
        });
      } else {
        /**
         * Else, if no workoutId, then update the cache results for the user's exercise logs,
         * so the change is reflected on the frontend.
         */
        const data = proxy.readQuery({
          query: GET_EXERCISE_LOG,
          variables: {
            exerciseId,
          },
        });

        proxy.writeQuery({
          query: GET_EXERCISE_LOG,
          variables: {
            exerciseId,
          },
          data: {
            getExerciseLog: data,
          },
        });
      }
      enqueueSnackbar("Set edited", { variant: "success" });
      handleClose();
    },
    onError(err) {
      console.log(err);
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: {
      exerciseId,
      setId: id,
      weight: values.weight,
      reps: values.reps,
      notes: values.notes,
    },
  });

  return (
    <>
      <form onSubmit={onSubmit} id="editSetForm" noValidate autoComplete="off">
        <Grid container className={classes.homeFormInput}>
          <Grid item xs={6} className={classes.paddingLeft}>
            <TextField
              id="weight"
              name="weight"
              label="Weight"
              type="number"
              min="0"
              variant="outlined"
              fullWidth
              value={values.weight}
              error={errors.weight ? true : false}
              onChange={onChange}
              required
            />
          </Grid>

          <Grid item xs={6} className={classes.paddingRight}>
            <TextField
              id="reps"
              name="reps"
              label="Reps"
              type="number"
              min="0"
              variant="outlined"
              fullWidth
              value={values.reps}
              error={errors.reps ? true : false}
              onChange={onChange}
              required
            />
          </Grid>
        </Grid>

        <TextField
          id="notes"
          name="notes"
          label="Notes (Optional)"
          type="text"
          variant="outlined"
          fullWidth
          multiline={true}
          rows="4"
          className={classes.homeFormInput}
          value={values.notes}
          onChange={onChange}
        />
      </form>

      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button type="submit" form="editSetForm" color="primary">
          Confirm
        </Button>
      </DialogActions>
    </>
  );
};

export default EditSetForm;
