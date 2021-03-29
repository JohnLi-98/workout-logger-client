import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Slide,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { useMutation } from "@apollo/client";
import { useSnackbar } from "notistack";

import styles from "./styles";
import {
  DELETE_SET,
  GET_EXERCISE_LOG,
  GET_WORKOUT_LOG,
} from "../../util/graphql-operations";

// Used for Dialog TransitionComponent prop.
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

/**
 * Component is called on both the SetsTable and WorkoutInfo components to allow editing of a set in their log.
 * @param workoutId ID of the workout being deleted - only passed in if this component is invoked from the WorkoutInfo component.
 * @param exerciseId ID of the exercise that is being deleted - always passed in.
 * @param setId ID of the set that is being deleted - always passed in.
 * @returns Icon button that opens up a Dialog component that requests confirmation for the deletion of a set.
 */
const DeleteSetButton = ({ workoutId, exerciseId, setId }) => {
  const classes = styles();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const { enqueueSnackbar } = useSnackbar();

  /**
   * Function to invoke Apollo's useMutation hook that runs GraphQL mutation resolver on
   * the backend, with the exercise and set IDs as variables. If successful, update the cache results
   * for the user's logs. Also, add a success snackbar message to app before closing Dialog component.
   */
  const [deleteSet] = useMutation(DELETE_SET, {
    update(proxy) {
      setOpen(false);
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
            getExerciseLog: data.getExerciseLog.sets.filter(
              (set) => set.id !== setId
            ),
          },
        });
      }
      // Finally, add a success snackbar message to application.
      enqueueSnackbar("Set deleted successfully", { variant: "success" });
    },
    variables: {
      exerciseId,
      setId,
    },
  });

  return (
    <div>
      <IconButton
        aria-label="delete set"
        title="Delete Set"
        className={classes.deleteButton}
        onClick={handleOpen}
      >
        <DeleteIcon />
      </IconButton>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        maxWidth="sm"
        onClose={handleClose}
      >
        <DialogTitle>Remove Set From Logs?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you wish to delete this set from your logs. Once done,
            this deletion can NOT be undone. Do you wish to continue?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={deleteSet} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteSetButton;
