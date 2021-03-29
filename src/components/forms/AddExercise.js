import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useMutation } from "@apollo/client";
import { useSnackbar } from "notistack";

import styles from "./styles";
import { useForm } from "../../util/form-hooks";
import {
  GET_USER_EXERCISES,
  ADD_EXERCISE,
} from "../../util/graphql-operations";

/**
 * This component is used in the AddExerciseModal component in the home-pages directory.
 * @param closeExerciseModal function that closes the add exercise modal.
 */
const AddExercise = ({ closeExerciseModal }) => {
  const classes = styles();
  const { enqueueSnackbar } = useSnackbar();
  const [errors, setErrors] = useState({});

  const callback = () => addExercise();

  // useForm hook to handle form changes and updates the values.
  const { onSubmit, onChange, resetFormValues, values } = useForm(callback, {
    exerciseName: "",
  });

  /**
   * Function to invoke Apollo's useMutation hook that runs GraphQL mutation resolver on
   * the backend, with the form values as variables. If successful, update the cache results
   * for the users exercises so that the new entry is shows in the log set form, then reset the
   * form back to the initial state and close the modal. Also, add a success snackbar message
   * to app. Otherwise, set the errors to show.
   */
  const [addExercise] = useMutation(ADD_EXERCISE, {
    update(proxy, result) {
      const data = proxy.readQuery({
        query: GET_USER_EXERCISES,
      });
      proxy.writeQuery({
        query: GET_USER_EXERCISES,
        data: {
          getAllExerciseLogs: [
            result.data.addExercise,
            ...data.getAllExerciseLogs,
          ],
        },
      });
      resetFormValues();
      setErrors({});
      closeExerciseModal();
      enqueueSnackbar("Exercise Added", { variant: "success" });
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });
  return (
    <>
      <form
        onSubmit={onSubmit}
        id="addExerciseForm"
        noValidate
        autoComplete="off"
      >
        <TextField
          id="exerciseName"
          name="exerciseName"
          label="Exercise Name"
          type="text"
          value={values.exerciseName}
          onChange={onChange}
          variant="outlined"
          fullWidth
          className={classes.homeformInput}
          error={errors.exerciseName ? true : false}
          required
        />
      </form>

      {Object.keys(errors).length > 0 && (
        <div className={classes.homeFormInput}>
          <Alert variant="filled" severity="error">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </Alert>
        </div>
      )}
    </>
  );
};

export default AddExercise;
