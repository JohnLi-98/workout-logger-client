import React, { useState } from "react";
import { Grid, MenuItem, TextField } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { useMutation } from "@apollo/client";
import { useSnackbar } from "notistack";

import styles from "./styles";
import { useForm } from "../../util/form-hooks";
import { LOG_SET } from "../../util/graphql-operations";

/**
 * This component is used in the LogSetModal component in the home-pages directory.
 * @param exercises list of the user's exercises they have logged before.
 * @param logSetModalChange function that will close the current modal.
 * @param exerciseModalChange function that opens another modal to add a new exercise to logs.
 * @returns Log set form that adds data if submitted.
 */
const LogSet = ({ exercises, closeLogSetModal, exerciseModalChange }) => {
  const classes = styles();
  const { enqueueSnackbar } = useSnackbar();
  const [errors, setErrors] = useState({});

  const registerSet = () => logSet();

  // useForm hook to handle form changes and updates the values.
  const { onChange, onSubmit, resetFormValues, values } = useForm(registerSet, {
    exerciseName: "",
    weight: 0,
    reps: 0,
    notes: "",
  });

  /**
   * Function to invoke Apollo's useMutation hook that runs GraphQL mutation resolver on
   * the backend, with the form values as variables. If successful, reset the form back to
   * the initial state and close the modal. Also, add a success snackbar message to app.
   * Otherwise, set the errors to show.
   */
  const [logSet] = useMutation(LOG_SET, {
    update() {
      resetFormValues();
      setErrors({});
      closeLogSetModal();
      enqueueSnackbar("Set logged successfully", { variant: "success" });
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });
  return (
    <form onSubmit={onSubmit} id="logSetForm" noValidate autoComplete="off">
      <TextField
        id="exerciseName"
        name="exerciseName"
        label="Exercise Name"
        variant="outlined"
        fullWidth
        select
        className={classes.homeFormInput}
        value={values.exerciseName}
        error={errors.exerciseName ? true : false}
        onChange={onChange}
      >
        <MenuItem
          onClick={() => exerciseModalChange(true)}
          value={""}
          className={classes.addExerciseItem}
        >
          <span>Add Exercise</span>
          <AddCircleIcon />
        </MenuItem>

        {exercises &&
          exercises.map((exercise) => (
            <MenuItem key={exercise.id} value={exercise.exerciseName}>
              {exercise.exerciseName}
            </MenuItem>
          ))}
      </TextField>

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
  );
};

export default LogSet;
